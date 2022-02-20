import { ImageType, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

const LoginForm = ({ slice }: { slice: SliceType }) => {
	const primary: {
		logo: ImageType;
		title: RichTextBlock[];
	} = slice.primary;

	return (
		<section className="w-full flex-cc h-screen">
			<div className="container max-w-xs">
				<div className="w-full flex-cc mb-5">
					<img src={primary.logo.url} alt={primary.logo.alt} />
				</div>
				<h2 className="text-primary-text text-4xl font-bold text-center mb-5">
					{RichText.asText(primary.title)}
				</h2>
				<div className="flex flex-col">
					<input
						className="border-primary focus:border-opacity-100 border-opacity-70 border rounded-xl p-3 mb-3 hover:rounded-md transition-all"
						type="text"
						placeholder="Username"
					/>
					<input
						className="border-primary focus:border-opacity-100 border-opacity-70 border rounded-xl p-3 mb-3 hover:rounded-md transition-all"
						type="password"
						placeholder="Password"
					/>
					<button className="bg-secondary text-white font-medium transition-all hover:bg-red-500 focus:bg-red-500 hover:rounded rounded-xl py-2 md:py-4 px-5">
						Login
					</button>
				</div>
			</div>
		</section>
	);
};

export default LoginForm;
