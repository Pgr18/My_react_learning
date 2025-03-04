import { AccessTokenKey } from "../constants/commonConstants";
import { SetRoleResponseDto } from '../types/apiTypes';
import { User } from '../types/models';
import { AxiosInstance } from "./axiosInstance";


export const AdministrationApi = () => {
    const { axiosGet, axiosPatch } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');
const getUsers = async () =>
    await axiosGet('/Administration/getusers') as Array<User>;

const setUserRole = async(setRoleData: SetRoleResponseDto) =>
    await axiosPatch('/Administration/setuserrole', setRoleData) as void;

return  {
    getUsers,
    setUserRole
}
}