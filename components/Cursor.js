import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useCursor } from "../contexts/cursorContext";
import getPxVal from "../utils/getPxVal";
import getTaliwind from "../utils/getTaliwind";

const Cursor = () => {
  const cursorRef = useRef();
  const contentRef = useRef();

  const { fill, scale, borderColor, content } = useCursor();
  const [isCursorInWindow, setIsCursorInWindow] = useState(false);

  function animateCursor({ clientX: x, clientY: y }) {
    return gsap.to(cursorRef.current, {
      opacity: 1,
      left: x,
      top: y,
      duration: 0.3,
    });
  }
  function hideCuror() {
    return gsap.to(cursorRef.current, {
      opacity: 0,
    });
  }

  function handleCursorOutOfWindow() {
    setIsCursorInWindow(false);
  }
  function handleCursorIntoWindow() {
    setIsCursorInWindow(true);
  }

  useEffect(() => {
    window.addEventListener("mouseout", handleCursorOutOfWindow);
    window.addEventListener("mouseover", handleCursorIntoWindow);
    return () => {
      window.removeEventListener("mouseout", handleCursorOutOfWindow);
      window.removeEventListener("mouseover", handleCursorIntoWindow);
    };
  }, []);

  // animations for cursorHoverComponent
  useEffect(() => {
    const cursorWidth = getPxVal(getTaliwind.theme.width[5]);

    const timeline = gsap.timeline().to(cursorRef.current, {
      backgroundColor: fill || "transparent",
      width: cursorWidth * scale,
      borderColor: borderColor || getTaliwind.theme.borderColor.brand[500],
      duration: 0.2,
      ease: "power",
    });
    const contentAni = gsap.fromTo(
      contentRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.15, paused: true, ease: "none" }
    );

    timeline.add(contentAni, ">-0.2");

    if (content) {
      contentAni.play();
    }
  }, [fill, content, scale, borderColor]);

  useEffect(() => {
    if (isCursorInWindow) {
      window.addEventListener("mousemove", animateCursor);
    } else {
      hideCuror();
      window.removeEventListener("mousemove", animateCursor);
    }
  }, [isCursorInWindow]);

  return (
    <div
      ref={cursorRef}
      area-hidden="true"
      className="pointer-events-none fixed z-50  hidden aspect-square w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-500 md:inline-block"
    >
      <div
        ref={contentRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0"
      >
        {content}
      </div>
    </div>
  );
};

export default Cursor;
