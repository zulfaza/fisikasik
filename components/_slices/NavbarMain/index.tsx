import React, { useState } from 'react';
import { ImageType, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Link from '@components/_shared/Link';
import { useRouter } from 'next/router';
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
