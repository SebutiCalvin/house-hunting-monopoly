import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'ðŸ‘‹ Hello! Welcome to House Hunting Monopoly. How can we help?' },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChatMessages([...chatMessages, { type: 'user', text: message }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'bot', text: 'ðŸ¤– Thanks! An agent will get back to you shortly. For immediate help, call +26657266136.' }]);
    }, 500);
    setMessage('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              background: 'white', borderRadius: '20px', width: '340px', height: '420px',
              marginBottom: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px', background: '#ff6b4a', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>ðŸ’¬ House Hunting Bot</span>
              <FiX size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', background: '#f7fafc' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.type === 'user' ? '#ff6b4a' : 'white',
                  color: msg.type === 'user' ? 'white' : '#1e1e2a',
                  padding: '10px 14px', borderRadius: '16px', maxWidth: '80%', fontSize: '14px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>{msg.text}</div>
              ))}
            </div>
            <div style={{ padding: '12px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px' }}>
              <input value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Type a message..." style={{ flex: 1, padding: '10px 16px', borderRadius: '50px', border: '1px solid #e2e8f0', outline: 'none' }} />
              <button onClick={handleSend} style={{ padding: '10px 16px', background: '#ff6b4a', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}><FiSend /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} style={{
        width: '64px', height: '64px', borderRadius: '50%', background: '#25D366', color: 'white',
        border: 'none', fontSize: '28px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isOpen ? <FiX size={28} /> : <FaWhatsapp size={28} />}
      </button>
    </div>
  );
};

export default WhatsAppChatButton;
