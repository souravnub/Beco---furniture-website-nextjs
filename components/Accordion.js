import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import getTailwind from "../utils/getTailwind";

const Accordion = ({ data, ...props }) => {
    const accordianRef = useRef();

    useEffect(() => {
        // positioning Accordion paragraphs
        const listItems = Array.from(accordianRef.current.children);
        const buttons = listItems.map((item) =>
            item.querySelector(":scope > button")
        );
        buttons.forEach((button) => {
            const { paddingTop: btn_padding_top } = getComputedStyle(button);
            const titleHeight =
                button.querySelector(":scope > div").offsetHeight;

            const top = parseInt(btn_padding_top) + titleHeight;
            button.querySelector("p").style.top = top + "px";
        });
    }, []);

    function handleAccordianItemState({ currentTarget: clicked_btn }) {
        const description_para = clicked_btn.querySelector("p");
        const illustration = clicked_btn.querySelector(
            ":scope > div:nth-of-type(1) > div"
        );
        const isExpanded =
            clicked_btn.getAttribute("aria-expanded") === "true" ? true : false;
        const description_height = description_para.offsetHeight;

        if (clicked_btn.disabled) {
            return;
        }

        if (isExpanded) {
            clicked_btn.setAttribute("aria-expanded", "false");
            description_para.setAttribute("aria-hidden", "true");

            const collapseTimeline = gsap.timeline({
                ease: "power2.inOut",
                onStart: () => {
                    clicked_btn.disabled = "disabled";
                },
                onComplete: () => {
                    clicked_btn.disabled = false;
                    ScrollTrigger.refresh(true);
                },
            });
            collapseTimeline
                .to(description_para, {
                    opacity: 0,
                })
                .set(description_para, {
                    visibility: "hidden",
                })
                .to(clicked_btn, {
                    height: clicked_btn.offsetHeight - description_height,
                    duration: 0.3,
                })
                .to(
                    illustration,
                    { width: getTailwind.theme.width[1], duration: 0.3 },
                    "<"
                );
        } else {
            clicked_btn.setAttribute("aria-expanded", "true");
            description_para.setAttribute("aria-hidden", "false");

            const expandTimeline = gsap.timeline({
                ease: "power2.inOut",
                onStart: () => {
                    clicked_btn.disabled = "disabled";
                },
                onComplete: () => {
                    clicked_btn.disabled = false;
                    ScrollTrigger.refresh(true);
                },
            });
            expandTimeline
                .to(clicked_btn, {
                    height: clicked_btn.offsetHeight + description_height,
                    duration: 0.3,
                })
                .to(illustration, { width: 15, duration: 0.3 }, "<")
                .set(description_para, {
                    visibility: "visible",
                })
                .to(description_para, {
                    opacity: 1,
                });
        }
    }
    return (
        <ul
            ref={accordianRef}
            aria-label="Accordion Control Button Group"
            {...props}>
            {data.map(({ id, title, desc }) => {
                return (
                    <li
                        key={id}
                        className="border-b border-dark first:border-t">
                        <button
                            aria-controls="description"
                            aria-expanded="false"
                            onClick={handleAccordianItemState}
                            className="relative flex w-full flex-col justify-start px-1 py-4 ">
                            <div className="flex w-full items-center justify-between">
                                <span className="font-semibold">{title}</span>
                                <div
                                    aria-hidden="true"
                                    className="h-1 w-1 rounded-full bg-dark-fade"></div>
                            </div>

                            <p
                                id="description"
                                aria-hidden="true"
                                className="invisible absolute overflow-hidden text-start opacity-0">
                                {desc}
                            </p>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default Accordion;
