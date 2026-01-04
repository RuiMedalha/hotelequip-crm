import React from 'react';
import { MapPin, FileText, Mail } from 'lucide-react';

export default function Dashboard360({ customer }) {
  if (!customer) return <div className="p-20 text-center text-slate-400 italic">Aguardando cliente...</div>;

  return (
    <div className="space-y-6 p-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">{customer.Nome}</h1>
          <p className="text-slate-500 font-medium">NIF: <span className="font-mono">{customer.Nif || '---'}</span></p>
        </div>
        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold uppercase">Cliente Ativo</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100">
          <h3 className="text-orange-500 font-bold text-xs uppercase mb-6 flex items-center gap-2"><Mail size={16}/> Contactos</h3>
          <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Email</p>
          <p className="text-sm font-bold text-slate-800 mb-4">{customer.Email || '---'}</p>
          <div className={`p-4 rounded-2xl border ${customer["Accept Newsletter"] ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
            <p className="text-xs font-black {customer['Accept Newsletter'] ? 'text-green-600' : 'text-red-600'}">
              NEWSLETTER: {customer["Accept Newsletter"] ? 'AUTORIZADO' : 'RECUSADO'}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100">
          <h3 className="text-blue-500 font-bold text-xs uppercase mb-6 flex items-center gap-2"><MapPin size={16}/> Morada</h3>
          <p className="text-sm font-medium text-slate-600 leading-relaxed">{customer.Morada || "Sem morada."}</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
          <h3 className="text-orange-400 font-bold text-xs uppercase mb-6 flex items-center gap-2"><FileText size={16}/> Notas Internas</h3>
          <p className="text-sm italic opacity-80 leading-relaxed">"{customer.Notas || "Sem observações."}"</p>
        </div>
      </div>
    </div>
  );
}
