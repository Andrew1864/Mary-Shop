import React from "react";
import Input from "../Input/Input";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { validateForm } from "../../../utils/validators";

const Login = () => {
  const { formValues, formErrors, handleInput, resetForm } = useForm({
    username: '',   // Поле username
    password: '',   // Поле password
  });

  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Обработчик отправки формы 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка на ошибки валидации перед отправкой
    const errors = validateForm(formValues);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Вызывает метод onLogin из контекста аутентификации.
    try {
      await onLogin(formValues);
      resetForm();
      navigate('/');
    } catch (error) {
      setSubmitError(error.message || 'Ошибка входа');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Вход</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Имя пользователя */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Имя пользователя
          </label>
          <Input
            type="text"
            name="username"
            id="username"
            value={formValues.username}
            onChange={handleInput}
            className={`w-full p-2 border ${formErrors.username ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            required
          />
          {formErrors.username && (
            <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
          )}
        </div>

        {/* Пароль */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Пароль
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleInput}
            className={`w-full p-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            required
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        {/* Ошибка отправки */}
        {submitError && (
          <p className="text-red-500 text-sm mb-4">{submitError}</p>
        )}

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          {isSubmitting ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default Login;
