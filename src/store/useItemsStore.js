import { json } from "react-router";
import { create } from "zustand";

const useItemsStore = create((set, get) => {

    const items = []; // состояния списка товаров 
    const cards = JSON.parse(localStorage.getItem("cards")) || [];

    // Асинхронная функция для получения списка товаров и обновления состояния 
    const fetchItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/items`);
            const data = await response?.json();
            console.log("Fetched items:", data);
            set({ items: data });
        } catch (error) {
            console.error("Error fetching products:", error);
        };
    };

    /**
  * Асинхронная функция для добавления нового товара в список.
  * Делает POST-запрос к указанному URL с данными нового товара и обновляет состояние списка товаров.
  * @param {Object} newItem - Объект с данными нового товара.
  * @param {string} newItem.name - Название товара.
  * @param {number} newItem.price - Цена товара.
  */
    const addItem = async (newItem) => {
        try {
            const response = await fetch("http://localhost:3000/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            });

            if (!response?.ok) {
                throw new Error(`HTTP error! Status: ${response?.status}`);
            }
            const data = await response.json();

            console.log("Added item:", data);

            set((state) => ({
                items: [...state.items, data],
            }));
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const getItemsById = (id) => items?.find((item) => item?.id === id) || null;

    /**
 * Обновляет товар по id.
 *
 * @param {number} id - id товара, который необходимо обновить.
 * @param {Object} updatedItem - Обновленные данные товара.
 * @returns {Promise<void>} - Промис.
 * @throws {Error} - Выбрасывает ошибку, если HTTP-запрос завершился неудачей.
 */
    const editItem = async (id, updatedItem) => {
        try {
            const response = await fetch(`http://localhost:3000/items/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON?.stringify(updatedItem),
            });

            if (!response?.ok) {
                throw new Error(`HTTP error! Status: ${response?.status}`);
            }
            const data = await response?.json();

            console.log("Updated item:", data);

            set((state) => ({
                items: state?.items?.map((item) => (item?.id === id ? data : item)),
            }));
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    /**
   * Функция добавления товаров в корзину
   * @param {Object} product - Данные товара.
   * @returns {void}asda
   */
    const addToItems = (newItem) => {
        const updatedItems = [...get().items, newItem];
        localStorage.setItem("cards", JSON.stringify(updatedItems));

        set({ items: updatedItems });
    };

    /**
* Удаляет товар по id.
*
* @param {number} id - id товара, который необходимо удалить.
* @returns {Promise<void>} - Промис.
* @throws {Error} - Выбрасывает ошибку, если HTTP-запрос завершился неудачей.
*/
    const deleteItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/items/${id}`, {
                method: "DELETE",
            });

            if (!response?.ok) {
                throw new Error(`HTTP error! Status: ${response?.status}`);
            }

            console.log("Deleted item:", id);

            set((state) => ({
                items: state?.items?.filter((item) => item?.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return {
        items,
        getItemsById,
        fetchItems,
        addToItems,

        addItem,
        editItem,
        deleteItem,
    };
});

export default useItemsStore;