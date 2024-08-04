import { create } from "zustand";

/**
 * Стор для управления продуктами и состоянием сохраненных продуктов.
 */
const useProductsStore = create((set, get) => {
    // Инициализация переменной для хранения продуктов
    let products;

    (async () => {
        try {
            // Выполнение запроса
            const response = await fetch("http://localhost:3000/products");

            if (!response?.ok) {
                throw new Error("Failed to fetch products");
            }

            // Асинхронная сериализация
            const data = await response?.json();

            // Перезапись переменной на полученные данные
            products = data?.map((product) => ({
                ...product,
                isFavorite: storedFavorites?.includes(product?.id),
            }));

            set({ products });
        } catch (error) {
            console.error("Error fetching products");
        }
    })();

    /**
    Находит продукт по id.
    @param {string} id - id продукта.
    @returns {Object|null} Возвращает найденный продукт или null.
    */
    const getProductById = (id) => {
        products?.find((product) => product?.id === id) || null;
    };

    /**
   * Получает отфильтрованные продукты по категории.
   * @param {string} category - выбранная категория.
   * @returns {Array} Массив отфильтрованных продуктов.
   */
    const getFilteredProducts = (category) => {
        if (category === "All") {
            return products;
        };
        return products.filter((product) => product?.category === category);
    };

    /**
   * Получает уникальные категории из продуктов.
   * @returns {Array} Массив уникальных категорий.
   */

    const getCategories = () => [
        "All",
        ...new Set(products?.map((product) => product?.category)),
    ];

    /**
   * Переключает состояние сохраненного продукта по id.
   * @param {string} id - id продукта.
   */

    const onToggleFavorite = (id) => {
        // Обновляем продукты на странице, переключая состояние сохраненного продукта
        const updatedProducts = products?.map((product) => {
            if (product?.id === id) {
                product.isFavorite = !product?.isFavorite;
            };
            return product;
        });

        // Обновляем id сохраненок для записи в localStorage
        const updatedFavorites = updatedProducts
            ?.filter((product) => product?.isFavorite)
            ?.map((product) => product?.id);

        localStorage.setItem("Favorites", JSON.stringify(updatedFavorites));

        set({ products: updatedProducts }); // Обновляем состояние.
    };

    /**
 * Получает все сохраненные продукты.
 * @returns {Array} Массив всех сохраненных продуктов.
 */
    const getFavoriteProducts = () => products?.filter((product) => product?.isFavorite);

    /**
   * Функция добавления товаров в корзину
   * @param {Object} product - Данные товара.
   * @returns {void}
   */
    const addToCart = (product) => {
        const updatedCart = [...get().cart, { ...product, quantity: 1 }];

        localStorage?.setItem("cart", JSON?.stringify(updatedCart));

        set({ cart: updatedCart });
    };

    /**
  * Функция удаления товара из корзины
  * @param {string} productId - id товара.
  * @returns {void}
  */
    const deleteProductsFromCart = (productId) => {
        const updatedCart = get()?.cart?.filter((product) => product?.id !== productId);

        localStorage?.setItem("cart", JSON?.stringify(updatedCart));

        set({ cart: updatedCart });
    };
return {
    products,
    getProductById,
    getFilteredProducts,
    getCategories,
    onToggleFavorite,
    getFavoriteProducts,
    addToCart,
    deleteProductsFromCart,
};
});

export default useProductsStore;