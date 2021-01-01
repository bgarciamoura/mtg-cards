import type { AppProps /*, AppContext */ } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from '../components/Header';

const GlobalStyle = createGlobalStyle`

	*, html, body {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
`;

const theme = {
    colors: {
        primary: '#0070f3',
    },
};

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyle />
            {Component.name === 'FourOhFour' ? (
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            ) : (
                <ThemeProvider theme={theme}>
                    <Header />
                    <Component {...pageProps} />
                </ThemeProvider>
            )}
        </>
    );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// CustomApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default CustomApp;
