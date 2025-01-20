import { FC } from "react";
import { IconProps } from "../../types/commonTypes";

export const DownloadIcon: FC<IconProps> = props => {
    const {
        className,
        color = 'none',
        height = 32,
        width = 32,
        onClick
    } = props;
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill={color} className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg">
<path d="M21 21H3M18 11L12 17M12 17L6 11M12 17V3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    );
}