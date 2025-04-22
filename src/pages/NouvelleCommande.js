import React, { useState } from 'react';
import '../styles/NouvelleCommande.css';

const NouvelleCommande = () => {
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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
      // reset form (optionnel)
    }, 2000);
  };

  const handleChatSubmit = () => {
    if (!newMessage.trim()) return;

    setMessages([...messages, { sender: 'client', text: newMessage }]);
    setNewMessage('');

    // simulate admin response
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
          <select><option>A4</option><option>A3</option></select>
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
