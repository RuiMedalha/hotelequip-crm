import { createDirectus, rest, readItems } from '@directus/sdk';

const DIRECTUS_URL = 'https://api.hotelequip.pt';
const TOKEN = 'wmvENNbSbzF0ZM-dCVpvU72nNg8reoQy';

export const client = createDirectus(DIRECTUS_URL).with(rest());

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
};

export const CRM_DB = {
  getContact: async (phone) => {
    try {
      const res = await client.request(readItems('contactos', {
        filter: { Telefone: { _eq: phone } },
        limit: 1
      }));
      return res[0];
    } catch (err) {
      console.error("Erro Directus Lookup:", err);
      return null;
    }
  },
  logCall: async (data) => {
    try {
      await fetch(`${DIRECTUS_URL}/items/Historico_Chamadas`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          Telefone: data.telefone,
          Estado: data.estado,
          Data: new Date().toISOString(),
          Contacto: data.contactoId || null
        })
      });
    } catch (err) {
      console.error("Erro ao gravar histórico:", err);
    }
  },
  updateNewsletter: async (id, status) => {
    try {
      const res = await fetch(`${DIRECTUS_URL}/items/contactos/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ "Accept Newsletter": status })
      });
      return res.ok;
    } catch (err) {
      console.error("Erro newsletter:", err);
      return false;
    }
  }
};
