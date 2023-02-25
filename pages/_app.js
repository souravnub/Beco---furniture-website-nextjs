import Nav from "../components/Nav";
import "../styles/globals.css";
import { ProvideNavState } from "../contexts/navContext";
import Cursor from "../components/Cursor";
import { ProvideCursorStates } from "../contexts/cursorContext";
import { ProvideCartStates } from "../contexts/cartContext";
import Cart from "../components/Cart";

export default function App({ Component, pageProps }) {
    return (
        <ProvideCursorStates>
            <Cursor />

            <main className="selection:bg-brand selection:text-black">
                <ProvideCartStates>
                    <Cart />
                    <ProvideNavState>
                        <Nav />
                        <Component {...pageProps} />
                    </ProvideNavState>
                </ProvideCartStates>
            </main>
        </ProvideCursorStates>
    );
}
