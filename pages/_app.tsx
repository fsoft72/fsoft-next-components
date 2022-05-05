import '../styles/globals.css';

import '../fsoft-components/VideoBackground.css';

import type { AppProps } from 'next/app';

function MyApp ( { Component, pageProps }: AppProps ) {
	return <Component {...pageProps} />;
}

export default MyApp;
