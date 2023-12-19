import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, LayerGroup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [geoJson, setGeoJson] = useState(null);
  const [visitedPois, setVisitedPois] = useState([]);
  const [wishlistPois, setWishlistPois] = useState([]);

  useEffect(() => {
    // Fetch GeoJSON data
    fetch('maps/world.json')
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

      <LayersControl position="topright">
        <LayersControl.Overlay name="Visited" checked>
          <LayerGroup>
            {visitedPois.map(poi => (
              <Marker position={[poi.lat, poi.lng]} icon={visitedIcon}>
                <Popup style={{ maxWidth: 'none', width: 'auto' }}>
                  <div>
                    <h2>{poi.name}</h2>
                    <p>{poi.description}</p>
                    {poi.images.map(([thumbnailUrl, imageUrl]) => (
                      <img
                        key={thumbnailUrl} // Unique key for React's rendering
                        src={thumbnailUrl}
                        alt={`Thumbnail of ${poi.name}`}
                        style={{ cursor: 'pointer', width: '100%', display: 'block', marginBottom: '5px' }}
                        onClick={() => openInNewTab(imageUrl)}
                      />
                    ))}
                  </div>
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Wishlist">
          <LayerGroup>
            {wishlistPois.map(poi => (
              <Marker position={[poi.lat, poi.lng]} icon={wishlistIcon}>
                <Popup style={{ maxWidth: 'none', width: 'auto' }}>
                  <div>
                    <h2>{poi.name}</h2>
                    <p>{poi.description}</p>
                    {poi.images.map(([thumbnailUrl, imageUrl]) => (
                      <img
                        key={thumbnailUrl} // Unique key for React's rendering
                        src={thumbnailUrl}
                        alt={`Thumbnail of ${poi.name}`}
                        style={{ cursor: 'pointer', width: '100%', display: 'block', marginBottom: '5px' }}
                        onClick={() => openInNewTab(imageUrl)}
                      />
                    ))}
                  </div>
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};


export default MapComponent;