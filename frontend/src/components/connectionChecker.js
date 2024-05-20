import Axios from 'axios';
import { useState } from 'react';

const ConnectionChecker = () => {
    const checkInterval = 5000;

    const [isOffline, setIsOffline] = useState(false);
    
    async function checkConnection() {
        try {
            await Axios.get('https://mpp.ghnr.xyz/ping');
            if(isOffline === true)
                window.location.reload();
            setIsOffline(false);
        } catch (error) {
            setIsOffline(true);
        }
    }

    setInterval(checkConnection, checkInterval);

    return (
        <>
            {isOffline && <h2 className={`bg-primary dark:text-main text-h2 p-4 mb-4 bg-orange-900`}>You are offline. Retrying connection in 5 seconds...</h2>}
        </>
    );
}

export default ConnectionChecker;