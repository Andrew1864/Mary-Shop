import { useParams } from "react-router-dom";
import useProductsStore from "../store/useProductsStore";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';



const CardDitails = () => {
    // Получение id из адресной строки через React-router-dom
    const { id } = useParams();

    // Получаем из стора продукты
    const { getProductById, onToggleFavorite } = useProductsStore();

    const product = getProductById(id);

    return (
        <section className="products relative top-28 bg-white">
            <div class=" container relative flex-col md:flex-row  flex justify-around  gap-4 mx-4 py-12">
                <Link to="/cards"
                    className=" relative bottom-12 left-11 text-gray-600 hover:text-gray-900 mb-8 inline-flex mt-5">
                        <ArrowBackOutlinedIcon />
                    Shop
                </Link>
                <div class="flex justify-center w-full  bg-white rounded-lg  dark:bg-gray-800 flex-col md:flex-row">
                    <div className="relative  md:max-w-full flex justify-center items-center">
                        <img className="w-full h-2/3 object-cover  md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none" src={product?.imgSrc} alt="img" />

                    </div>
                    <div>
                        <form className="flex-auto p-6">
                            <div className="flex flex-wrap">
                                <h1 className="flex-auto text-3xl font-bold dark:text-gray-50">{product?.name}</h1>
                            </div>
                            {product?.rating && (
                                <div className="text-yellow-500 text-xl">
                                    {"★".repeat(Math.floor(product?.rating)) +
                                        "☆".repeat(5 - Math.floor(product?.rating))}
                                </div>
                            )}
                            <div className="text-3xl font-bold text-black dark:text-gray-300">{product?.price}$</div>
                            <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">{product?.description}</div>
                            <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">Choose Size</div>
                            <div className="flex items-baseline mt-4 mb-6 text-gray-700 dark:text-gray-300">
                                <div className="flex space-x-2">

                                    <label className="text-center">
                                        <input type="radio"
                                            name="size" value="xs"
                                            className="flex items-center justify-center w-6 h-6 accent-violet-600 bg-gray-100 rounded-lg dark:bg-gray-600" />
                                        XS
                                    </label>
                                    <label className="text-center">
                                        <input
                                            type="radio"
                                            name="size" value="s"
                                            className="flex items-center justify-center w-6 h-6 accent-black"
                                        />S
                                    </label>
                                    <label className="text-center">
                                        <input type="radio"
                                            name="size" value="m"
                                            className="flex items-center justify-center w-6 h-6 accent-black" />M
                                    </label>
                                    <label className="text-center">
                                        <input type="radio"
                                            name="size" value="l"
                                            className="flex items-center justify-center w-6 h-6 accent-black"
                                        />L
                                    </label>
                                    <label className="text-center">
                                        <input type="radio"
                                            className="flex items-center justify-center w-6 h-6 accent-black"
                                            name="size" value="xl"
                                        />XL
                                    </label>
                                </div>
                            </div>
                            <div className="flex mb-4 text-sm font-medium">
                                <button type="button"
                                    className="py-2 px-4 bg-black hover:bg-gray-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">Buy
                                    now</button>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-300">Free shipping on all continental US orders.</p>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CardDitails;