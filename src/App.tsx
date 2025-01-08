import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages';
import { RegistrationPage } from './pages/registration';
import { RoutesPaths } from './constants/commonConstants';



export const App: React.FC = () => {
  return (
    
    <Routes>
      <Route path={RoutesPaths.Login} element={<LoginPage/>} />
      <Route path={"*"} element={<LoginPage/>} />
      <Route path={RoutesPaths.Registration} element={<RegistrationPage/>} />
     
    </Routes>
  );
};
