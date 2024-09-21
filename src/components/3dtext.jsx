// import styles from "../DThree.css";
import { useRef, useEffect } from "react";
import styles from "../DThree.module.css";

export default function D3Text() {
  const plane = useRef(null);
  const maxRotate = 45;

  const manageMouseMove = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const perspective = window.innerWidth * 4;
    const rotateX = maxRotate * x - maxRotate / 2;
    const rotateY = (maxRotate * y - maxRotate / 2) * -1;
    plane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
  };

  return (
    <div
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      className={styles.container}
    >
      <div ref={plane} className={styles.body}>
        <Text3d primary={"Happy"} secondary={"Happy"} />
        <Text3d primary={"Birthday"} secondary={"Birthday"} />
        <Text3d primary={"AY"} secondary={"AY"} />
        {/* <Text3d primary={"Shapes"} secondary={"Shapes"} /> */}
      </div>
    </div>
  );
}

function Text3d({ primary, secondary }) {
  const text1 = useRef(null);
  const text2 = useRef(null);

  return (
    <div className={styles.textContainer}>
      <p className={styles.primary} ref={text1}>
        {primary}
      </p>
      <p className={styles.secondary} ref={text2}>
        {secondary}
      </p>
    </div>
  );
}
