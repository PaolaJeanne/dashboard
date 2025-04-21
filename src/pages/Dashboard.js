import React, { useState } from 'react';
import '../styles/Dashboard.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS

const Dashboard = () => {
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['application/pdf', 'image/png', 'application/msword'];
    
    if (file && allowedTypes.includes(file.type)) {
      setFileName(file.name);
    } else {
      alert('Type de fichier non autorisé. Veuillez télécharger un PDF, PNG ou DOC.');
    }
  };

  const handleSubmit = () => {
    if (!fileName) {
      alert('Veuillez sélectionner un fichier avant d\'envoyer la commande.');
      return;
    }
    
    setLoading(true);
    // Simuler une opération asynchrone
    setTimeout(() => {
      setLoading(false);
      alert('Commande envoyée avec succès !');
    }, 2000);
  };

  return (
    <div className="dashboard">
      <h2 className="welcome">Bienvenue Jean Dupont 👋</h2>

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

      <button className="send-button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Envoi...' : '📤 Envoyer la commande'}
      </button>

      {/* Historique */}
      <div className="history-section">
        <h3>📑 Historique des commandes</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Fichier</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12/04/2025</td>
              <td>rapport_stage.pdf</td>
              <td><span className="badge valid">Validé</span></td>
              <td><button className="small-btn">Voir</button></td>
            </tr>
            <tr>
              <td>10/04/2025</td>
              <td>affiche.png</td>
              <td><span className="badge pending">En cours</span></td>
              <td><button className="small-btn">Télécharger</button></td>
            </tr>
            <tr>
              <td>02/04/2025</td>
              <td>cv.docx</td>
              <td><span className="badge waiting">En attente</span></td>
              <td><button className="small-btn">Modifier</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;