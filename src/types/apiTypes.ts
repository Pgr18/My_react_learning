export interface LoginRequestDto {
    login: string;
    password: string;
}

export interface LoginResponseDto {
    access_token: string;
    username: string;
    role: string;
}

export interface RegistrationRequestDto {
    login: string;
    password: string;
}
export interface AddDepartmentResponseDto {
    name: string;
    description?: string;
}

export interface EditDepartmentResponseDto {
    id: number;
    name: string;
    description?: string;
}

export interface SetRoleResponseDto {
    userId: number;
    roleName: 'admin' | 'manager' |  'user';
}

export interface AddEmployeeResponseDto {
    departmentId: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
}

export interface UpdateEmployeeResponseDto {
    id: number;
    firstName: string;
    lastName: string;
    midleName?: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    education: Array<{
        id: number;
        title: string;
        description?: string;
    }>;
    workExperience: Array<{
        id: number;
        workedYears: number;
        description?: string;
    }>;
    userFiles: Array<{
        id: number;
        systemName: string;
        displayName: string;
    }>;
}

export interface AddWorkExperienceResponseDto {
    employeeId: number;
    workedYears: number;
    description?: string;
}

export interface AddEducationResponseDto {
    employeeId: number;
    title: string;
    description?: string;
}

export interface UploadFileResponseDto {
    employeeId: number;
    fileString: string;
    fileName: string;
    
}

export interface DownloadFileResponseDto {
    systemName: string;
    displayName: string;
}


