import './Map.css';
import { barsSettings, mapSettings } from './config';
import pin from '../../assets/img/icons/icon-location.svg';
import { fakeTranslations } from '../../fakeTranslations';

import { Bars } from 'react-loader-spinner';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';
import { Icon } from 'leaflet';

import { ErrorPage } from '../ErrorPage';

// Info: I like to do all of my destructuring and declarations outside the component whenever possible, so that they don't re-run all the time
// when the component re-renders
const { map: { POPUP, TITLE_LAYER } } = fakeTranslations;
const { color, height, width, visible } = barsSettings;
const { zoom, zoomControl, scrollWheelZoom } = mapSettings;

const customIcon = new Icon({
    iconUrl: pin,
    iconSize: [46, 56]
});

const Map = ({ isFetching, ipLocationInformation = {} }) => {
    if (isFetching) {
        return (
            <main className="map map--loader">
                <Bars
                    color={color}
                    height={height}
                    width={width}
                    visible={visible}
                    ariaLabel="loading"
                />
            </main>
        );
    }

    if (
        !ipLocationInformation ||
        !ipLocationInformation.lat ||
        !ipLocationInformation.lng
    ) {
        return <ErrorPage />;
    }
    
    const mapContainerKey = `${ipLocationInformation.lat}_${ipLocationInformation.lng}`;
    const geoCoordinate = [ipLocationInformation.lat, ipLocationInformation.lng];

    return (
        <main className="map">
            <MapContainer
                key={mapContainerKey}
                center={geoCoordinate}
                zoom={zoom}
                zoomControl={zoomControl}
                scrollWheelZoom={scrollWheelZoom}
            >
                <TileLayer
                    attribution={TITLE_LAYER.ATTRIBUTION}
                    url={TITLE_LAYER.URL}
                />

                <Marker
                    icon={customIcon}
                    position={geoCoordinate}
                >
                    <Popup>
                        {POPUP}
                    </Popup>
                </Marker>
            </MapContainer>
        </main>
    );
};

export default Map;
