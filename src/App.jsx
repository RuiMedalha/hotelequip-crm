import React, { useState } from 'react';
import IncomingCallPopup from './components/IncomingCallPopup';
import Dashboard360 from './components/Dashboard360';

function App() {
  const [customer, setCustomer] = useState(null);
  const [call, setCall] = useState("912345678");

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-black mb-8 italic uppercase tracking-tighter">
        HotelEquip <span className="text-orange-500">Lab</span>
      </h1>
      <Dashboard360 customer={customer} />
      {call && (
        <IncomingCallPopup 
          phone={call} 
          onAtender={(data) => { setCustomer(data); setCall(null); }} 
        />
      )}
    </div>
  );
}
export default App;
