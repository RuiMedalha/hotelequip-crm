import React, { useState } from 'react';
import IncomingCallPopup from './components/IncomingCallPopup';
import Dashboard360 from './components/Dashboard360';

function App() {
  const [call, setCall] = useState("912345678"); // Simulação de chamada inicial
  const [activeCustomer, setActiveCustomer] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100">
      <Dashboard360 
        customer={activeCustomer} 
        onRefresh={() => setActiveCustomer(null)}
      />
      
      {call && (
        <IncomingCallPopup 
          phone={call} 
          onAccept={(data) => { setActiveCustomer(data); setCall(null); }} 
          onReject={() => setCall(null)} 
        />
      )}
    </div>
  );
}
export default App;
