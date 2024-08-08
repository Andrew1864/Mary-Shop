import { Card } from "../components/ui/Card/Card"
import useProductsStore from "../store/useProductsStore";
import { useNavigate } from "react-router-dom";

const Cards = () => {
    const navigate = useNavigate(); // хук для роутинга

    const {
        products,
        onToggleFavorite,
        getProductById,

    } = useProductsStore();

    // const favoriteProducts = getFavoriteProducts(); // вызываем функцию сохраненок из Stor

    const handleCardClick = (id) => {
        navigate(`/cards/${id}`);
    };

    const handleFavoriteHeart = (id) => {
        // Достаем из стора поле isFavorite выбранного продукта
        const { isFavorite } = getProductById(id);
        // вкл/выкл товара в сохраненки
        onToggleFavorite(id);
    };



    return (
        <>
            <section className="products relative top-28 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="mb-4 text-4xl font-bold">Casual.</h2>
                    <div className="flex flex-wrap justify-between">
                        {!!products &&
                            products.map((product) => (
                                <Card
                                    key={product?.id}
                                    details={product}
                                    onCardClick={handleCardClick}
                                    onHeartClick={handleFavoriteHeart}
                                />
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cards;
