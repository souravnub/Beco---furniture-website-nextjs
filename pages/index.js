import Section from "../components/Section";

export default function Home() {
    return (
        <>
            {/* remb : make the first section a normal section */}
            <section className="min-h-screen bg-dark">hello world</section>
            <Section className="min-h-screen">second page</Section>
            <Section
                className="min-h-screen mb-10 bg-orange-200"
                navClass="nav-orange"
                menuBtnTheme="dark">
                thrid page
            </Section>
        </>
    );
}
