import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const DEFAULT = {
	sitename: 'FisikAsik',
	domain: 'http://my-site.com/',
	description: 'Belajar lebih seru dan asik bersama FisikAsik',
	image: 'https://images.prismic.io/fisikasik/488a5d98-d677-4a52-b7c9-9be1d698c25b_Cover.png?auto=compress,format',
};

const SEOTags = (props: any) => {
	const router = useRouter();

	const data = { ...DEFAULT, ...props };
	const supertitle = data.title ? `${data.title} | ${data.sitename} ` : data.sitename;

	return (
		<Head>
			<title>{supertitle}</title>

			<meta name="robots" content="follow, index" />
			<meta name="description" content={data.description} />
			<meta property="og:url" content={router.asPath} />
			<link rel="canonical" href={router.asPath} />

			<meta property="og:type" content="website" />
			<meta property="og:title" content={supertitle} />
			<meta property="og:site_name" content={supertitle} />
			<meta property="og:description" content={data.description} />
			<meta property="og:image" name="image" content={data.image} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={supertitle} />
			<meta name="twitter:title" content={supertitle} />
			<meta name="twitter:description" content={data.description} />
			<meta name="twitter:image" content={data.image} />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
			></meta>
		</Head>
	);
};

export default SEOTags;
