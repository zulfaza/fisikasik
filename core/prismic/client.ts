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

export const injectOtherNews = async (doc: NewsDoc): Promise<NewsType> => {
	const promises = [];

	doc.data.body.forEach((slice, index) => {
		switch (slice.slice_type) {
			case 'berita_lain':
				const jumlah = slice.primary.jumlah_berita;
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

export interface ContentType extends prismicT.PrismicDocumentHeader {
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
export interface NewsType extends DataInterface {
	html_title: string;
	body?: SliceType[];
	created_at: string;
	thumbnail: Image;
	author: string;
	layout: { uid: string };
}

export interface NewsDoc extends prismicT.PrismicDocument {
	data: NewsType;
}

export interface LayoutContentType {
	body: SliceType[];
}
