import React from 'react';
import { useEffect } from 'react';
import InfoIcon from '@mui/icons-material/Info';
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';


// Стили для align
const alignClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
};

// Варианты иконок
const iconComponent = {
    info: <InfoIcon className="w-6 h-6 text-blue-600" />,
    warning: <CheckCircleOutlineIcon className="w-6 h-6 text-amber-600" />,
    success: <CheckCircleOutlineIcon className="w-6 h-6 text-emerald-600" />,
    danger: <CheckBoxIcon className="w-6 h-6 text-rose-600" />,
};

// Вариант класов
const variantClasses = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    danger: 'bg-red-100 border-red-500 text-red-700',
    neutral: "border-l-4 border-neutral-600 bg-neutral-200 text-zinc-800",
};

/**
* Компонент уведомления.
* @param {object} props - Свойства компонента.
* @param {string} props.variant - Вариант компонента (info, warning, success, error).
* @param {string} [props.align="bottom-left"] - Позиционирование компонента.
* @param {string} props.title - Заголовок компонента.
* @param {string} props.subtitle - Подзаголовок компонента.
* @param {boolean} props.isOpen - Компонент показан/скрыт.
* @param {function} props.onClose - Обработчик закрытия компонента (необязательно).
* @param {React.ReactNode} props.icon - Пользовательская иконка (необязательно).
* @returns {JSX.Element} Элемент JSX.
*/

const Alert = ({
    variant,
    isOpen,
    onClose,
    icon,
    title,
    subtitle,
    align = "bottom-left",
}) => {

    const iconVariant = icon || iconComponent[variant];

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return (
        <div className={`inline-flex transform-gpu transition-transform duration-500 ease-in-out items-center
            ${variantClasses[variant]} ${alignClasses[align]}
            ${isOpen ? "translate-y-0" : "translate-y-96"}
            fixed bottom-4 left-4 z-10 w-[28rem] px-3 py-2 rounded-sm`}
            role="alert">
            {iconVariant && <div id="icon">{iconVariant}</div>}
            <div className="ml-4 mr-4">
                {title && <h3 className="font-bold text-md text-zinc-800">{title}</h3>}
                {subtitle && <p className="text-md text-zinc-800">{subtitle}</p>}
            </div>
            <button onClick={onClose} className='absolute right-2 top-2'>
                <HighlightOffSharpIcon className="w-6 h-6 fill-zinc-800" />
            </button>
        </div>
    );
};

export default Alert