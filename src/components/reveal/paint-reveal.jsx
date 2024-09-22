import React, { useEffect, useRef, useState } from "react";
import useWindow from "../../utils";

export default function Scene({ setGlitchActive }) {
  const { dimension } = useWindow();
  const canvas = useRef();
  const prevPosition = useRef(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchIntervalRef = useRef(null);

  useEffect(() => {
    if (dimension.width > 0) {
      init();
    }
    return () => {
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
    };
  }, [dimension]);

  const init = () => {
    const ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Light gray background
    ctx.fillRect(0, 0, dimension.width, dimension.height);
    ctx.globalCompositeOperation = "destination-out";
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const manageMouseMove = (e) => {
    const { clientX, clientY, movementX, movementY } = e;
    setGlitchActive(true);
    setIsGlitching(true);

    const nbOfCircles = Math.max(Math.abs(movementX), Math.abs(movementY)) / 10;

    if (prevPosition.current != null) {
      const { x, y } = prevPosition.current;
      for (let i = 0; i < nbOfCircles; i++) {
        const targetX = lerp(x, clientX, (1 / nbOfCircles) * i);
        const targetY = lerp(y, clientY, (1 / nbOfCircles) * i);
        draw(targetX, targetY, 50);
      }
    }

    prevPosition.current = {
      x: clientX,
      y: clientY,
    };

    // Start infinite glitch effect
    if (!glitchIntervalRef.current) {
      glitchIntervalRef.current = setInterval(glitchBackground, 50);
    }
  };

  const draw = (x, y, radius) => {
    const ctx = canvas.current.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  };

  const glitchBackground = () => {
    const ctx = canvas.current.getContext("2d");
    const imageData = ctx.getImageData(0, 0, dimension.width, dimension.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < 0.01) {
        // Adjust this value to control glitch intensity
        const glitchIntensity = Math.random();
        if (glitchIntensity < 0.8) {
          // 80% chance of black glitch
          data[i] = data[i + 1] = data[i + 2] = 0; // Black
        } else {
          // 20% chance of dark gray glitch
          const darkGray = Math.floor(Math.random() * 64); // Random dark gray value
          data[i] = data[i + 1] = data[i + 2] = darkGray;
        }
        data[i + 3] = 255; // Full opacity
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleMouseStop = () => {
    setGlitchActive(false);
    setIsGlitching(false);
    if (glitchIntervalRef.current) {
      clearInterval(glitchIntervalRef.current);
      glitchIntervalRef.current = null;
    }
    // init(); // Reset the background when mouse stops
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden`}
      onMouseMove={manageMouseMove}
      onMouseLeave={handleMouseStop}
      onMouseUp={handleMouseStop}
    >
      {dimension.width == 0 && (
        <div className="absolute w-full h-full bg-gray-100" />
      )}
      <canvas
        ref={canvas}
        height={dimension.height}
        width={dimension.width}
        className={isGlitching ? "glitch" : ""}
      />
      <style jsx>{`
        .glitch {
          animation: shake 0.1s infinite;
        }

        @keyframes shake {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(1px, 1px) rotate(0.5deg);
          }
          50% {
            transform: translate(-1px, -1px) rotate(-0.5deg);
          }
          75% {
            transform: translate(1px, -1px) rotate(0.5deg);
          }
          100% {
            transform: translate(-1px, 1px) rotate(-0.5deg);
          }
        }
      `}</style>
    </div>
  );
}
