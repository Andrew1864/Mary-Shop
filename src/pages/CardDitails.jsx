import { useParams } from "react-router-dom";
import useProductsStore from "../store/useProductsStore";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Alert from "../components/ui/Alert/Alert";
import { useState } from "react";



const CardDitails = () => {
    // Получение id из адресной строки через React-router-dom
    const { id } = useParams();

    // Получаем из стора продукты
    const { getProductById, addToCart } = useProductsStore();

    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: "",
        subtitle: "",
    })

    const product = getProductById(id);

    const handleAddToCart = () => {
        addToCart(product);
        setAlertState({
            isOpen: true,
            title: "Добаление товара.",
            subtitle: "Товар успешно добавлен в корзину."
        })
    }

    return (
        <section className=" mt-9">
            <Link to="/cards"
                className=" relative top-20 left-11 text-gray-600 hover:text-gray-900 mb-8 inline-flex ">
                <ArrowBackOutlinedIcon />
                Shop
            </Link>
            <div className="relative top-10">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 px-4 mb-8">
                            <img src={product?.imgSrc} alt=""
                                className="w-full h-auto rounded-lg shadow-md mb-4" />
                            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                                <img src={product?.imgSrc}
                                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    onclick="changeImage(this.src)" alt="" />
                                <img src={product?.imgSrc}
                                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    onclick="changeImage(this.src)" alt="" />
                                <img src={product?.imgSrc}
                                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    onclick="changeImage(this.src)" alt="" />
                                <img src={product?.imgSrc}
                                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    onclick="changeImage(this.src)" alt="" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <h2 className="text-3xl font-bold mb-2">{product?.name}</h2>
                            <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
                            <div className="mb-4">
                                <span className="text-2xl font-bold mr-2">{product?.price}$</span>
                                {/* <span className="text-gray-500 line-through">$399.99</span> */}
                            </div>
                            <div className="flex items-center mb-4">
                                {product?.rating && (
                                    <div className="text-yellow-500 text-xl">
                                        {"★".repeat(Math.floor(product?.rating)) +
                                            "☆".repeat(5 - Math.floor(product?.rating))}
                                    </div>
                                )}
                                <span className="ml-2 text-gray-600">{product?.rating}(120 reviews)</span>
                            </div>
                            <p className="font-bold">Description:</p>
                            <p className="text-gray-700 mb-6">{product?.description}</p>

                            <div class="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Color:</h3>
                                <div className="flex space-x-2">
                                    <button
                                        className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                                    <button
                                        className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                                    <button
                                        className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                                </div>
                            </div>
                            <div className="flex space-x-4 mb-6">
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-gray-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    Add to Cart
                                </button>
                                <button
                                    className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Alert
                    title={alertState?.title}
                    subtitle={alertState?.subtitle}
                    variant="neutral"
                    isOpen={alertState?.isOpen}
                    onClose={() => setAlertState(!alertState?.isOpen)}
                />
            </div>
        </section>
    );
};

export default CardDitails;
