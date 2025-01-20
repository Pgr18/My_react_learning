import { AccessTokenKey } from "../constants/commonConstants";
import { DownloadFileResponseDto, UploadFileResponseDto } from "../types/apiTypes";
import { AxiosInstance } from "./axiosInstance";

const {axiosDelete, axiosPost} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');

const uploadFile = async(uploadFileData: UploadFileResponseDto) => 
    await axiosPost('/Files/upload', uploadFileData) as void;

const downloadFile = async(downloadFileData: DownloadFileResponseDto) => 
    await axiosPost('/Files/download', downloadFileData);

const deleteFile = async(id: string | number) => 
    await axiosDelete(`/Files/delete?id=${id}`) as void

export const FilesApi = {
    uploadFile,
    downloadFile,
    deleteFile
}