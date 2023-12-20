import React, { useEffect, useState, useCallback, memo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, LayerGroup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom hook for fetching data
const useFetchData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData);
  }, [url]);

  return data;
};

const IconMarker = memo(({ poi, icon }) => {
  const openInNewTab = useCallback((url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }, []);

  return (
    <Marker position={[poi.lat, poi.lng]} icon={icon}>
      <Popup style={{ maxWidth: 'none', width: 'auto' }}>
        <div>
          <h2>{poi.name}</h2>
          <p>{poi.description}</p>
          {poi.images.map(([thumbnailUrl, imageUrl]) => (
            <img
              key={thumbnailUrl}
              src={thumbnailUrl}
              alt={`Thumbnail of ${poi.name}`}
              style={{ cursor: 'pointer', width: '100%', display: 'block', marginBottom: '5px' }}
              onClick={() => openInNewTab(imageUrl)}
            />
          ))}
        </div>
      </Popup>
    </Marker>
  );
});

const MapComponent = () => {
  const geoJson = useFetchData('maps/world.json');
  const visitedPois = useFetchData('lists/visited.json');
  const wishlistPois = useFetchData('lists/wishlist.json');

  const createIcon = (iconUrl) => L.icon({
    iconUrl,
    iconSize: [25, 25],
  });

  const visitedIcon = createIcon('images/marker-visited.png');
  const wishlistIcon = createIcon('images/marker-wishlist.png');

  return (
    <MapContainer center={[48.778, 9.180]} zoom={5} style={{ height: '100vh', width: '100wh' }}>
      <TileLayer
        url="http://localhost:port/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      {geoJson && <GeoJSON data={geoJson} />}

      <LayersControl position="topright">
        <LayersControl.Overlay name="Visited" checked>
          <LayerGroup>
            {visitedPois && visitedPois.map(poi => (
              <IconMarker key={poi.id} poi={poi} icon={visitedIcon} />
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Wishlist">
          <LayerGroup>
            {wishlistPois && wishlistPois.map(poi => (
              <IconMarker key={poi.id} poi={poi} icon={wishlistIcon} />
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default MapComponent;
