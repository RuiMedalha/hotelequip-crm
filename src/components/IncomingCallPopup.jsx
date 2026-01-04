import React, { useState, useEffect } from 'react';
import { Phone, X, UserCheck } from 'lucide-react';

export default function IncomingCallPopup({ incomingNumber, onClose }) {
  const [timer, setTimer] = useState(18);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timer === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] w-80 animate-in fade-in slide-in-from-right-10 duration-500">
      <div className="bg-slate-900 border-l-4 border-orange-500 shadow-2xl p-5 text-white rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
            <Phone className="animate-pulse" size={14} /> Chamada a Entrar ({timer}s)
          </span>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-2xl font-mono font-bold tracking-tight text-white">{incomingNumber}</p>
          <p className="text-xs text-slate-400 mt-1 italic">A pesquisar no Directus...</p>
        </div>
        
        <button 
          onClick={() => alert('A abrir ficha 360...')}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-bold text-sm transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
        >
          <UserCheck size={18} /> Atender e Identificar
        </button>
      </div>
    </div>
  );
}
