import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import CursorHover from "../components/CursorHover";
import getTaliwind from "../utils/getTaliwind";

const ProductCard = ({ id, name, img, price, cursorFill, cursorColor }) => {
    const infoContainerRef = useRef();
    const cardRef = useRef();
    const illustrationRef = useRef();
    const bgImgRef = useRef();
    const hoverAniRef = useRef();

    const [isHoverAniEnabled, setIsHoverAniEnabled] = useState(false);

    useEffect(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                ease: "power",
            },
            onComplete: () => {
                setIsHoverAniEnabled(true);
            },
        });

        timeline
            .fromTo(bgImgRef.current, { scale: 1.5 }, { scale: 1, duration: 1 })
            .fromTo(
                cardRef.current.querySelector("h3"),
                {
                    skewX: "-5deg",
                    y: "100%",
                    opacity: 0,
                },
                { skewX: 0, y: 0, opacity: 1 }
            )
            .fromTo(
                cardRef.current.querySelector("p"),
                {
                    opacity: 0,
                    y: 10,
                },
                { opacity: 1, y: 0 },
                "<"
            )
            .fromTo(
                illustrationRef.current,
                {
                    opacity: 0,
                },
                { opacity: 1 }
            )
            .fromTo(
                illustrationRef.current.querySelector("img"),
                { x: -5 },
                { x: 0 },
                "<-0.5"
            );

        const hoverAni = gsap.timeline({ paused: true });
        hoverAni
            .to(illustrationRef.current.querySelector("img"), {
                x: 5,
                duration: 0.05,
            })
            .to(
                bgImgRef.current,
                {
                    duration: 0.05,
                    scale: 1.05,
                },
                "<"
            );
        hoverAniRef.current = hoverAni;
        return () => {
            hoverAniRef.current.revert();
            timeline.revert();
        };
    }, []);

    useEffect(() => {
        function playHoverAnimation() {
            hoverAniRef.current.play();
        }
        function reverseHoverAnimation() {
            hoverAniRef.current.reverse();
        }

        if (isHoverAniEnabled) {
            cardRef.current.addEventListener("mouseover", playHoverAnimation);
            cardRef.current.addEventListener("mouseout", reverseHoverAnimation);
        }

        return () => {
            cardRef.current.removeEventListener(
                "mouseover",
                playHoverAnimation
            );
            cardRef.current.removeEventListener(
                "mouseout",
                reverseHoverAnimation
            );
        };
    }, [isHoverAniEnabled]);

    return (
        <CursorHover
            scale={4}
            borderColor="transparent"
            className="mt-24 inline-block"
            content={
                <span
                    className="font-mayfest text-sm font-bold"
                    style={{ color: cursorColor }}>
                    view
                </span>
            }
            fill={
                cursorFill || getTaliwind.theme.backgroundColor.brand.DEFAULT
            }>
            <div
                ref={cardRef}
                className="group relative isolate aspect-[1/1.3] w-[18rem]  cursor-pointer">
                {/* img container */}
                <div className="absolute h-full w-full overflow-hidden">
                    <img
                        className="absolute -z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        ref={bgImgRef}
                        src={img}
                        alt=""
                    />
                </div>
                {/* header container */}
                <div
                    ref={infoContainerRef}
                    className="flex items-end gap-3 pr-6">
                    <div className="relative -left-5 overflow-hidden">
                        <h3 className=" w-min  font-mayfest text-5xl">
                            {name}
                        </h3>
                    </div>
                    <div
                        className="relative h-16 w-16 rounded-full border border-dark"
                        ref={illustrationRef}>
                        <img
                            src="./arrow-right.svg"
                            alt=""
                            className="absolute -left-2 top-1/3 aspect-square w-1/2 transition duration-500 "
                        />
                    </div>
                </div>
                {/* price container */}
                <p className="absolute bottom-0 right-0 translate-x-[15%] translate-y-[35%] font-serif text-6xl sm:translate-x-[35%]">
                    {price}
                </p>
            </div>
        </CursorHover>
    );
};

export default ProductCard;
