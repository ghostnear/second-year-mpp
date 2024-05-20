import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loggedInSuccessfully, setLoggedInSuccessfully] = useState(false);

    const handleLogin = async (event) =>
        {
            event.preventDefault();
            try
            {
                const response = await axios.post("http://localhost:5000/auth/", {
                    "name": username,
                    "password": password,
                });
                sessionStorage.setItem("access_token", response.data.access_token);
                sessionStorage.setItem("userID", response.data.userID);
                alert("Login successful");
                setLoggedInSuccessfully(true);
                window.location.reload();
            }
            catch (error)
            {
                console.error(error);
                alert("Login failed" + error);
            }
        };
    
        const handleRegister = async (event) =>
        {
            event.preventDefault();
            try
            {
                const response = await axios.put("http://localhost:5000/auth/", {
                    "name": username,
                    "password": password,
                });
                alert("Register successful, now you need to log in");
            }
            catch (error)
            {
                alert("Login failed" + error);
            }
        };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return <main className="border w-1/2 mx-auto p-4 rounded-md text-white">
        <h1 className="text-3xl mt-2"> Login </h1>

        <div className="border-b my-3"></div>

        <form name="loginform" className="flex justify-center flex-col" method="POST">
            <div className="mb-3">
                <label className="text-xl" htmlFor="username">Username:</label>
                <input className="w-full p-3 text-gray-100 bg-gray-700 mb-3" id="name" name="name" onChange={handleUsernameChange}></input>
            </div>
            
            <div className="mb-3">
                <label className="text-xl" htmlFor="password">Password:</label>
                <input className="w-full p-3 text-gray-100 bg-gray-700 mb-3" id="password" name="password" type="password" onChange={handlePasswordChange}></input>
            </div>

            
            <input className="bg-gray-600 w-1/2 p-3 rounded-md hover:bg-gray-500 mx-auto" type="submit" value="Connect" onClick={handleLogin}></input>
            <input className="bg-gray-600 w-1/2 p-3 rounded-md hover:bg-gray-500 mx-auto mt-3" type="submit" value="Or Create Account Here" onClick={handleRegister}></input>
        </form>
    </main>;
}

export default LoginPage;