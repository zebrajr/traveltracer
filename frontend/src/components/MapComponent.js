import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [geoJson, setGeoJson] = useState(null);
  const [visitedPois, setVisitedPois] = useState([]);
  const [wishlistPois, setWishlistPois] = useState([]);

  useEffect(() => {
    // Fetch GeoJSON data
    fetch('world.json')
      .then(res => res.json())
      .then(data => setGeoJson(data));

    // Fetch Visited POIs
    fetch('lists/visited.json')
      .then(res => res.json())
      .then(data => setVisitedPois(data));

    // Fetch Wishlist POIs
    fetch('lists/wishlist.json')
      .then(res => res.json())
      .then(data => setWishlistPois(data));
  }, []);

  const visitedIcon = L.icon({
    iconUrl: 'images/marker-visited.png', // URL to your visited icon
    iconSize: [25, 25], // size of the icon
  });

  const wishlistIcon = L.icon({
    iconUrl: 'images/marker-wishlist.png', // URL to your wishlist icon
    iconSize: [25, 25], // size of the icon
  });

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={5} style={{ height: '100vh', width: '100wh' }}>
      <TileLayer
        url="http://localhost:port/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      {geoJson && <GeoJSON data={geoJson} />}
      {visitedPois.map(poi => (
        <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={visitedIcon}>
          <Popup>
            <div>
              <h2>{poi.name}</h2>
              <p>{poi.description}</p>
              <img
                src={poi.thumbnailUrl}
                alt={`Thumbnail of ${poi.name}`}
                style={{ cursor: 'pointer' }}
                onClick={() => openInNewTab(poi.imageUrl)}
              />
            </div>
          </Popup>
        </Marker>
      ))}

      {wishlistPois.map(poi => (
        <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={wishlistIcon}>
          <Popup>
            <div>
              <h2>{poi.name}</h2>
              <p>{poi.description}</p>
              <img
                src={poi.thumbnailUrl}
                alt={`Thumbnail of ${poi.name}`}
                style={{ cursor: 'pointer' }}
                onClick={() => openInNewTab(poi.imageUrl)}
              />
            </div>
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};


export default MapComponent;