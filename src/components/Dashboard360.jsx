import React, { useState, useEffect } from 'react';
import { Save, ShieldAlert, Users } from 'lucide-react';

export default function Dashboard360({ customer }) {
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('Geral');

  useEffect(() => { 
    if (customer) setFormData(customer); 
  }, [customer]);

  const handleSave = async (isSpam = false) => {
    // MAPEAMENTO RIGOROSO com a tua imagem b299a1.png
    const payload = {
      Nome: formData.Nome || "",
      Nif: formData.Nif || "",
      Email: formData.Email || "",
      Telefone: formData.Telefone || "",
      Morada: formData.Morada || "",
      Notas: isSpam ? `[SPAM] ${formData.Notas || ''}` : (formData.Notas || ""),
      "Accept Newsletter": formData["Accept Newsletter"] || false
    };

    try {
      // Se tiver ID faz PATCH (update), se não tiver faz POST (create)
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

      if (response.ok) {
        alert(isSpam ? "🚫 Marcado como Spam!" : "✅ Guardado com sucesso no Directus!");
      } else {
        const errorData = await response.json();
        console.error("Erro Directus:", errorData);
        alert("❌ Erro: Verifica se o ID ou as colunas existem.");
      }
    } catch (e) {
      alert("❌ Erro de ligação ao servidor.");
    }
  };

  if (!customer) return <div className="h-screen flex items-center justify-center bg-[#0f172a] text-slate-500 italic uppercase tracking-widest">Aguardando Chamada...</div>;

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans">
      <aside className="w-64 bg-[#0f172a] text-white p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <h1 className="text-xl font-black italic tracking-tighter mb-10">CRM <span className="text-orange-500">LAB</span></h1>
          <button onClick={() => setActiveTab('Geral')} className={`w-full flex items-center gap-3 p-4 rounded-2xl mb-2 font-bold ${activeTab === 'Geral' ? 'bg-blue-600' : 'opacity-40'}`}><Users size={18}/> Ficha Cliente</button>
        </div>
        <button onClick={() => handleSave(true)} className="w-full flex items-center justify-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black text-[10px] uppercase hover:bg-red-500 hover:text-white transition-all"><ShieldAlert size={18}/> Publicidade</button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-black italic tracking-tighter text-slate-800">{formData.Nome || 'Novo Registo'}</h2>
          <button onClick={() => handleSave(false)} className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex items-center gap-2"><Save size={20}/> Gravar Ficha</button>
        </header>

        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="flex border-b bg-slate-50/50">
            {['Geral', 'Newsletter', 'Notas'].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`px-10 py-6 text-[10px] font-black uppercase tracking-widest ${activeTab === t ? 'bg-white text-blue-600 border-b-4 border-blue-600' : 'text-slate-400'}`}>{t}</button>
            ))}
          </div>
          <div className="p-12">
            {activeTab === 'Geral' && (
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-1 col-span-2"><label className="text-[10px] font-black text-slate-400 uppercase">Nome</label><input className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" value={formData.Nome || ''} onChange={e => setFormData({...formData, Nome: e.target.value})} /></div>
                <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Nif</label><input className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" value={formData.Nif || ''} onChange={e => setFormData({...formData, Nif: e.target.value})} /></div>
                <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Telefone</label><input className="w-full p-4 bg-blue-50/50 border border-blue-100 rounded-2xl font-bold italic" value={formData.Telefone || ''} readOnly /></div>
              </div>
            )}
            {activeTab === 'Newsletter' && (
              <div className="p-10 bg-blue-50 rounded-[40px] border border-blue-100 flex items-center justify-between">
                <div><h4 className="font-black text-slate-800 uppercase text-sm">Aceita Newsletter</h4><p className="text-xs text-slate-500 italic tracking-tight">Autorização RGPD.</p></div>
                <input type="checkbox" className="w-10 h-10 rounded-xl cursor-pointer" checked={formData["Accept Newsletter"] || false} onChange={e => setFormData({...formData, "Accept Newsletter": e.target.checked})} />
              </div>
            )}
            {activeTab === 'Notas' && (
              <textarea className="w-full p-8 bg-slate-900 text-white rounded-[40px] font-mono text-sm h-64" value={formData.Notas || ''} onChange={e => setFormData({...formData, Notas: e.target.value})} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
