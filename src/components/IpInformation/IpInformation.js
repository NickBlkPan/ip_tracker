import './IpInformation.css';
import downArrow from './../../assets/img/icons/down-arrow.png'

import { useState } from 'react';

const IpInformation = ({ ipInformationItems }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const ipInformationClass = `ipInformation ${isCollapsed ? 'ipInformation--collapsed' : ''}`;
    
    const handleToggleIpInformationCollapse = () => setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
    
    return (
        <section className={ipInformationClass}>
            {ipInformationItems.map(({ title, value }) =>
                <div key={title} className="ipInformation__item">
                    <p className="ipInformation__title">{title}</p>
                    <p className="ipInformation__value">{value}</p>
                </div>
            )}
            
            <button className="ipInformation__close" onClick={handleToggleIpInformationCollapse}>
                <img src={downArrow} alt="close ip information"/>
            </button>
        </section>
    );
};

export default IpInformation;
