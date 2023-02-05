import CursorHover from "../components/CursorHover";
import getTaliwind from "../utils/getTaliwind";
import { FiArrowRight } from "react-icons/fi";

function videoBtnContent() {
    return (
        <div className="flex gap-2 items-center font-thin text-sm">
            <FiArrowRight />
            <span>Watch Showreel</span>
        </div>
    );
}

export default function Home() {
    return (
        <>
            {/* remb : make the first section a normal section */}
            <section className="relative bg-dark bg-texture  text-white py-24 isolate">
                <h1 className="px-2 relative w-max text-5xl  font-bold text-white flex flex-col gap-2 z-10 sm:text-6xl md:text-7xl lg:text-8xl">
                    <span>We merge</span>
                    <span className="text-right w-full ml-4">reality with</span>
                    <span className="pointer-events-none  text-right top-full w-full absolute translate-y-2">
                        dreams
                    </span>
                </h1>

                <CursorHover
                    fill={getTaliwind.theme.backgroundColor.brand[500]}
                    content={videoBtnContent}
                    className="px-5 w-full -z-10"
                    scale={9}>
                    <video
                        src="./heroVideo.mp4"
                        className="w-full  rounded-sm aspect-video object-cover sm:aspect-auto cursor-pointer"
                        autoPlay={true}
                        loop
                        playsInline
                        muted></video>
                </CursorHover>
                {/* <video
                    src="https://res.cloudinary.com/sourav-cloudinary-account/video/upload/v1675521252/Furniture%20Website%20-%20beco/HeroVideo.mp4"
                    loop
                    autoPlay
                    muted></video> */}

                <h1 className="px-4 relative text-right w-full text-5xl  font-bold text-white flex flex-col gap-2 z-10 sm:text-6xl md:text-7xl lg:text-8xl">
                    <span className="absolute -top-full right-4">Best</span>
                    <span>since 1982</span>
                </h1>
            </section>
        </>
    );
}
