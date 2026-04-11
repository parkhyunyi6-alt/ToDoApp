import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    isLoading?: boolean;
}

export function Button({
                           variant = "primary",
                           size = "md",
                           fullWidth = false,
                           isLoading = false,
                           className = "",
                           children,
                           disabled,
                           ...rest
                       }: ButtonProps) {
    const classNames = [
        styles.button,
        styles[`button_${variant}`],
        styles[`button_${size}`],
        fullWidth ? styles.fullWidth : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            className={classNames}
            disabled={disabled || isLoading}
            {...rest}
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
}