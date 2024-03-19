import { Link } from 'react-router-dom';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';

const AddModal = (params) => {
    const saveChanges = () => {
        const title = document.getElementById('add-modal-title').value;
        const description = document.getElementById('add-modal-description').value;

        // TODO: this should be a request to the backend in the future.
        params.games[1]([...params.games[0], { id: params.games[0].length + 1, title: title, description: description }]);
        
        closeModal();
    }

    return <div id="add-modal" className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 justify-center items-center hidden`}>
        <div className={`bg-secondary p-5 rounded-lg shadow-lg w-2/4 text-center`}>
            {/* Header */}
            <div className={`w-full flex`}>
                <h1 className={`text-3xl`}>Add a game</h1>
                <div className={`ml-auto`}>
                    <button>
                        <XMarkIcon className={`w-10 h-10 hover:fill-red-400 transition-colors hover:cursor-pointer`} onClick={closeModal}/>
                    </button>
                </div>
            </div>
            <hr className={`my-3`}/>
            {/* Body */}
            <div className={`w-full mb-6 text-left`}>
                <label for="add-modal-title" className={`text-m`}>Title:</label>
                <input id="add-modal-title" type="text" className={`w-full bg-third p-2 rounded-md shadow-md mb-3`}/>

                <label for="add-modal-description" className={`text-m`}>Description:</label>
                <textarea id="add-modal-description" className={`w-full bg-third p-2 rounded-md shadow-md`}></textarea>
            </div>
             {/* Footer */}
            <div className={`w-full flex justify-center`}>
                <button className={`bg-green-500 text-white p-2 rounded-md w-2/4`} onClick={saveChanges}>Add</button>
            </div>
        </div>
    </div>;
}

const closeModal = () => {
    const modal = document.getElementById('add-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

const openModal = () => {
    const modal = document.getElementById('add-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

const AddModalButton = () => {
    return <button onClick={openModal} className={`w-7 h-7 mr-2`}>
        <PlusIcon className={`w-10 h-10 mt-auto hover:fill-green-500 transition-colors hover:cursor-pointer`}/>
    </button>;
}

export { AddModal, AddModalButton };