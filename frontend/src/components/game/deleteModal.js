import { TrashIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const DeleteModal = (params) => {
    return <div id="delete-modal" className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 justify-center items-center hidden`}>
        <div className={`bg-secondary p-5 rounded-lg shadow-lg w-2/4 text-center`}>
            <h2 className={`text-2xl mb-5`}>Are you sure you want to delete this game?</h2>
            <div className={`flex`}>
                <Link to="/games/" onClick={params.onConfirm} className={`bg-red-600 text-white w-full p-2 rounded-lg shadow-lg mr-4`}>Yes</Link>
                <button onClick={closeModal} className={`bg-green-600 text-white w-full p-2 rounded-lg shadow-lg`}>No</button>
            </div>
        </div>
    </div>;
}

const closeModal = () => {
    const modal = document.getElementById('delete-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

const openModal = () => {
    const modal = document.getElementById('delete-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

const DeleteModalButton = () => {
    return <button onClick={openModal} className={`w-7 h-7 mr-2`}>
        <TrashIcon className={`hover:fill-red-500 transition-colors hover:cursor-pointer`}/>
    </button>;
}

export { DeleteModal, DeleteModalButton };