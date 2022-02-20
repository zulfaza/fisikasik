import React from 'react';
import { GetStaticPropsResult } from 'next';
import DynamicLayout from '@components/_layouts/DynamicLayout';
import RenderSlice from '@components/_slices/_renderslice';
import {
	ContentType,
	LayoutContentType,
	queryLayout,
	queryPageByRoute,
} from '@core/prismic/client';

const Dashboard = ({ content, layout_content }: StaticProps): JSX.Element => {
	return (
		<DynamicLayout content={layout_content} title={content.html_title}>
			<div className="md:grid flex-col-reverse grid-cols-7 w-full container my-10">
				<div className=" col-span-5">
					{content.body.map((slice, i) => (
						<RenderSlice slice={slice} key={i} />
					))}
				</div>
				<div className="col-span-2">
					<div className="bg-primary flex justify-between items-center flex-col rounded-xl p-6">
						<div className="flex-cc flex-col">
							<div className="rounded-full flex-cc w-40 h-40 overflow-hidden bg-white bg-opacity-50">
								<img
									className="w-full h-full"
									src={`https://avatars.dicebear.com/api/miniavs/${new Date().getTime()}.svg`}
									alt="Profile"
								/>
							</div>
							<h3 className="text-white my-5 font-semibold text-center">
								Fikri Nathiqrahman Alsa
							</h3>
							<h4 className="text-white my-5">XII MIPA</h4>
							<div>
								<img src={`/Images/Basketball.png`} alt="icon" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</DynamicLayout>
	);
};

export interface StaticProps {
	content?: ContentType;
	layout_content: LayoutContentType;
}

export const getStaticProps = async (context): Promise<GetStaticPropsResult<StaticProps>> => {
	const route = '/dashboard';

	const content = await queryPageByRoute(route);

	const layout_content = await queryLayout(content.layout.uid);

	return {
		props: { content, layout_content },
	};
};

export default Dashboard;
