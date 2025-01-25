import { FC } from "react";
import { IconProps } from "../../types/commonTypes";

export const PlusIcon: FC<IconProps> = props => {
    const {
        className,
        color = '#000000',
        height = 32,
        width = 32,
        onClick
    } = props;
    return (
        <svg fill={color} width={width} height={height} className={className} onClick={onClick} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4,23H20a1,1,0,0,0,1-1V6a1,1,0,0,0-.293-.707l-4-4A1,1,0,0,0,16,1H4A1,1,0,0,0,3,2V22A1,1,0,0,0,4,23ZM5,3H15.586L19,6.414V21H5Zm11,9a1,1,0,0,1-1,1H13v2a1,1,0,0,1-2,0V13H9a1,1,0,0,1,0-2h2V9a1,1,0,0,1,2,0v2h2A1,1,0,0,1,16,12Z" /></svg>
    );
}
