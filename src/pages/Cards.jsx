import { useState, useEffect } from "react";
import { Card } from "../components/ui/Card/Card"
import useProductsStore from "../store/useProductsStore";
import useItemsStore from "../store/useItemsStore";
import { useNavigate } from "react-router-dom";
import Alert from "../components/ui/Alert/Alert";
import Tabs from "../components/ui/Tabs/Tab";
import Admin from "../components/ui/Admin/Admin";



const Cards = () => {
    const navigate = useNavigate(); // хук для роутинга

    // Стейт для скрытия/показа и передачи сообщения в Alert
    const [alertState, setAlertState] = useState({
        isOpen: false,
        message: "",
    });

     // Данные из двух сторов
    const {
        products,
        onToggleFavorite,
        getProductById,
        getCategories,
        getFilteredProducts,
    } = useProductsStore();

    const { items } = useItemsStore();

    // Стейт для активной категории
    const [activeCategory, setActiveCategory] = useState("All");

    // Стейт для категорий (чтобы передать в компонент табы)
    const [categories, setCategories] = useState([]);

    // Стейт для и фильтрации продуктов
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        // Устанавливаем категории и отфильтрованные продукты после загрузки товаров
        const combinedProducts = [...(products || []), ...(items || [])];
        setFilteredProducts(getFilteredProducts(activeCategory, combinedProducts));
    }, [products, items, activeCategory, getCategories, getFilteredProducts]);

    console.log("Продукты общие",filteredProducts)

    // Обработчик изменения категории
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    const handleCardClick = (id) => {
        navigate(`/cards/${id}`);
    };

    // Обработчик добавления товара в сохраненки и показа уведомления
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

    const handleCloseAlert = () => {
        setAlertState({ ...alertState, isOpen: false });
    };

    return (
        <>
         
            <section className="products relative top-28 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="mb-4 text-4xl font-bold">Casual.</h2>
                    <Tabs
                        categories={getCategories()}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                    <div className="flex flex-wrap justify-between">
                        {/* Отображаем отфильтрованные продукты */}
                        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Card
                                    key={product?.id}
                                    details={product}
                                    onCardClick={handleCardClick}
                                    onHeartClick={handleFavoriteHeartAndAlert}

                                />
                            ))
                        ) : (
                            <p>Нет продуктов для отображения</p>
                        )}
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
    );
};

export default Cards;
