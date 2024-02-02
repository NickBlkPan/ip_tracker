import './IpInformation.css';

const IpInformation = ({ ipInformationItems }) => (
    <section className="ipInformation">
        {ipInformationItems.map(({ title, value }) =>
            <div key={title} className="ipInformation__item">
                <p className="ipInformation__title">{title}</p>
                <p className="ipInformation__value">{value}</p>
            </div>
        )}
    </section>
);

export default IpInformation;
