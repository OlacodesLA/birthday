// import styles from "./page.module.scss";
// import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
// import { floating1, floating2, floating3 } from "../data/floating";

export default function FloatingImages() {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start, target, amount) =>
    start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(plane2.current, {
      x: `+=${xForce * 0.5}`,
      y: `+=${yForce * 0.5}`,
    });
    gsap.set(plane3.current, {
      x: `+=${xForce * 0.25}`,
      y: `+=${yForce * 0.25}`,
    });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  return (
    <main
      onMouseMove={manageMouseMove}
      className="absolute h-screen top-0 w-screen overflow-hidden"
    >
      <div ref={plane1} className="absolute inset-0 filter brightness-50">
        <img
          src="/6.jpg"
          alt="floating1"
          width={300}
          className="absolute left-[90%] top-[70%]"
        />
        <img
          src="/2.jpg"
          alt="floating2"
          width={300}
          className="absolute left-[5%] top-[65%]"
        />
        <img
          src="/1.jpg"
          alt="floating7"
          width={225}
          className="absolute left-[35%] top-0"
        />
      </div>
      <div ref={plane2} className="absolute inset-0 filter brightness-50">
        <img
          src="/8.jpg"
          alt="floating4"
          width={250}
          className="absolute left-[5%] top-[10%]"
        />
        <img
          src="/7.jpg"
          alt="floating6"
          width={200}
          className="absolute left-[80%] top-[5%]"
        />
        <img
          src="/5.jpg"
          alt="floating8"
          width={225}
          className="absolute left-[60%] top-[60%]"
        />
      </div>
      <div ref={plane3} className="absolute inset-0 filter brightness-50">
        <img
          src="/3.jpg"
          alt="floating3"
          width={150}
          className="absolute left-[65%] top-[2.5%]"
        />
        {/* <img
          src={floating5}
          alt="floating5"
          width={200}
          className="absolute left-[40%] top-[75%]"
        /> */}
      </div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-lg">
        <h1 className="text-white font-normal">Happy Birthday</h1>
        <p className="text-gray-400 mt-2">React and GSAP</p>
      </div>
    </main>
  );
}
