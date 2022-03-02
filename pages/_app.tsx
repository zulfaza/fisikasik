import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import ProgressBar from 'nextjs-progressbar';
import ContextProvider from '@core/contexts/app';

import '@core/styles/tailwind.css';
import AuthProvider from '@core/contexts/firebase/AuthContext';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="theme-color" content="#000000" />
			</Head>
			<ProgressBar
				color="#000"
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				options={{ showSpinner: false }}
			/>
			<ContextProvider>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ContextProvider>
		</>
	);
};

export default App;
