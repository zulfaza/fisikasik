import algoliasearch from 'algoliasearch';

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
export const artikelIndex = client.initIndex(process.env.ALGOLIA_INDEX);

export default client;
