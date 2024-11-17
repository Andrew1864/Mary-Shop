import { useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import ClearIcon from '@mui/icons-material/Clear';

/**
 * Компонент выдвигающейся панели.
 *
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isOpen - Компонент открыт или закрыт.
 * @param {Function} props.onClose - Коллбек для закрытия компонента.
 * @param {string} [props.align="right"] - Позиционирование компонента.
 * @param {ReactNode} props.children - Дочерние элементы компонента.
 * @param {string} props.title - Заголовок компонента.
 */

export const Drawer = ({
    isOpen,
    onClose,
    children,
    align = "right",
    title,
}) => {

    const drawerRef = useRef(null);

    //Фунцкия закрытия через useCallback
    const closeDrawer = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    // Обработчик клика за пределами модального окна 
    const handleClick = useCallback((event) => {
        if (drawerRef?.current && !drawerRef?.current?.contains(event?.target)) {
            closeDrawer();
        };
    },
        [drawerRef, closeDrawer]
    );

    // Обрабочик клика по клавише Esc
    const handleKeyPress = useCallback((event) => {
        if (event?.key === "Escape") {
            onClose();
        }
    }, [onClose]);

    /**
   * Добавляет/удаляет обработчик клика за пределами компонента при его открытии/закрытии.
   */
    useEffect(() => {
        if (isOpen) {
            document?.addEventListener("mousedown", handleClick);
            // Добавляем слушатель события keydown (нажатие клавиши Esc)
            document.addEventListener("keydown", handleKeyPress);
        }
        return () => {
            document?.removeEventListener("mousedown", handleClick);
            // Удаляем слушатель события keydown
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [isOpen, handleClick, handleKeyPress]);

    return (
        isOpen && createPortal(
            <div className="absolute z-20 top-0 left-0 right-0 bottom-0 bg-opacity-70 bg-black">
                <aside
                    ref={drawerRef}
                    className={`fixed top-0 bottom-0 ${align === "right" ? "right-0" : "left-0"
                        } right-0 z-20 w-2/6 p-8 bg-white transition-transform duration-300 ease-in-out`}
                >
                    <header className="flex justify-between mb-4">
                        {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
                        <button
                            onClick={closeDrawer}
                            className="text-gray-600 hover:text-gray-800 w-10 h-10 inline-flex justify-center items-center absolute top-0 right-0 text-xl"
                        >
                            <ClearIcon />
                        </button>
                    </header>
                    <main className="pt-0 pb-0">{children}</main>
                    <footer className="flex justify-end mt-4"></footer>
                </aside>
            </div>,
            document.body
        )
    );
};