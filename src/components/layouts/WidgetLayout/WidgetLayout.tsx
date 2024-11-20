import { FC } from "react";
import { WidgetLayoutProps } from "./WidgetLayoutProps";
import './widgetLayoutStyles.scss'


export const WidgetLayout: FC<WidgetLayoutProps> = props => {

    const {
        children
    } = props;

    //<div>Header</div>
    //<div>Footer</div>
    return (
        <div className="widget-layout">

            {children}
        </div>

    )
}