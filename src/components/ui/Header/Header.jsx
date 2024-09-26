import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useProductsStore from '../../../store/useProductsStore';
// import Admin from '../Admin/AdminPanel';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../Modal/Modal';
import Register from '../Registration/Registr';
import Login from '../Registration/Login';
import AddHomeWorkRoundedIcon from '@mui/icons-material/AddHomeWorkRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// const NavItems = [
//     { name: "Home", path: "/", icon: <AddHomeWorkRoundedIcon className="w-5 h-5 ml-1" /> },
//     { name: "Shop", path: "/cards", icon: <AccountBalanceWalletOutlinedIcon className="w-5 h-5 ml-1" /> },
//     { name: "Admin", path: "/admin", icon: <SupervisorAccountIcon className="w-5 h-5 ml-1" /> },
// ];

const Header = () => {
    // Получаем текущее местоположение (URL) из хука
    const location = useLocation();

    const { user, onLogout } = useAuth(); // Получаем текущего пользователя

    // Хук для навигации (роутинга) по страницам
    const navigate = useNavigate();

    // Стор для корзины 
    const { getFavoriteProducts, getAllCartProducts, cart } = useProductsStore();

    const [cartCount, setCartCount] = useState(0);

    // для показа сохраненок
    const favoriteCount = getFavoriteProducts()?.length;

    // Стейт для регистрации 

    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    // Стейт для Логинки 
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

    useEffect(() => {
        setCartCount(getAllCartProducts());
    }, [cart, getAllCartProducts]);

    // Показ страницы cохраненных товаров
    const handleToOpenFavorite = () => {
        navigate(`/favorites`);
    };

    // Показ страницы корзина товаров
    const handleToOpenCart = () => {
        navigate(`/cart`)
    }


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
        <header className="bg-gray-100 shadow fixed top-0 left-0 right-0 z-10 ">
            <div className="max-w-7xl mx-auto px-2 sm:h-29">
                <div className="relative flex justify-between ">
                    <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
                        <NavLink to="/">
                            <h1 className="mb-4 mr-8 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-5xl dark:text-white">
                                MARY.SHOP
                            </h1>
                        </NavLink>
                        <div className="ml-6 flex-grow lg:flex lg:items-center lg:w-auto">
                            <div className="text-sm lg:flex-grow">
                                {[
                                    { name: "Home", path: "/", icon: <AddHomeWorkRoundedIcon className="w-5 h-5 ml-1" /> },
                                    { name: "Shop", path: "/cards", icon: <AccountBalanceWalletOutlinedIcon className="w-5 h-5 ml-1" /> },
                                    // Условно добавляем ссылку на панель администратора
                                    user?.role === 'admin' && { name: "Admin", path: "/admin", icon: <SupervisorAccountIcon className="w-5 h-5 ml-1" /> },
                                ].filter(Boolean).map((item) => (
                                    <NavLink
                                        to={item.path}
                                        key={item.path}
                                        className={`text-zinc-800 mr-10 inline-flex items-center px-1 pt-1 text-sm ${isActiveLink(item.path)
                                            ? "text-indigo-500 border-b-2 border-indigo-500"
                                            : "hover:text-indigo-500"
                                            }`}
                                    >
                                        {item.name}
                                        {item.icon}
                                    </NavLink>
                                ))}
                            </div>
                            {/* <div className="text-sm lg:flex-grow">
                                {NavItems.map((item) => {
                                    return (
                                        <NavLink
                                            to={item?.path}
                                            key={item?.path}
                                            className={` text-zinc-800 mr-10 inline-flex items-center px-1 pt-1 text-sm ${isActiveLink(item?.path)
                                                ? "text-indigo-500 border-b-2 border-indigo-500"
                                                : "hover:text-indigo-500"
                                                }`}>
                                            {item?.name}
                                            {item?.icon}
                                        </NavLink>
                                    );
                                })}
                            </div> */}
                        </div>
                    </nav>
                    <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            onClick={handleToOpenFavorite}
                            className={`w-14 relative  hover:text-gray-500 ${location?.pathname === "/favorites" ? "text-black" : ""}`}
                        >
                            <FavoriteIcon className="" />
                            {!!favoriteCount && (
                                <span className='w-5 h-5 mb-1 text-xs/6 px-1 leading-5 text-white inline-flex justify-center justify-items-center bg-gray-500 rounded-3xl absolute top-[-4px] right-px'>
                                    {favoriteCount}
                                </span>
                            )}
                        </button>
                        <button
                            id='Cart'
                            type='button'
                            onClick={handleToOpenCart}
                            className={`w-14 relative hover:text-gray-500 ${location?.pathname === "/cart" ? "text-black" : ""}`}
                        >
                            <AddShoppingCartSharpIcon />
                            {!!cartCount && (
                                <span
                                    id='cart'
                                    className='w-5 h-5 text-xs px-1 leading-5 text-white inline-flex items-center justify-center bg-gray-500 rounded-full absolute top-[-4px] right-0'>
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        {!user ? (
                            <>
                                <button
                                    onClick={() => setLoginModalOpen(true)}
                                    className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                    Вход
                                </button>
                                <button
                                    onClick={() => setRegisterModalOpen(true)}
                                    className="ml-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                >
                                    Регистрация
                                </button>
                            </>
                        ) : ( 
                            <button
                            type='button'
                            className='ml-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700'
                            onClick={onLogout}>
                                    Exit    
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Вход">
                <Login />
            </Modal>
            <Modal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} title="Регистрация">
                <Register />
            </Modal>
        </header>
    )
};

export default Header