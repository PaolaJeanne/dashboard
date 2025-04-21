import React, { useState } from 'react';
import '../styles/NouvelleCommande.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS

const NouvelleCommande = () => {
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = () => {
    if (!fileName) {
      setMessage("Veuillez sélectionner un fichier avant de soumettre.");
      return;
    }

    setLoading(true);
    setMessage('');

    // Simulation d’un appel réseau
    setTimeout(() => {
      setLoading(false);
      setMessage('✅ Fichier envoyé avec succès !');
    }, 2000);
  };

  return (
    <div className="dashboard">
      <h2 className="welcome">Nouvelle commande 🖨️</h2>

      {/* Upload */}
      <div className="upload-box">
        <label htmlFor="file-upload" className="upload-label">
          {fileName ? (
            <p>Fichier sélectionné : <strong>{fileName}</strong></p>
          ) : (
            <p>Glissez-déposez votre fichier ici ou cliquez pour parcourir</p>
          )}
        </label>
        <input type="file" id="file-upload" onChange={handleFileChange} />
      </div>

      {/* Paramètres */}
      <div className="options-grid">
        <div>
          <label>Impression</label>
          <select>
            <option>Recto</option>
            <option>Recto-verso</option>
          </select>
        </div>
        <div>
          <label>Couleur</label>
          <select>
            <option>Noir & blanc</option>
            <option>Couleur</option>
          </select>
        </div>
        <div>
          <label>Agrafage</label>
          <select>
            <option>Non</option>
            <option>Oui</option>
          </select>
        </div>
        <div>
          <label>Format</label>
          <select>
            <option>A4</option>
            <option>A3</option>
          </select>
        </div>
      </div>

      <button
        className="send-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? '⏳ Envoi en cours...' : '📤 Lancer l\'impression'}
      </button>

      {message && <p className="feedback">{message}</p>}
    </div>
  );
};

export default NouvelleCommande;
