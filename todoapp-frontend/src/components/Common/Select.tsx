import React from "react";
import styles from "./Select.module.css";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    placeholder?: string;
    label?: string;
}

export function Select({
                           options,
                           placeholder,
                           label,
                           className = "",
                           ...rest
                       }: SelectProps) {
    return (
        <div className={styles.wrapper}>
            {label ? <label className={styles.label}>{label}</label> : null}
            <select className={`${styles.select} ${className}`} {...rest}>
                {placeholder ? (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                ) : null}

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}