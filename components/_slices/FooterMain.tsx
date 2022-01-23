import React from 'react';
import { ImageType, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Link from '@components/_shared/Link';
import { useRouter } from 'next/router';

interface Props {
	slice: SliceType;
}
interface LinkProp {
	route: string;
	text: RichTextBlock[];
}
const FooterMain = ({ slice }: Props): JSX.Element => {
	const router = useRouter();
	const logo: ImageType = slice.primary.logo1;
	const Links = slice.items;

	return (
		<section className="mt-5 w-full">
			<div className="bg-topografi-pattern flex-cc py-10 shadow-[-4px_-3px_8px_rgb(0,0,0,0.1)]">
				{logo && (
					<img
						className="w-11/12 md:w-full max-w-[475.3px]"
						src={logo.url}
						alt={logo.alt}
					/>
				)}
			</div>
			<div className="bg-white shadow-[-4px_-3px_8px_rgb(0,0,0,0.1)]">
				<div className="flex container flex-col md:flex-row justify-between max-w-[844px] py-6">
					{Links.map((link: LinkProp, index) => (
						<Link
							className={`${
								router.asPath === link.route && 'font-bold'
							} border-b md:border-b-0 hover:underline py-3 border-black text-black uppercase`}
							key={index}
							href={link.route}
						>
							{RichText.asText(link.text)}
						</Link>
					))}
				</div>
			</div>
			<div className="bg-[#F5F5F5] py-7 px-3 text-center md:text-left">
				<div className="container flex flex-col-reverse justify-between items-center text-black md:flex-row">
					<div>Copyright © 2022 Pemerintah Desa Sikunang</div>
					<div className="flex flex-col items-center md:flex-row">
						<span className="mr-4">
							Dalam kerjasama dengan TIM KKN-PPM UGM 2021 JT-102
						</span>
						<img className="my-5 md:my-0" src="/Logo-logo.png" alt="logo logo" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default FooterMain;
