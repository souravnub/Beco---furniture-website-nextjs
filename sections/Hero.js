import React from "react";
import CursorHover from "../components/CursorHover";
import getTaliwind from "../utils/getTaliwind";
import { FiArrowRight } from "react-icons/fi";

function videoBtnContent() {
  return (
    <div className="flex items-center gap-2 text-sm font-thin">
      <FiArrowRight />
      <span>Watch Showreel</span>
    </div>
  );
}
const Hero = () => {
  return (
    <section className="relative isolate bg-dark  bg-texture py-24 text-white">
      <h1 className="relative z-10 flex w-max flex-col gap-2 px-2 text-4xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl">
        <span>Masterpieces</span>
        <span className="w-full text-right sm:ml-4">crafted from</span>
        <span className="pointer-events-none absolute top-full w-full translate-y-2 text-right text-dark">
          wood
        </span>
      </h1>

      <CursorHover
        fill={getTaliwind.theme.backgroundColor.brand[500]}
        content={videoBtnContent}
        className="-z-10 w-full px-5"
        scale={9}
      >
        <div className="relative grid h-[50vh] w-full cursor-pointer place-content-center overflow-hidden font-bonelest text-dark sm:h-[60vh] lg:h-[80vh]">
          <img
            src="https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
            className="absolute -z-10 h-full w-full object-cover"
          />
          <span className="text-9xl ">Beco</span>
        </div>
        {/* <video
                    src="./heroVideo.mp4"
                    className="w-full  rounded-sm aspect-video object-cover sm:aspect-auto cursor-pointer"
                    autoPlay={true}
                    loop
                    playsInline
                    muted></video> */}
      </CursorHover>
      {/* <video
                    src="https://res.cloudinary.com/sourav-cloudinary-account/video/upload/v1675521252/Furniture%20Website%20-%20beco/HeroVideo.mp4"
                    loop
                    autoPlay
                    muted></video> */}

      <h1 className="relative z-10 flex w-full flex-col  gap-2 px-4 text-right text-4xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="pointer-events-none absolute -top-full right-4 text-dark">
          Best
        </span>
        <span>since 1982</span>
      </h1>
    </section>
  );
};

export default Hero;
