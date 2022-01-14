import * as Prismic from '@prismicio/client';
import * as prismicT from '@prismicio/types';

const apiEndpoint = Prismic.getEndpoint(process.env.PRISMIC_API);
const accessToken = process.env.NEXT_PUBLIC_PRISMIC_TOKEN || '';

const client = Prismic.createClient(apiEndpoint, { accessToken });

export const queryByRoute = (route: string): Promise<ContentType> => {
	return client
		.get({
			predicates: [Prismic.Predicates.at('my.pages.route', route)],
		})
		.then((res) => res.results[0].data)
		.catch(() => null);
};

export const queryLayout = (uid: string): Promise<LayoutContentType> => {
	return client
		.getByUID('layouts', uid)
		.then((res) => res.data)
		.catch(() => null);
};

export const queryNews = async (slug: string): Promise<NewsType> => {
	return client
		.getByUID('news', slug)
		.then((res) => ({ ...res.data, slug }))
		.catch(() => null);
};

export const queryAllNews = async (): Promise<NewsType[]> => {
	return client.getAllByType('news', {
		orderings: {
			field: 'document.created_at',
			direction: 'desc',
		},
	});
};

export default client;

export interface SliceType {
	items: any[];
	primary: any;
	slice_label?: any;
	slice_type: string;
}

export interface ContentType extends prismicT.PrismicDocument {
	html_title: string;
	route: string;
	body: SliceType[];
	layout: { uid: string };
}

export interface Image {
	dimensions: {
		width: number;
		height: number;
	};
	alt: string | null;
	copyright: string | null;
	url: string;
}
export interface NewsType extends prismicT.PrismicDocument {
	html_title: string;
	route: string;
	body?: SliceType[];
	created_at: string;
	thumbnail: Image;
	author: string;
	layout: { uid: string };
}

export interface LayoutContentType {
	body: SliceType[];
}
