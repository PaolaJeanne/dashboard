import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/Localisation.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS
import 'leaflet/dist/leaflet.css'; // Importation du CSS de Leaflet

const Localisation = () => {
  const [userLocation, setUserLocation] = useState({ lat: 51.505, lng: -0.09 });  // Par défaut, Londres
  const [locationInput, setLocationInput] = useState('');

  useEffect(() => {
    // Pour simuler la récupération de la localisation de l'utilisateur
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const handleLocationChange = (event) => {
    setLocationInput(event.target.value);
  };

  const handleSubmitLocation = () => {
    alert(`Nouvelle localisation enregistrée : ${locationInput}`);
    // Ici, tu pourrais mettre à jour la localisation dans un backend ou quelque part ailleurs
  };

  return (
    <div className="dashboard">
      <h2 className="welcome">Localisation 📍</h2>

      <div className="location-form">
        <label htmlFor="location-input">Entrez une localisation :</label>
        <input 
          id="location-input" 
          type="text" 
          value={locationInput} 
          onChange={handleLocationChange} 
        />
        <button onClick={handleSubmitLocation}>Enregistrer</button>
      </div>

      <div className="map-container">
        <MapContainer center={userLocation} zoom={13} style={{ width: "100%", height: "400px" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={userLocation}>
            <Popup>
              Vous êtes ici : <br /> Latitude: {userLocation.lat} <br /> Longitude: {userLocation.lng}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Localisation;
