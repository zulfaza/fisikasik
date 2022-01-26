import algoliasearch from 'algoliasearch';

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const artikelIndex = client.initIndex(process.env.ALGOLIA_INDEX);

const publicClient = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
	'1473f95b2c645282545991ef94fd57a9'
);
export const publicArtikelIndex = publicClient.initIndex('artikel');

export default artikelIndex;
