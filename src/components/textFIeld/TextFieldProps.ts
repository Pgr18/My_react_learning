type InfoType = 'info' | 'error' | 'success';
type labelWeight = 'normal' | 'strong';

export interface TextFieldProps {
    labelText?: string;
    type?: React.HTMLInputTypeAttribute;
    info?: string;
    infoType?: InfoType;
    value?: string;
    onChange?: (value: string) => void;
    lblWeight? :labelWeight;
};