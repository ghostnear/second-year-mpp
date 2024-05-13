import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { DeleteModal, DeleteModalButton } from '../components/user/deleteModal';
import { EditModal, EditModalButton } from '../components/user/editModal';
import axios from 'axios';

const UserPage = () => {
    const { id } = useParams();

    const [user, setUser] = useState({});
    // Page events are defined here.
    const navigate = useNavigate();
    const onDelete = () => {
        try {
            axios.delete(`http://localhost:5000/user/${id}`).then(() => {
                navigate("/users/");
            });
        }
        catch(error) {
            console.error(error);
        }
    }

    // Use this to load data after creating the page.
    useEffect(() => {
        async function fetchData() {
            try {
                await axios.get(`http://localhost:5000/user/${id}`).then((response) => {
                    return response.data;
                }).then((data) => {
                    setUser(data);
                });
            }
            catch(error) {
                console.error(error);
                navigate("/404/");
            }
        }
        fetchData();
        }, [] // Things to listen for.
    );

    return (
        <main className={`min-h-screen bg-main dark:text-main p-5 px-20`}>
            <DeleteModal onConfirm={onDelete}/>
            <EditModal user={user} id={id}/>
            <div className={`flex items-center pb-3 font-mono`}>
                <h1 className={`text-3xl`}>
                    {user.name}
                </h1>
                <div className={`ml-auto`}></div>
                <DeleteModalButton/>
                <EditModalButton/>
                <Link to="/users/" className={`w-7 h-7`}>
                    <ArrowUturnLeftIcon className={`hover:fill-blue-500 transition-colors hover:cursor-pointer`}/>
                </Link>
            </div>
            <hr className={`border-t-2 border-gray-400 pb-3`}/>
            <div className={`bg-secondary p-4 rounded-lg shadow-lg mt-4`}>
                {user.favourite_game && <h2 className={`text-2xl mb-2`}> Favourite game: {user.favourite_game.title} </h2> }
                <h2 className={`text-2xl mb-2`}> (!Not Public!) Password: {user.password} </h2>
            </div>
        </main>
    );
}

export default UserPage;