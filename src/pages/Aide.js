import React from 'react';
import { Mail, HelpCircle } from 'lucide-react';
import '../styles/Aide.css';

const Aide = () => {
  return (
    <div className="aide-container">
      <div className="aide-header">
        <HelpCircle size={28} />
        <h2>Centre d'aide</h2>
      </div>
      <p className="aide-description">
        Besoin d’aide ? Trouvez rapidement des réponses à vos questions ou contactez notre support technique.
      </p>

      <div className="aide-options">
        <div className="aide-option">
          <h4>📚 Consulter la FAQ</h4>
          <p>Explorez les questions fréquentes pour résoudre les problèmes courants.</p>
          <a href="/faq" className="aide-link">Voir la FAQ</a>
        </div>

        <div className="aide-option">
          <h4><Mail size={18} style={{ verticalAlign: 'middle' }} /> Contacter le support</h4>
          <p>Notre équipe est disponible du lundi au vendredi pour vous aider.</p>
          <a href="mailto:support@tonsite.com" className="aide-link">Envoyer un message</a>
        </div>
      </div>
    </div>
  );
};

export default Aide;
