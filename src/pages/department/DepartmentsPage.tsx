import { FC, useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { Button, DropDown, EducationList, EmployeesList, FilesList, TextField, WorkExperienceList } from "../../components";
import './departmentsPageStyles.scss'
import { Dialog } from "../../components";
import { Department, Employee } from "../../types/models";
import { DropDownItem } from "../../components/dropDown/dropDownProps";
import { get } from "http";
import { PencilIcon, PlusIcon, TrashIcon, UploadIcon } from "../../assets/icons";
import { format } from "date-fns";
import { Departments } from "../../api";



/* const fakeDepartmentsData = [
    { id: 1, name: 'Отдел 1', employees: [] },
    { id: 2, name: 'Отдел 2', employees: fakeEmployeesData },
    { id: 3, name: 'Отдел 3', employees: [] }
] as Array<Department>; */

/*const fakeDepartmentsData = [{
    text: 'Отдел 1', value: '1'
}, {
    text: 'Отдел 2', value: '2'
}, {
    text: 'Отдел 3', value: '3'
}
];*/


export const DepartmentsPage: FC = () => {
    const { getDepartments, deleteDepartment } = Departments;
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
        getDepartments()
        .then(respData => {
            setDepartmentsData(respData);
            if (respData.length) {
                setSelectedDepartmentId(respData[0].id);
            }
        }).catch(err => {
            setDepartmentsData([]);
            console.log(err);
        });
/*         setTimeout(() => {
            setDepartmentsData(fakeDepartmentsData);
            if (Array.isArray(fakeDepartmentsData) && fakeDepartmentsData.length) {
                setEmployeesData(fakeDepartmentsData[0].employees);
            }
        }, 2000); */
    }, [getDepartments]);

    useEffect(() => {
        const selectedDepartment = departmentsData.find(d => d.id === selectedDepartmentId);
        setEmployeesData(selectedDepartment ? selectedDepartment.employees : []);
        setSelectedEmployee(undefined);
    }, [departmentsData, selectedDepartmentId]);

    useEffect(() => {
        setEmployeesData([]);
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

    const deleteDepartmentHandler = () => {
        if (!window.confirm('Вы действительно хотите удалить данный отдел?')) {
            return;
        }
        if (!selectedDepartmentId) {
            return;
        }
        deleteDepartment(selectedDepartmentId).then(() => {
            setDepartmentsData(prev => {
                const filtered = prev.filter(d => d.id !== selectedDepartmentId)
                return [...filtered];
            });
        }).catch (err => {
            console.log(err);
        });
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
                    <PlusIcon width={16} height={16} className="dep-page__add-btn" />
                    <PencilIcon />
                    <TrashIcon onClick={deleteDepartmentHandler} />
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
                                    <PlusIcon width={16} height={16} className="dep-page__add-btn"/>
                                </div>
                                <EducationList educationList= {selectedEmployee?.educations ?? []}/>
                            </div>
                            <div className="dep-page__user-add-info-data__cell">
                                <div className="dep-page__list-title">
                                    <span className="dep-page__label">
                                        Данные о работе:
                                    </span>
                                    <PlusIcon width={16} height={16} />
                                </div>
                                <WorkExperienceList workExperienceList={selectedEmployee?.workExperience ?? []} />
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