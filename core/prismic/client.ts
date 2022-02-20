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

const injectMateri = async (doc: any): Promise<MateriType> => {
	const sliceList = ['materi'];
	const promises = [];

	doc.data.body.forEach((slice, index) => {
		if (sliceList.includes(slice.slice_type)) {
			promises.push(
				client
					.getByType('materi', {
						orderings: {
							field: 'document.first_publication_date',
							direction: 'desc',
						},
						pageSize: 100,
					})
					.then((res) => ({
						result: res.results,
						index: index,
					}))
			);
		}
	});

	return Promise.all(promises).then((res) => {
		res.forEach(({ result, index }) => {
			doc.data.body[index].items = result;
		});
		return doc.data;
	});
};

export const queryMateriBySlug = (slug: string): Promise<MateriType> => {
	return client
		.getByUID('materi', slug)
		.then((res) => res.data)
		.catch(() => null);
};
export const queryPageByRoute = (route: string): Promise<ContentType> => {
	return client
		.getSingle('pages', {
			predicates: [Prismic.predicate.at('my.pages.route', route)],
		})
		.then((res) => injectMateri(res))
		.catch(() => null);
};

export const queryAllPages = async (): Promise<PageDoc[]> => {
	return client.getAllByType('pages', {
		orderings: {
			field: 'document.created_at',
			direction: 'desc',
		},
	});
};
export const queryAllMateri = async (): Promise<MateriDoc[]> => {
	return client.getAllByType('materi', {
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

export interface MateriDoc extends prismicT.PrismicDocument {
	data: MateriType;
}
export interface MateriType extends DataInterface {
	jurusan: string;
	kelas: string;
	materi_description: RichTextBlock[];
	first_materi_url: prismicT.FilledLinkToDocumentField;
	overview_url: string;
	overview_description: RichTextBlock[];
	quiz_url: string;
	quiz_description: RichTextBlock[];
	semester: string;
	title: RichTextBlock[];
	video_group: {
		video_item: prismicT.PrismicDocument;
	}[];
	body: SliceType[];
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
export interface LayoutContentType {
	body: SliceType[];
}
