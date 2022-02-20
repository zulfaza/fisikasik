import React from 'react';
import useMinHeight from '@core/hooks/useMinHeight';
import AlertHandler from '@components/_shared/AlertHandler';
import SEOTags from '@components/_shared/SEOTags';
import { useLayout } from '@core/contexts/app';
import Link from '@components/_shared/Link';

interface Props {
	children: React.ReactNode;
	title?: string;
	className?: string;
	style?: React.CSSProperties;
}

const MainLayout = ({ children, title, className, style }: Props): JSX.Element => {
	const [minHeight, upperRef, lowerRef] = useMinHeight();
	const { AlertValue } = useLayout();

	return (
		<>
			<SEOTags title={title} />

			<header ref={upperRef}>
				<nav className="bg-primary py-5 flex">
					<div className="container">
						<div className="md:h-16 h-8 flex gap-1 md:gap-2">
							<Link className="h-full" href="/">
								<img
									className="h-full"
									src="/Images/kemdikbud.png"
									alt="Logo Kemdikbud"
								/>
							</Link>
							<Link className="h-full" href="/">
								<img className="h-full" src="/Images/uny.png" alt="Logo UNY" />
							</Link>
						</div>
					</div>
				</nav>
			</header>

			<main style={{ minHeight, ...style }} className={className}>
				{children}
			</main>

			<footer ref={lowerRef}>{/* Footer things */}</footer>

			{AlertValue && <AlertHandler key={Date.now()} />}
		</>
	);
};

export default MainLayout;
