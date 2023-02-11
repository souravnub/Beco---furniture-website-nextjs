import Hero from "../sections/Hero";
import SelectedProducts from "../sections/SelectedProducts";

export default function Home() {
    return (
        <>
            {/* remb : make the first section a normal section */}
            <Hero />
            <SelectedProducts />
        </>
    );
}
