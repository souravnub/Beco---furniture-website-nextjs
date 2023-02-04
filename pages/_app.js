import Nav from "../components/Nav";
import "../styles/globals.css";
import { ProvideNavState } from "../contexts/navContext";
import Cursor from "../components/Cursor";
import { ProvideCursorStates } from "../contexts/cursorContext";

export default function App({ Component, pageProps }) {
    return (
        <ProvideCursorStates>
            <Cursor />
            <main className="selection:bg-yellow-400 selection:text-black">
                <ProvideNavState>
                    <Nav />
                    <Component {...pageProps} />
                </ProvideNavState>
            </main>
        </ProvideCursorStates>
    );
}
