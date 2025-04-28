import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, FaPlus, FaList,FaCog, FaQuestionCircle, FaTimes, FaBars,FaFileInvoice, 
  FaHistory , FaComments
} from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const links = [
    { path: '/dashboard', icon: <FaHome />, label: 'Tableau de bord' },
    { path: '/nouvelle-commande', icon: <FaPlus />, label: 'Nouvelle commande' },
    { path: '/mes-commandes', icon: <FaList />, label: 'Mes commandes' },
    { path: '/factures', icon: <FaFileInvoice />, label: 'Factures' },
    { path: '/chat', icon: <FaComments />, label: 'Chat' },    { path: '/historique', icon: <FaHistory  />, label: 'Historique' },
    { path: '/parametres', icon: <FaCog />, label: 'Paramètres' },
    { path: '/aide', icon: <FaQuestionCircle />, label: 'Aide' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button 
        className="menu-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
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
              onClick={closeSidebar}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {isOpen && isMobile && (
        <div 
          className="sidebar-overlay" 
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;