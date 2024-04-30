import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddModal = () => {
    const navigate = useNavigate();

    const saveChanges = () => {
        const username = document.getElementById('add-modal-username').value;
        const password = document.getElementById('add-modal-password').value;
        const favGame = document.getElementById('add-modal-fav-game').value;

        try {
            axios.post(`http://localhost:5000/users/`, {
                name: username,
                password: password,
                favourite_game: favGame
            }).then((response) => {
                closeModal();
                navigate(`/user/${response.data.id}/`);
            });
        }
        catch(error) {
            console.error(error);
        }
    }

    return <div id="add-modal" className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 justify-center items-center hidden`}>
        <div className={`bg-secondary p-5 rounded-lg shadow-lg w-2/4 text-center`}>
            {/* Header */}
            <div className={`w-full flex`}>
                <h1 className={`text-3xl`}>Add an user:</h1>
                <div className={`ml-auto`}>
                    <button>
                        <XMarkIcon className={`w-10 h-10 hover:fill-red-400 transition-colors hover:cursor-pointer`} onClick={closeModal}/>
                    </button>
                </div>
            </div>
            <hr className={`my-3`}/>
            {/* Body */}
            <div className={`w-full mb-6 text-left`}>
                <label htmlFor="add-modal-username" className={`text-m`}>Username:</label>
                <input id="add-modal-username" type="text" className={`w-full bg-third p-2 rounded-md shadow-md mb-3`}/>

                <label htmlFor="add-modal-password" className={`text-m`}>Password:</label>
                <input id="add-modal-password" type="password" className={`w-full bg-third p-2 rounded-md shadow-md mb-3`}/>

                <label htmlFor="add-modal-fav-game" className={`text-m`}>Favourite game ID (optional): </label>
                <input id="add-modal-fav-game" type="number" className={`w-full bg-third p-2 rounded-md shadow-md mb-3`}/>
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