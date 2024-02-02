import { firestore } from '../firebase';
import { doc, getDoc } from '@firebase/firestore'
import { API_KEYS } from './constants';
import { customFetch } from '../services';

export const getApiKeys = async () => {
    const documentReference = await doc(firestore, 'apiKeys', 'geoApi');
    const geoApiKey = await getDoc(documentReference).then(geoApiData => geoApiData.get('key'));

    return {
        [API_KEYS.GEO_API]: geoApiKey
    }
}

export const getIpInformation = async (ipAddressOrDomain) => {
    try {
        const apiKeys = await getApiKeys();
        const geoURL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKeys[API_KEYS.GEO_API]}${ipAddressOrDomain}`;

        return customFetch(geoURL);
    } catch (e) {
        console.error(`Oh no! Something happened ${e}`);
    }
};

export const getIpAddress = (userInput) => /^((((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}\*)|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}\*)|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){1}\*))$/g.test(userInput) ? `&ipAddress=${userInput}` : '';

export const getDomain = (userInput) => /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(userInput) ? `&domain=${userInput}` : '';
