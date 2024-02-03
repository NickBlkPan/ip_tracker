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

// Info: personally, I prefer to have all of my props destructuring done at top leave
// as I think this keeps things much cleaner than the alternative of doing 'const { someProp } = props'
const IpControl = (
    {
        isFetching,
        ipInformation,
        ipInformation: {
            ip,
            isp,
            location: {city, timezone, country, postalCode} = {}
        } = {},
        handleGetIpInformation
    }
) => {
    const [userInput, setUserInput] = useState('');
    const [hasValidationError, setHasValidationError] = useState(false);

    // Info: Read the info within the return for details
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
    
    // Info: for the sake of clean 'returns' within a React component, I think it is better to store any kind of
    // conditionals in variables and pass those variables where they're needed
    const ipControlInputClass = `ipControl__input ${hasValidationError ? 'ipControl__input--error' : ''}`;
    const ipControlInputPlaceholder = hasValidationError ? ipControl.INPUT_VALIDATION_ERROR :  ipControl.INPUT_PLACEHOLDER;
    
    const handleClearValidationError = () => {
        if (hasValidationError) setHasValidationError(false);
    }
    
    const isValidationError = (ipAddressOrDomain) => {
        // Info: since the method is called 'isValidationError', and we are checking for the existence of data, I took
        // the approach of returning true in the case of no data, so that we can do 'if (isValidationError)' which is
        // easier to read and understand for me
        if (!ipAddressOrDomain) {
            setUserInput('');
            setHasValidationError(true);
            return true;
        }
        
        return false
    }
    
    // Info: this is more of a personal preference, the same as with the destructuring of the component props
    const handleInputChange = ({ target: { value } }) => setUserInput(value);
    
    const handleSubmitCallback = () => {
        const getIpAddressOrDomain = getIpAddress(userInput) || getDomain(userInput);
        
        if (isValidationError(getIpAddressOrDomain)) return;

        handleGetIpInformation(getIpAddressOrDomain);
    }
    
    // Info: This is just to showcase both methods 'if (something)' or 'something &&'
    const handleSubmitCallbackKeyUp = ({ key }) => (key === 'Enter') && handleSubmitCallback();
    
    return (
        <header className="ipControl">
            {/* Info: haven't really used BEM in a long while, and this is the first time using it without SASS, but I through I would experiment a bit :)  */}
            <h1 className="ipControl__heading">
                {ipControl.H1}
            </h1>

            <div className="ipControl__wrapper">
                <input
                    className={ipControlInputClass}
                    type="text"
                    placeholder={ipControlInputPlaceholder}
                    onChange={handleInputChange}
                    // Info: this helps to clear the validation error before the 'keyup' event, since the 'keyup' event could be an actual letter
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

                {/* Info: doing the conditional rendering like this, prevents the component from being called at all, but it also pollutes the return a bit */}
                {/* so we could, pass the condition as a prop and check inside the component, as specially when the component is an 'iteration' component, */}
                {/* because then we don't have one extra prop for the render condition, but what about cases like this one I've expressly created? where we */}
                {/* have an array with objects and doing .length won't help? well, we could check the first object in the array for a property that should */}
                {/* always exist, and if the value is not what we expect it to be, prevent the return, or we could also extract this logic above the return */}
                {ipInformation && <IpInformation ipInformationItems={ipInformationItems} />}
            </div>
        </header>
    );
};

export default IpControl;
