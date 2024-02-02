import './IpControl.css';
import { useState } from 'react';
import iconArrow from './../../assets/img/icons/icon-arrow.svg';
import { fakeTranslations } from '../../fakeTranslations';
import { getDomain, getIpAddress } from '../../common/utils';

import { IpInformation } from '../IpInformation';

const {
    ipControl,
    ipInformation: { IP_ADDRESS, LOCATION, TIMEZONE, ISP, UTC }
} = fakeTranslations;

const IpControl = ({ isFetching, ipInformation, handleGetIpInformation }) => {
    const [userInput, setUserInput] = useState('');
    const [hasValidationError, setHasValidationError] = useState(false);

    const {
        ip,
        isp,
        location: {city, timezone, country, postalCode} = {}
    } = ipInformation || {};

    const ipInformationItems = [
        {
            title: IP_ADDRESS,
            value: ip
        },
        {
            title: LOCATION,
            value: `${city}, ${country} ${postalCode}`
        },
        {
            title: TIMEZONE,
            value: `${UTC} ${timezone}`
        },
        {
            title: ISP,
            value: isp
        }
    ];
    
    const ipControlInputClass = `ipControl__input ${hasValidationError ? 'ipControl__input--error' : ''}`;
    const ipControlInputPlaceholder = hasValidationError ? ipControl.INPUT_VALIDATION_ERROR :  ipControl.INPUT_PLACEHOLDER;
    
    const handleClearValidationError = () => {
        if (hasValidationError) setHasValidationError(false);
    }
    
    const isValidationError = (ipAddressOrDomain) => {
        if (!ipAddressOrDomain) {
            setUserInput('');
            setHasValidationError(true);
            return true;
        }
        
        return false
    }
    
    const handleInputChange = ({ target: { value } }) => setUserInput(value);
    
    const handleSubmitCallback = () => {
        const getIpAddressOrDomain = getIpAddress(userInput) || getDomain(userInput);
        
        if (isValidationError(getIpAddressOrDomain)) return;

        handleGetIpInformation(getIpAddressOrDomain);
    }
    
    const handleSubmitCallbackKeyUp = ({ key }) => (key === 'Enter') && handleSubmitCallback();
    
    return (
        <header className="ipControl">
            <h1 className="ipControl__heading">
                {ipControl.H1}
            </h1>

            <div className="ipControl__wrapper">
                <input
                    className={ipControlInputClass}
                    type="text"
                    placeholder={ipControlInputPlaceholder}
                    onChange={handleInputChange}
                    onKeyDown={handleClearValidationError}
                    onKeyUp={handleSubmitCallbackKeyUp}
                    disabled={isFetching}
                    value={userInput}
                />

                <button
                    className="ipControl__button"
                    onClick={handleSubmitCallback}
                    disabled={isFetching}
                >
                    <img
                        src={iconArrow}
                        alt={ipControl.ICON_ARROW_ALT}
                    />
                </button>

                {ipInformation && <IpInformation ipInformationItems={ipInformationItems} />}
            </div>
        </header>
    );
};

export default IpControl;
