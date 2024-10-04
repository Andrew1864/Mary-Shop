import { validateForm } from "../../utils/validators";
import { useState } from "react";

/**
 * Хук для управления обработки, обновления и отправки данных формы.
 *
 * @param {Object} initialValues - Начальное состояние формы (Объект).
 * @returns {formValues} - Объект с состоянием формы.
 * @returns {handleInputChange} - Функция обработчик при смене данных в инпуте.
 * @returns {resetForm} - Функция сброса состояния формы.
 */
export function useForm(initialValues)  {

    //Состояние формы , сохраняет значение полей 
    const [formValues, setFormValues] = useState(initialValues);

    // Состояние для ошибок
    const [formErrors, setFormErrors] = useState({});

    /**
   * Обработчик изменения значения полей формы.
   *
   * @param {Object} e - Событие изменения.
   */
    const handleInput = (e) => {
        const { name, value, type } = e?.target;
        
        // Обновляем состояние формы для текущего поля
        const updatedFormState = {...formValues, [name]: value};
        setFormValues(updatedFormState);

         // Валидируем текущее поле по атрибуту type
        const validationErrors = {
            ...formErrors,
            [name]: validateForm({ [type]: value}) [type] || null,
        };
        // Обновляем состояние ошибок
        setFormErrors(validationErrors);
    };

    /**
     * Функция для установки всех значений формы напрямую (например, при редактировании).
     *
     * @param {Object} newValues - Новые значения формы.
     */
    const setForm = (newValues) => {
        setFormValues(newValues);
        setFormErrors({}); // Сбрасываем ошибки при установке новых значений
    };

    //Функция сброса формы и ошибок 
    const resetForm = () => {
        setFormValues(initialValues);
        setFormErrors({});
    };

       /**
     * Полная валидация формы. Проходится по всем полям и проверяет их.
     *
     * @returns {Boolean} - Возвращает true, если форма валидна.
     */
       const validateAll = () => {
        const validationResults = validateForm(formValues);
        const hasErrors = Object.keys(validationResults).some(key => validationResults[key]);
        setFormErrors(validationResults);
        return !hasErrors; // Возвращает true, если нет ошибок
    };

    return {
        formValues,
        formErrors,
        handleInput,
        resetForm,
        setForm,    // Добавляем функцию установки значений
        validateAll // Добавляем функцию полной валидации формы
    };
};

export default useForm;