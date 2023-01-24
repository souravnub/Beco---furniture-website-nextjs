import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preload" href="https://fonts.googleapis.com" />
                <link
                    rel="preload"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                {/* font-family: 'Montserrat', sans-serif; */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap"
                    rel="stylesheet"></link>

                {/* font-family: 'Unbounded', cursive; */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Unbounded:wght@200;300;400;500;600;700&display=swap"
                    rel="stylesheet"></link>
                {/*font-family: 'Roboto Mono', monospace; */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap"
                    rel="stylesheet"></link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
