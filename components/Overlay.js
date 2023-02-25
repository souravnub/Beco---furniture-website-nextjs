import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Overlay = ({ isVisible, onClick, closingAniDuration }) => {
    const overlayRef = useRef();

    useEffect(() => {
        if (isVisible) {
            gsap.timeline()
                .set(overlayRef.current, {
                    display: "block",
                })
                .to(overlayRef.current, { opacity: 0.8 });
        } else {
            // fix it's timing
            gsap.timeline({ defaults: { duration: closingAniDuration || 0.5 } })
                .to(overlayRef.current, { opacity: 0 })
                .set(overlayRef.current, { display: "none" });
        }
    }, [isVisible]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-20 bg-dark opacity-80"
            onClick={onClick}></div>
    );
};

export default Overlay;
