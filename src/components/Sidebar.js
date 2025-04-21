// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, FaPlus, FaList, FaFileInvoice, 
  FaHeart, FaCog, FaQuestionCircle, FaSignOutAlt 
} from 'react-icons/fa';
import '../styles/Sidebar.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS

const Sidebar = () => {
  const links = [
    { path: '/dashboard', icon: <FaHome />, label: 'Tableau de bord' },
    { path: '/nouvelle-commande', icon: <FaPlus />, label: 'Nouvelle commande' },
    { path: '/mes-commandes', icon: <FaList />, label: 'Mes commandes' },
    { path: '/factures', icon: <FaFileInvoice />, label: 'Factures' },
    { path: '/favoris', icon: <FaHeart />, label: 'Favoris' },
    { path: '/parametres', icon: <FaCog />, label: 'Paramètres' },
    { path: '/aide', icon: <FaQuestionCircle />, label: 'Aide' }
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">
        <span className="black">Print</span><span className="blue">Easy</span>
      </h2>
      <nav>
        {links.map(link => (
          <NavLink 
            key={link.path} 
            to={link.path} 
            className={({ isActive }) => 
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
        <button className="sidebar-link logout" onClick={() => alert("Déconnexion...")}>
          <FaSignOutAlt />
          <span>Déconnexion</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
