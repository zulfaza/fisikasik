import React from 'react';
import { SliceType } from '@core/prismic/client';
import useResize from '@core/hooks/useResize';
import NavbarDesktop from './NavbarDesktop';
import MobileNav from './MobileNav';

interface Props {
	slice: SliceType;
}

const NavbarMain = ({ slice }: Props): JSX.Element => {
	const screen = useResize();
	if (screen.md) return <NavbarDesktop slice={slice} />;

	return <MobileNav slice={slice} />;
};

export default NavbarMain;
