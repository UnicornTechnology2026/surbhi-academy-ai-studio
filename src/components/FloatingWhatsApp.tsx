import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyInfo';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const sendWhatsApp = (msgText?: string) => {
    const textToSend = msgText || customMsg || "Hello Surbhi Academy, I would like to inquire about admissions and course details.";
    const cleanNumber = ACADEMY_INFO.contact.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
      {/* Quick Prompt Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
          <div className="bg-[#0F172A] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Surbhi Academy Desk
                </h4>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online for Inquiries
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs text-xs text-slate-700 leading-relaxed">
              👋 Hi there! Welcome to Surbhi Coaching Academy. How can our academic counselors assist you today?
            </div>

            <div className="space-y-1.5">
              <button
                onClick={() => sendWhatsApp("Hi, I want to inquire about Class 10 Board Excellence Batch.")}
                className="w-full text-left text-xs bg-white hover:bg-slate-100 p-2 rounded-lg border border-slate-200 text-slate-700 transition-colors"
              >
                🎯 Class 10 Board Excellence Program
              </button>
              <button
                onClick={() => sendWhatsApp("Hi, I want to inquire about Class 11-12 Science/Commerce batches.")}
                className="w-full text-left text-xs bg-white hover:bg-slate-100 p-2 rounded-lg border border-slate-200 text-slate-700 transition-colors"
              >
                🔬 Class 11–12 Science / Commerce
              </button>
              <button
                onClick={() => sendWhatsApp("Hi, I want to book a free 2-day trial class.")}
                className="w-full text-left text-xs bg-white hover:bg-slate-100 p-2 rounded-lg border border-slate-200 text-slate-700 transition-colors"
              >
                🎟️ Book 2-Day Free Trial Class
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendWhatsApp()}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 bg-white"
              />
              <button
                onClick={() => sendWhatsApp()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg text-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-600/30 transition-all duration-300 group cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
          Chat With Us
        </span>
      </button>
    </div>
  );
};
