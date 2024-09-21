import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../button";
import confetti from "canvas-confetti";

const Hero = () => {
  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 500,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    // Set up the interval to repeat the function every 2500 milliseconds
    const intervalId = setInterval(() => {
      shootConfetti();
    }, 2500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-gray-950 bg-hero-pattern w-full  h-[1700px] bg-no-repeat  bg-cover bg-top">
      <div className="relative max-w-[1440px] mx-auto w-full  pt-[100px]">
        <div className="flex flex-col  max-w-[1440px] items-center w-full">
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
            src="/happy.svg"
            className="w-[800px] relative z-[1] h-fit justify-items-start flex"
            alt=""
          />
          <motion.img
            initial={{ opacity: 0, scale: 0, y: -170 }}
            animate={{ opacity: 1, scale: 1, y: -170 }}
            exit={{ opacity: 0, scale: 0, y: -170 }}
            transition={{
              duration: 1.3,
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
            src="/birthday.svg"
            style={{ transform: "translateY(-170px)" }}
            className="w-[1000px] relative -translate-y-[170px] h-fit"
            alt=""
          />
          <motion.img
            initial={{ opacity: 0, scale: 0, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 20 }}
            transition={{
              duration: 0.6,
            }}
            src="/bg/smiley.svg"
            className="absolute top-[8%] right-1/4 z-[4]  h-fit "
            alt=""
          />
          <motion.img
            initial={{ opacity: 0, scale: 0, rotate: 40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 20 }}
            transition={{
              duration: 1,
            }}
            src="/bg/music.svg"
            className=" absolute top-[20%] right-1/2 z-[4]  h-fit "
            alt=""
          />
        </div>
        <div className="-translate-y-40 w-full">
          <div className="flex max-w-2xl mx-auto  justify-between items-center pb-6">
            {[2022, 2023, 2024, 2025, 2026].map((but, index) => {
              return <Button key={index} value={but} active="2024" />;
            })}
          </div>

          <div className="relative flex justify-center w-full pt-16">
            <div className="relative w-[700px] flex justify-center -translate-x-5">
              <img
                src="/bg/tv-shadow.svg"
                className="absolute translate-x-[50px] translate-y-[50px]  w-[900px] h-fit "
                alt=""
              />
              <img
                src="/7.jpg"
                className="w-[550px] translate-x-3 h-fit "
                alt=""
              />
              <img
                src="/bg/tv.png"
                className=" absolute top-1/2  -translate-y-1/2 w-[700px] h-fit"
                alt=""
                srcset=""
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end h-fit">
          <img
            src="/bg/date.svg"
            className="w-[420px] h-fit ml-auto pr-8 pb-8"
            alt=""
            srcset=""
          />

          <img
            src="/bg/lemon.svg"
            className="w-36 h-fit absolute top-56 right-40"
            alt=""
            srcset=""
          />
          <img
            src="/bg/pink.svg"
            className="w-36 h-fit  absolute top-40 left-40"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
