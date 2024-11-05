import React, { useEffect, useState } from "react";
import { Drawer } from "../Drawer/Drawer";
import Alert from "../Alert/Alert";
import Table from "../Table/Table";
import useItemsStore from "../../../store/useItemsStore";
import useForm from "../../hooks/useForm";
import AddIcon from '@mui/icons-material/Add';

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
  const [isEdit, setIsEdit] = useState(false);

  // Стор для CRUD операций
  const { items, fetchItems, addItem, editItem, deleteItem } = useItemsStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Обработка данных формы
  const { formValues, handleInput, resetForm, setForm } = useForm({
    name: "",
    category: "",
    price: "",
    description: "",
    imgSrc: "", // Поле для ссылки на картинку
  });

  /**
  * Обработчик изменения для поля imgSrc.
  */
  const handleImageInput = (e) => {
    const { value } = e.target;
    handleInput(e); // Обновление состояния formValues
  }
  /**
  * Обработка отправки формы.
  * Если товар выбран, то редактируем его, иначе добавляем новый товар.
  *
  * @param {Event} event - Событие отправки формы.
  * @returns {void}
  */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (isEdit && selectedValue) {
      editItem(selectedValue.id, formValues);
      setAlertData({
        title: "Редактирование товара.",
        subtitle: "Товар был успешно отредактирован.",
        variant: "",
        isOpen: true,
      });
    } else {
      addItem(formValues);
      setAlertData({
        title: "Добавление товара.",
        subtitle: "Товар был успешно добавлен.",
        variant: "",
        isOpen: true,
      });
    }
    setDrawerOpen(false);
    resetForm();
    setIsEdit(false);
  };

  /**
  * Обрабатывает двойной клик по строке таблицы для редактирования товара.
  *
  * @param {Object} rowData - Данные строки, по которой был выполнен двойной клик.
  * @returns {void}
  */
  const handleRowDoubleClick = (rowData) => {
    setSelectedValue(rowData);
    setForm(rowData); // Теперь используем setForm для установки данных формы
    setIsEdit(true);
    setDrawerOpen(true);
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

  /**
  * Обрабатывает удаление товара.
  *
  * @returns {void}
  */
  const handleDeleteItem = () => {
    if (selectedValue) {
      deleteItem(selectedValue.id);
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

  return (
    <section id="admin-panel">
      <div className="max-w-7xl mx-auto px-2 relative top-32">
        <h2 className="mb-4 text-4xl font-bold text-zinc-800">
          Страница управления товарами
        </h2>
        <button
          className="text-white bg-black hover:bg-gray-500 focus:ring-4 focus:outline-none rounded-3xl focus:ring-blue-300 font-medium  text-lg w-40 mb-3 py-2 text-center"
          onClick={() => {
            setSelectedValue(null);
            resetForm();
            setIsEdit(true);  // Указываем режим добавления
            setDrawerOpen(true);
          }}
        >
          Добавить товар
        </button>
        <Table
          headers={[
            { key: "name", title: "Название" },
            { key: "category", title: "Категория" },
            { key: "price", title: "Цена" },
            { key: "description", title: "Описание товара" },
            { key: "imgSrc", title: "Ссылка картинки" }
          ]}
          data={items}
          onRowDoubleClick={handleRowDoubleClick}
        />

        {isDrawerOpen && (
          <Drawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            title={isEdit ? (selectedValue ? "Редактирование товара" : "Добавление товара") : ""}
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    value={formValues.name}
                    onChange={handleInput}
                    placeholder="Введите название"
                    required
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="category"
                    type="text"
                    value={formValues.category}
                    onChange={handleInput}
                    placeholder="Введите категорию"
                    required
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="price"
                    type="number"
                    value={formValues.price}
                    onChange={handleInput}
                    placeholder="Введите цену"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Описание товара
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="description"
                    type="text"
                    value={formValues.description}
                    onChange={handleInput}
                    placeholder="Введите описание"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="imgSrc"
                  >
                    Ссылка на картинку
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="imgSrc"
                    type="text"
                    value={formValues?.imgSrc}
                    onChange={handleImageInput}
                    placeholder="URL картинки"
                    required
                  />
                </div>
                {/* Предпросмотр картинки */}
                {formValues.imgSrc && (
                  <div className="mb-4">
                    <p className="text-gray-600">Предпросмотр:</p>
                    <img
                      src={formValues.imgSrc}
                      alt="Preview"
                      className="w-full h-40 object-cover mt-2"
                      onError={(e) => {
                        e.target.style.display = "none"; // скрыть картинку при ошибке
                      }}
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-black hover:bg-gray-500 focus:ring-4 focus:outline-none rounded-3xl focus:ring-blue-300 w-40"
                    type="submit"
                  >
                    {isEdit ? "Сохранить" : "Добавить"}
                  </button>
                  {selectedValue && isEdit && (
                    <button variant="negative" onClick={handleDeleteItem}>
                      Удалить
                    </button>
                  )}
                  <button>
                    <AddIcon />
                  </button>
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
              ...prevAlertData,
              isOpen: false
            }));
          }}
        />
      </div>
    </section>
  );
};

export default Admin;
