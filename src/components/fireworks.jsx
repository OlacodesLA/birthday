import React, { useEffect, useRef, useState } from "react";
import FloatingImages from "./floating-images";
import D3Text from "./3dtext";

export default function Fireworks() {
  const canvasRef = useRef(null);

  const audio = document.getElementById("audio_tag");
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const PI2 = Math.PI * 2;
    const random = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);
    const timestamp = () => new Date().getTime();

    class Firework {
      constructor(x, y, targetX, targetY, shade, offsprings) {
        this.dead = false;
        this.offsprings = offsprings;

        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;

        this.shade = shade;
        this.history = [];
      }
      update(delta) {
        if (this.dead) return;

        let xDiff = this.targetX - this.x;
        let yDiff = this.targetY - this.y;
        if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
          this.x += xDiff * 2 * delta;
          this.y += yDiff * 2 * delta;

          this.history.push({
            x: this.x,
            y: this.y,
          });

          if (this.history.length > 20) this.history.shift();
        } else {
          if (this.offsprings && !this.madeChilds) {
            let babies = this.offsprings / 2;
            for (let i = 0; i < babies; i++) {
              let targetX =
                this.x + this.offsprings * Math.cos((PI2 * i) / babies);
              let targetY =
                this.y + this.offsprings * Math.sin((PI2 * i) / babies);

              birthday.fireworks.push(
                new Firework(this.x, this.y, targetX, targetY, this.shade, 0)
              );
            }
            this.madeChilds = true;
          }
          this.history.shift();
        }

        if (this.history.length === 0) this.dead = true;
        else if (this.offsprings) {
          for (let i = 0; this.history.length > i; i++) {
            let point = this.history[i];
            ctx.beginPath();
            ctx.fillStyle = "hsl(" + this.shade + ",100%," + i + "%)";
            ctx.arc(point.x, point.y, 1, 0, PI2, false);
            ctx.fill();
          }
        } else {
          ctx.beginPath();
          ctx.fillStyle = "hsl(" + this.shade + ",100%,50%)";
          ctx.arc(this.x, this.y, 1, 0, PI2, false);
          ctx.fill();
        }
      }
    }

    class Birthday {
      constructor() {
        this.resize();

        this.fireworks = [];
        this.counter = 0;
      }

      resize() {
        this.width = canvas.width = window.innerWidth;
        let center = (this.width / 2) | 0;
        this.spawnA = (center - center / 4) | 0;
        this.spawnB = (center + center / 4) | 0;

        this.height = canvas.height = window.innerHeight;
        this.spawnC = this.height * 0.1;
        this.spawnD = this.height * 0.5;
      }

      onClick(evt) {
        let x = evt.clientX || (evt.touches && evt.touches[0].pageX);
        let y = evt.clientY || (evt.touches && evt.touches[0].pageY);

        let count = random(3, 5);
        for (let i = 0; i < count; i++)
          this.fireworks.push(
            new Firework(
              random(this.spawnA, this.spawnB),
              this.height,
              x,
              y,
              random(0, 260),
              random(30, 110)
            )
          );

        this.counter = -1;
      }

      update(delta) {
        ctx.globalCompositeOperation = "hard-light";
        ctx.fillStyle = `rgba(2,2,54,${7 * delta})`;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.globalCompositeOperation = "lighter";
        for (let firework of this.fireworks) firework.update(delta);

        this.counter += delta * 3;
        if (this.counter >= 1) {
          this.fireworks.push(
            new Firework(
              random(this.spawnA, this.spawnB),
              this.height,
              random(0, this.width),
              random(this.spawnC, this.spawnD),
              random(0, 360),
              random(30, 110)
            )
          );
          this.counter = 0;
        }

        if (this.fireworks.length > 1000)
          this.fireworks = this.fireworks.filter((firework) => !firework.dead);
      }
    }

    let birthday = new Birthday();
    window.onresize = () => birthday.resize();
    document.onclick = (evt) => birthday.onClick(evt);
    document.ontouchstart = (evt) => birthday.onClick(evt);

    let then = timestamp();

    const loop = () => {
      requestAnimationFrame(loop);

      let now = timestamp();
      let delta = now - then;

      then = now;
      birthday.update(delta / 2000);
    };

    loop();

    // Cleanup function
    return () => {
      window.onresize = null;
      document.onclick = null;
      document.ontouchstart = null;
    };
  }, []);

  return (
    <div className="h-screen bg-white cursor-crosshair overflow-hidden">
      {/* <h1 className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-['Source_Sans_Pro'] text-5xl font-black select-none">
        Happy Birthday
      </h1> */}
      <h2 className="absolute desig  bottom-48 z-50 text-nowrap left-1/2 h-fit text-white -translate-x-1/2 translate-y-1/2 text-[180px]">
        Ayo Idowu
      </h2>
      <FloatingImages />
      {/* <audio controls autoplay src="" className="" type="audio/mpeg" /> */}
      <audio id="audio_tag" src="/firework.mp3" autoplay />
      <button
        onClick={() => {
          play ? setPlay(false) : setPlay(true);
          play ? audio.pause() : audio.play();
        }}
        className="absolute bottom-2 right-2 w-10 h-10 bg-gray-300 rounded-md"
      >
        ...
      </button>

      {/* <div className="w-full h-full">
        <img
          src="/1.jpg"
          alt=""
          className="absolute top-20 w-[250px] rotate-[10deg] right-20 h-fit bg-gray-300  pb-10 pt-4 px-3 rounded-sm"
        />
        <img
          src="/2.jpg"
          alt=""
          className="absolute bottom-20 w-[250px] rotate-[0deg] right-40 h-fit bg-gray-300  pb-10 pt-4 px-3 rounded-sm"
        />
      </div> */}
      <img
        src="/ay-stroke-gray.png"
        alt=""
        className="absolute bottom-0  left-1/2 -translate-x-1/2   w-[650px]  h-fit  pb-10 pt-4 px-3 rounded-sm"
      />

      <D3Text />

      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
