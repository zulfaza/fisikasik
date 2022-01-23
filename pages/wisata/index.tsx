import { GetStaticPropsResult } from 'next';
import CustomPage from '@pages/[...customs]';
import {
	ContentType,
	LayoutContentType,
	queryLayout,
	queryPageByRoute,
} from '@core/prismic/client';

export interface StaticProps {
	content: ContentType;
	layout_content: LayoutContentType;
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<StaticProps>> => {
	const content = await queryPageByRoute('/wisata');
	const layout_content = await queryLayout(content.layout.uid);

	return {
		props: { content, layout_content },
	};
};

export default CustomPage;
