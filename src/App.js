import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'; // Import du composant Navbar
import Dashboard from './pages/Dashboard';
import NouvelleCommande from './pages/NouvelleCommande';
import Fichier from './pages/Fichier';
import Localisation from './pages/Localisation';
import MesCommandes from './pages/MesCommandes';
import SuiviCommande from './pages/SuiviCommande';
import Factures from './pages/Factures';
import Favoris from './pages/Favoris';
import Parametres from './pages/Parametres';
import Aide from './pages/Aide';
import Historique from './pages/Historique';
import MesFactures from './pages/MesFactures';
import './App.css';
import Chat from './components/Chat.js';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar /> {/* Utilisation du composant Navbar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        {/* Contenu principal */}
        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/nouvelle-commande" element={<NouvelleCommande />} />
            <Route path="/mes-commandes" element={<MesCommandes />} />
            <Route path="/fichier" element={<Fichier />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/suivi-commande/:id" element={<SuiviCommande />} />
            <Route path="/historique" element={<Historique />} />
            <Route path="/localisation" element={<Localisation />} />
            <Route path="/facture/:commandeId" element={<Factures />} />
            <Route path="/factures" element={<MesFactures />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/parametres" element={<Parametres />} />
            <Route path="/aide" element={<Aide />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;