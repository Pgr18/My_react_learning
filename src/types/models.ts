export interface Education {
    id: number;
    title: string;
    description: string;
}

export interface WorkExperience {
    id: number;
    workedYears:number;
    description?: string;
}

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    education: Array<Education>;
    workExperience: Array<WorkExperience>;
    userFiles: Array<UserFile>;
}

export interface Department {
    id: number;
    name: string;
    description?: string;
    employees: Array<Employee>;
}

export interface UserFile {
    id: number;
    systemName: string;
    displayName: string;
}

export interface User {
    id: number;
    login: string;
    password: string;
    role: 'admin' | 'manager' | 'user'
}