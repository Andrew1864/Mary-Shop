import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SwiperComponents = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}>
            <SwiperSlide>
                <div className="grid relative top-28 py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="place-self-center mt-4 mr-auto lg:col-span-7">
                        <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
                            FIND CLOTHES THAT MATCHES YOUR STYLE
                        </h1>
                        <p className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-sm lg:text-xl dark:text-gray-400">
                            Browse through our diverse range of meticulously crafted garments,
                            disined to bring out your individuality and cater to your sence of style.
                        </p>
                        <a
                            href="#"
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-black hover:bg-gray-500 focus:ring-4 focus:outline-none rounded-3xl focus:ring-blue-300  w-40  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative top-1 py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="place-self-center mt-4 mr-auto lg:col-span-7">
                        <h1 className="mb-4 text-center text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
                            BROWSE BY DRESS STYLE
                        </h1>
                        <div className="flex justify-center flex-wrap gap-5">
                            <div>
                                <img src="../assets/products/Frame61.png" alt="" />
                            </div>
                            <div>
                                <img src="../assets/products/Frame62.png" alt="" />
                            </div>
                            <div>
                                <img src="../assets/products/Frame64.png" alt="" />
                            </div>
                            <div>
                                <img src="../assets/products/Frame63.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    )


};

export default SwiperComponents;