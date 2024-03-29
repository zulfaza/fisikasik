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
import { useAuth } from '@core/contexts/firebase/AuthContext';
import UserOnlyRoute from '@core/customRoute/UserOnlyRoute';
import { HiKey } from 'react-icons/hi';
import Link from '@components/_shared/Link';

const Dashboard = ({ content, layout_content }: StaticProps): JSX.Element => {
	const { currentUser = null, IsAdmin, Jabatan } = useAuth();
	const pattern = /(.*)(XI*\sMIPA\s\d+)\s(\d{4})/i;
	const arrName = currentUser?.displayName?.match(pattern) ?? [];
	const name = arrName[1] ?? currentUser.displayName;
	const kelas = arrName[2] ?? Jabatan ?? '-';

	return (
		<UserOnlyRoute redirect="/login">
			<DynamicLayout content={layout_content} title={content.html_title}>
				<div className="md:grid flex flex-col grid-cols-7 w-full container my-10">
					<div className=" w-full md:col-span-5 mb-5 md:mb-0">
						{content.body.map((slice, i) => (
							<RenderSlice slice={slice} key={i} />
						))}
					</div>
					<div className="col-span-2">
						<div className="bg-primary mb-5 flex justify-between items-center flex-col rounded-xl p-6">
							<div className="flex-cc flex-col">
								<div className="rounded-full flex-cc w-40 h-40 overflow-hidden bg-white bg-opacity-50">
									<img
										className="w-full h-full"
										src={currentUser?.photoURL}
										alt="Profile"
									/>
								</div>
								<h3 className="text-white capitalize my-5 font-semibold text-center">
									{name}
								</h3>
								<h4 className="text-white">{kelas}</h4>
								<div>
									{IsAdmin ? (
										<HiKey className="text-white text-lg" />
									) : (
										<img src={'/Images/Basketball.png'} alt="icon" />
									)}
								</div>
							</div>
						</div>
						{IsAdmin && (
							<Link
								className="bg-primary block text-center w-full py-4 rounded-xl text-white hover:bg-opacity-80 transition-all"
								href="/admin/manage-user"
							>
								Manage User
							</Link>
						)}
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

export const getStaticProps = async (): Promise<GetStaticPropsResult<StaticProps>> => {
	const route = '/dashboard';
	const content = await queryPageByRoute(route);
	const layout_content = await queryLayout(content.layout.uid);

	return {
		props: { content, layout_content },
	};
};

export default Dashboard;

