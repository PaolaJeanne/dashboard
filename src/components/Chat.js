import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chat.css';
import { FaComments, FaCommentDots, FaUser, FaRobot, FaPaperPlane, FaEllipsisH } from 'react-icons/fa';

const Chat = () => {
  const chatEndRef = useRef(null);

  const [ui, setUi] = useState({
    chat: [],
    newMessage: '',
    isTyping: false,
  });

  // Scroller automatiquement vers le bas
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ui.chat]);

  // Génération de réponse automatique
  useEffect(() => {
    if (ui.chat.length > 0 && ui.chat[ui.chat.length - 1].sender === 'user') {
      setUi(prev => ({ ...prev, isTyping: true }));

      const timer = setTimeout(() => {
        const lastMsg = ui.chat[ui.chat.length - 1].text.toLowerCase();
        let response = 'Nous avons bien reçu votre message et y répondrons rapidement.';

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
          chat: [...prev.chat, { sender: 'admin', text: response, time: new Date() }],
          isTyping: false,
        }));
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [ui.chat]);

  // Gestion de l'envoi de messages
  const handleChat = (e) => {
    e.preventDefault();
    if (!ui.newMessage.trim()) return;

    const msg = {
      sender: 'user',
      text: ui.newMessage.trim(),
      time: new Date(),
    };

    setUi(prev => ({
      ...prev,
      chat: [...prev.chat, msg],
      newMessage: '',
    }));
  };

  // Suggestions de questions
  const handleSuggestion = (suggestion) => {
    setUi(prev => ({
      ...prev,
      newMessage: suggestion,
    }));
  };

  return (
    <section className="nc-chat-section">
      <h2>
        <FaComments /> Assistance
      </h2>
      <div className="nc-chat">
        {ui.chat.length === 0 ? (
          <div className="nc-chat-empty">
            <FaCommentDots />
            <p>Posez vos questions à notre équipe</p>
            <div className="nc-chat-suggestion">
              <button onClick={() => handleSuggestion('Quel est le délai de livraison ?')}>
                Délai de livraison ?
              </button>
              <button onClick={() => handleSuggestion('Comment sont calculés les prix ?')}>
                Tarifs ?
              </button>
              <button onClick={() => handleSuggestion('Quelles reliures proposez-vous ?')}>
                Types de reliures ?
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="nc-chat-date">Aujourd'hui</div>
            <div className="nc-chat-welcome">
              <p>Bonjour ! Comment puis-je vous aider avec votre commande d'impression ?</p>
            </div>
            {ui.chat.map((msg, i) => (
              <div key={i} className={`nc-chat-msg ${msg.sender}`}>
                <div className="nc-msg-avatar">
                  {msg.sender === 'user' ? <FaUser /> : <FaRobot />}
                </div>
                <div className="nc-msg-content">{msg.text}</div>
                <div className="nc-msg-time">
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {ui.isTyping && (
              <div className="nc-chat-typing">
                <FaEllipsisH /> L'équipe est en train de répondre...
              </div>
            )}
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
          <FaPaperPlane />
        </button>
      </form>
    </section>
  );
};

export default Chat;