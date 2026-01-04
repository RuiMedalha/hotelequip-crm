import React, { useState, useEffect } from 'react';
import { directus } from './services/api';
import { readItems } from '@directus/sdk';
import IncomingCallPopup from './components/IncomingCallPopup';
import CustomerDetail from './components/CustomerDetail';

function App() {
  const [incomingNumber, setIncomingNumber] = useState("912345678");
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  // FUNÇÃO REAL: Procura o cliente no Directus pelo telefone
  useEffect(() => {
    async function fetchClient() {
      try {
        setLoading(true);
        const response = await directus.request(
          readItems('contactos', {
            filter: { telefone: { _eq: incomingNumber } },
            limit: 1
          })
        );
        
        if (response.length > 0) {
          setClient(response[0]);
        } else {
          // Cliente não encontrado, cria um perfil temporário
          setClient({ nome: "Desconhecido", telefone: incomingNumber, novo: true });
        }
      } catch (err) {
        console.error("Erro API:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchClient();
  }, [incomingNumber]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 md:p-12">
      {incomingNumber && (
        <IncomingCallPopup 
          incomingNumber={incomingNumber} 
          onClose={() => setIncomingNumber(null)} 
        />
      )}

      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
            HOTELEQUIP <span className="text-orange-500">LIVE HUB</span>
          </h1>
        </header>

        {loading ? (
          <div className="text-center py-20 text-slate-400 animate-pulse font-bold">A PESQUISAR FICHA 360...</div>
        ) : (
          <CustomerDetail client={client} />
        )}

        <footer className="mt-16 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
           <div>v2.5 - PRODUÇÃO REAIS</div>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
             API DIRECTUS: ONLINE
           </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
