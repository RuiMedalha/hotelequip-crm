import { createDirectus, rest, readItems, updateItem, createItem } from '@directus/sdk';

const client = createDirectus('https://api.hotelequip.pt').with(rest());

export const CRM_API = {
  getContact: async (phone) => {
    try {
      const result = await client.request(readItems('contactos', {
        filter: { telefone: { _eq: phone } },
        limit: 1
      }));
      return result[0] || null;
    } catch (err) { return null; }
  },
  saveContact: async (data) => {
    if (data.id) return await client.request(updateItem('contactos', data.id, data));
    return await client.request(createItem('contactos', data));
  },
  // NOVA FUNÇÃO: Regista se foi atendida ou não, com data/hora
  logCall: async (phone, status, contactId = null) => {
    try {
      await client.request(createItem('historico_chamadas', {
        telefone: phone,
        contacto: contactId,
        data_hora: new Date().toISOString(),
        estado: status // 'Atendida' ou 'Não Atendida'
      }));
    } catch (err) { console.error("Erro ao logar chamada"); }
  }
};
