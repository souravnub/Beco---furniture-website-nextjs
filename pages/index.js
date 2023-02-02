import Section from "../components/Section";
export default function Home() {
    return (
        <>
            {/* remb : make the first section a normal section */}
            <section className="min-h-screen bg-dark text-white">
                hello world
            </section>
            <Section className="min-h-screen bg-texture">second page</Section>
            <Section
                className="min-h-screen mb-10 bg-orange-200 bg-texture"
                navClass="nav-orange"
                menuBtnTheme="dark">
                thrid page
            </Section>
        </>
    );
}
