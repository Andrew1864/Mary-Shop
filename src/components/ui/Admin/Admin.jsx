import React from "react";
import { useEffect, useState } from "react";
import { Drawer } from "../Drawer/Drawer";
import Alert from "../Alert/Alert";
import Table from "../Table/Table";
import useItemsStore from "../../../store/useItemsStore"
import { useAuth } from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";

const Admin = () => {

  // Стейт для открытия/закрытия Drawer
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Стейт для показа/скрытия компонента Alert
  const [alertData, setAlertData] = useState({
    title: "",
    subtitle: "",
    variant: "",
    isOpen: false,
  });

  // Стейт для показа детальной информации по товару в Drawer
  const [selectedValue, setSelectedValue] = useState(null);

  //Стейт для переключения режима редактирования 
  const [isIdit, setIsEdit] = useState(false);

  // Стор для CRUD операций.
  const { items, fetchItems, addItem, editItem, deleteItem } = useItemsStore();


  useEffect(() => {
  }, [items]);

  
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Обработка данных формы
  const { formValues, handleInput, resetForm } = useForm({
    name: "",
    category: "",
    price: "",
  });

  /**
  * Обработка отправки формы.
  * Если товар выбран, то редактируем его, иначе добавляем новый товар.
  *
  * @param {Event} event - Событие отправки формы.
  * @returns {void}
  */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedValue) {
      editItem(selectedValue?.id, formValues);

      setAlertData({
        title: "Редактирование товара.",
        subtitle: "Товар был успешно отредактирован.",
        variant: "",
        isOpen: true,
      });
    } else {
      addItem(formValues);
      setAlertData({
        title: "Редактирование товара.",
        subtitle: "Товар был успешно добавлен.",
        variant: "",
        isOpen: true,
      });
    }
    setDrawerOpen(false);
    resetForm();
  };

  /**
 * Обрабатывает редактирование товара.
 *
 * @returns {void}
 */
  const handleEditItem = () => {
    setIsEdit();
  };

  /**
  * Обрабатывает удаление товара.
  *
  * @returns {void}
  */
  const handleDeleteItem = () => {
    if (selectedValue) {
      deleteItem(selectedValue?.id);
      setDrawerOpen(false);
      setSelectedValue(null);
      setIsEdit(false);
      setAlertData({
        title: "Удаление товара.",
        subtitle: "Товар был успешно удалён.",
        variant: "",
        isOpen: true,
      });
    }
  };

  /**
  * Обрабатывает двойной клик по строке таблицы.
  *
  * @param {Object} rowData - Данные строки, по которой был выполнен двойной клик.
  * @returns {void}
  */
  const handleRowDoubleClick = (rowData) => {
    setSelectedValue(rowData);
    setDrawerOpen(true);
    setIsEdit(false); // режим просмотра 
  };

  /**
 * Закрывает компонент Drawer и очищает выбранное значение.
 *
 * @returns {void}
 */
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedValue(null);
    setIsEdit(false);
    resetForm();
  };



  return (
    <section id="admin-panel">
      <div className="max-w-7xl mx-auto px-2 relative top-32">
        <h2 className="mb-4 text-4xl font-bold text-zinc-800">
          Страница управления товарами
        </h2>
        <button
          className="text-white bg-black hover:bg-gray-500 focus:ring-4 focus:outline-none rounded-3xl focus:ring-blue-300 font-medium  text-lg w-40 mb-3 py-2 text-center
           dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            setSelectedValue(null);
            setIsEdit(true);
            setDrawerOpen(true);
          }}>
          Добавить товар
        </button>
        <Table
          headers={[
            { key: "name", title: "Название" },
            { key: "category", title: "Категория" },
            { key: "price", title: "Цена" }
          ]}
          data={items}
          onRowDoubleClick={handleRowDoubleClick}
        />

        {isDrawerOpen && (
          <Drawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            title={
              selectedValue ?
                isIdit ?
                  "Редактирование товара" :
                  "Чтение данных по товару" :
                "Добаление нового товара"
            }
          >
            <div className="w-full max-w-xs">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Название товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    defaultValue={formValues?.name || selectedValue?.name}
                    onChange={handleInput}
                    placeholder="Введите название"
                    readOnly={!isIdit}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Категория товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="category"
                    type="text"
                    defaultValue={
                      formValues?.category || selectedValue?.category
                    }
                    onChange={handleInput}
                    placeholder="Введите категорию"
                    readOnly={!isIdit}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Цена товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="price"
                    type="number"
                    defaultValue={formValues?.price || selectedValue?.price}
                    onChange={handleInput}
                    placeholder="Введите цену"
                    readOnly={!isIdit}
                  />
                </div>

                <div className="flex gap-4">
                  {!isIdit && selectedValue && (
                    <>
                      <button
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-black hover:bg-gray-500 focus:ring-4 focus:outline-none rounded-3xl focus:ring-blue-300  w-40  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleEditItem}>
                        Редактировать
                      </button>
                      <button variant="negative" onClick={handleDeleteItem}>
                        Удалить
                      </button>
                    </>
                  )}
                  {isIdit && 
                  <button className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-black hover:bg-gray-500 focus:ring-4 focus:outline-none rounded-3xl focus:ring-blue-300  w-40  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Сохранить
                  </button>}
                </div>
              </form>
            </div>
          </Drawer>
        )}
        <Alert 
        title={alertData?.title}
        subtitle={alertData?.subtitle}
        isOpen={alertData?.isOpen}
        onClose={() => {
          setAlertData((prevAlertData) => ({
            ...prevAlertData, // Сохраняем предыдущее состояние
            isOpen: false // Закрываем Alert
          }));
        }}
        />
      </div>
    </section>
  );
};

export default Admin;