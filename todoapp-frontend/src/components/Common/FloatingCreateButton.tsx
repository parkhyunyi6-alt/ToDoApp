
import styles from "./FloatingCreateButton.module.css";

interface FloatingCreateButtonProps {
    onClick: () => void;
    ariaLabel?: string;
}

export function FloatingCreateButton({
                                         onClick,
                                         ariaLabel = "create",
                                     }: FloatingCreateButtonProps) {
    return (
        <button
            type="button"
            className={styles.button}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            +
        </button>
    );
}

export default FloatingCreateButton;