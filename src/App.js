import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
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

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/nouvelle-commande" element={<NouvelleCommande />} />
            <Route path="/mes-commandes" element={<MesCommandes />} />
            <Route path="/fichier" element={<Fichier />} />
            <Route path="/suivi-commande/:id" element={<SuiviCommande />} />
            <Route path="/localisation" element={<Localisation />} />
            <Route path="/factures" element={<Factures />} />
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
