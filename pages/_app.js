import Nav from "../components/Nav";
import "../styles/globals.css";
import { ProvideNavState } from "../contexts/Nav";
import Cursor from "../components/Cursor";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Cursor />
            <main className="selection:bg-yellow-400 selection:text-black">
                <ProvideNavState>
                    <Nav />
                    <Component {...pageProps} />
                </ProvideNavState>
            </main>
        </>
    );
}
