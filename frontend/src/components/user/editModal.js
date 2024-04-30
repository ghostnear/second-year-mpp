import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

const EditModal = (params) => {
    const user = params.user;

    const saveChanges = () => {
        const name = document.getElementById('edit-modal-username').value;
        const password = document.getElementById('edit-modal-password').value;
        const fav_game_id = parseInt(document.getElementById('edit-modal-fav-game').value);

        console.log(user);

        try {
            axios.put(`http://localhost:5000/user/${user.id}`, {
                name: name,
                password: password,
                favourite_game: fav_game_id
            }).then(() => {
                closeModal();
                window.location.reload();
            });
        }
        catch(error) {
            console.error(error);
        }
    }

    return <div id="edit-modal" className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 justify-center items-center hidden`}>
        <div className={`bg-secondary p-5 rounded-lg shadow-lg w-2/4 text-center`}>
            {/* Header */}
            <div className={`w-full flex`}>
                <h1 className={`text-3xl`}>Edit this user:</h1>
                <div className={`ml-auto`}>
                    <button>
                        <XMarkIcon className={`w-10 h-10 hover:fill-red-400 transition-colors hover:cursor-pointer`} onClick={closeModal}/>
                    </button>
                </div>
            </div>
            <hr className={`my-3`}/>
            {/* Body */}
            <div className={`w-full mb-6 text-left`}>
                <label htmlFor="edit-modal-username" className={`text-m`}>Username:</label>
                <input id="edit-modal-username" type="text" className={`w-full bg-third p-2 rounded-md shadow-md mb-3`} defaultValue={user.name}/>

                <label htmlFor="edit-modal-password" className={`text-m`}>Password:</label>
                <textarea id="edit-modal-password" className={`w-full bg-third p-2 rounded-md shadow-md`} defaultValue={user.password}/>

                <label htmlFor="edit-modal-fav-game" className={`text-m`}>Favourite game (optional):</label>
                <input id="edit-modal-fav-game" type="number" className={`w-full bg-third p-2 rounded-md shadow-md`} defaultValue={
                    user.favourite_game ? user.favourite_game.id : ''
                }/>
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