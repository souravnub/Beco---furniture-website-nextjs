import React, { useCallback, useEffect, useRef } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { AiOutlineMinus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { TbArrowBarLeft } from "react-icons/tb";
import { FiArrowRight } from "react-icons/fi";
import { useCart } from "../contexts/cartContext";
import gsap from "gsap";
import Overlay from "./Overlay";
import CursorHover from "./CursorHover";
import { useCursor } from "../contexts/cursorContext";
import { getTailwindColors } from "../utils/getTailwind";

const CheckoutBtnContent = () => {
    const btnRef = useRef();

    useEffect(() => {
        const ani = gsap.fromTo(
            btnRef.current.querySelector("svg"),
            {
                x: -2,
            },
            {
                x: 3,
                repeat: -1,
                yoyo: true,
            }
        );
        return () => {
            ani.revert();
        };
    }, []);

    return (
        <div className="absolute inset-0 grid place-items-center" ref={btnRef}>
            <FiArrowRight color="black" />
        </div>
    );
};

const Cart = () => {
    const mainContainerRef = useRef();

    const { isCartOpen, setIsCartOpen } = useCart();
    const { borderColor: currentCursorBorderColor } = useCursor();

    const cartOpenAni = useCallback(() => {
        mainContainerRef.current.style.display = "grid";
        return gsap
            .timeline({
                defaults: {
                    ease: "power2.inOut",
                    onReverseComplete: () =>
                        (mainContainerRef.current.style.display = "none"),
                },
            })
            .fromTo(
                mainContainerRef.current,
                { x: "105%" },
                {
                    x: 0,
                }
            )
            .fromTo(
                mainContainerRef.current.querySelectorAll(
                    ":scope > div:nth-of-type(1) > button:first-child ,:scope > div:nth-of-type(3) > div"
                ),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.02 },
                ">-0.3"
            )
            .fromTo(
                mainContainerRef.current.querySelectorAll(
                    "h2, :scope > div:nth-of-type(4)> div:nth-of-type(1) > div , div:nth-of-type(4)> div:nth-of-type(1) > div > div,div:nth-of-type(4) > div:nth-of-type(4) > div, div:nth-of-type(4) > div:nth-of-type(2) "
                ),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.05 },
                "<"
            )
            .fromTo(
                mainContainerRef.current.querySelectorAll(" th, tr"),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.05 },
                "<"
            );
    }, []);

    useEffect(() => {
        if (isCartOpen) {
            cartOpenAni().play();
        } else {
            cartOpenAni().reverse(0);
        }
    }, [isCartOpen]);

    return (
        <>
            <Overlay
                onClick={() => {
                    setIsCartOpen(false);
                }}
                closingAniDuration={1.2}
                isVisible={isCartOpen}
            />

            <aside
                id="cart"
                className="fixed inset-0 isolate z-40 grid grid-flow-row gap-y-10 overflow-y-auto bg-gray-50 font-montserrat md:grid-flow-col lg:grid-cols-3 xl:left-auto "
                ref={mainContainerRef}>
                <CursorHover
                    hoverStates={{
                        scale: 0.5,
                        fill: currentCursorBorderColor,
                    }}
                    className={"absolute left-2 top-3 inline-block"}
                    exitStates={{ scale: 1, fill: "transparent" }}>
                    <button
                        className=" flex
            items-center gap-1">
                        <TbArrowBarLeft className="opacity-50" />
                        <span className="text-[.5rem] font-semibold uppercase opacity-60  md:text-[.6rem]">
                            back to store
                        </span>
                    </button>
                </CursorHover>

                <CursorHover
                    hoverStates={{
                        scale: 0.5,
                        fill: currentCursorBorderColor,
                    }}
                    className={"absolute right-2 top-3 z-10 inline-block"}
                    exitStates={{ scale: 1, fill: "transparent" }}>
                    <button className="" onClick={() => setIsCartOpen(false)}>
                        <RxCross2 className="text-xl" />
                    </button>
                </CursorHover>

                {/* grid column 1 */}
                <div className="origin-right px-2 pt-16 md:px-5 lg:col-span-2 xl:px-6">
                    <div className="mb-5 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                        <h1 className="text-3xl">Shopping cart</h1>
                        <span className="inline-block text-[.6rem] font-medium uppercase opacity-50 md:text-sm md:opacity-100 ">
                            3{" "}
                            <span
                                className="md:text-xs 
                        md:opacity-70">
                                items
                            </span>
                        </span>
                    </div>

                    {/* items container */}
                    <div>
                        <table className="w-full border-separate  border-spacing-y-3  text-left">
                            <thead>
                                <tr className=" text-xs  opacity-50 md:text-sm">
                                    <th className="pb-4 font-medium ">Item</th>
                                    <th className="pb-4 font-medium ">
                                        Quantity
                                    </th>
                                    <th className="pb-4 font-medium ">Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* item */}
                                <tr>
                                    <td className=" align-top  first-of-type:pl-0 md:px-4 lg:px-0">
                                        <div className="flex flex-col gap-2 md:flex-row">
                                            <img
                                                className="h-16 w-16"
                                                src="https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hhaXIlMjBpbWd8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
                                                alt=""
                                            />
                                            <div className="flex flex-col">
                                                <span
                                                    className="text-sm
                                             font-semibold">
                                                    Queen sofa
                                                </span>
                                                <span className="text-[.7rem] font-medium uppercase tracking-widest">
                                                    sofa
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className=" align-top  first-of-type:pl-0 md:px-4 lg:px-0">
                                        <div className=" flex items-center gap-4 pt-2">
                                            <CursorHover
                                                hoverStates={{
                                                    scale: 0.4,
                                                    fill: currentCursorBorderColor,
                                                }}
                                                exitStates={{
                                                    scale: 1,
                                                    fill: "transparent",
                                                }}
                                                disabled={true}>
                                                <button
                                                    disabled
                                                    className="rounded-full border border-dark p-1 text-sm disabled:opacity-30 md:border-[1.5px] md:p-0.5">
                                                    <AiOutlineMinus />
                                                </button>
                                            </CursorHover>
                                            <span className="text-xs font-medium md:text-sm">
                                                2
                                            </span>

                                            <CursorHover
                                                hoverStates={{
                                                    scale: 0.4,
                                                    fill: currentCursorBorderColor,
                                                }}
                                                exitStates={{
                                                    scale: 1,
                                                    fill: "transparent",
                                                }}>
                                                <button className="rounded-full border border-dark p-1 text-sm disabled:opacity-30 md:border-[1.5px] md:p-0.5">
                                                    <HiOutlinePlus />
                                                </button>
                                            </CursorHover>
                                        </div>
                                    </td>

                                    <td className="  align-top  text-sm first-of-type:pl-0 md:px-4 lg:px-0 ">
                                        <span className="sr-only">
                                            price : 40$
                                        </span>
                                        <span className="flex gap-px pt-2 font-medium">
                                            <span>40</span>
                                            <span>$</span>
                                        </span>
                                    </td>

                                    <td className="align-top first-of-type:pl-0 md:px-4 lg:px-0">
                                        <button className="mt-2 inline-block text-lg">
                                            <RxCross2 />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* grid column 2 */}
                <div className=" flex origin-right flex-col justify-between gap-y-20 bg-gray-100 px-2  py-5 md:px-6 md:pt-16 xl:px-6">
                    <div>
                        <h2 className="mb-8 text-xl font-medium md:mb-14">
                            Summary
                        </h2>

                        <div className="flex flex-col gap-2 font-medium">
                            <div className="flex items-center justify-between text-sm">
                                Subtotal
                                <span className="font-semibold">
                                    252.00&nbsp;$
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                Shipping
                                <span className="font-semibold">
                                    0.00&nbsp;$
                                </span>
                            </div>
                            <div
                                className="flex items-center justify-between text-sm
                    ">
                                Tax
                                <span className="font-semibold">
                                    39.20&nbsp;$
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between gap-14 text-sm font-medium xl:gap-28">
                            <span>Promocode</span>
                            <CursorHover
                                hoverStates={{
                                    scale: 0.4,
                                    fill: currentCursorBorderColor,
                                }}
                                exitStates={{ fill: "transparent", scale: 1 }}>
                                <button
                                    className=" bg-dark-100 px-5 py-1 text-white
                    ">
                                    Select
                                </button>
                            </CursorHover>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="flex justify-between">
                            <span className="font-medium">Total</span>
                            <span className="font-semibold">252.00&nbsp;$</span>
                        </div>
                        <CursorHover
                            className="inline-block w-full"
                            hoverStates={{
                                scale: 1.8,
                                fill: getTailwindColors.brand.DEFAULT,
                                borderColor: "transparent",
                                content: <CheckoutBtnContent />,
                            }}
                            exitStates={{
                                scale: 1,
                                fill: "transparent",
                                borderColor: getTailwindColors.brand[500],
                                content: null,
                            }}>
                            <button className="mt-5 w-full rounded-sm bg-dark-100 px-3 py-3 text-sm uppercase text-white">
                                checkout
                            </button>
                        </CursorHover>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Cart;
