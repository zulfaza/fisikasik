import Link from '@components/_shared/Link';
import { ImageType, SliceType } from '@core/prismic/client';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';
import React from 'react';

interface Props {
	slice: SliceType;
}

const NavbarDesktop = ({ slice }: Props): JSX.Element => {
	const { logo1, logo2 }: { logo1: ImageType; logo2: ImageType } = slice.primary;
	const router = useRouter();
	return (
		<nav className="md:p-6 p-3 bg-primary">
			<div className="container flex-bc">
				<div>
					<div className="md:h-12 h-8 flex gap-1 md:gap-2">
						<Link className="h-full" href="/">
							<img className="h-full" src={logo1.url} alt={logo1.alt} />
						</Link>
						<Link className="h-full" href="/">
							<img className="h-full" src={logo2.url} alt={logo2.alt} />
						</Link>
					</div>
				</div>
				<div className="flex items-center">
					<div className="ml-10 hidden md:flex gap-3">
						{slice.items.map((link, index) => (
							<Link
								className={`${
									router.asPath === link.route ? 'font-bold' : ''
								} relative text-white hover:underline `}
								key={index}
								href={link.route}
							>
								{RichText.asText(link.text)}
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavbarDesktop;
