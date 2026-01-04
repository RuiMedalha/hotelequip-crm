import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle, XCircle } from 'lucide-react';
import { CRM_API } from '../lib/api';

export default function IncomingCallPopup({ phone, onAccept, onReject }) {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CRM_API.getContact(phone).then(data => {
      setContact(data);
      setLoading(false);
    });
  }, [phone]);

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-[#0f172a] text-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 p-6 z-[999] animate-in slide-in-from-bottom-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Chamada CRM</span>
        </div>
        <span className="text-xs font-mono text-white/40">18s</span>
      </div>

      <h3 className="text-3xl font-black italic tracking-tighter mb-2">{phone}</h3>
      
      <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/5">
        {loading ? (
          <p className="text-xs italic text-white/40">Consultando Directus...</p>
        ) : contact ? (
          <div>
            <p className="text-green-400 font-bold">{contact.nome}</p>
            <p className="text-[10px] text-white/40 uppercase">Cliente Registado</p>
          </div>
        ) : (
          <p className="text-orange-400 font-bold text-xs uppercase italic">Novo Lead Identificado</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={onReject} className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all font-bold text-sm">
          <XCircle size={18} /> Rejeitar
        </button>
        <button onClick={() => onAccept(contact || { telefone: phone, nome: '' })} className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 font-black text-sm transition-all">
          <CheckCircle size={18} /> Atender
        </button>
      </div>
    </div>
  );
}
