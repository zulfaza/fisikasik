import * as Prismic from '@prismicio/client';
import * as prismicT from '@prismicio/types';
import { RichTextBlock } from 'prismic-reactjs';
const projectId = process.env.PRISMIC_API ?? 'fisikasik';
const apiEndpoint = Prismic.getEndpoint(projectId);
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

export const queryMateriBySlug = (slug: string): Promise<MateriDoc> => {
	return client
		.getByUID('materi', slug)
		.then((res) => res)
		.catch(() => null);
};

export const queryVideoBySlug = (slug: string): Promise<VideoDoc> => {
	return client
		.getByUID('videos', slug)
		.then((res) => res)
		.catch(() => null);
};

export const queryPopup = (slug: string): Promise<any> => {
	return client
		.getByUID('popups', slug)
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

export interface extendMater extends prismicT.FilledLinkToDocumentField {
	isLastVideo?: boolean;
	last_video?: string;
	isSubmitKesimpulan?: boolean;
	isSubmitKuis?: boolean;
}
export interface VideoType extends DataInterface {
	materi: extendMater;
	next_video: prismicT.FilledLinkToDocumentField;
	popup_group: {
		popup: prismicT.FilledLinkToDocumentField;
	}[];
	title: RichTextBlock[];
	video_url: string;
}
export interface VideoDoc extends prismicT.PrismicDocument {
	data: VideoType;
}
export interface MateriType extends DataInterface {
	jurusan: string;
	kelas: string;
	materi_description: RichTextBlock[];
	first_materi_url: prismicT.FilledLinkToDocumentField;
	kesimpulan_url: prismicT.FilledLinkToDocumentField;
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

export interface PopupType extends DataInterface {
	answer_value: string;
	duration: number;
	options: {
		label: string;
		value: string;
	}[];
	questions: RichTextBlock[];
	timestamp: string;
	title: RichTextBlock[];
	video: prismicT.FilledLinkToDocumentField;
}

export interface PopupDoc extends prismicT.PrismicDocument {
	data: PopupType;
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
