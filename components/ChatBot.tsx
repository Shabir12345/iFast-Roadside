import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, User, Bot, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage, LoadingState } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm the iFAST Virtual Assistant. Do you have a flat tire, dead battery, or need a lockout service?", timestamp: new Date() }
  ]);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading === LoadingState.LOADING) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(LoadingState.LOADING);

    // Prepare history for context
    const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`);

    const responseText = await sendMessageToGemini(history, userMsg.text);

    const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setLoading(LoadingState.IDLE);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-brand-dark text-white p-4 rounded-full premium-shadow hover:bg-gray-800 transition-all transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'} animate-float`}
        aria-label="Open support chat"
      >
        <MessageSquare size={24} className="text-brand-yellow" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-96 h-[500px] max-h-[100vh] bg-white sm:rounded-2xl premium-shadow z-50 flex flex-col border border-gray-100 overflow-hidden font-sans transition-all duration-300 transform animate-reveal">

          {/* Header */}
          <div className="bg-brand-dark p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-brand-yellow/20 p-1.5 rounded-lg">
                <Sparkles size={18} className="text-brand-yellow" />
              </div>
              <div>
                <h3 className="font-bold text-sm">iFAST Assistant</h3>
                <p className="text-xs text-gray-400">AI Powered • Instant Replies</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-brand-dark'}`}>
                  {msg.role === 'user' ? <User size={14} className="text-gray-600" /> : <Bot size={14} className="text-brand-yellow" />}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                      ? 'bg-brand-yellow text-brand-dark rounded-tr-none font-medium'
                      : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading === LoadingState.LOADING && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-brand-yellow" />
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-gray-400" />
                  <span className="text-xs text-gray-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about price or services..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={loading === LoadingState.LOADING || !input.trim()}
                className="bg-brand-dark text-white p-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              AI can make mistakes. For emergencies, call now.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;