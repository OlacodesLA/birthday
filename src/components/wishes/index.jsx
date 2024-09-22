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
    hidden: { opacity: 0, scale: 0 },
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
    <div className="min-h-screen bg-buzz-describe h-[1900px] bg-no-repeat bg-[#2D1D44] bg-cover bg-top w-full">
      <div className="orbitron text-[#FF4E78] text-7xl pt-40 pl-6 font-bold">
        AY in 50 words
      </div>
      <div className="relative max-w-7xl mx-auto py-40 mb-30">
        <motion.div
          ref={ref}
          className="relative h-[80vh]"
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
        <div className="w-full flex  justify-center items-center">
          <button
            className="cursor-pointer w-fit  py-4 bg-gray-950 text-white px-4 rounded-md"
            onClick={() => restart()}
          >
            Restart Wishes
          </button>
        </div>
        <video
          controls
          className="max-w-[1280px] w-full h-fit  rounded-lg  mb-40"
        >
          <source src="/ay-birthday.MOV" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

function DraggableWish({ wish, variants, index }) {
  const randomX = Math.random() * 100; // -40% to 40% of container width
  const randomY = Math.random() * 70; // 0% to 70% of container height
  const randomRotate = Math.random() * 20 - 10; // -10deg to 10deg

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      className="absolute cursor-grab active:cursor-grabbing bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg w-64"
      variants={variants}
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        rotate: `${randomRotate}deg`,
        zIndex: index,
      }}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      whileTap={{ scale: 0.95, zIndex: 50 }}
    >
      <h2 className="text-xl font-semibold text-white mb-2">{wish.name}</h2>
      <p className="text-gray-200">{wish.message}</p>
    </motion.div>
  );
}
