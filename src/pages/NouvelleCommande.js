import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/NouvelleCommande.css';
import 'leaflet/dist/leaflet.css';

const NouvelleCommande = () => {
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [copies, setCopies] = useState(1);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [userLocation, setUserLocation] = useState({ lat: 51.505, lng: -0.09 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = () => {
    if (!fileName) {
      setMessage("❗ Veuillez sélectionner un fichier.");
      return;
    }

    setLoading(true);
    setMessage('');

    setTimeout(() => {
      setLoading(false);
      setMessage('✅ Commande envoyée avec succès !');
    }, 2000);
  };

  const handleChatSubmit = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: 'client', text: newMessage }]);
    setNewMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'admin', text: 'Merci pour votre message. Nous le traitons.' }]);
    }, 1000);
  };

  return (
    <div className="commande-page">
      <h2>Nouvelle commande 🖨️</h2>

      {/* Upload */}
      <div className="upload-section">
        <label htmlFor="file-upload">
          {fileName ? `Fichier sélectionné : ${fileName}` : "Cliquez ou glissez un fichier ici"}
        </label>
        <input type="file" id="file-upload" onChange={handleFileChange} />
      </div>

      {/* Options */}
      <div className="options-grid">
        <div>
          <label>Nombre de copies</label>
          <input type="number" min="1" value={copies} onChange={(e) => setCopies(e.target.value)} />
        </div>
        <div>
          <label>Impression</label>
          <select><option>Recto</option><option>Recto-verso</option></select>
        </div>
        <div>
          <label>Couleur</label>
          <select><option>Noir & blanc</option><option>Couleur</option></select>
        </div>
        <div>
          <label>Agrafage</label>
          <select><option>Non</option><option>Oui</option></select>
        </div>
        <div>
          <label>Format</label>
          <select>
            <option>A4</option>
            <option>A3</option>
            <option>A5</option>
            <option>21x29,7</option>
            <option>Personnalisé</option>
          </select>
        </div>
        <div>
          <label>Type de papier</label>
          <select>
            <option>Brillant</option>
            <option>Mat</option>
            <option>Recyclé</option>
          </select>
        </div>
        <div>
          <label>Grammage</label>
          <select>
            <option>80g</option>
            <option>100g</option>
            <option>135g</option>
            <option>170g</option>
            <option>300g</option>
          </select>
        </div>
        <div>
          <label>Pelliculage</label>
          <select>
            <option>Aucun</option>
            <option>Brillant</option>
            <option>Mat</option>
            <option>Soft touch</option>
          </select>
        </div>
        <div>
          <label>Reliure</label>
          <select>
            <option>Aucune</option>
            <option>Agrafes</option>
            <option>Spirale</option>
            <option>Dos carré collé</option>
          </select>
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <label>Instructions pour l'imprimeur</label>
        <textarea
          rows="3"
          placeholder="Ex : Merci d'imprimer sans marges..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>

      {/* Localisation */}
      <div className="localisation-section">
        <label>Adresse de livraison</label>
        <input
          type="text"
          placeholder="Ex: Rue 123, quartier XYZ"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <MapContainer center={userLocation} zoom={13} style={{ width: "100%", height: "300px", marginTop: '10px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={userLocation}>
            <Popup>
              Votre position actuelle
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <button className="send-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "⏳ Envoi en cours..." : "📤 Envoyer la commande"}
      </button>

      {message && <p className="message">{message}</p>}

      {/* Chat */}
      <div className="chat-section">
        <h3>Chat avec l'imprimeur 💬</h3>
        <div className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Écrivez un message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleChatSubmit}>Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default NouvelleCommande;
