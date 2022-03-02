import GuestOnlyRoute from '@core/customRoute/GuestOnlyRoute';
import { loginByEmailPassword } from '@core/firebase/public';
import { ImageType, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React, { useState } from 'react';

const LoginForm = ({ slice }: { slice: SliceType }) => {
	const primary: {
		logo: ImageType;
		title: RichTextBlock[];
	} = slice.primary;

	const [Email, setEmail] = useState<string>(null);
	const [Password, setPassword] = useState<string>(null);
	const [Loading, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);

		loginByEmailPassword(Email, Password).catch((err) => {
			console.log(err);
			setLoading(false);
		});
	}

	return (
		<GuestOnlyRoute redirect={'/dashboard'}>
			<section className="w-full flex-cc h-screen">
				<div className="container max-w-xs">
					<div className="w-full flex-cc mb-5">
						<img src={primary.logo.url} alt={primary.logo.alt} />
					</div>
					<h2 className="text-primary-text text-4xl font-bold text-center mb-5">
						{RichText.asText(primary.title)}
					</h2>
					<form onSubmit={handleSubmit} className="flex flex-col">
						<input
							onChange={(e) => setEmail(e.target.value)}
							className="border-primary focus:border-opacity-100 border-opacity-70 border rounded-xl p-3 mb-3 hover:rounded-md transition-all"
							type="email"
							placeholder="Email"
							name="email"
							autoComplete="email"
						/>
						<input
							onChange={(e) => setPassword(e.target.value)}
							className="border-primary focus:border-opacity-100 border-opacity-70 border rounded-xl p-3 mb-3 hover:rounded-md transition-all"
							type="password"
							placeholder="Password"
							name="password"
							autoComplete="password"
						/>
						<button
							disabled={Loading}
							className="bg-secondary disabled:opacity-50 text-white font-medium transition-all hover:bg-red-500 focus:bg-red-500 hover:rounded rounded-xl py-2 md:py-4 px-5"
						>
							Login
						</button>
					</form>
				</div>
			</section>
		</GuestOnlyRoute>
	);
};

export default LoginForm;
