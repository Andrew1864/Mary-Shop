
const Header = () => {

    return (
        <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
            <div>
                <div  className="">
                    <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
                        <div className="flex items-center flex-no-shrink font-sans font-black text-6xl text-black ml-7 mr-3">
                          MARY.SHOP
                        </div>
                        <div className="block lg:hidden">
                            <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-indigo-500 hover:border-indigo-500">
                                <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                            </button>
                        </div>
                        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                            <div className="text-sm lg:flex-grow">
                                <a href="#responsive-header" className="text-zinc-800 inline-flex items-center px-1 pt-1 text-sm  hover:text-indigo-500 hover:border-indigo-500 mr-4">
                                    Home
                                </a>
                                <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-indigo-500 hover:border-indigo-500 mr-4">
                                    Shop
                                </a>
                            </div>
                            <div>
                                <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Download</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
};

export default Header