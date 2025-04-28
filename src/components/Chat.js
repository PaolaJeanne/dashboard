import React, { useState, useEffect, useRef } from 'react'; // Hooks React
import '../styles/Chat.css'; // Fichier CSS pour le style du chat
import 'font-awesome/css/font-awesome.min.css';

const Chat = () => {
  // Références pour le chat
  const chatEndRef = useRef(null);
  //const messageTimeoutRef = useRef(null);

  // État pour le chat
  const [ui, setUi] = useState({
    chat: [],
    newMessage: '',
    message: null,
    messageTimeout: null,
  });

  // Génération de réponse automatique après un message utilisateur
  useEffect(() => {
    if (ui.chat.length > 0 && ui.chat[ui.chat.length - 1].sender === 'user') {
      const timer = setTimeout(() => {
        const lastMsg = ui.chat[ui.chat.length - 1].text.toLowerCase();
        let response = 'Nous avons bien reçu votre message et y répondrons rapidement.';

        // Réponses intelligentes basées sur le contenu du message
        if (lastMsg.includes('délai') || lastMsg.includes('temps')) {
          response = 'Nous traitons généralement les commandes dans un délai de 24h ouvrées.';
        } else if (lastMsg.includes('prix') || lastMsg.includes('coût') || lastMsg.includes('tarif')) {
          response = 'Le prix dépend du nombre de pages et des options choisies. Vous pouvez voir une estimation dans le récapitulatif de commande.';
        } else if (lastMsg.includes('livraison') || lastMsg.includes('adresse')) {
          response = 'Veuillez renseigner votre adresse complète dans la section "Adresse de livraison". Nous vous confirmerons la disponibilité pour votre zone.';
        } else if (lastMsg.includes('reliure') || lastMsg.includes('relier')) {
          response = 'Nous proposons plusieurs types de reliures : agrafage, spirales plastique ou métallique, et reliure thermocollée. Chaque option a un prix différent.';
        } else if (lastMsg.includes('copies') || lastMsg.includes('exemplaires')) {
          response = 'Vous pouvez commander jusqu\'à 100 exemplaires par commande. Pour des volumes plus importants, veuillez nous contacter directement.';
        }

        setUi(prev => ({
          ...prev,
          chat: [...prev.chat, {
            sender: 'admin',
            text: response,
            time: new Date()
          }]
        }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ui.chat]);

  // Gestion du chat
  const handleChat = (e) => {
    e.preventDefault();
    if (!ui.newMessage.trim()) return;

    const msg = {
      sender: 'user',
      text: ui.newMessage,
      time: new Date()
    };

    setUi(prev => ({
      ...prev,
      chat: [...prev.chat, msg],
      newMessage: ''
    }));
  };

  return (
    <section className="nc-chat-section">
      <h2>
        <i className="fas fa-comments"></i> Assistance
      </h2>
      <div className="nc-chat">
        {ui.chat.length === 0 ? (
          <div className="nc-chat-empty">
            <i className="fas fa-comment-dots"></i>
            <p>Posez vos questions à notre équipe</p>
            <div className="nc-chat-suggestion">
              <button 
                onClick={() => {
                  setUi(prev => ({
                    ...prev, 
                    newMessage: "Quel est le délai de livraison ?"
                  }));
                }}
              >
                Délai de livraison ?
              </button>
              <button 
                onClick={() => {
                  setUi(prev => ({
                    ...prev, 
                    newMessage: "Comment sont calculés les prix ?"
                  }));
                }}
              >
                Tarifs ?
              </button>
              <button 
                onClick={() => {
                  setUi(prev => ({
                    ...prev, 
                    newMessage: "Quelles reliures proposez-vous ?"
                  }));
                }}
              >
                Types de reliures ?
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="nc-chat-date">
              Aujourd'hui
            </div>
            <div className="nc-chat-welcome">
              <p>Bonjour ! Comment puis-je vous aider avec votre commande d'impression ?</p>
            </div>
            {ui.chat.map((msg, i) => (
              <div key={i} className={`nc-chat-msg ${msg.sender}`}>
                <div className="nc-msg-content">{msg.text}</div>
                <div className="nc-msg-time">
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleChat} className="nc-chat-input">
        <input
          type="text"
          placeholder="Écrivez votre message..."
          value={ui.newMessage}
          onChange={(e) => setUi(prev => ({ ...prev, newMessage: e.target.value }))}
        />
        <button type="submit" disabled={!ui.newMessage.trim()}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </section>
  );
};

export default Chat;