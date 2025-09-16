import { useEffect, useState } from "react";

export default function Custom() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    window.addEventListener("mousemove", move);

    // Detecta hover sobre enlaces y botones
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none transition-transform duration-200 ease-out mix-blend-difference z-50
        ${hovering ? "scale-150 bg-teal-400" : "bg-white/70"}`}
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
      }}
    />
  );
}
