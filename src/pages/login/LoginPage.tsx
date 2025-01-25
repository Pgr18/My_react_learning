import { FC, useEffect, useState } from 'react';
import { TextField } from '../../components/textField';
import { Button } from '../../components';
import { WidgetLayout } from '../../components/layouts';
import './loginPageStyles.scss'
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';
import { signIn } from '../../services';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxToolkitHooks';

export const LoginPage: FC = () => {
    const {accessToken ,role} = useAppSelector ((state) => state.user);
    const dispatch = useAppDispatch();
    const [login, setlogin] = useState<string>('');

    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    useEffect (() => {
        if (accessToken) {
            if (role === 'user' || !role) {
                navigate(`/${RoutesPaths.NoPermissions}`);
            } else {
                navigate(`/${RoutesPaths.Departments}`);
            }
        }
    }, [accessToken, role, navigate]);

    const loginChangedHandler = (value: string) => {
        setlogin(value);
    }
// 
//
    const passwordChangedHandler = (value: string) => {
        setPassword(value);
    }

    const loginHandler = () => {
        dispatch(signIn({login, password}));
    }

    const toRegistrationHandler = () => {
        navigate(RoutesPaths.Registration);
        }

    return (
        <WidgetLayout>
            <div className="login-page__form">
                <h3 className="login-page__title">Вход</h3>
                <div className="login-page__fields">
                    <TextField labelText="Логин" value={login} type="text" onChange={loginChangedHandler} />
                    <TextField labelText="Пароль" value={password} type="password" onChange={passwordChangedHandler} />
                </div>
                <div className="login-page__actions">
                    <Button text="Войти" onClick={loginHandler} type = "primary" />
                    <Button text="Зарегистрироваться" onClick={toRegistrationHandler} type = "secondary" />
                </div>
            </div>
        </WidgetLayout>
    );
};