import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const IMAGES = [
  "https://rogue-studio.transforms.svdcdn.com/staging/Screenshot-2025-08-04-at-3.37.00-PM.png?w=525&h=745&q=85&auto=format&fit=crop&dm=1754336302&s=2fd6a983fdbbca06f50d4ca02aef57be",
  "https://rogue-studio.transforms.svdcdn.com/staging/hh7.png?h=360&q=85&auto=format&fit=crop&dm=1689577920&s=c5687fe7b084d5a83837abd3a0605b19",
  "https://rogue-studio.transforms.svdcdn.com/staging/hh6_2023-07-17-062945_fdxn.png?h=360&q=85&auto=format&fit=crop&dm=1689577920&s=7f6769b6885acbdbcde690a32edb5ef5",
  "https://rogue-studio.transforms.svdcdn.com/staging/hh7.png?h=360&q=85&auto=format&fit=crop&dm=1689577920&s=c5687fe7b084d5a83837abd3a0605b19",
  "https://rogue-studio.transforms.svdcdn.com/staging/hh5_2023-07-17-062940_anvs.png?h=360&q=85&auto=format&fit=crop&dm=1689577919&s=36efa792b88a003282d5909e8176c787",
  "https://rogue-studio.transforms.svdcdn.com/staging/hh6.png?h=360&q=85&auto=format&fit=crop&dm=1689577920&s=4dc305b5022db351f294912ff4c3a9d6",
  "https://rogue-studio.transforms.svdcdn.com/staging/hh1.png?h=360&q=85&auto=format&fit=crop&dm=1689577917&s=39c89ec6a0e2b50f8c22f7a403370e8c",
];

const Home = () => {
  const heroRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* TEXT */
      const split = new SplitText(".split-target", {
        type: "words",
        wordsClass: "split-word",
      });

      gsap.from(split.words, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "power3.out",
      });

      /* IMAGES */
      const imgs = imageRefs.current.filter(Boolean);

      // PUSH IMAGES BACK INITIALLY
      gsap.set(imgs, {
        y: 260,
        scale: 0.18,
        opacity: 0,
        filter: "blur(6px)",
        transformPerspective: 1200,
        force3D: true,
      });

      // ENTER FORWARD
      gsap.to(imgs, {
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        delay: 2,
        duration: 1.1,
        stagger: {
          each: 0.08,
          from: "center",
        },
        ease: "power3.out",
      });

      // 🔥 PIXEL-BASED SCATTER (THIS IS THE FIX)
      const scatterMap = [
        { x: -180, y: -140 },
        { x: -120, y: -90 },
        { x: 0, y: 0 },
        { x: 140, y: -120 },
        { x: 200, y: -20 },
        { x: -90, y: 160 },
        { x: 180, y: 200 },
      ];

      gsap.to(imgs, {
        delay: 3.6,
        duration: 1.1,
        x: (_, i) => scatterMap[i]?.x ?? 0,
        y: (_, i) => scatterMap[i]?.y ?? 0,
        ease: "power3.out",
      });

      return () => split.revert();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative flex h-screen items-center justify-center bg-black overflow-hidden"
    >
      {/* TEXT */}
      <div className="text-center text-white font-[PPE] uppercase leading-[0.9] tracking-[-0.04em]">
        <div className="split-target text-[clamp(3.8rem,10vw,7.6rem)]">
          Creating
        </div>
        <div className="split-target mt-3 text-[clamp(3.6rem,10vw,7.4rem)]">
          Brands*
        </div>
        <div className="mt-10 text-[clamp(5.5rem,15vw,10.5rem)] text-[#b8a68a]">
          Impossible
        </div>
        <div className="split-target text-[clamp(3.4rem,10vw,7.4rem)]">
          To Ignore
        </div>
      </div>

      {/* IMAGES */}
      <div className="pointer-events-none absolute inset-0">
        {/* Each image keeps YOUR layout */}
        <img
          ref={(el) => (imageRefs.current[0] = el)}
          src={IMAGES[0]}
          className="absolute left-[39%] top-[44%] w-32 h-32 object-cover border border-white/10"
        />
        <img
          ref={(el) => (imageRefs.current[1] = el)}
          src={IMAGES[1]}
          className="absolute left-[46%] top-[30%] w-36 h-36 object-cover border border-white/10"
        />
        <img
          ref={(el) => (imageRefs.current[2] = el)}
          src={IMAGES[2]}
          className="absolute left-1/2 top-[38%] -translate-x-1/2 w-56 h-56 object-cover border border-white/10 z-20"
        />
        <img
          ref={(el) => (imageRefs.current[3] = el)}
          src={IMAGES[3]}
          className="absolute left-[56%] top-[30%] w-40 h-40 object-cover border border-white/10 z-30"
        />
        <img
          ref={(el) => (imageRefs.current[4] = el)}
          src={IMAGES[4]}
          className="absolute left-[62%] top-[42%] w-28 h-28 object-cover border border-white/10 z-40"
        />
        <img
          ref={(el) => (imageRefs.current[5] = el)}
          src={IMAGES[5]}
          className="absolute left-[46%] bottom-[27%] w-40 h-40 object-cover border border-white/10"
        />
        <img
          ref={(el) => (imageRefs.current[6] = el)}
          src={IMAGES[6]}
          className="absolute right-[18%] bottom-[25%] w-52 h-52 object-cover border border-white/10 z-10"
        />
      </div>
    </div>
  );
};

export default Home;
