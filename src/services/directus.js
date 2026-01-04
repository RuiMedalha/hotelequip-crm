import { createDirectus, rest, readItems } from '@directus/sdk';
const client = createDirectus('https://api.hotelequip.pt').with(rest());
export const CRM_API = {
  findContact: async (phone) => {
    try {
      const response = await client.request(readItems('contactos', {
        filter: { telefone: { _eq: phone } },
        limit: 1
      }));
      return response[0] || null;
    } catch (err) {
      console.error("Erro Directus:", err);
      return null;
    }
  }
};
