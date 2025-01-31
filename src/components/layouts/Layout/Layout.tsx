import { FC } from "react";
import { LayoutProps } from "./LayoutProps";
import './LayoutStyles.scss'
import { LogoIcon } from "../../../assets/icons/LogoIcon";
import { UserMenu } from "../../userMenu";
import { useAppSelector } from "../../../hooks/reduxToolkitHooks";
import { useDispatch, UseDispatch } from "react-redux";
import { logOut } from "../../../store/slices/userSlices";
import { MenuItem } from "../../userMenu/UserMenuProps";
import { useNavigate } from "react-router";
import { RoutesPaths } from "../../../constants/commonConstants";

export const Layout: FC<LayoutProps> = props => {
    const {role} = useAppSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        footer, headerChild, title,children
    } = props;

    const logOutHandler = () => {
        dispatch(logOut());
        navigate(`/${RoutesPaths.Login}`);
        
    }

    const goToAdministrationHandler = () => {
        navigate(`/${RoutesPaths.Administration}`);
    }

    const exitMenuItem: MenuItem = {
        id: 'exit',
        action: logOutHandler,
        label: 'Выйти'
    };

    const administrationMenuItem: MenuItem = {
        id: 'go_to_administration',
        action: goToAdministrationHandler,
        label: 'Администрирование'
    }

    //<div>Header</div>
    //<div>Footer</div>
    return (
        <div className="layout">
            <div className="layout__header">
                <div>
                    <LogoIcon />
                </div>
                <div>
                    <div>{title ?? 'База сотрудников'}</div>
                    <div>{headerChild}</div>
                </div>
                <div className="layout__user-menu">
                    <UserMenu items = {role === 'admin' ? [administrationMenuItem, exitMenuItem]: [exitMenuItem]}/>
                </div>
            </div>
            <div className="layout__body">
                {children}
                </div>
            <div>{footer}</div>
        </div>


    );
}