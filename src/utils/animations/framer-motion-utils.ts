// Variantes de animación para las transiciones
import type { Variants, Transition } from 'framer-motion';


const transition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    transition
  }),
  center: {
    x: 0,
    opacity: 1,
    transition
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition
  }),
};

export { variants, transition };