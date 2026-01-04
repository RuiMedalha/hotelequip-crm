import React, { useState } from 'react';
import { User, Phone, Mail, FileText, Package, CreditCard, Zap, MessageSquare } from 'lucide-react';

export default function CustomerDetail({ client }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!client) return null;

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-700">
      {/* HEADER DO CLIENTE */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-3xl p-8 text-white shadow-2xl flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <User size={40} />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{client.nome}</h2>
            <div className="flex gap-3 mt-2">
              <span className="bg-green-400/20 text-green-100 text-[10px] font-bold px-3 py-1 rounded-full border border-green-400/30 uppercase tracking-widest">
                Cliente Ativo
              </span>
              <span className="text-blue-100/60 text-[10px] font-mono mt-1">ID: #{client.id}</span>
            </div>
          </div>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-blue-100/50 text-xs uppercase font-bold tracking-widest">Última Interação</p>
          <p className="font-mono text-sm">Hoje, 10:45</p>
        </div>
      </div>

      {/* DASHBOARD PRINCIPAL - 3 COLUNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUNA 1: INFORMAÇÕES DE CONTACTO */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Phone size={20} /></div>
            <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">Contacto e Identificação</h3>
          </div>
          <div className="space-y-4">
            <div className="group p-3 hover:bg-slate-50 rounded-xl transition-colors">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Telefone Principal</p>
              <p className="text-slate-700 font-mono font-medium">{client.telefone}</p>
            </div>
            <div className="group p-3 hover:bg-slate-50 rounded-xl transition-colors">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Email</p>
              <p className="text-slate-700 font-medium">{client.email}</p>
            </div>
            <div className="group p-3 hover:bg-slate-50 rounded-xl transition-colors">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">NIF</p>
              <p className="text-slate-700 font-mono font-medium">{client.nif}</p>
            </div>
          </div>
        </div>

        {/* COLUNA 2: RESUMO FINANCEIRO (CARD 360) */}
        <div className="bg-orange-50/50 rounded-3xl p-6 shadow-xl border border-orange-100 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 border-b border-orange-100 pb-4">
            <div className="p-2 bg-orange-500 text-white rounded-lg"><CreditCard size={20} /></div>
            <h3 className="font-bold text-orange-800 uppercase text-xs tracking-widest">Resumo de Conta</h3>
          </div>
          <div className="py-4 text-center">
            <p className="text-[10px] text-orange-600 font-black uppercase tracking-[0.2em] mb-2">Total Faturado</p>
            <p className="text-5xl font-black text-orange-700 tracking-tighter">4.250,00€</p>
          </div>
          
          {/* BANNER NEWSLETTER INTEGRADO */}
          {!client.accept_newsletter && (
            <div className="mt-6 bg-white/80 backdrop-blur-sm border border-orange-200 p-4 rounded-2xl animate-pulse">
              <p className="text-orange-800 text-xs text-center font-bold">
                ⚠️ Oportunidade: Oferecer 5% Desc. Newsletter
              </p>
            </div>
          )}
        </div>

        {/* COLUNA 3: AÇÕES RÁPIDAS */}
        <div className="space-y-4">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white p-6 rounded-3xl shadow-lg transition-all flex items-center justify-between group">
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase opacity-70 mb-1 text-green-100">Abrir Chat</p>
              <p className="font-black text-xl">WhatsApp</p>
            </div>
            <MessageSquare className="group-hover:scale-125 transition-transform" size={32} />
          </button>
          
          <button className="w-full bg-slate-800 hover:bg-slate-900 text-white p-6 rounded-3xl shadow-lg transition-all flex items-center justify-between group">
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase opacity-70 mb-1 text-slate-400">Workflow n8n</p>
              <p className="font-black text-xl tracking-tight italic">Ativar Automação</p>
            </div>
            <Zap className="text-orange-400 group-hover:rotate-12 transition-transform" size={32} />
          </button>
        </div>

      </div>
    </div>
  );
}
