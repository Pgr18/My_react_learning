import { FC, useState } from "react";
import { Layout } from "../../components/layouts";
import { Button, DropDown, EmployeesList } from "../../components";
import './departmentsPageStyles.scss'
import { Dialog } from "../../components";

export const DepartmentsPage: FC = () => {
    const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    
    const createEmployeeHandler = () => {
        setUserActionMode('create');
        setShowEmployeeDialog(true);
    }

    return (
        <Layout>
            <div className="dep-page">
                <div className="dep-page__users-list-container">
                    <DropDown items={[{
                        text: 'Отдел 1', value: '1'
                    }, {
                        text: 'Отдел 2', value: '2'
                    }, {
                        text: 'Отдел 3', value: '3'
                    }
                    ]}
                        label="Отделы:"
                        selectedChanged={(val) => console.log(val)}
                    />
                    <EmployeesList employeesList={[
                        { id: 1, lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович' },
                        { id: 2, lastName: 'Петров', firstName: 'Сергей', middleName: 'Дмитриевич' },
                        { id: 3, lastName: 'Джон', firstName: 'Смитт' },
                        { id: 4, lastName: 'Рябчикова', firstName: 'Лидия', middleName: 'Анатольевна' },
                        { id: 5, lastName: 'Семенов', firstName: 'Олег', middleName: 'Артемович' }
                    ]}
                        onItemClick={(id) => console.log(id)}
                    />
                    <Button text="Добавить сотрудника" className="dep-page__add-user-btn" onClick = {createEmployeeHandler} />
                </div>
                <div>
                    <Dialog title={userActionMode !== 'edit' ? 'Добавить сотрудника' : 'Изменить сотрудника'}
                        open = {showEmployeeDialog}
                        onSave={() => {}}
                        onCancel={() => setShowEmployeeDialog(false)}
                    >

                    </Dialog>
                    <div>
                        <span>ФИО</span>
                        <div>*</div>
                    </div>
                    <div>
                        <div>Личные данные</div>
                        <div>Данные о работе</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}