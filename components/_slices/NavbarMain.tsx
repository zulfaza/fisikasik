import React from 'react';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { Image, SliceType } from '@core/prismic/client';
import Link from '@components/_shared/Link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useResize from '@core/hooks/useResize';

interface Props {
	slice: SliceType;
}

interface LinkProp {
	route: string;
	text: RichTextBlock[];
}

const DesktopNav = ({ slice }: Props): JSX.Element => {
	const router = useRouter();
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

const HamburgerIcon = ({ className = '' }): JSX.Element => (
	<svg
		className={className}
		width="32"
		height="32"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M6.66666 22.6665H25.3333"
			stroke="#14181F"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M6.66666 16H25.3333"
			stroke="#14181F"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M6.66666 9.3335H25.3333"
			stroke="#14181F"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

const MobileNav = ({ slice }: Props): JSX.Element => {
	const router = useRouter();
	const primary = slice.primary;
	const logo1: Image = primary.logo1;
	const logo2: Image = primary.logo2;
	const links: LinkProp[] = slice.items;
	const [open, setOpen] = useState(false);
	// Todo Add popup links
	return (
		<div className="flex py-4 px-5 items-center justify-between">
			<div>
				{logo1 && (
					<Link className="" href="/">
						<img className=" max-h-10" src={logo1.url} alt={logo1.alt} />
					</Link>
				)}
			</div>
			<div className="mx-4">
				{logo2 && (
					<Link href="/">
						<img className=" max-h-7" src={logo2.url} alt={logo2.alt} />
					</Link>
				)}
			</div>
			<div>
				<button>
					<HamburgerIcon />
				</button>
			</div>
		</div>
	);
};

const NavbarMain = ({ slice }: Props): JSX.Element => {
	const screen = useResize();
	if (screen.md) return <DesktopNav slice={slice} />;

	return <MobileNav slice={slice} />;
};
export default NavbarMain;
