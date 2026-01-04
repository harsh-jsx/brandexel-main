import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ isVisible = true, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
    if (isVisible) setProgress(0);
  }, [isVisible]);

  useEffect(() => {
    if (!visible) return;

    let timer;
    const tick = () => {
      setProgress((prev) => {
        const delta =
          prev < 70
            ? 5 + Math.random() * 6
            : prev < 92
            ? 2 + Math.random() * 4
            : 1;

        const next = Math.min(prev + delta, 100);

        if (next >= 100) {
          timer = setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 420);
        } else {
          const delay = prev < 70 ? 80 : prev < 92 ? 130 : 190;
          timer = setTimeout(tick, delay);
        }

        return next;
      });
    };

    timer = setTimeout(tick, 220);
    return () => clearTimeout(timer);
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[1200] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(60% 60% at 25% 30%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(50% 50% at 75% 65%, rgba(255,255,255,0.045), transparent 55%), #05050a",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <motion.div
            className="relative flex max-w-[680px] flex-col items-center gap-8 px-6 text-center text-white"
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Brand */}
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.45em] text-white/55">
              Brandexel
            </div>

            {/* Statement */}
            <h1 className="font-founders text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.2] tracking-[-0.01em]">
              Designing digital experiences
              <br />
              that feel inevitable.
            </h1>

            {/* Status */}
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/50">
              <span>Loading</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/80 architectural-pulse" />
            </div>

            {/* Progress Bar */}
            <div className="mt-2 w-64 sm:w-72 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-[2px] bg-gradient-to-r from-white via-white to-white"
                animate={{ width: `${progress}%` }}
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.28, ease: "linear" }}
              />
            </div>

            {/* Percentage */}
            <div className="text-[10px] tracking-[0.4em] text-white/40">
              {Math.round(progress)}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
