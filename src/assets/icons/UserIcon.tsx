import { FC } from "react";
import { IconProps } from "../../types/commonTypes";


export const UserIcon: FC<IconProps> = props => {
    const {
        className,
        color = '#000000',
        height = 25,
        width = 25,
        onClick
    } = props;


    return (


        <svg
        width={width} 
        height={height} 
        viewBox="0 0 16 16" 
        fillRule="evenodd"
        className={className}
        onClick={onClick}  
        xmlns="http://www.w3.org/2000/svg">
        <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill={color}/>
        <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill={color}/>
        </svg>
    );
}