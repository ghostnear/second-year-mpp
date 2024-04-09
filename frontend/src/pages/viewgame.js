import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { DeleteModal, DeleteModalButton } from '../components/game/deleteModal';
import { EditModal, EditModalButton } from '../components/game/editModal';
import axios from 'axios';

const GamePage = () => {
    const { id } = useParams();

    const [game, setGame] = useState({});
    // Page events are defined here.
    const navigate = useNavigate();
    const onDelete = () => {
        axios.delete(`http://localhost:5000/game/${id}`).then(() => {
            navigate("/games/");
        });
    }

    // Use this to load data after creating the page.
    useEffect(() => {
        async function fetchData() {
            await axios.get(`http://localhost:5000/game/${id}`).then((response) => {
                return response.data;
            }).then((data) => {
                setGame(data);
                /* TODO: go to 404 if game is not found. */
            });
        }
        fetchData();
        }, [] // Things to listen for.
    );

    return (
        <main className={`min-h-screen bg-main dark:text-main p-5 px-20`}>
            <DeleteModal onConfirm={onDelete}/>
            <EditModal game={game} id={id}/>
            <div className={`flex items-center pb-3 font-mono`}>
                <h1 className={`text-3xl`}>
                    {game.title}
                </h1>
                <div className={`ml-auto`}></div>
                <DeleteModalButton/>
                <EditModalButton/>
                <Link to="/games/" className={`w-7 h-7`}>
                    <ArrowUturnLeftIcon className={`hover:fill-blue-500 transition-colors hover:cursor-pointer`}/>
                </Link>
            </div>
            <hr className={`border-t-2 border-gray-400 pb-3`}/>
            <div className={`bg-secondary p-4 rounded-lg shadow-lg`}>
                <h2 className={`text-2xl mb-2 underline`}> Description: </h2>
                <p>
                    {game.description}
                </p>
            </div>
            <div className={`bg-secondary p-4 rounded-lg shadow-lg mt-4`}>
                <h2 className={`text-2xl mb-2`}> Release Year: {game.release_year} </h2>
            </div>
        </main>
    );
}

export default GamePage;