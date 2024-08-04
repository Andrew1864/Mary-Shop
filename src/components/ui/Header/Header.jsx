import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AddHomeWorkRoundedIcon from '@mui/icons-material/AddHomeWorkRounded';

const NavItems = [
    { name: "Home", path: "/", icon: <AddHomeWorkRoundedIcon /> }
]

const Header = () => {
    // Получаем текущее местоположение (URL) из хука
    const location = useLocation();

    // Хук для навигации (роутинга) по страницам
    const navigate = useNavigate();

    /**
  * Определяет, активна ли ссылка.
  * @param {string} path - Путь ссылки.
  * @returns {boolean} ссылка активна или нет.
  */
    const isActiveLink = (path) => {
        return (
            location?.pathname === path ||
            (path === "/cards" && location?.pathname?.startsWith("/cards"))
        );
    };

    return (
        <header className="bg-white shadow fixed top-0 left-0 right-0 z-10 ">
            <div className="max-w-7xl mx-auto px-2 sm:h-29">
                <div className="relative flex justify-between ">
                    <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
                        <NavLink to="/">
                            <h1 className="mb-4 mr-8 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-5xl dark:text-white">
                                MARY.SHOP
                            </h1>
                        </NavLink>
                        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                            <div className="text-sm lg:flex-grow">
                                {NavItems.map((item) => {
                                    return (
                                        <NavLink
                                            to={item?.path}
                                            key={item?.path}
                                            className={`text-zinc-800 inline-flex items-center px-1 pt-1 text-sm ${isActiveLink(item?.path)
                                                ? "text-indigo-500 border-b-2 border-indigo-500"
                                                : "hover:text-indigo-500"
                                                }`}>
                                            {item?.name}
                                            {item?.icon}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
};

export default Header