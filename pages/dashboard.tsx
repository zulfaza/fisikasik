import React from 'react';
import { GetStaticPropsResult, NextPageContext } from 'next';
import DynamicLayout from '@components/_layouts/DynamicLayout';
import RenderSlice from '@components/_slices/_renderslice';
import {
	ContentType,
	LayoutContentType,
	queryLayout,
	queryPageByRoute,
} from '@core/prismic/client';
import { useAuth } from '@core/contexts/firebase/AuthContext';
import UserOnlyRoute from '@core/customRoute/UserOnlyRoute';
import { HiKey } from 'react-icons/hi';
const Spinning = () => (
	<svg
		className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
	>
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
		></circle>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		></path>
	</svg>
);

const Dashboard = ({ content, layout_content }: StaticProps): JSX.Element => {
	const { currentUser = null, IsAdmin } = useAuth();
	const pattern = /(.*)(XI*\sMIPA\s\d+)\s(\d{4})/i;
	const arrName = currentUser?.displayName?.match(pattern) ?? [];
	const name = arrName[1] ?? currentUser.displayName;
	const kelas = arrName[2] ?? '-';
	const tahun = arrName[3] ?? '-';

	return (
		<UserOnlyRoute redirect="/login">
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
										src={currentUser?.photoURL}
										alt="Profile"
									/>
								</div>
								<h3 className="text-white my-5 font-semibold text-center">
									{name}
								</h3>
								<h4 className="text-white">{kelas}</h4>
								<h4 className="text-white my-5">{tahun}</h4>
								<div>
									{IsAdmin ? (
										<HiKey className="text-white text-lg" />
									) : (
										<img src={`/Images/Basketball.png`} alt="icon" />
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</DynamicLayout>
		</UserOnlyRoute>
	);
};

export interface StaticProps {
	content?: ContentType;
	layout_content: LayoutContentType;
}

export const getStaticProps = async (
	context: NextPageContext
): Promise<GetStaticPropsResult<StaticProps>> => {
	const route = '/dashboard';
	const content = await queryPageByRoute(route);
	const layout_content = await queryLayout(content.layout.uid);

	return {
		props: { content, layout_content },
	};
};

export default Dashboard;
