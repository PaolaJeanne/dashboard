import React, { useState, useRef, useEffect, useCallback } from 'react';
import Localisation from './Localisation';
import { useDropzone } from 'react-dropzone';
import '../styles/NouvelleCommande.css';

// Options d'impression étendues
const PRINT_OPTIONS = [
  { name: 'printType', label: 'Impression', options: ['Recto', 'Recto-verso'] },
  { name: 'color', label: 'Couleur', options: ['Noir & blanc', 'Couleur'] },
  { 
    name: 'binding', 
    label: 'Reliure', 
    options: [
      'Aucune', 
      'Agrafage coin', 
      'Agrafage double', 
      'Spirale plastique', 
      'Spirale métallique', 
      'Thermocollée'
    ] 
  },
  { name: 'format', label: 'Format', options: ['A4', 'A3', 'A5'] }
];

// Présets de nombre de copies pour sélection rapide
const COPY_PRESETS = [1, 2, 5, 10, 20, 50];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png']
};

const NouvelleCommande = () => {
  // État principal pour le formulaire
  const [form, setForm] = useState({
    file: null,
    copies: 1,
    options: {
      printType: 'Recto',
      color: 'Noir & blanc',
      binding: 'Aucune',
      format: 'A4'
    },
    instructions: ''
  });
  
  // État pour l'interface utilisateur
  const [ui, setUi] = useState({
    loading: false,
    message: null,
    messageTimeout: null,
    chat: [],
    newMessage: '',
    location: null,
    pricingEstimate: null,
    formSubmitted: false,
    showBindingInfo: false
  });

  const chatEndRef = useRef(null);
  const messageTimeoutRef = useRef(null);

  // Fonction pour calculer une estimation de prix
  const calculatePriceEstimate = useCallback(() => {
    if (!form.file) return null;
    
    // Prix de base par page
    let basePrice = form.options.color === 'Couleur' ? 0.15 : 0.08;
    
    // Modificateurs
    if (form.options.printType === 'Recto-verso') basePrice *= 1.8;
    
    // Prix de reliure
    let bindingPrice = 0;
    switch(form.options.binding) {
      case 'Agrafage coin':
        bindingPrice = 0.5;
        break;
      case 'Agrafage double':
        bindingPrice = 0.8;
        break;
      case 'Spirale plastique':
        bindingPrice = 2.5;
        break;
      case 'Spirale métallique':
        bindingPrice = 3.5;
        break;
      case 'Thermocollée':
        bindingPrice = 5.0;
        break;
      default:
        bindingPrice = 0;
    }
    
    // Modificateur format
    if (form.options.format === 'A3') basePrice *= 2;
    if (form.options.format === 'A5') basePrice *= 0.7;
    
    // Estimation pour un document moyen (10 pages)
    const estimatedPages = 10;
    const pagesCost = basePrice * estimatedPages * form.copies;
    const total = (pagesCost + bindingPrice * form.copies).toFixed(2);
    
    return {
      perPage: basePrice.toFixed(2),
      binding: bindingPrice.toFixed(2),
      total,
      message: `Prix estimé: ${total}€ (basé sur ~10 pages)`
    };
  }, [form]);

  // Mise à jour de l'estimation de prix lorsque les options changent
  useEffect(() => {
    if (form.file) {
      setUi(prev => ({
        ...prev,
        pricingEstimate: calculatePriceEstimate()
      }));
    }
  }, [form, calculatePriceEstimate]);

  // Scroll automatique du chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ui.chat]);

  // Nettoyage du timeout des messages
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

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

  // Fonction pour afficher un message temporaire
  const showMessage = (text, type = 'error', duration = 5000) => {
    // Nettoyage du timeout précédent si existant
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    setUi(prev => ({ ...prev, message: { text, type } }));
    
    if (duration) {
      messageTimeoutRef.current = setTimeout(() => {
        setUi(prev => ({ ...prev, message: null }));
      }, duration);
    }
  };

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name in form.options) {
      setForm(prev => ({
        ...prev,
        options: { ...prev.options, [name]: value }
      }));
      
      // Afficher des infos sur la reliure lorsqu'elle est sélectionnée
      if (name === 'binding' && value !== 'Aucune') {
        setUi(prev => ({ ...prev, showBindingInfo: true }));
        setTimeout(() => {
          setUi(prev => ({ ...prev, showBindingInfo: false }));
        }, 5000);
      }
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'number' ? Math.max(1, Math.min(100, parseInt(value) || 1)) : value
      }));
    }
  };

  // Définition directe du nombre de copies
  const setDirectCopies = (count) => {
    setForm(prev => ({
      ...prev,
      copies: count
    }));
  };

  // Configuration de react-dropzone pour l'upload de fichier
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      showMessage('❗ Le fichier ne doit pas dépasser 10MB');
      return;
    }

    setForm(prev => ({ ...prev, file }));
    showMessage('✅ Fichier ajouté avec succès', 'success', 3000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_FILE_TYPES
  });

  // Validation du formulaire
  const validate = () => {
    if (!form.file) {
      showMessage('❗ Veuillez sélectionner un fichier');
      return false;
    }
    if (!ui.location) {
      showMessage('❗ Veuillez spécifier une adresse');
      return false;
    }
    return true;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setUi(prev => ({ ...prev, loading: true, message: null }));

    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mise à jour de l'état
      setUi(prev => ({
        ...prev,
        loading: false,
        formSubmitted: true,
        message: { text: '✅ Commande envoyée avec succès !', type: 'success' },
        chat: [...prev.chat, {
          sender: 'system',
          text: `Commande #${Math.floor(1000 + Math.random() * 9000)} reçue. Nous la traitons sous 24h.`,
          time: new Date()
        }]
      }));
    } catch (error) {
      setUi(prev => ({
        ...prev,
        loading: false,
        message: { text: '❌ Erreur lors de l\'envoi. Veuillez réessayer.', type: 'error' },
      }));
    }
  };

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

  // Remise à zéro du formulaire
  const handleReset = () => {
    setForm({
      file: null,
      copies: 1,
      options: {
        printType: 'Recto',
        color: 'Noir & blanc',
        binding: 'Aucune',
        format: 'A4'
      },
      instructions: ''
    });
    
    setUi(prev => ({
      ...prev,
      formSubmitted: false,
      location: null,
      pricingEstimate: null,
      message: { text: 'Formulaire réinitialisé', type: 'info', duration: 3000 }
    }));
  };

  // Fonction pour obtenir la description de la reliure
  const getBindingDescription = (bindingType) => {
    switch(bindingType) {
      case 'Agrafage coin':
        return 'Une agrafe dans le coin supérieur gauche. Idéal pour les documents de quelques pages.';
      case 'Agrafage double':
        return 'Deux agrafes sur le côté gauche. Recommandé pour les documents jusqu\'à 20 pages.';
      case 'Spirale plastique':
        return 'Reliure avec spirale en plastique et couverture transparente. Parfait pour les présentations.';
      case 'Spirale métallique':
        return 'Reliure solide avec spirale métallique et couvertures rigides. Idéale pour les documents professionnels.';
      case 'Thermocollée':
        return 'Reliure de type livre avec dos collé thermiquement. Parfaite pour les rapports et mémoires.';
      default:
        return '';
    }
  };
  
  // Rendu conditionnel en fonction de l'état de soumission
  if (ui.formSubmitted) {
    return (
      <div className="nc-container">
        <div className="nc-success">
          <i className="fas fa-check-circle"></i>
          <h2>Commande envoyée avec succès !</h2>
          <p>Un e-mail de confirmation vous a été envoyé.</p>
          <div className="nc-success-details">
            <h3>Récapitulatif</h3>
            <ul>
              <li><strong>Fichier:</strong> {form.file.name}</li>
              <li><strong>Copies:</strong> {form.copies}</li>
              <li><strong>Format:</strong> {form.options.format}</li>
              <li><strong>Impression:</strong> {form.options.printType}, {form.options.color}</li>
              <li><strong>Reliure:</strong> {form.options.binding}</li>
              <li><strong>Adresse:</strong> {ui.location.address}</li>
            </ul>
          </div>
          <button onClick={handleReset} className="nc-button">
            <i className="fas fa-plus"></i> Nouvelle commande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="nc-container">
      <header className="nc-header">
        <h1>
          <i className="fas fa-print"></i> Nouvelle commande
        </h1>
        <p>Remplissez les détails de votre impression</p>
      </header>

      <div className="nc-content">
        <form onSubmit={handleSubmit} className="nc-form">
          {/* Section Fichier */}
          <section className="nc-section">
            <h2><i className="fas fa-file-alt"></i> 1. Fichier à imprimer</h2>
            <div 
              {...getRootProps()} 
              className={`nc-upload ${form.file ? 'has-file' : ''} ${isDragActive ? 'active' : ''}`}
            >
              <input {...getInputProps()} />
              {form.file ? (
                <>
                  <i className="fas fa-file-alt"></i>
                  <span className="filename">{form.file.name}</span>
                  <small>{(form.file.size / 1024 / 1024).toFixed(2)} MB</small>
                  <button
                    type="button"
                    className="nc-remove-file"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm(prev => ({ ...prev, file: null }));
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </>
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>
                    {isDragActive 
                      ? "Déposez le fichier ici..." 
                      : "Glissez-déposez ou cliquez pour sélectionner"
                    }
                  </span>
                  <small>Formats acceptés: PDF, DOC, DOCX, JPG, PNG (max. 10MB)</small>
                </>
              )}
            </div>
          </section>

          {/* Options d'impression */}
          <section className="nc-section">
            <h2><i className="fas fa-cog"></i> 2. Options d'impression</h2>
            
            {/* Nombre de copies avec presets */}
            <div className="nc-copies-section">
              <label>Nombre de copies</label>
              <div className="nc-copies-container">
                <div className="nc-number-input">
                  <button 
                    type="button" 
                    onClick={() => setForm(prev => ({
                      ...prev, 
                      copies: Math.max(1, prev.copies - 1)
                    }))}
                    disabled={form.copies <= 1}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <input
                    id="copies"
                    type="number"
                    name="copies"
                    min="1"
                    max="100"
                    value={form.copies}
                    onChange={handleChange}
                  />
                  <button 
                    type="button"
                    onClick={() => setForm(prev => ({
                      ...prev, 
                      copies: Math.min(100, prev.copies + 1)
                    }))}
                    disabled={form.copies >= 100}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                
                <div className="nc-copies-presets">
                  {COPY_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={form.copies === preset ? 'active' : ''}
                      onClick={() => setDirectCopies(preset)}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="nc-options-grid">
              {PRINT_OPTIONS.filter(opt => opt.name !== 'binding').map((opt, i) => (
                <div key={i} className="nc-form-group">
                  <label htmlFor={opt.name}>{opt.label}</label>
                  <select
                    id={opt.name}
                    name={opt.name}
                    value={form.options[opt.name]}
                    onChange={handleChange}
                  >
                    {opt.options.map((o, j) => (
                      <option key={j} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </section>
          
          {/* Section reliure spécifique */}
          <section className="nc-section">
            <h2><i className="fas fa-book"></i> 3. Options de reliure</h2>
            
            <div className="nc-binding-options">
              <div className="nc-binding-selector">
                <label htmlFor="binding">Type de reliure</label>
                <select
                  id="binding"
                  name="binding"
                  value={form.options.binding}
                  onChange={handleChange}
                >
                  {PRINT_OPTIONS.find(opt => opt.name === 'binding').options.map((o, j) => (
                    <option key={j} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              
              {form.options.binding !== 'Aucune' && (
                <div className={`nc-binding-info ${ui.showBindingInfo ? 'show' : ''}`}>
                  <div className="nc-binding-icon">
                    <i className={`fas ${
                      form.options.binding.includes('Agrafage') ? 'fa-paperclip' :
                      form.options.binding.includes('Spirale') ? 'fa-circle-notch' : 'fa-book'
                    }`}></i>
                  </div>
                  <div className="nc-binding-description">
                    <strong>{form.options.binding}</strong>
                    <p>{getBindingDescription(form.options.binding)}</p>
                    {ui.pricingEstimate && (
                      <span className="nc-binding-price">
                        +{ui.pricingEstimate.binding}€ par exemplaire
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Instructions */}
          <section className="nc-section">
            <h2><i className="fas fa-comment-alt"></i> 4. Instructions spéciales</h2>
            <textarea
              name="instructions"
              placeholder="Ex: Impression sans marges, couper aux traits de coupe..."
              value={form.instructions}
              onChange={handleChange}
              rows={4}
            />
          </section>

          {/* Localisation */}
          <section className="nc-section">
            <h2><i className="fas fa-map-marker-alt"></i> 5. Adresse de livraison</h2>
            <Localisation 
                    onLocationSelect={(loc) => setUi(prev => ({ ...prev, location: loc }))}
                    selectedLocation={ui.location}
                  />
            {ui.location && (
              <div className="nc-location-info">
                <p>
                  <i className="fas fa-map-marker-alt"></i>
                  {ui.location.address}
                </p>
                {ui.location.notes && (
                  <p className="nc-location-notes">
                    <i className="fas fa-info-circle"></i>
                    {ui.location.notes}
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Récapitulatif et estimation de prix */}
          {form.file && (
            <section className="nc-section nc-summary">
              <h2><i className="fas fa-receipt"></i> Récapitulatif</h2>
              <div className="nc-summary-content">
                <div className="nc-summary-item">
                  <span>Fichier:</span>
                  <strong>{form.file.name}</strong>
                </div>
                <div className="nc-summary-item">
                  <span>Copies:</span>
                  <strong>{form.copies}</strong>
                </div>
                <div className="nc-summary-item">
                  <span>Format:</span>
                  <strong>{form.options.format}</strong>
                </div>
                <div className="nc-summary-item">
                  <span>Impression:</span>
                  <strong>{form.options.printType}, {form.options.color}</strong>
                </div>
                <div className="nc-summary-item">
                  <span>Reliure:</span>
                  <strong>{form.options.binding}</strong>
                </div>
                
                {ui.pricingEstimate && (
                  <div className="nc-pricing">
                    <div className="nc-pricing-label">Estimation de prix:</div>
                    <div className="nc-pricing-value">{ui.pricingEstimate.message}</div>
                    <small className="nc-pricing-note">
                      * Le prix final sera calculé en fonction du nombre réel de pages
                    </small>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Soumission */}
          <button type="submit" className="nc-submit" disabled={ui.loading}>
            {ui.loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Traitement en cours...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i> Confirmer la commande
              </>
            )}
          </button>

          {ui.message && (
            <div className={`nc-message ${ui.message.type}`}>
              {ui.message.text}
            </div>
          )}
        </form>

        {/* Chat intégré */}
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
      </div>
    </div>
  );
};

export default NouvelleCommande;