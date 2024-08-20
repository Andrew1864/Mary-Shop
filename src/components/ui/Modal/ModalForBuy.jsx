import ClearIcon from '@mui/icons-material/Clear';

const ModalForBuy = ({ active, setActive }) => {
    if (!active) return null;

    return (
        <div
            id="modal"
            className="fixed inset-0 bottom-60 flex items-center justify-end right-72 z-50">
            <div
                className="fixed  bg-opacity-50"
                onClick={() => setActive(false)}
            ></div>
            <div className="relative bg-white w-96 h-96 border rounded shadow p-6 z-10 ">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setActive(false)}
                >
                   <ClearIcon />
                </button>
                <h1 className="text-2xl font-bold">Hay</h1>
                <p className="mt-4">
                    Это пример модального окна. Нажмите за его пределами или на крестик, чтобы закрыть.
                </p>
            </div>
        </div>

    )
};

export default ModalForBuy