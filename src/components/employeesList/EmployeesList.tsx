import { FC, useState } from "react";
import { EmployeesListProps } from "./employeesListProps";
import './employeesListStyles.scss'
import clsx from 'classnames';
import { PencilIcon, TrashIcon } from "../../assets/icons"; 

export const EmployeesList: FC<EmployeesListProps> = props => {
    const {
         employeesList,
         onItemClick,
         onItemDelete,
         onItemEdit
         } = props;
    const [selectedUser, setSelectedUser] = useState(0);

    const employeeClickHandler = (id: number) => {
        setSelectedUser(id);
        onItemClick && onItemClick(id);
    }

    const employeeEditHandler = (id: number) => {
        onItemEdit && onItemEdit(id);
    }

    const employeeDeleteHandler = (id: number) => {
        onItemDelete && onItemDelete(id);
    }

    const isSelected = (id: number) => selectedUser === id;

    return (
        <div>
            {employeesList.map(user => {
                return (
                    <div key={user.id}
                        className={clsx('empl-list__item', { 'empl-list__item_selected': isSelected(user.id) })}
                        onClick={() => employeeClickHandler(user.id)}
                    >
                        <div className="empl-list__item-fio">
                            {`${user.lastName} ${user.firstName} ${user.middleName ?? ''}`.trim()}
                        </div>
                        <div className="empl-list__item_actions">
                            <PencilIcon width={24} height={24} onClick={() => {employeeEditHandler(user.id)}} />
                            <TrashIcon width={18} height={18} onClick={() => {employeeDeleteHandler(user.id)}}/>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}