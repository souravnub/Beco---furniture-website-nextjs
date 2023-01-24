import Nav from "../components/Nav";
import "../styles/globals.css";
import { ProvideNavState } from "../utils/Nav";

export default function App({ Component, pageProps }) {
    return (
        <ProvideNavState>
            <Nav />
            <Component {...pageProps} />
        </ProvideNavState>
    );
}
