import { FC } from "react";
import { LayoutProps } from "./LayoutProps";
import './LayoutStyles.scss'
import { LogoIcon } from "../../../assets/icons/LogoIcon";


export const Layout: FC<LayoutProps> = props => {

    const {
        footer, headerChild, title,children
    } = props;

    //<div>Header</div>
    //<div>Footer</div>
    return (
        <div className="layout">
            <div className="layout__header">
                <div>
                    <LogoIcon />
                </div>
                <div>
                    <div>{title ?? 'Header'}</div>
                    <div>{headerChild}</div>
                </div>
                <div></div>
            </div>
            <div className="layout_body">
                {children}
                </div>
            <div>{footer}</div>
        </div>


    );
}