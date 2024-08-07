import { NavLink, useLocation, useNavigate } from "react-router-dom";



const Home = () => {




    return (
        <section className=" max-w-7xl mx-auto px-2 relative">
            <div className="grid relative top-28 py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="place-self-center mr-auto lg:col-span-7">
                    <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>
                    <p className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-sm lg:text-xl dark:text-gray-400">
                        Browse through our diverse range of meticulously crafted garments,
                        disined to bring out your individuality and cater to your sence of style.
                    </p>
                    <a
                        href="#"
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-black hover:bg-black focus:ring-4 focus:ring-black dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                        Shop Now
                    </a>
                    <div className=" py-8 px-4 mx-auto max-w-screen-xl lg:row-span-1 xl:gap-0 lg:py-16 lg:flex">
                        <div className="flex gap-16 flex-wrap">
                            <div>
                                <span className="font-sans text-4xl font-black">200+</span>
                                <p className=" text-gray-500">International Brands</p>
                            </div>
                            <div>
                                <span className="font-sans text-4xl font-black">2000+</span>
                                <p className=" text-gray-500">High-Quality Products</p>
                            </div>
                            <div>
                                <span className="font-sans text-4xl  font-black">30000+</span>
                                <p className=" text-gray-500">Happy Customers</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden absolute right-72 lg:mt-0 lg:right-16 lg:col-span-5 lg:flex">
                    <img
                        src="../../assets/products/Vector.png"
                        alt="First"
                    />
                </div>
                <div className="  lg:mt-0 lg:col-span-5 lg:flex">
                    <img
                        src="../../assets/products/FirstPage.png"
                        alt="First"
                    />
                </div>
                <div className="hidden relative w-14 left-full bottom-72 lg:mt-0 lg:right-16 lg:col-span-5 lg:flex">
                    <img
                        src="../../assets/products/second.png"
                        alt="First"
                    />
                </div>
                <div className="relative w-full4 left-full  lg:mt-0 lg: lg:col-span-5 lg:flex">
                    <h1></h1>
                </div>
            </div>
        </section>
    );
}

export default Home;