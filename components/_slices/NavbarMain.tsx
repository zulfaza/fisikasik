import React from 'react';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { ImageType, SliceType } from '@core/prismic/client';
import Link from '@components/_shared/Link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useResize from '@core/hooks/useResize';
import Image from 'next/image';

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
	const logo1: ImageType = primary.logo1;
	const logo2: ImageType = primary.logo2;
	const links: LinkProp[] = slice.items;
	return (
		<nav className="w-full bg-topografi-pattern md:py-11 flex-cc flex-col">
			{logo1 && (
				<Link className="mb-4" href="/">
					<div className="w-12 h-12 relative">
						<Image layout="fill" objectFit="contain" src={logo1.url} alt={logo1.alt} />
					</div>
				</Link>
			)}
			{logo2 && (
				<Link className="ml-8 mb-14" href="/">
					<div className="h-16 w-[477px] relative">
						<Image layout="fill" objectFit="contain" src={logo2.url} alt={logo2.alt} />
					</div>
				</Link>
			)}
			<div className="flex container justify-between max-w-[844px]">
				{links.map((link, index) => (
					<Link
						className={`${
							router.asPath === link.route && 'font-bold'
						} text-black hover:underline uppercase`}
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

const HamburgerIcon = ({ open }: { className?: string; open: boolean }): JSX.Element => (
	<div className="w-6 flex items-center justify-center relative">
		<span
			className={`${
				open ? 'translate-y-0 rotate-45' : '-translate-y-2'
			} transform transition w-full h-px bg-current absolute`}
		></span>

		<span
			className={` ${
				open ? 'opacity-0 translate-x-3' : 'opacity-100'
			} transform transition w-full h-px bg-current absolute`}
		></span>

		<span
			className={`${
				open ? 'translate-y-0 -rotate-45' : 'translate-y-2'
			} transform transition w-full h-px bg-current absolute`}
		></span>
	</div>
);

const MobileNav = ({ slice }: Props): JSX.Element => {
	const primary = slice.primary;
	const logo1: ImageType = primary.logo1;
	const logo2: ImageType = primary.logo2;
	const links: LinkProp[] = slice.items;
	const [open, setOpen] = useState(false);
	// Todo Add popup links
	return (
		<div className="fixed z-50 w-full bg-white border-b shadow-lg">
			<div className="flex w-full  py-4 px-5 items-center justify-between">
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
					<button
						className=" bg-white rounded-md hover:bg-slate-100 px-2 py-4"
						onClick={() => setOpen((prev) => !prev)}
					>
						<HamburgerIcon className="relative" open={open} />
					</button>
				</div>
			</div>
			<div
				className={` ${
					open ? 'translate-x-0' : 'translate-x-full'
				} w-screen overflow-hidden h-screen transition-all bg-white flex flex-col absolute top-18 p-5 left-0`}
			>
				{links.map((link, index) => (
					<Link
						onClick={() => setOpen(false)}
						className="border-b py-5"
						key={index}
						href={link.route}
					>
						{RichText.asText(link.text)}
					</Link>
				))}
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
