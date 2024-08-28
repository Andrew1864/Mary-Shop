import { useEffect, useRef } from "react";
import ClearIcon from '@mui/icons-material/Clear';

const Modal = ({ isOpen, onClose, children, title }) => {

    // Создаем ссылку на DOM-элемент модального окна
    const modalRef = useRef(null);

    // Обработчик нажатия клавиши Esc
    const handleKeyPress = (event) => {
        if (event?.key === "Escape") onClose();
    };

    // Добавляем обработчик события клика вне модального окна 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(false);
            }
        };
        if (isOpen && typeof window !== "undefined") {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyPress);
        };

        // Очищаем слушатель события при размонтировании компонента или при закрытии
        return () => {
            // Если  модальное окно открыто и код выполняется на клиенте
            if (isOpen && typeof window !== "undefined") {
                // Удаляем слушатель события mousedown для закрытия модалки по клику вне
                document.removeEventListener("mousedown", handleClickOutside);
                // Удаляем слушатель события keydown
                document.removeEventListener("keydown", handleKeyPress);
            }
        };


    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex justify-between mb-8">
                    {title && <h2 className="text-3xl">{title}</h2>}
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        <ClearIcon />
                    </button>
                </div>
                <main className="modal-content pt-0 pb-0">{children}</main>
            </div>
        </div>
    );
};


export default Modal;