import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages';
import { RegistrationPage } from './pages/registration';
import { RoutesPaths } from './constants/commonConstants';
import { DepartmentsPage } from './pages/department';
import './styles/globalStyles.scss';
import { AdministrationPage } from './pages/administration/AdministrationPage';
import { NoPermissionsPage } from './pages/noPermissions';


export const App: React.FC = () => {
  return (
    
    <Routes>
      <Route path={RoutesPaths.Login} element={<LoginPage/>} />
      <Route path={RoutesPaths.Registration} element={<RegistrationPage/>} />
      <Route path={RoutesPaths.Departments} element={<DepartmentsPage/>} />  
      <Route path={RoutesPaths.Administration} element={<AdministrationPage/>} />   
      <Route path={RoutesPaths.NoPermissions} element={<NoPermissionsPage/>} />  

      <Route path={"*"} element={<LoginPage/>} />
    </Routes>
  );
};
