import { createContext, useContext, useState, useEffect } from "react";

/**
 * Контекст для управления состоянием аутентификации пользователя
 * @type {React.Context}
 */
const AuthContext = createContext();

/**
 * Компонент для управления состоянием аутентификации пользователя
 * @param {object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Дочерние элементы
 * @returns {JSX.Element} - Компонент
 */
export const AuthProvider = ({ children }) => {
    /**
     * Состояние для хранения информации об аутентификации пользователя
     * @type {object | null}
     */
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
        // Проверка аутентификации при загрузке страницы
        const userFromLocalStorage = localStorage.getItem("user");
        // Установка пользователя в состояние (если проверка пройдена)
        if (userFromLocalStorage) {
            const parsedUser = JSON.parse(userFromLocalStorage);
            console.log('User loaded from localStorage:', parsedUser);
            setUser(parsedUser);
        }
        setLoading(false); // Завершаем состояние загрузки
    }, []);

    /**
     * Функция для регистрации нового пользователя
     * @param {object} userData - Данные пользователя
     * @returns {Promise<void>}
     */
    const onRegister = async (userData) => {
        try {
            const response = await fetch("http://localhost:3000/users");
            const users = await response.json();

            if (!response.ok) {
                throw new Error("Ошибка при запросе на сервер");
            }

            // Проверяем, существует ли уже суперпользователь
            const adminExists = users?.some((user) => user?.role === "admin");

            // Определяем роль нового пользователя
            const newUser = {
                username: userData.username, // Логин передается как имя пользователя
                email: userData.email,
                password: userData.password,
                role: adminExists ? "user" : "admin",
            };

            console.log("Registering user with role:", newUser.role);

            // Отправка запроса на создание нового пользователя
            const createResponse = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (!createResponse.ok) {
                const errorText = await createResponse.text();
                throw new Error(`Ошибка регистрации пользователя: ${errorText}`);
            }

            const createdUser = await createResponse.json();
            console.log("Созданный пользователь:", createdUser); // Логирование созданного пользователя

            // Проверка наличия username у созданного пользователя
            if (createdUser && createdUser.username) {
                await onLogin({ username: createdUser.username, password: userData.password }); // Исправлено здесь
                localStorage.setItem("user", JSON.stringify(createdUser));
            } else {
                console.error("Ошибка: созданный пользователь не имеет поля 'username'"); // Исправлено сообщение
            }
        } catch (error) {
            console.error("Ошибка при регистрации пользователя:", error);
            throw error; // Проброс ошибки для обработки в вызывающей функции
        }
    };

    /**
     * Функция для входа пользователя
     * @param {object} userData - Данные пользователя, включающие username и пароль
     * @returns {Promise<void>}
     */
    const onLogin = async (userData) => {
        try {
            const { username, password } = userData; // Используем username

            // Запрос на сервер для поиска пользователя с указанным username
            const response = await fetch(
                `http://localhost:3000/users?username=${encodeURIComponent(username)}` // Исправлено здесь
            );

            if (!response.ok) {
                throw new Error("Ошибка при запросе на сервер");
            }

            const users = await response.json();

            // Проверка наличия пользователя и совпадения пароля
            if (users.length === 1 && users[0].password === password) {
                const user = users[0]; // Пользователь найден и пароль совпадает

                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));

                console.log("User logged in:", user);
            } else {
                console.error("Неверное имя пользователя или пароль");
                throw new Error("Неверное имя пользователя или пароль"); // Добавлено для корректной обработки ошибок
            }
        } catch (error) {
            console.error("Ошибка при входе пользователя:", error);
            throw error; // Проброс ошибки для обработки в вызывающей функции
        }
    };

    /**
     * Функция для выхода пользователя
     * @returns {void}
     */
    const onLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const contextValue = { user, loading, onRegister, onLogin, onLogout };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

/**
 * Хук для доступа к контексту аутентификации
 * @returns {object} - Значение контекста
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
