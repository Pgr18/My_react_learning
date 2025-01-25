import { FC, useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { UsersList } from "../../components/usersList";
import { User } from '../../types/models';
import { Button } from "../../components";
import { useNavigate } from "react-router";
import { RoutesPaths } from '../../constants/commonConstants';
import './administrationPageStyles.scss'
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkitHooks";
import { getUsers, setUserRole } from "../../services";
import { ac } from "react-router/dist/development/route-data-aSUFWnQ6";

const fakeUsersListData: Array<User> = [{
    id: 1,
    login: 'user1',
    password: '1234',
    role: 'user'
}, {
    id: 2,
    login: 'user2',
    password: '12345',
    role: 'manager'
}, {
    id: 3,
    login: 'user3',
    password: '123456',
    role: 'admin'
}];

export const AdministrationPage: FC = () => {
    const {users} = useAppSelector((state) => state.adminstration);
    const {accessToken, role} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            if (role === 'user' || role === 'manager' || !role) {
                navigate(`${RoutesPaths.NoPermissions}`);
            } else {
                dispatch(getUsers());
            }
        }
    }, [accessToken, role, navigate, dispatch]);

    const setAdminRoleHandler = (id: number) => {
        dispatch (setUserRole({userId: id, roleName: 'admin'}));
    }

    const setManagerRoleHandler = (id: number) => {
        dispatch (setUserRole({userId: id, roleName: 'manager'}));
    }

    const resetPermissionHandler = (id: number) => {
        dispatch (setUserRole({userId: id, roleName: 'user'}));
    }

    return (
        <Layout title="Администрирование">
            <Button text="На главную" 
                onClick={() => navigate(`/${RoutesPaths.Departments}`)} 
                className="navigate-btn"
                type="primary"
            />
            <UsersList onSetAdminRole={setAdminRoleHandler} 
                onSetManagerRole={setManagerRoleHandler} 
                onResetPermissions={resetPermissionHandler}
                usersList={users}
            />
        </Layout>
    );

}