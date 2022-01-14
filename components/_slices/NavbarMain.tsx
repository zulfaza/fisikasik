import React from 'react';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { Image, SliceType } from '@core/prismic/client';
import Link from '@components/_shared/Link';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
	slice: SliceType;
}

interface LinkProp {
	route: string;
	text: RichTextBlock[];
}

const NavbarMain = ({ slice }: Props): JSX.Element => {
	const router = useRouter();
	const locale = router.locale;
	const [open, setOpen] = useState(false);
	const primary = slice.primary;
	const logo1: Image = primary.logo1;
	const logo2: Image = primary.logo2;
	const links: LinkProp[] = slice.items;

	return (
		<nav className="w-full bg-topografi-pattern md:py-11 flex-cc flex-col">
			{logo1 && (
				<Link className="mb-4" href="/">
					<img className="w-12" src={logo1.url} alt={logo1.alt} />
				</Link>
			)}
			{logo2 && (
				<Link className="ml-8 mb-14" href="/">
					<img className="h-16" src={logo2.url} alt={logo2.alt} />
				</Link>
			)}
			<div className="flex container justify-between max-w-[844px]">
				{links.map((link, index) => (
					<Link
						className={`${router.asPath === link.route && 'font-bold'} text-black`}
						key={index}
						href={link.route}
					>
						{RichText.asText(link.text)}
					</Link>
				))}
			</div>
		</nav>
	);
};
export default NavbarMain;
