import { aw } from "react-router/dist/development/route-data-aSUFWnQ6";
import { AccessTokenKey } from "../constants/commonConstants";
import { AxiosInstance } from "./axiosInstance";
import { AddDepartmentResponseDto, EditDepartmentResponseDto } from "../types/apiTypes";


export const DepartmentsApi = () => {

    const token = sessionStorage.getItem(AccessTokenKey) ?? '';
    
    const { axiosDelete, axiosGet, axiosPut, axiosPost} = AxiosInstance(token);
const getDepartments = async () => 
    await axiosGet('/Departments');

const addDepartment = async(addDepartmentData: AddDepartmentResponseDto) => 
    await axiosPost('/Departments/department', addDepartmentData) as number;

const editDepartment = async(editDepartmentData: EditDepartmentResponseDto) => 
    await axiosPut('/Departments/department', editDepartmentData) as void;

const deleteDepartment = async(id: string | number) => 
    await axiosDelete(`/Departments/department?id=${id}`) as void;

return  {
    addDepartment,
    editDepartment,
    deleteDepartment,
    getDepartments
}
}