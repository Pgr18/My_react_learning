import { ChangeEvent, FC } from 'react';
import { TextFieldProps } from './TextFieldProps';



export const TextField: FC<TextFieldProps> = props => {
    const {
        error,
        labelText,
        onChange,
        type = "text",
        value
    } = props;
    
    
    const changeValueHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        onChange && onChange(event.target.value);
    };

    return (
        <div>
            <label>{labelText}</label>
            <input type = {type} value = {value} onChange = {changeValueHandler} />
            <span>{error}</span>

        </div>
    );
}