import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Admin = () => {
    const { user } = useAuth();

     // Если пользователь не админ, не показываем панель
    if (user?.role !== 'admin') {
        return null;
    };

    return (
        <div className="admin-panel">
          <h2>Панель администратора</h2>
          <p>Добро пожаловать, {user.username}!</p>
          {/* Здесь можно добавить дополнительные функции панели администратора */}
        </div>
      );
};

export default Admin;