import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

const EditModal = (params) => {
    // Deep copy the original game to modify it only at the end.
    const game = params.games[0].find(game => game.id === parseInt(params.id));

    const navigate = useNavigate();

    const saveChanges = () => {
        const title = document.getElementById('edit-modal-title').value;
        const description = document.getElementById('edit-modal-description').value;

        // TODO: this should be a request to the backend in the future.
        game.title = title;
        game.description = description;

        closeModal();
        
        // NOTE: This fixes the page not updating.
        console.log(game.id, game.title, game.description);
        navigate(`/game/${game.id}/`);
    }

    return <div id="edit-modal" className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 justify-center items-center hidden`}>
        <div className={`bg-secondary p-5 rounded-lg shadow-lg w-2/4 text-center`}>
            {/* Header */}
            <div className={`w-full flex`}>
                <h1 className={`text-3xl`}>Edit this game:</h1>
                <div className={`ml-auto`}>
                    <button>
                        <XMarkIcon className={`w-10 h-10 hover:fill-red-400 transition-colors hover:cursor-pointer`} onClick={closeModal}/>
                    </button>
                </div>
            </div>
            <hr className={`my-3`}/>
            {/* Body */}
            <div className={`w-full mb-6 text-left`}>
                <label htmlFor="edit-modal-title" className={`text-m`}>Title:</label>
                <input id="edit-modal-title" type="text" className={`w-full bg-third p-2 rounded-md shadow-md mb-3`} defaultValue={game.title}/>

                <label htmlFor="edit-modal-description" className={`text-m`}>Description:</label>
                <textarea id="edit-modal-description" className={`w-full bg-third p-2 rounded-md shadow-md`} defaultValue={game.description}/>
            </div>
             {/* Footer */}
            <div className={`w-full flex justify-center`}>
                <button className={`bg-green-500 text-white p-2 rounded-md w-2/4`} onClick={saveChanges}>Save</button>
            </div>
        </div>
    </div>;
}

const closeModal = () => {
    const modal = document.getElementById('edit-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

const openModal = () => {
    const modal = document.getElementById('edit-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

const EditModalButton = () => {
    return <button onClick={openModal} className={`w-7 h-7 mr-2`}>
        <PencilSquareIcon className={`hover:fill-yellow-500 transition-colors hover:cursor-pointer`}/>
    </button>;
}

export { EditModal, EditModalButton };