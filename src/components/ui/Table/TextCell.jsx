/**
 * Компонент ячейка таблицы.
 * @param {object} props - Свойства компонента.
 * @param {string} props.value - Содержимое ячейки.
 * @returns {JSX.Element} Элемент JSX.
 */

const TextCell = ({ value }) => {
    return (
        <div className="flex items-center border truncate border-gray-400 flex-grow w-2 leading-10 px-2">
            {value}
        </div>
    );

};

export default TextCell;

















