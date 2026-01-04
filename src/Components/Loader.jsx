import React from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(SplitText);

const Loader = () => {
  const scope = useRef(null);
  const textRef = useRef(null);
  useGSAP(() => {
    const split = new SplitText(textRef.current, {
      type: "lines,words",
      linesClass: "line",
    });
    gsap.from(split.words, {
      yPercent: 100,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.04,
    });
  });
  return (
    <section ref={scope}>
      <h1 ref={textRef}>Design that performs.</h1>
    </section>
  );
};

export default Loader;
