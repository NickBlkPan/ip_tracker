import './App.css';
import { useEffect, useState } from 'react';

import { IpControl, Map } from './components';
import { customFetch } from './services';
import { IPIFY_URL } from './common/constants';
import { getIpInformation } from './common/utils';

function App() {
    const [isFetching, setIsFetching] = useState(true);
    const [ipInformation, setIpInformation] = useState();
    
    const handleGetIpInformation = async (ipAddressOrDomain) => {
        setIsFetching(true);
        
        const ipInformation = await getIpInformation(ipAddressOrDomain);
        setIpInformation(ipInformation);
        
        setIsFetching(false);
    }
    
    useEffect(() => {
        if (!ipInformation) {
            const fetchUserIpInformation = async () => {
                setIsFetching(true);

                const { ip: userIp } = await customFetch(IPIFY_URL);
                const userIpInformation = await getIpInformation(`&ipAddress=${userIp}`);

                setIpInformation(userIpInformation);

                setIsFetching(false);

            }

            fetchUserIpInformation();
        }
    }, []);

    return (
        <div className="App">
            <IpControl
                isFetching={isFetching}
                ipInformation={ipInformation}
                handleGetIpInformation={handleGetIpInformation}
            />

            <Map isFetching={isFetching} ipLocationInformation={ipInformation?.location} />
        </div>
    );
}

export default App;
