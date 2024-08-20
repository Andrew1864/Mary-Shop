import useProductStore from "../store/useProductsStore";
import { Link } from "react-router-dom";
import Alert from "../components/ui/Alert/Alert"
import { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';



const Cart = () => {
    // берем из Store cart и deleteProductFromCart 
    const { cart, deleteProductFromCart } = useProductStore();

    /**
   * Обработчик для удаления товара из корзины
   * @param {string} productId - id товара, который нужно удалить.
   */
    const handleDeleteProduct = (productId) => {
        deleteProductFromCart(productId);
        setAlertState({
            isOpen: true,
            title: "Удаление товара.",
            subtitle: "Товар был удален из корзины.",
        });
    };
    console.log(cart)

    // Стейт для Alert
    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: "",
        subtitle: "",
    });

    return (
        <section className="cart max-h-full  relative top-28 bottom-3 md:flex-row bg-white">

            <div className=" max-w-7xl mx-auto px-2">
                <Link to="/cards"
                    className=" relative  left-11 text-gray-600 hover:text-gray-900 mb-8 inline-flex mt-5">
                    <ArrowBackOutlinedIcon />
                    Shop
                </Link>
                <div className="flex justify-between items-start">
                    <h2 className="mb-4 text-4xl font-bold text-zinc-800">
                        {cart?.length ? "Корзина." : "Корзина пуста."}
                    </h2>
                </div>
                {cart?.length > 0 && (
                    <div className=" flex justify-center w-full  bg-white rounded-lg  dark:bg-gray-800 flex-col gap-3">
                        {cart?.map((item) => (
                            <div
                                className="border rounded shadow p-4 max-w-3xl relative"
                                key={crypto?.randomUUID()}
                            >
                                <button
                                    onClick={() => handleDeleteProduct(item?.id)}
                                    className="absolute top-2 right-2">
                                    <DeleteForeverIcon />
                                </button>
                                <div className="flex items-start">
                                    <div className="relative  md:w-48 flex justify-center items-center">
                                        <img className="object-cover w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none" src={item?.imgSrc} alt="img" />
                                    </div>
                                    <form className="flex-auto ml-5">
                                        <div className="flex flex-wrap">
                                            <h3 className="flex-auto  md:text-2xl font-bold dark:text-gray-50">{item?.name}</h3>
                                        </div>
                                        <div className="flex">
                                            <p className="mt-2 mr-1 text-base font-bold text-black dark:text-gray-300">Color:</p>
                                            <p className="flex-none w-full mt-2 text-base font-medium text-gray-500 dark:text-gray-300">{`${item?.details?.colors}`}</p>
                                        </div>
                                        <div className="flex">
                                            <p className="mt-2 mr-1 text-base font-bold text-black dark:text-gray-300">Size</p>
                                            <p className="flex-none w-full mt-2 text-base font-medium text-gray-500 dark:text-gray-300">Medium</p>
                                        </div>
                                        <div className="text-3xl mt-10 font-bold text-black dark:text-gray-300">{item?.price}$</div>
                                    </form>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Alert
            title={alertState?.title}
            subtitle={alertState?.subtitle}
            variant="neutral"
            isOpen={alertState?.isOpen}
            onClose={() => setAlertState(!alertState?.isOpen)}
            />
        </section>

    )

};

export default Cart