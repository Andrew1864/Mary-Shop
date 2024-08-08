import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const Alert = () => {
    // Вариант класов
    variantClasses = {
        info: "border-l-4 border-blue-600 bg-blue-200 text-zinc-800",
        warning: "border-l-4 border-amber-600 bg-amber-200 text-zinc-800",
        success: "border-l-4 border-emerald-600 bg-emerald-200 text-zinc-800",
        error: "border-l-4 border-rose-600 bg-rose-200 text-zinc-800",
        neutral: "border-l-4 border-neutral-600 bg-neutral-200 text-zinc-800",
    };
    // Варианты иконок
    variantIcons = {
        info: <InfoIcon />,
        warning: <WarningAmberIcon className="w-6 h-6 text-blue-600" />,
        success: <CheckCircleOutlineIcon className="w-6 h-6 text-amber-600" />,
        error: <ErrorOutlineIcon className="w-6 h-6 text-emerald-600" />,
        neutral: <CheckBoxIcon className="w-6 h-6 text-rose-600" />,
    };

    // Стили для align
    const alignClasses = {
        "top-left": "top-4 left-4",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-right": "bottom-4 right-4",
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

}