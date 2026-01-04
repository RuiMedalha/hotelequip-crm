import { createDirectus, rest, readItems } from '@directus/sdk';
import { MeiliSearch } from 'meilisearch';

// Directus Client
export const directus = createDirectus(import.meta.env.VITE_DIRECTUS_URL).with(rest());

// Meilisearch Client
const msClient = new MeiliSearch({
  host: import.meta.env.VITE_MEILISEARCH_URL,
  apiKey: import.meta.env.VITE_MEILISEARCH_KEY,
});

// Omni-Search: Meilisearch + Woo + Manual
export const hybridSearch = async (query) => {
  const msResults = await msClient.index('products').search(query);
  // Simulação de chamada Woo (idealmente via proxy ou n8n para segurança de keys)
  return {
    meilisearch: msResults.hits,
    manualEntry: { id: 'custom', nome: query, preco: 0 }
  };
};