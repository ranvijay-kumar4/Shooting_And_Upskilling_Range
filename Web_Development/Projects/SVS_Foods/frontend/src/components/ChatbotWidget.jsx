import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, X, Send, Sparkles, Loader2, Minimize2 } from 'lucide-react';

const CHAT_SESSION_KEY = 'svs_foods_chat_session';

const ChatbotWidget = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem(CHAT_SESSION_KEY) || null;
  });

  const chatEndRef = useRef(null);

  // Fetch chat history on component load or user change
  useEffect(() => {
    if (isOpen) {
      fetchChatHistory();
    }
  }, [isOpen, user]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const fetchChatHistory = async () => {
    try {
      let url = '/api/chatbot/history';
      if (!user && sessionId) {
        url += `?sessionId=${sessionId}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && data.success && data.messages.length > 0) {
        setMessages(data.messages);
      } else {
        // Initial bot greeting
        setMessages([
          {
            sender: 'model',
            text: `Hello! I am **SVS Food Bot**, your premium AI culinary concierge. 🧑‍🍳\n\nHow can I elevate your dining experience today? Try asking me to **recommend a dish** or **track my orders**!`
          }
        ]);
      }
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    if (!textToSend) setInputMessage('');
    setLoading(true);

    // Append user message locally first
    const newMsg = { sender: 'user', text };
    setMessages(prev => [...prev, newMsg]);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId: !user ? sessionId : undefined
        })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        if (data.sessionId && !user) {
          setSessionId(data.sessionId);
          localStorage.setItem(CHAT_SESSION_KEY, data.sessionId);
        }
        setMessages(data.messages);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'model', text: 'Apologies, my culinary algorithms encountered an issue. Please try again shortly.' }
        ]);
      }
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages(prev => [
        ...prev,
        { sender: 'model', text: 'It looks like the server is taking too long to respond. Please check your connection.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (actionText) => {
    handleSendMessage(actionText);
  };

  const formatText = (text) => {
    // Basic bold markdown styling (e.g. **bold**)
    return text.split('\n').map((line, idx) => {
      let formatted = line;
      // Handle Bold
      const boldRegex = /\*\*(.*?)\*\*/g;
      formatted = formatted.replace(boldRegex, '<strong class="text-brand-gold font-semibold">$1</strong>');
      
      return <div key={idx} dangerouslySetInnerHTML={{ __html: formatted }} className="mb-1" />;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Chat Widget */}
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] rounded-2xl glass border border-white/10 flex flex-col shadow-2xl mb-4 animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-brand-gold/15 p-2 rounded-lg text-brand-gold animate-pulse">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm text-slate-100 flex items-center gap-1.5">
                  SVS Food Concierge
                </h3>
                <span className="text-[10px] text-green-500 font-medium flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping inline-block" /> Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              <Minimize2 size={16} />
            </button>
          </div>

          {/* Messages Logs */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                    ${msg.sender === 'user' 
                      ? 'bg-brand-gold text-brand-bg font-medium rounded-tr-none' 
                      : 'bg-white/5 text-slate-300 border border-white/5 rounded-tl-none'}
                  `}
                >
                  {formatText(msg.text)}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 text-slate-400 border border-white/5 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-2 text-xs">
                  <Loader2 size={14} className="animate-spin text-brand-gold" />
                  <span>Preparing response...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Option Buttons */}
          <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-white/5 bg-black/10">
            <button 
              onClick={() => handleQuickAction('What is the status of my order?')}
              className="text-[10px] font-semibold text-brand-gold border border-brand-gold/30 hover:border-brand-gold/80 px-2 py-1 rounded-full transition-all duration-200 bg-brand-gold/5"
            >
              📦 Track order
            </button>
            <button 
              onClick={() => handleQuickAction('Recommend a dish from SVS Foods')}
              className="text-[10px] font-semibold text-brand-gold border border-brand-gold/30 hover:border-brand-gold/80 px-2 py-1 rounded-full transition-all duration-200 bg-brand-gold/5"
            >
              🍔 Menu
            </button>
            <button 
              onClick={() => handleQuickAction('What are your opening hours and delivery times?')}
              className="text-[10px] font-semibold text-brand-gold border border-brand-gold/30 hover:border-brand-gold/80 px-2 py-1 rounded-full transition-all duration-200 bg-brand-gold/5"
            >
              ⏰ Delivery time
            </button>
            <button 
              onClick={() => handleQuickAction('What is your refund policy for wrong orders?')}
              className="text-[10px] font-semibold text-brand-gold border border-brand-gold/30 hover:border-brand-gold/80 px-2 py-1 rounded-full transition-all duration-200 bg-brand-gold/5"
            >
              💬 Complaint
            </button>
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-4 border-t border-white/5 bg-white/5 flex gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about our foods..."
              className="flex-grow bg-brand-bg text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2 text-sm border border-white/5 focus:outline-none focus:border-brand-gold/50 transition-colors"
            />
            <button 
              type="submit" 
              disabled={loading || !inputMessage.trim()}
              className="bg-brand-gold hover:bg-brand-goldhover text-brand-bg p-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Launcher Bubble */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-brand-gold to-brand-goldhover hover:scale-105 active:scale-95 text-brand-bg shadow-2xl p-4 rounded-full transition-all duration-200 focus:outline-none border border-brand-gold/25 relative"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-orange text-[9px] font-bold text-white ring-2 ring-brand-bg animate-bounce">
            AI
          </span>
        )}
      </button>
    </div>
  );
};

export default ChatbotWidget;
