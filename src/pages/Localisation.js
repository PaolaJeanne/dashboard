import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Localisation.css';

// Configuration des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Limites de la zone : Douala et Yaoundé
const boundsDoualaYaounde = [
  [3.7, 9.5], // Sud-Ouest
  [4.3, 11.7], // Nord-Est
];

// Vérifie si une position est dans les limites définies
const isWithinBounds = (lat, lng) => {
  const [southWest, northEast] = boundsDoualaYaounde;
  return lat >= southWest[0] && lat <= northEast[0] && lng >= southWest[1] && lng <= northEast[1];
};

// Composant pour recentrer la carte
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

const Localisation = ({ onLocationSelect, onLocationValidation, initialLocation }) => {
  // États principaux
  const [userLocation, setUserLocation] = useState(initialLocation);
  const [locationInput, setLocationInput] = useState(initialLocation?.address || '');
  const [mapCenter, setMapCenter] = useState([4.05, 9.7]); // Par défaut sur Douala-Yaoundé
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [savedLocations, setSavedLocations] = useState([]);
  const mapRef = useRef(null);

  // Initialisation avec la localisation initiale
  useEffect(() => {
    if (initialLocation) {
      setUserLocation(initialLocation);
      setMapCenter([initialLocation.lat, initialLocation.lng]);
      setLocationInput(initialLocation.address || '');
    }
  }, [initialLocation]);

  // Déplacez la déclaration de `updateLocation` avant le hook `useEffect`
  const updateLocation = React.useCallback((location, messageText, messageType) => {
    setUserLocation(location);
    setMapCenter([location.lat, location.lng]);
    onLocationSelect(location);
    setMessage({ text: messageText, type: messageType });
  }, [onLocationSelect]);

  // Détection automatique de la position de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (isWithinBounds(latitude, longitude)) {
            const newLocation = {
              lat: latitude,
              lng: longitude,
              address: 'Votre position actuelle',
            };
            updateLocation(newLocation, 'Localisation détectée dans la zone.', 'success');
          } else {
            setMessage({ text: 'Vous êtes hors de Douala et Yaoundé.', type: 'warning' });
          }
          setIsLoading(false);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          setMessage({
            text: "Impossible d'obtenir votre position. Veuillez entrer une adresse manuellement.",
            type: 'warning',
          });
          setIsLoading(false);
        },
        { timeout: 10000 }
      );
    } else {
      setMessage({ text: "La géolocalisation n'est pas supportée.", type: 'error' });
    }
  }, [onLocationSelect, updateLocation]);

  // Gestion de la recherche d'adresse
  const handleSearchLocation = () => {
    if (!locationInput.trim()) {
      setMessage({ text: 'Veuillez entrer une adresse.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: 'Recherche de la localisation...', type: 'info' });

    setTimeout(() => {
      const simulatedLocation = {
        lat: 4.05 + (Math.random() * 0.1 - 0.05),
        lng: 9.7 + (Math.random() * 0.1 - 0.05),
        address: locationInput,
      };

      if (isWithinBounds(simulatedLocation.lat, simulatedLocation.lng)) {
        updateLocation(simulatedLocation, `Localisation trouvée: ${locationInput}`, 'success');
      } else {
        setMessage({ text: 'Adresse hors de Douala et Yaoundé.', type: 'warning' });
      }
      setIsLoading(false);
    }, 1500);
  };

  // Enregistre une localisation
  const handleSaveLocation = () => {
    if (!userLocation) {
      setMessage({ text: 'Aucune localisation à enregistrer.', type: 'error' });
      return;
    }

    const newLocation = {
      ...userLocation,
      address: locationInput || 'Localisation actuelle',
      timestamp: new Date().toISOString(),
    };

    setSavedLocations([...savedLocations, newLocation]);
    setMessage({ text: `Localisation enregistrée: ${newLocation.address}`, type: 'success' });
  };

  // Utilise une localisation enregistrée
  const handleUseSavedLocation = (location) => {
    updateLocation(location, `Localisation chargée: ${location.address}`, 'info');
    if (onLocationValidation) {
      onLocationValidation(location);
    }
  };

  return (
    <div className="localisation-dashboard">
      <h2 className="dashboard-title">
        <i className="fas fa-map-marker-alt"></i> Localisation (Douala & Yaoundé)
      </h2>

      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

      <div className="location-controls">
        <div className="search-box">
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="Entrez une adresse..."
            disabled={isLoading}
          />
          <button onClick={handleSearchLocation} disabled={isLoading} className="search-button">
            {isLoading ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>

        <div className="map-actions">
          <button
            onClick={() =>
              navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords;
                if (isWithinBounds(latitude, longitude)) {
                  const newLocation = {
                    lat: latitude,
                    lng: longitude,
                    address: 'Votre position actuelle',
                  };
                  updateLocation(newLocation, 'Position mise à jour.', 'success');
                } else {
                  setMessage({ text: 'Vous êtes hors de Douala/Yaoundé.', type: 'warning' });
                }
              })
            }
            className="locate-button"
            disabled={isLoading}
          >
            <i className="fas fa-location-arrow"></i> Ma position
          </button>

          <button
            onClick={handleSaveLocation}
            disabled={!userLocation || isLoading}
            className="save-button"
          >
            <i className="fas fa-save"></i> Enregistrer
          </button>
        </div>
      </div>

      <div className="map-container">
        {isLoading ? (
          <div className="map-loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Chargement de la carte...</p>
          </div>
        ) : (
          <MapContainer
            center={mapCenter}
            zoom={12}
            style={{ height: '400px', borderRadius: '8px' }}
            whenCreated={(map) => {
              mapRef.current = map;
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {userLocation && (
              <Marker position={userLocation}>
                <Popup>
                  {locationInput || 'Votre position actuelle'} <br />
                  Latitude: {userLocation.lat.toFixed(4)} <br />
                  Longitude: {userLocation.lng.toFixed(4)}
                </Popup>
              </Marker>
            )}
            <RecenterMap center={mapCenter} />
          </MapContainer>
        )}
      </div>

      {savedLocations.length > 0 && (
        <div className="saved-locations">
          <h3>
            <i className="fas fa-bookmark"></i> Localisations enregistrées
          </h3>
          <ul>
            {savedLocations.map((loc, index) => (
              <li key={index}>
                <div className="location-info">
                  <p className="location-address">{loc.address}</p>
                  <p className="location-coords">
                    {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                  </p>
                  <p className="location-time">{new Date(loc.timestamp).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleUseSavedLocation(loc)}
                  className="use-location-button"
                >
                  <i className="fas fa-map-pin"></i> Utiliser
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Localisation;