import * as Prismic from '@prismicio/client';
import * as prismicT from '@prismicio/types';
import { RichTextBlock } from 'prismic-reactjs';

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

export const queryPageByRoute = (route: string): Promise<ContentType> => {
	return client
		.getSingle('pages', {
			predicates: [Prismic.predicate.at('my.pages.route', route)],
		})
		.then((res: NewsDoc) => injectOtherNews(res))
		.catch(() => null);
};

export const injectOtherNews = async (doc: NewsDoc | PageDoc): Promise<NewsType | ContentType> => {
	const promises = [];

	doc.data.body.forEach((slice, index) => {
		const jumlah = slice.primary.jumlah_berita;
		switch (slice.slice_type) {
			case 'berita_lain':
				promises.push(
					client
						.getAllByType('news', {
							pageSize: jumlah,
							predicates: [Prismic.predicate.not('document.id', doc.id)],
						})
						.then((res) => ({
							result: res,
							index: index,
						}))
				);
				break;
			case 'recent_artikel':
				promises.push(
					client
						.getAllByType('news', {
							pageSize: jumlah,
						})
						.then((res) => ({
							result: res,
							index: index,
						}))
				);
				break;
			default:
				break;
		}
	});

	return Promise.all(promises).then((res) => {
		res.forEach((resdoc: { result: NewsDoc[]; index: number }) => {
			doc.data.body[resdoc.index].items = resdoc.result;
		});

		return doc.data;
	});
};

export const queryNews = async (slug: string): Promise<NewsType> => {
	return client
		.getByUID('news', slug)
		.then((res: NewsDoc) => injectOtherNews(res))
		.catch((err) => {
			console.log(err);
			return null;
		});
};

export const queryAllNews = async (): Promise<NewsDoc[]> => {
	return client.getAllByType('news', {
		orderings: {
			field: 'document.created_at',
			direction: 'desc',
		},
	});
};

export const queryAllPages = async (): Promise<PageDoc[]> => {
	return client.getAllByType('pages', {
		orderings: {
			field: 'document.created_at',
			direction: 'desc',
		},
	});
};

export default client;

declare type DataInterface = Record<
	string,
	prismicT.AnyRegularField | prismicT.GroupField | prismicT.SliceZone
>;
export interface SliceType {
	items: any[];
	primary: any;
	slice_label?: any;
	slice_type: string;
}

export interface ContentType extends DataInterface {
	html_title: string;
	route: string;
	body: SliceType[];
	layout: { uid: string };
}
export interface PageDoc extends prismicT.PrismicDocument {
	data: ContentType;
}
export interface ImageType {
	dimensions: {
		width: number;
		height: number;
	};
	alt: string | null;
	copyright: string | null;
	url: string;
}
export interface NewsType extends DataInterface {
	html_title: string;
	ringkasan: RichTextBlock[];
	body?: SliceType[];
	created_at: string;
	thumbnail: ImageType;
	author: string;
	layout: { uid: string };
}

export interface NewsDoc extends prismicT.PrismicDocument {
	data: NewsType;
}

export interface LayoutContentType {
	body: SliceType[];
}
