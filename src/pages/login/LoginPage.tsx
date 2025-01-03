import { FC, useState } from 'react';
import { TextField } from '../../components/textField';
import { Button } from '../../components';
import { WidgetLayout } from '../../components/layouts';
import './loginPageStyles.scss'

export const LoginPage: FC = () => {
    const [login, setlogin] = useState<string>('');

    const [password, setPassword] = useState<string>('');


    const loginChangedHandler = (value: string) => {
        setlogin(value);
    }

    const passwordChangedHandler = (value: string) => {
        setPassword(value);
    }

    const loginHandler = () => {
        console.log({
            login,
            password
        });
    }

    const toRegistrationHandler = () => {

    }

    return (
        <WidgetLayout>
            <div className="login-page__form">
                <h3 className="login-page__title">Вход</h3>
                <div>
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