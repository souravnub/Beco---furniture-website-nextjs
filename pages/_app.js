import Nav from "../components/Nav";
import "../styles/globals.css";
import { ProvideNavState } from "../contexts/Nav";

export default function App({ Component, pageProps }) {
    return (
        <main>
            <ProvideNavState>
                <Nav />
                <Component {...pageProps} />
            </ProvideNavState>
        </main>
    );
}
