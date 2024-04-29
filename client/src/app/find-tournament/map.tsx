import React, { useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import './map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZmxvcmlhbm1hcGJveCIsImEiOiJjbHYyZ2NpamEwMGI2MmpuenI1eHV4ajZpIn0.fqlsYbexyp6HlPKFTjuJDw';

const LONGITUDE = 49;
const LATITUDE = 3.7;
const ZOOM_LEVEL = 5;

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

// Convert degrees to radians
function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

// Fixme: not keep data if change to table view
var gotLocation = false;

const Map: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null });
    const [distance, setDistance] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(ZOOM_LEVEL);

    
    
    // Calculate the distance between two coordinates using the Haversine formula
    
    const [currentPosition, setCurrentPosition] = useState({ latitude: LATITUDE, longitude: LONGITUDE });
    // Get the current position
    navigator.geolocation.getCurrentPosition((position) => {
        if(gotLocation) return;
        gotLocation = true;
        setCurrentPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        console.log('Got location');
        
    });
    // Not refetching 
    useEffect(() => {
        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                zoom: zoomLevel,
                center: selectedLocation.latitude ? [selectedLocation.longitude, selectedLocation.latitude]: [currentPosition.longitude, currentPosition.latitude] ,
            });
            // Add any additional map customization or features here

            // Add a search bar inside the map to find city
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                placeholder: 'Search for a city',
            });

            geocoder.on('result', (e: any) => {
                const selectedLatitude = e.result.center[1];
                const selectedLongitude = e.result.center[0];
                setZoomLevel(10);
                setSelectedLocation({ latitude: selectedLatitude, longitude: selectedLongitude });
                // Calculate the distance between the current position and the selected location
                setDistance(calculateDistance(
                    currentPosition.latitude,
                    currentPosition.longitude,
                    selectedLatitude,
                    selectedLongitude
                ));
            });
            map.addControl(geocoder, 'top-left');
            
            return () => {
                map.remove();
            };
        }
    }, [currentPosition, zoomLevel]);



    return (
        <main>
            <h3>
                Find tournaments near you
            </h3>
            {selectedLocation.latitude && selectedLocation.longitude && (
                <div>
                    <p>You will travel {Math.round(distance)} km for this tournament. Awesome trip!</p>                
                </div>
            )}    
            <div ref={mapContainerRef} className='map-container' />;
        </main>
    );
    
};

export default Map;