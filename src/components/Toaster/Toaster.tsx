import { useEffect } from "react";

import './toaster.css';

type ToasterProps = {
    message: string;
    type?: "success" | "error";
    onClose: () => void;
};

export default function Toaster({
    message,
    type = "success",
    onClose,
}: ToasterProps) {

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div
            className={`toast toast-${type}`}
            role="status"
            aria-live="polite"
        >
            {message}
        </div>
    );
}