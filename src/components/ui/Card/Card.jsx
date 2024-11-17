import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

/**
 * Компонент карточка.
 * @param {object} props - Свойства компонента.
 * @param {object} props.details - Детали карточки.
 * @param {string} props.details.id - Идентификатор карточки.
 * @param {string} props.details.name - Название карточки.
 * @param {string} props.details.category - Категория карточки (необязательно).
 * @param {string} props.details.description - Описание карточки (необязательно).
 * @param {string} [props.details.price] - Цена карточки (необязательно).
 * @param {number} [props.details.rating] - Рейтинг карточки (необязательно).
 * @param {string} props.details.imgSrc - Путь к изображению.
 * @param {function} props.onClick - Обработчик клика по карточке (необязательно).
 * @param {boolean} props.isFavorite - Карточка добавлена в сохраненки или нет (необязательно).
 * @returns {JSX.Element} Элемент JSX.
 */

export const Card = (props) => {
    const {
        id,
        name,
        // category,
        // description,
        price,
        rating,
        imgSrc,
        isFavorite,
    } = props.details;

    const { onCardClick, onHeartClick } = props;

    // Обработчик клика на иконку сердечка
    const handleFavorite = (event) => {
        event.stopPropagation();

        onHeartClick && onHeartClick(id);
    };

     // Обработчик клика по карточке
    const handleCardClick = () => {
        onCardClick && onCardClick(id);
    };

    return (
        <div
            onClick={handleCardClick}
            className="w-full mb-3 max-w-sm bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
            <div className='relative'>
            <img className="w-full h-2/3" src={imgSrc} alt="img" />
                <button
                    onClick={handleFavorite}
                    className={`absolute top-0 right-0 m-2 p-2 rounded-full z-0 ${isFavorite ? "text-black"  : "text-white"} `}
                >
                    <FavoriteBorderOutlinedIcon className='w-6 h-6 fill-current' />
                </button>
            </div>
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                <div className="flex items-center mt-2.5 mb-5">
                    {/* {category && <p className="text-gray-600 text-sm mb-4">{category}</p>} */}
                    {rating && (
                        <div className="text-yellow-500 text-xl">
                            {"★".repeat(Math.floor(rating)) +
                                "☆".repeat(5 - Math.floor(rating))}
                        </div>
                    )}
                    <span className="bg-blue-100 text-black text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{rating}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{price}$</span>
                    <a href="#" className="text-white bg-black hover:bg-gray-500 focus:ring-4 focus:outline-none rounded-3xl focus:ring-blue-300 font-medium  text-lg w-40 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                </div>
            </div>
        </div>
    );
};

