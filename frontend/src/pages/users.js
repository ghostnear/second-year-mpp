import { AddModal, AddModalButton } from '../components/users/addModal.js';
import UserItem from '../components/users/item.js';
import { useState, useEffect } from 'react';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import PageSelector from '../components/pageSelector.js';
import PerPageCountSelector from '../components/perPageCountSelector.js';
import UserContext from '../contexts/userContext.js';
import axios from 'axios';
import { MAXIMUM_USERS_PER_PAGE, MINIMUM_USERS_PER_PAGE } from '../constants/usersPerPage.js';

const UsersPage = (params) => {
    const navigate = useNavigate();
    
    const [userPage, setUserPage] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(MINIMUM_USERS_PER_PAGE);

    const [ users, setUsers ] = useState([]);
    
    const sortElements = () => {
        // TODO: sort in the API instead of here.
        setUsers(users.sort((a, b) => a.title.localeCompare(b.title)));
        navigate("/users/");
    }

    const getYearMap = () => {
        // TODO: link to API instead of using current page.
        let yearMap = new Map();
        users.forEach((user) => {
            if (yearMap.has(user.release_year)) {
                yearMap.set(user.release_year, yearMap.get(user.release_year) + 1);
            } else {
                yearMap.set(user.release_year, 1);
            }
        });
        return new Map([...yearMap.entries()].sort());
    }
    
    const yearMap = getYearMap();

    // Use this to load data after creating the page.
    useEffect(() => {
        async function fetchData() {
          try {
            await axios.get(`http://localhost:5000/users/?pageOffset=${userPage * usersPerPage}&pageSize=${usersPerPage}`).then((response) => {
                return response.data;
            }).then((data) => {
                setUsers(data);
            });
          }
          catch(error) {
            console.error(error);
          }
        }
        fetchData();
      }, [userPage, usersPerPage] // Things to listen for.
    );

    return (
        <UserContext.Provider value={{users, setUsers}}>
            <main className={`min-h-screen bg-main dark:text-main`}>
                <div className={`w-full h-full bg-main p-5 px-20`}>
                    <AddModal/>
                    <div className={`flex items-center pb-3 font-mono`}>
                        <h1 className={`text-5xl`}>
                            Users
                        </h1>
                        <PerPageCountSelector className={`ml-4`}
                            multiple={6} setOffset={setUserPage}
                            max={MAXIMUM_USERS_PER_PAGE} min={MINIMUM_USERS_PER_PAGE}
                            perPage={usersPerPage} setPerPage={setUsersPerPage}
                        />
                        
                        <div className={`ml-auto`}></div>
                        <FunnelIcon onClick={sortElements} className={`w-10 h-10 mt-auto hover:fill-blue-400 transition-colors hover:cursor-pointer`}/>
                        <AddModalButton/>
                    </div>
                    <hr className={`border-t-2 border-gray-400 pb-3`}/>
                    <div className={`grid grid-cols-6 gap-4`}>
                        {
                            users.map((user) => <UserItem key={user.id} user={user}/>)
                        }
                    </div>  
                    {MAXIMUM_USERS_PER_PAGE > usersPerPage && /* TODO: replace this with actual db size calculated later */
                        <PageSelector offset={userPage} setOffset={setUserPage} size={3 /* TODO: calculate this from response next time. */}/>
                    }
                </div>
            </main>
        </UserContext.Provider>
    );
}

export default UsersPage;