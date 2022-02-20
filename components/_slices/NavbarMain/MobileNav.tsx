import Link from '@components/_shared/Link';
import { ImageType, SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import React, { useState } from 'react';
interface Props {
	slice: SliceType;
}
export const HamburgerIcon = ({ open }: { className?: string; open: boolean }): JSX.Element => (
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
	const { logo1, logo2 }: { logo1: ImageType; logo2: ImageType } = slice.primary;
	const [open, setOpen] = useState(false);
	// Todo Add popup links
	return (
		<div className="fixed z-50 w-full bg-primary border-b shadow-lg">
			<div className="flex w-full  py-4 px-5 items-center justify-between">
				<div>
					<Link className="h-full" href="/">
						<img className="h-full" src={logo1.url} alt={logo1.alt} />
					</Link>
					<Link className="h-full" href="/">
						<img className="h-full" src={logo2.url} alt={logo2.alt} />
					</Link>
				</div>

				<div>
					<button
						className=" bg-primary rounded-md hover:bg-blue-800 px-2 py-4"
						onClick={() => setOpen((prev) => !prev)}
					>
						<HamburgerIcon className="relative" open={open} />
					</button>
				</div>
			</div>
			<div
				className={` ${
					open ? 'translate-x-0' : 'translate-x-full'
				} w-screen overflow-hidden h-screen transition-all bg-primary flex flex-col absolute top-18 p-5 left-0`}
			>
				{slice.items
					.filter((link) => link.position === 'Left')
					.map((link, index) => (
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

export default MobileNav;
