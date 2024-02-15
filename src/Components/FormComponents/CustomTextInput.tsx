import React from 'react';
import { useField } from 'formik';

interface Props {
    label?: string;
    placeholder: string;
    name: string;
    type:string;
}

export const CustomTextInput: React.FC<Props> = ({ label, ...props }) => {
    const [field, meta] = useField(props.name);

    return (
        <div className="custom-text-input">
            {label && <label htmlFor={props.name}>{label}</label>}
            <input {...field} {...props} className={meta.touched && meta.error ? 'input-error' : ''} />
            
            {meta.touched && meta.error ? (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>{meta.error}
                 </div>
                ) : null}
        </div>
    );
};