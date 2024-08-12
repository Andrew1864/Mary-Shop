import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";
import Alert from "../components/ui/Alert/Alert";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const FavoriteList = () => {
    const navigate = useNavigate();

    const [alertState, setAlertState] = useState({
        isOpen: false,
        message: "",
    });

    const { getFavoriteProducts, onToggleFavorite, getProductById } = useProductsStore(); // берем функции из Стора для работы с ними

    // функция для показа сохраненок 
    const favoriteProduct = getFavoriteProducts();

    const handleCloseAlert = () => {
        setAlertState({ ...alertState, isOpen: false })
    }

    const handleCardClick = (id) => {
        navigate(`/cards/${id}`);
    };

    const handleFavoriteHeartAndAlert = (id) => {
        // Достаем из стора поле isFavorite выбранного продукта
        const { isFavorite } = getProductById(id);

        // вкл/выкл товара в сохраненки
        onToggleFavorite(id);

        // Определение параметров для алерта в зависимости от состояния isFavorite
        const alertConfig = isFavorite
            ? { variant: "warning", message: "Товар удален из сохраненок" }
            : { variant: "info", message: "Товар добавлен в сохраненки" };

        // Обновление состояния алерта
        setAlertState({
            isOpen: true,
            ...alertConfig
        });
    };

    return (
        <>
            <section className="favorites relative top-28 bg-white">
                <div className="container mx-auto px-4">
                    <Link
                        to="/cards"
                        className=" relative bottom-4 left-0 text-gray-600 hover:text-gray-900  inline-flex mt-8">
                        <ArrowBackOutlinedIcon />
                        Go back
                    </Link>
                    <h2 className="mb-4 text-4xl font-bold">
                        {favoriteProduct?.length ? "Сохраненые товары." : "Сохранненых товаров нет."}
                    </h2>
                    <div className="flex flex-wrap justify-between">
                        {favoriteProduct?.length > 0 &&
                            favoriteProduct.map((product) => (
                                <Card
                                    key={product?.id}
                                    details={product}
                                    onCardClick={handleCardClick}
                                    onHeartClick={handleFavoriteHeartAndAlert}
                                />
                            ))}
                    </div>
                </div>
            </section>
            <Alert
                title="Сохранение товара"
                subtitle={alertState?.message}
                isOpen={alertState?.isOpen}
                variant="neutral"
                onClose={handleCloseAlert} />
        </>
    )
};

export default FavoriteList