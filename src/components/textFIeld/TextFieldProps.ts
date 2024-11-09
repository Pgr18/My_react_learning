export interface TextFieldProps {
    labelText?: string;
    type?: React.HTMLInputTypeAttribute;
    error?: string;
    value?: string;
    onChange?: (value: string) => void;
};