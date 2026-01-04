import React, { useState, useEffect } from 'react';
import { Save, ShieldAlert, Users, ShieldCheck } from 'lucide-react';

export default function Dashboard360({ customer }) {
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('Geral');

  useEffect(() => { 
    if (customer) setFormData(customer); 
  }, [customer]);

  const handleSave = async (isSpam = false) => {
    const payload = {
      Nome: formData.Nome,
      Nif: formData.Nif,
      Email: formData.Email,
      Telefone: formData.Telefone,
      Morada: formData.Morada,
      Notas: isSpam ? `[SPAM] ${formData.Notas || ''}` : formData.Notas,
      "Accept Newsletter": formData["Accept Newsletter"]
    };

    try {
      const url = formData.id 
        ? `https://api.hotelequip.pt/items/contactos/${formData.id}` 
        : `https://api.hotelequip.pt/items/contactos`;

      const response = await fetch(url, {
        method: formData.id ? 'PATCH' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer wmvENNbSbzF0ZM-dCVpvU72nNg8reoQy'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) alert(isSpam ? "🚫 Marcado como Spam!" : "✅ Guardado no Directus!");
      else alert("⚠️ Erro nas colunas do Directus.");
    } catch (e) { alert("❌ Erro de ligação."); }
  };

  if (!customer) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] text-slate-500">
      <h1 className="text-xl font-black text-white/20 italic mb-4 uppercase">HOTELEQUIP LAB</h1>
      <p className="animate-pulse">Aguardando chamada...</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      <aside className="w-64 bg-[#0f172a] text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5">
          <h1 className="text-xl font-black italic tracking-tighter uppercase text-white">CRM <span className="text-orange-500 text-sm">LAB</span></h1>
        </div>
        <nav className="flex-1 p-4 mt-6">
          <button onClick={() => setActiveTab('Geral')} className={`flex items-center gap-4 w-full p-4 rounded-2xl font-bold transition-all ${activeTab === 'Geral' ? 'bg-blue-600 shadow-lg' : 'opacity-40 hover:opacity-100'}`}>
            <Users size={20}/> Ficha Cliente
          </button>
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={() => handleSave(true)} className="w-full flex items-center justify-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black text-[10px] uppercase hover:bg-red-500 hover:text-white transition-all">
            <ShieldAlert size={18}/> É Publicidade
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b p-8 flex justify-between items-center sticky top-0 z-50">
          <div>
            <h2 className="text-4xl font-black text-slate-800 italic tracking-tighter">{formData.Nome || 'Novo Registo'}</h2>
            <p className="text-xs font-bold text-blue-600 mt-1 uppercase tracking-widest italic">{formData.Telefone}</p>
          </div>
          <button onClick={() => handleSave(false)} className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl transition-all">
            <Save size={20} className="inline mr-2"/> Guardar Ficha
          </button>
        </header>

        <div className="p-10 max-w-6xl">
          <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex border-b bg-slate-50/50">
              {['Geral', 'Newsletter', 'Notas'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} className={`px-10 py-6 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-blue-600 border-b-4 border-blue-600' : 'text-slate-400'}`}>{t}</button>
              ))}
            </div>
            <div className="p-12">
              {activeTab === 'Geral' && (
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome da Empresa</label>
                    <input className="w-full p-4 bg-slate-50 border rounded-2xl font-bold text-xl outline-none" value={formData.Nome || ''} onChange={e => setFormData({...formData, Nome: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NIF</label>
                    <input className="w-full p-4 bg-slate-50 border rounded-2xl font-bold outline-none" value={formData.Nif || ''} onChange={e => setFormData({...formData, Nif: e.target.value})} />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Morada</label>
                    <textarea className="w-full p-4 bg-slate-50 border rounded-2xl font-bold h-24 outline-none" value={formData.Morada || ''} onChange={e => setFormData({...formData, Morada: e.target.value})} />
                  </div>
                </div>
              )}
              {activeTab === 'Newsletter' && (
                <div className="p-10 bg-blue-50 rounded-[40px] border border-blue-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-slate-800 uppercase text-sm">Aceita Newsletter</h4>
                    <p className="text-xs text-slate-500">RGPD Ativo no Directus.</p>
                  </div>
                  <input type="checkbox" className="w-10 h-10 rounded-xl cursor-pointer" checked={formData["Accept Newsletter"] || false} onChange={e => setFormData({...formData, "Accept Newsletter": e.target.checked})} />
                </div>
              )}
              {activeTab === 'Notas' && (
                <textarea className="w-full p-8 bg-slate-900 text-white rounded-[40px] font-mono text-sm h-64 outline-none shadow-inner" value={formData.Notas || ''} onChange={e => setFormData({...formData, Notas: e.target.value})} placeholder="Notas da chamada..." />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
