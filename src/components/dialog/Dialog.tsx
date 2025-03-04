import { FC } from "react";
import { DialogProps } from "./DialogProps";
import { Button } from "../button";
import './dialogStyles.scss';
import clsx from 'classnames';

export const Dialog: FC<DialogProps> = props => {
    const { 
        className, 
        title,
        children, 
        onSave, 
        onCancel,
        open = false,
     } = props;


     if (!open) {
        return null;
     }
    return (
        <div className="dialog" onClick={onCancel}>
            <div className={clsx('dialog__paper', className)} onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}>
                <h4 className="dialog__header">{title}</h4>
                <div className="dialog__body">
                    {children}
                </div>
                <div className="dialog__footer">
                    <Button type="primary" text="Сохранить" onClick={onSave} />
                    <Button text="Отмена" onClick={onCancel} />
                </div>
            </div>
        </div>

    );
}