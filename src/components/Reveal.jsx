import { motion } from "framer-motion";

/** Muncul halus (fade + geser naik) saat masuk layar. */
export default function Reveal({ children, delay = 0, y = 26, className = "", as = "div", ...rest }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
