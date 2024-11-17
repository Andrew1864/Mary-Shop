import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useRef } from 'react';
import useProductsStore from '../../../store/useProductsStore';



const ModalForBuy = ({ active, setActive, selectedItem  }) => {

    const { cart } = useProductsStore();

    const modalRef = useRef(null);

    // Добавляем обработчик события клика вне модального окна 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setActive(false);
            }
        };
        if (active) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, [active, setActive]);

    if (!active || !selectedItem) return null;

    
   

    return (
        <div
            id="modal"
            className="fixed inset-0 bottom-60 flex items-center justify-end right-72 z-50">
            <div
                className="fixed  bg-opacity-50"
                onClick={() => setActive(false)}>
            </div>
            {cart?.map((item) => (
                <div
                    ref={modalRef}
                    className="relative bg-white w-96 h-96 border rounded shadow p-6 z-10 ">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setActive(false)}
                    >
                        <ClearIcon />
                    </button>
                    <h1 className="text-2xl font-bold">Order Summary</h1>
                    <form className="flex-auto ml-5 mt-3">
                        <div className="flex flex-wrap">
                            <h3 className="flex-auto  md:text-2xl font-bold dark:text-gray-50">{item?.name}</h3>
                        </div>
                        <div className="flex">
                            <p className="mt-2 mr-1 text-base font-bold text-black dark:text-gray-300">Color:</p>
                            <p className="flex-none w-full mt-2 text-base font-medium text-gray-500 dark:text-gray-300">{item?.details?.colors}</p>
                        </div>
                        <div className="flex">
                            <p className="mt-2 mr-1 text-base font-bold text-black dark:text-gray-300">Size:</p>
                            <p className="flex-none w-full mt-2 text-base font-medium text-gray-500 dark:text-gray-300">Medium</p>
                        </div>
                        <div className="flex mt-4">
                            <p className="text-xl mr-1  font-bold text-black dark:text-gray-300">Total:</p>
                            <p className="flex-none ml-8 text-2xl w-full  font-mediumtext-3xl  font-bold text-black dark:text-gray-300">{item?.price}$</p>
                        </div>
                       
                    </form>
                        <button type="button"
                            className="py-2 px-4 mt-20 bg-black hover:bg-gray-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center
                             text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-3xl">Buy
                        </button>
                </div>
            ))}
        </div>

    )
};

export default ModalForBuy

