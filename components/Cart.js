import React, { useCallback, useEffect, useRef } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { AiOutlineMinus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BsFillBagPlusFill } from "react-icons/bs";
import { TbArrowBarLeft } from "react-icons/tb";
import { FiArrowRight } from "react-icons/fi";
import { useCart } from "../contexts/cartContext";
import gsap from "gsap";
import Overlay from "./Overlay";
import CursorHover from "./CursorHover";
import { useCursor } from "../contexts/cursorContext";
import { getTailwindColors } from "../utils/getTailwind";
import {
    getCartLength,
    getDecreasedProductQuanitityCart,
    getIncreasedProductQuantityCart,
    getRemovedProductCart,
} from "../utils/cartUtils";

const CheckoutBtnContent = () => {
    const btnRef = useRef();

    useEffect(() => {
        const ani = gsap.fromTo(
            btnRef.current?.querySelector("svg"),
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
const ShoppingBtnContent = () => {
    const btnRef = useRef();

    useEffect(() => {
        const svg = btnRef.current?.querySelector("svg");

        const timeline = gsap
            .timeline({
                defaults: {
                    ease: "power",
                    repeat: -1,
                    duration: 0.2,
                    repeatDelay: 1,
                },
            })
            .to(svg, {
                rotate: 0,
            })
            .to(svg, {
                rotate: "15deg",
            })
            .to(svg, {
                rotate: "-15deg",
            })
            .to(svg, { rotate: 0 });

        return () => {
            timeline.revert();
        };
    }, []);

    return (
        <div className="absolute inset-0 grid place-items-center" ref={btnRef}>
            <BsFillBagPlusFill color="white" className="origin-top" />
        </div>
    );
};

const Cart = () => {
    const mainContainerRef = useRef();
    const emptyCartHeadingRef = useRef();

    const { isCartOpen, setIsCartOpen, cart, setCart } = useCart();
    const { borderColor: currentCursorBorderColor } = useCursor();

    const cartOpenAni = useCallback(() => {
        mainContainerRef.current.style.display = "grid";

        const timeline = gsap
            .timeline({
                paused: true,
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
                mainContainerRef.current?.querySelectorAll(
                    ":scope > div:nth-of-type(1) > button:first-child ,:scope > div:nth-of-type(3) > div"
                ),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.02 },
                ">-0.3"
            )
            .fromTo(
                mainContainerRef.current?.querySelectorAll(
                    "h2,:scope > div:nth-of-type(4)> div:nth-of-type(1) > div,:scope > div:nth-of-type(4) > div:nth-of-type(2)"
                ),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.05 },
                "<"
            );

        if (cart.length === 0) {
            timeline.fromTo(
                emptyCartHeadingRef.current,
                { opacity: 0, top: "60%" },
                { opacity: 0.5, top: "50%" },
                "<"
            );
        } else {
            timeline.fromTo(
                mainContainerRef.current?.querySelectorAll("th, td"),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.03 },
                "<"
            );
        }

        return timeline;
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
                className="fixed inset-0 isolate z-40 grid grid-flow-row gap-y-10 overflow-y-auto bg-gray-50 font-montserrat md:grid-flow-col lg:grid-cols-3 xl:left-auto"
                ref={mainContainerRef}>
                <CursorHover
                    hoverStates={{
                        scale: 0.5,
                        fill: currentCursorBorderColor,
                    }}
                    className={"absolute left-2 top-3 z-10 inline-block"}
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
                    <button onClick={() => setIsCartOpen(false)}>
                        <RxCross2 className="text-xl" />
                    </button>
                </CursorHover>

                {/* grid column 1 */}
                <div className="relative origin-right px-2 pt-16 md:px-5 lg:col-span-2 xl:px-6">
                    <div className="mb-5 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                        <h1 className="text-3xl">Shopping cart</h1>
                        <span className="inline-block text-[.6rem] font-medium uppercase opacity-50 md:text-sm md:opacity-100 ">
                            {getCartLength(cart)}{" "}
                            <span
                                className="md:text-xs 
                        md:opacity-70">
                                items
                            </span>
                        </span>
                    </div>

                    {/* items container */}
                    {cart.length !== 0 ? (
                        <div className="overflow-y-auto">
                            <table className="w-full border-separate  border-spacing-y-3  text-left">
                                <thead>
                                    <tr className=" text-xs  opacity-50 md:text-sm">
                                        <th className="pb-4 font-medium ">
                                            Item
                                        </th>
                                        <th className="pb-4 font-medium ">
                                            Quantity
                                        </th>
                                        <th className="pb-4 text-center font-medium lg:text-left">
                                            Unit Price
                                        </th>
                                        <th className="pb-4 text-center font-medium lg:text-left">
                                            Total Price
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {/* item */}
                                    {cart.map(
                                        ({
                                            id,
                                            img,
                                            name,
                                            category,
                                            quantity,
                                            unitPrice,
                                        }) => {
                                            return (
                                                <tr key={id}>
                                                    <td className=" align-top  first-of-type:pl-0 md:px-4 lg:px-0">
                                                        <div className="flex flex-col gap-2 md:flex-row">
                                                            <img
                                                                className="h-16 w-16"
                                                                src={img}
                                                                alt=""
                                                            />
                                                            <div className="flex flex-col">
                                                                <span
                                                                    className="text-sm
                                             font-semibold">
                                                                    {name}
                                                                </span>
                                                                <span className="text-[.7rem] font-medium uppercase tracking-widest">
                                                                    {category}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className=" align-top  first-of-type:pl-0 md:px-4 lg:px-0">
                                                        <div className=" flex items-center gap-4">
                                                            <CursorHover
                                                                hoverStates={{
                                                                    scale: 0.4,
                                                                    fill: currentCursorBorderColor,
                                                                }}
                                                                exitStates={{
                                                                    scale: 1,
                                                                    fill: "transparent",
                                                                }}>
                                                                <button
                                                                    onClick={() =>
                                                                        setCart(
                                                                            getDecreasedProductQuanitityCart(
                                                                                cart,
                                                                                id,
                                                                                1
                                                                            )
                                                                        )
                                                                    }
                                                                    className="rounded-full border border-dark p-1 text-sm disabled:opacity-30 md:border-[1.5px] md:p-0.5">
                                                                    <AiOutlineMinus />
                                                                </button>
                                                            </CursorHover>
                                                            <span className="text-xs font-medium md:text-sm">
                                                                {quantity}
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
                                                                <button
                                                                    onClick={() =>
                                                                        setCart(
                                                                            getIncreasedProductQuantityCart(
                                                                                cart,
                                                                                id,
                                                                                1
                                                                            )
                                                                        )
                                                                    }
                                                                    className="rounded-full border border-dark p-1 text-sm disabled:opacity-30 md:border-[1.5px] md:p-0.5">
                                                                    <HiOutlinePlus />
                                                                </button>
                                                            </CursorHover>
                                                        </div>
                                                    </td>

                                                    <td className=" align-top  text-sm first-of-type:pl-0 md:px-4 lg:px-0 ">
                                                        <span className="sr-only">
                                                            unit price :{" "}
                                                            {unitPrice}$
                                                        </span>
                                                        <span className="flex justify-center gap-px  font-medium lg:justify-start">
                                                            <span>
                                                                {unitPrice}
                                                            </span>
                                                            <span>$</span>
                                                        </span>
                                                    </td>

                                                    <td className=" align-top  text-sm first-of-type:pl-0 md:px-4 lg:px-0 ">
                                                        <span className="sr-only">
                                                            total price :
                                                            {unitPrice *
                                                                quantity}
                                                            $
                                                        </span>
                                                        <span className="flex justify-center gap-px  font-medium lg:justify-start">
                                                            <span>
                                                                {unitPrice *
                                                                    quantity}
                                                            </span>
                                                            <span>$</span>
                                                        </span>
                                                    </td>

                                                    <td className="align-top first-of-type:pl-0 md:px-4 lg:px-0">
                                                        <CursorHover
                                                            hoverStates={{
                                                                scale: 0.4,
                                                                fill: currentCursorBorderColor,
                                                            }}
                                                            exitStates={{
                                                                scale: 1,
                                                                fill: "transparent",
                                                            }}>
                                                            <button
                                                                className=" inline-block text-lg"
                                                                onClick={() =>
                                                                    setCart(
                                                                        getRemovedProductCart(
                                                                            cart,
                                                                            id
                                                                        )
                                                                    )
                                                                }>
                                                                <RxCross2 />
                                                            </button>
                                                        </CursorHover>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="empty-cart-text absolute inset-0 grid place-content-center ">
                            <h3
                                className="flex  flex-col items-center justify-center gap-3 text-3xl font-medium"
                                ref={emptyCartHeadingRef}>
                                <img
                                    src="https://img.icons8.com/external-justicon-lineal-color-justicon/512/external-shopping-bag-ecommerce-justicon-lineal-color-justicon.png"
                                    className="w-20"
                                    alt=""
                                />
                                Your Cart Is Empty
                            </h3>
                            <p className="mt-2 font-medium">
                                seems like you havn't purchased anything yet!
                            </p>
                            <CursorHover
                                className="mx-auto mt-8 min-w-[60%] "
                                hoverStates={{
                                    content: <ShoppingBtnContent />,
                                    scale: 2,
                                    fill: "green",
                                    borderColor: "transparent",
                                }}
                                exitStates={{
                                    content: null,
                                    scale: 1,
                                    fill: "transparent",
                                    borderColor: getTailwindColors.brand[500],
                                }}>
                                <button className="w-full cursor-none rounded-sm bg-dark-100 px-3 py-3 text-sm uppercase text-white">
                                    let's shop
                                </button>
                            </CursorHover>
                        </div>
                    )}
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
