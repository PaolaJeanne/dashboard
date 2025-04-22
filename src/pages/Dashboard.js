import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const stats = [
    { label: "Total commandes", value: 15 },
    { label: "En cours", value: 3 },
    { label: "Validées", value: 12 },
  ];

  const actions = [
    { label: "Nouvelle commande", link: "/nouvelle-commande" },
    { label: "Mes commandes", link: "/mes-commandes" },
    { label: "Fichiers", link: "/fichier" },
  ];

  const historique = [
    { date: '18/04/2025', fichier: 'rapport_stage.pdf', statut: 'Validé' },
    { date: '15/04/2025', fichier: 'affiche.png', statut: 'En cours' },
    { date: '10/04/2025', fichier: 'cv.docx', statut: 'En attente' },
  ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Bienvenue, Jean Dupont</h2>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <h3 className="dashboard-subtitle">Actions rapides</h3>
      <div className="actions-grid">
        {actions.map((action, i) => (
          <Link to={action.link} key={i} className="action-card">
            {action.label}
          </Link>
        ))}
      </div>

      <h3 className="dashboard-subtitle">Historique récent</h3>
      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Fichier</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {historique.map((entry, i) => (
            <tr key={i}>
              <td>{entry.date}</td>
              <td>{entry.fichier}</td>
              <td>
                <span className={`badge ${entry.statut.toLowerCase().replace(' ', '')}`}>
                  {entry.statut}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/historique" className="see-more-link">Voir plus </Link>
    </div>
  );
};

export default Dashboard;
