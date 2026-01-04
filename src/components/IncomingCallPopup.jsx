import React, { useState, useEffect } from 'react';
import { Phone, Clock } from 'lucide-react';
import { CRM_DB } from '../services/api';

export default function IncomingCallPopup({ phone, onAtender }) {
  const [timer, setTimer] = useState(18);
  const [contact, setContact] = useState(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    CRM_DB.getContact(phone).then(setContact);
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1 && !resolved) {
          CRM_DB.logCall({ telefone: phone, estado: 'Perdida', contactoId: contact?.id });
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phone, contact, resolved]);

  const handleAtender = () => {
    setResolved(true);
    CRM_DB.logCall({ telefone: phone, estado: 'Atendida', contactoId: contact?.id });
    onAtender(contact || { Telefone: phone, Nome: 'Novo Contacto B2B' });
  };

  if (timer === 0) return null;

  return (
    <div className="fixed bottom-10 right-10 w-96 bg-slate-900 rounded-2xl shadow-2xl border border-orange-500 p-6 z-50">
      <div className="flex justify-between items-center mb-4 text-orange-500">
        <span className="text-[10px] font-black uppercase tracking-widest">Incoming B2B</span>
        <div className="flex items-center gap-1 text-slate-400 font-mono text-sm"><Clock size={14} /> {timer}s</div>
      </div>
      <h2 className="text-3xl font-mono font-bold text-white mb-6">{phone}</h2>
      <button onClick={handleAtender} className="w-full bg-orange-500 text-white py-4 rounded-xl font-black uppercase text-xs">Atender Cockpit</button>
    </div>
  );
}
