import { motion } from "framer-motion";
import { useState } from "react";

export default function Button({ value, active }) {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      style={{
        transform: value == active ? "scale(1.3)" : "scale(1)",
      }}
      className="w-[100px] h-[46px] cursor-pointer rounded-[25px] overflow-hidden"
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          style={{
            backgroundColor: value == active ? "#CAFB12" : "#161616",
            color: value == active ? "#000" : "#fff",
          }}
          className="w-full h-full hover:rotateX-90 text-white font-extrabold"
          onMouseOver={() => toggleMenu()}
        >
          <PerspectiveText label={value} />
        </div>
        <div
          style={{ backgroundColor: value == active ? "#CAFB12" : "#161616" }}
          className="w-full h-full bg-[#CAFB12] text-white hover:rotateX-90 font-extrabold"
          onMouseLeave={() => toggleMenu()}
        >
          <PerspectiveText label={value} className="text-[#CAFB12]" />
        </div>
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label }) {
  const perspectiveTextStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)",
  };

  const textStyle = {
    transition: "all 0.75s cubic-bezier(0.76, 0, 0.24, 1)",
    pointerEvents: "none",
    textTransform: "uppercase",
  };

  const secondTextStyle = {
    position: "absolute",
    transformOrigin: "bottom center",
    transform: "rotateX(-90deg) translateY(9px)",
    opacity: 0,
  };

  return (
    <div style={perspectiveTextStyle}>
      <p style={textStyle}>{label}</p>
      <p style={{ ...textStyle, ...secondTextStyle }}>{label}</p>
    </div>
  );
}
