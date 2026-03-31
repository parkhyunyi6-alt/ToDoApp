interface FloatingCreateButtonProps {
    onClick: () => void;
}

function FloatingCreateButton({ onClick }: FloatingCreateButtonProps) {
    return (
        <button type="button" onClick={onClick}>
            +
        </button>
    );
}

export default FloatingCreateButton;
