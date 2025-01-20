import { FC, useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { Button, DropDown, EducationList, EmployeesList, FilesList, TextField, WorkExperienceList } from "../../components";
import './departmentsPageStyles.scss'
import { Dialog } from "../../components";
import { Department, Employee } from "../../types/models";
import { DropDownItem } from "../../components/dropDown/dropDownProps";
import { get } from "http";
import { PlusIcon, UploadIcon } from "../../assets/icons";
import { format } from "date-fns";


const fakeEmployeesData = [
    { id: 1, lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', birthDate: new Date().toISOString(), email: 'ivanov@mail.ru', phoneNumber: '8-800-555-35-35' },
    {
        id: 2, lastName: 'Петров', firstName: 'Сергей', middleName: 'Дмитриевич', birthDate: new Date().toISOString(), email: 'ivanov@mail.ru', phoneNumber: '8-800-555-35-36',
        educations: [
            {
                id: 1,
                description: 'Системный администратор',
                title: 'ВГПТТ №36'
            }, {
                id: 2,
                description: 'Информационные системы и технологии',
                title: 'ФГБОУ ВГПУ'
            }, {
                id: 3,
                description: 'Курсы повышения квалификации',
                title: 'Яндекс Практикум'
            }
        ],
        workExperience: [
            {
                id: 1,
                workedYears: 3,
                description: 'ООО Техинформ сервис'
            }, {
                id: 2,
                workedYears: 2,
                description: 'Data Art'
            }, {
                id: 3,
                workedYears: 4,
                description: 'ООО Рексофт'
            }
        ]
    },

    { id: 3, lastName: 'Джон', firstName: 'Смитт', birthDate: new Date().toISOString(), email: 'ivanov@mail.ru', phoneNumber: '8-800-555-35-37' },
    { id: 4, lastName: 'Рябчикова', firstName: 'Лидия', middleName: 'Анатольевна', birthDate: new Date().toISOString(), email: 'ivanov@mail.ru', phoneNumber: '8-800-555-38-35' },
    { id: 5, lastName: 'Семенов', firstName: 'Олег', middleName: 'Артемович', birthDate: new Date().toISOString(), email: 'ivanov@mail.ru', phoneNumber: '8-800-555-39-35' }
] as Array<Employee>;

const fakeDepartmentsData = [
    { id: 1, name: 'Отдел 1', employees: [] },
    { id: 2, name: 'Отдел 2', employees: fakeEmployeesData },
    { id: 3, name: 'Отдел 3', employees: [] }
] as Array<Department>;

/*const fakeDepartmentsData = [{
    text: 'Отдел 1', value: '1'
}, {
    text: 'Отдел 2', value: '2'
}, {
    text: 'Отдел 3', value: '3'
}
];*/


export const DepartmentsPage: FC = () => {
    const [departmentsData, setDepartmentsData] = useState<Array<Department>>([]);
    const [employeesData, setEmployeesData] = useState<Array<Employee>>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>();
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
    const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [userToEdit, setUserToEdit] = useState(0);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');

    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setDepartmentsData(fakeDepartmentsData);
            if (Array.isArray(fakeDepartmentsData) && fakeDepartmentsData.length) {
                setEmployeesData(fakeDepartmentsData[0].employees);
            }
        }, 2000);
    }, []);

    useEffect(() => {
        const selectedDepartment = departmentsData.find(d => d.id === selectedDepartmentId);
        setEmployeesData(selectedDepartment ? selectedDepartment.employees : []);
        setSelectedEmployee(undefined);
    }, [departmentsData, selectedDepartmentId]);

    useEffect(() => {
        setEmployeesData(fakeEmployeesData);
    }, []);

    const clearEmployeeDialogFields = () => {
        setUserActionMode('create');
        setUserToEdit(0);
        setLastName('');
        setFirstName('');
        setMiddleName('');
        setEmail('');
        setPhoneNumber('');
    }

    useEffect(() => {
        //clearEmployeeDialogFields();
        if (userActionMode === 'edit') {
            const employee = userActionMode === 'edit'
                ? employeesData.find(e => e.id === userToEdit)
                : undefined;

            setLastName(employee?.lastName ?? '');
            setFirstName(employee?.firstName ?? '');
            setMiddleName(employee?.middleName ?? '');

            setBirthDate(employee?.birthDate ?? '');
            setEmail(employee?.email ?? '');
            setPhoneNumber(employee?.phoneNumber ?? '');
        }
    }, [employeesData, userActionMode, userToEdit])



    const createEmployeeHandler = () => {
        setUserActionMode('create');
        setShowEmployeeDialog(true);
    }

    const editEmployeeHadler = (id: number) => {
        setUserActionMode('edit');
        setUserToEdit(id);
        setShowEmployeeDialog(true);
    }

    const userDialogContenRenderer = () => {
        return (
            <>
                <TextField labelText="Фамилия" value={lastName} onChange={(val) => setLastName(val)} />
                <TextField labelText="Имя" value={firstName} onChange={(val) => setFirstName(val)} />
                <TextField labelText="Отчество" value={middleName} onChange={(val) => setMiddleName(val)} />

                <TextField labelText="Дата рождения" value={birthDate} onChange={(val) => setBirthDate(val)} />
                <TextField labelText="Email" value={email} onChange={(val) => setEmail(val)} />
                <TextField labelText="Телефон" value={phoneNumber} onChange={(val) => setPhoneNumber(val)} />
            </>
        );
    }

    const closeEmployeeDialogHadler = () => {
        setShowEmployeeDialog(false);
        clearEmployeeDialogFields();
    }

    const departmentChangedHandler = (id?: string) => {
        const _id: number | undefined = !id ? undefined : +id;
        setSelectedDepartmentId(_id);
    }

    const onEmployeeSelectedHandler = (id: number) => {
        const employee = employeesData.find(e => e.id === id);
        setSelectedEmployee(employee);
    }

    const getFIO = () => {
        if (!selectedEmployee) {
            return '';
        }
        return `${selectedEmployee.lastName} ${selectedEmployee.firstName} ${selectedEmployee.middleName ?? ''}`.trim();
    }

    const uploadFileHandler = () => {

    }

    const downloadFileHandler = (id: number) => {

    }

    const deleteFileHandler = (id: number) => {

    }


    return (
        <Layout>
            <Dialog title={userActionMode !== 'edit' ? 'Добавить сотрудника' : 'Изменить сотрудника'}
                open={showEmployeeDialog}
                onSave={() => { }}
                onCancel={closeEmployeeDialogHadler}
            >
                {userDialogContenRenderer()}
            </Dialog>


            <div className="dep-page">
                <div className="dep-page__users-list-container">
                    <DropDown items={departmentsData.map(dd => {
                        return {
                            text: dd.name,
                            value: dd.id.toString()
                        } as DropDownItem;
                    })}
                        label="Отделы:"
                        selectedChanged={(val) => departmentChangedHandler(val)}
                    />
                    <EmployeesList employeesList={employeesData}
                        onItemClick={(id) => onEmployeeSelectedHandler(id)}
                        onItemDelete={(id) => console.log('delete', id)}
                        onItemEdit={editEmployeeHadler}
                    />
                    <Button text="Добавить сотрудника" className="dep-page__add-user-btn" onClick={createEmployeeHandler} />
                </div>
                <div className="dep-page__user-info-container">
                    <div className="dep_page__user-info-header">
                        <div className="dep-page__user-info-user">
                            <div className="dep-page__user-info-fullname">
                                {getFIO()}
                            </div>
                            <div className="dep-page__user-info-pers-data">
                                <div>
                                    <strong>Дата рождения: </strong>
                                    <span>{
                                        selectedEmployee?.birthDate
                                            ? format(new Date(selectedEmployee.birthDate), 'dd.MM.yyyy')
                                            : '-'
                                    }
                                    </span>
                                </div>
                                <div>
                                    <strong>Email: </strong>
                                    <span>{selectedEmployee?.email ?? '-'}</span>
                                </div>
                                <div>
                                    <strong>Телефон</strong>
                                    <span>{selectedEmployee?.phoneNumber ?? '-'}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="dep-page__user-add-info">
                        <div className="dep-page__user-add-info-files">
                            <span className="dep-page__label">
                                Прикреплённые файлы:
                            </span>
                            <FilesList
                                onFileDownload={downloadFileHandler}
                                onFileDelete={deleteFileHandler}
                                filesList={[{
                                    id: 1,
                                    displayName: 'test file.txt',
                                    systemName: 'abcdefg'
                                }, {
                                    id: 2,
                                    displayName: 'testt file2.txt',
                                    systemName: 'hijklmn'
                                }]}/>
                        </div>
                        <div className="dep-page__user-add-info-data">
                            <div className="dep-page__user-add-info-data__cell">
                                <div className="dep-page__list-title">
                                    <span className="dep-page__label">
                                        Данные об образовании:
                                    </span>
                                    <PlusIcon width={16} height={16} />
                                </div>
                                <EducationList educationList={[{
                                    id: 1,
                                    description: 'Инженер-программист',
                                    title: 'Высшее образование'
                                }, {
                                    id: 2,
                                    description: 'Системный администратор',
                                    title: 'Высшее образование'
                                }

                                ]

                                } />
                            </div>
                            <div className="dep-page__user-add-info-data__cell">
                                <div className="dep-page__list-title">
                                    <span className="dep-page__label">
                                        Данные о работе:
                                    </span>
                                    <PlusIcon width={16} height={16} />
                                </div>
                                <WorkExperienceList workExperienceList={[{

                                    id: 1,
                                    workedYears: 3,
                                    description: 'ООО Зеленоглазое такси'
                                }, {
                                    id: 2,
                                    workedYears: 5,
                                    description: 'ООО Моя оборона'
                                }

                                ]

                                } />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dep-page__user-info-actions">
                    <UploadIcon onClick={uploadFileHandler} />
                </div>
            </div>
        </Layout>
    );
}