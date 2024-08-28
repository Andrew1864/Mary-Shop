import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Admin = () => {
    const { users } = useAuth();

     // Если пользователь не админ, не показываем панель
    if (users?.role !== 'admin') {
        return null;
    };

    return (
        <div className="admin-panel">
          <h2>Панель администратора</h2>
          <p>Добро пожаловать, {users.username}!</p>
          {/* Здесь можно добавить дополнительные функции панели администратора */}
        </div>
      );
};

export default Admin;