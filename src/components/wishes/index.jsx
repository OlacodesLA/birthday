"use client";

import { useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const wishes = [
  {
    name: "Fuad",
    message: "A compassionate leader with unwavering principles.",
  },
  {
    name: "Afolabi",
    message: "Happy birthday, A.Y! Your leadership inspires me.",
  },
  {
    name: "Segun",
    message:
      "Your leadership excellence and kindness make you a true role model",
  },
  {
    name: "Joshua",
    message:
      "Happy birthday, AY! Extremely intelligent, vast, thoughtful, and exceptional.",
  },
  {
    name: "Timothy",
    message:
      "Happy Birthday, AY! Wishing you a fantastic day filled with joy & success!",
  },
  {
    name: "Oluwaseun",
    message: "A.Y's leadership inspires growth and forward thinking",
  },
  {
    name: "Williams",
    message: "phenomenal leader, brilliant coach, awesome person",
  },
  { name: "Vire", message: "Humble and Inspiring" },
  { name: "Yemi", message: "AY, thank you for inspiring us! Happy birthday!" },
  {
    name: "Godwin",
    message: "AY's zeal and aspirations are not of this world",
  },
  {
    name: "Miracle",
    message: "Happy felicitous birthday AY.Your leadership galvanize us.",
  },
  {
    name: "Akbar",
    message:
      "Time to celebrate with the big cheese 🎂🎉Happy Birthday to our group's head honcho! 🥳",
  },
  {
    name: "Fawas",
    message: "Kind, humble, and brings vibrance when you meet him.",
  },
  { name: "Jeremiah", message: "AY is an exceptionally vision-driven Leader." },
  {
    name: "Oladayo",
    message: "He's my boss: a supportive person and great mentor.",
  },
  {
    name: "Efe",
    message:
      "Happy Birthday AY! Your leadership and vision inspire us daily. Wishing you a year filled with success, joy, and endless innovation.",
  },
  { name: "David", message: "Your vision and generosity inspire me. Boom!" },
  { name: "Samuel", message: "You dey motivate me, Ajeh." },
  { name: "Tofunmi", message: "An incredible force in everything he does" },
  {
    name: "John",
    message:
      "Your positive energy inspires everyone. May your day be filled with joy and all your dreams come true!",
  },
  {
    name: "LongJohn",
    message: "Visionary leader, idea dynamo. You inspire us all!",
  },
  {
    name: "Peter",
    message: "A body of unique ideologies & a fantastic leader",
  },
  {
    name: "Benjamin",
    message: "Happy Birthday to our visionary leader driving tech success",
  },
  { name: "Dare", message: "Bold Innovator, Creative mastermind" },
  { name: "Eunice", message: "He is smart, and relaxed at the same time" },
  {
    name: "MaryBlessing",
    message: "Leadership excellence personified. Happy birthday AY🎉",
  },
  {
    name: "Job",
    message: "A Great role model A real man of Timber and Calibre",
  },
  {
    name: "Bassist",
    message: "A.Y is inspiring, kind, and always brings out the best.",
  },
  { name: "Majid", message: "Happy Birthday to an inspiring leader" },
  {
    name: "Fatai",
    message: "A visionary leader shaping Tech's future responsibly.",
  },
];

export default function Birthday() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  const startAnimation = async () => {
    await controls.start("hidden");
    await controls.start("visible");
  };

  if (isInView) {
    startAnimation();
  }

  const restart = () => {
    startAnimation();
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
  };
  const buttonVariants = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-buzz-describe h-fit bg-no-repeat bg-[#2D1D44] bg-cover bg-left  w-full">
      <div className="flex items-center gap-x-4 orbitron text-[#FF4E78] text-7xl pt-40 pl-6 font-bold">
        <h3>AY in 50 words</h3>
        <div className="">
          <motion.button
            whileHover={{ scale: 1.15, zIndex: 50 }}
            whileTap={{ scale: 0.95, zIndex: 50 }}
            variants={buttonVariants}
            className="cursor-pointer w-fit  py-4 bg-[#CAFB12] text-white px-4 rounded-md"
            onClick={() => restart()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"></path>
            </svg>
          </motion.button>
        </div>
      </div>
      <div className="relative max-w-screen h-full mx-auto py-20 mb-30">
        <motion.div
          ref={ref}
          className="relative w-full flex justify-center gap-y-8 flex-wrap gap-x-7 h-full"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {wishes.map((wish, index) => (
            <DraggableWish
              key={wish.name}
              wish={wish}
              variants={itemVariants}
              index={index}
            />
          ))}
        </motion.div>

        <video
          controls
          className="max-w-[1280px] mx-auto w-full h-fit pt-40  rounded-lg  mb-40"
        >
          <source src="/ay-birthday.MOV" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

function DraggableWish({ wish, variants, index }) {
  //   const randomX = Math.random() * 100; // -40% to 40% of container width
  //   const randomY = Math.random() * 70; // 0% to 70% of container height
  //   const randomRotate = Math.random() * 20 - 10; // -10deg to 10deg

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.6}
      dragConstraints={{ top: 4, left: 4, right: 4, bottom: 4 }}
      className=" cursor-grab active:cursor-grabbing bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg w-72 h-44"
      variants={variants}
      //   style={{
      //     left: `${randomX}%`,
      //     top: `${randomY}%`,
      //     rotate: `${randomRotate}deg`,
      //     zIndex: index,
      //   }}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      //   whileTap={{ scale: 0.95, zIndex: 50 }}
      //   animate={{ opacity: 1, scale: 1 }}
    >
      <h2 className="text-xl font-semibold text-white mb-2">{wish.name}</h2>
      <p className="text-gray-200">{wish.message}</p>
    </motion.div>
  );
}
