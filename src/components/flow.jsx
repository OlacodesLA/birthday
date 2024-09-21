import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Lenis from "lenis";

const birthdayWishes = Array(50)
  .fill()
  .map((_, i) => ({
    id: i + 1,
    author: `Friend ${i + 1}`,
    message: `Happy Birthday, Ayo! Wishing you all the best on your special day! #${
      i + 1
    }`,
  }));

const images = [
  "/path/to/image1.jpg",
  "/path/to/image2.jpg",
  "/path/to/image3.jpg",
  "/path/to/image4.jpg",
];

const backgroundColors = [
  "from-purple-600 via-pink-500 to-red-500",
  "from-blue-500 via-teal-400 to-green-500",
  "from-yellow-400 via-orange-500 to-red-500",
  "from-indigo-600 via-purple-500 to-pink-500",
  "from-green-400 via-teal-500 to-blue-500",
];

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleGiftClick = () => {
    setIsGiftOpened(true);
    shootConfetti();
    setTimeout(() => {
      setCurrentSection(1);
      containerRef.current.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 2000);
  };

  const handleNext = () => {
    setCurrentSection((prev) => (prev + 1) % 5);
    containerRef.current.scrollTo({
      top: (currentSection + 1) * window.innerHeight,
      behavior: "smooth",
    });
  };

  const sections = [
    { id: 0, Component: GiftCard },
    { id: 1, Component: WelcomeMessage },
    { id: 2, Component: ImageCarousel },
    { id: 3, Component: BirthdayWishes },
    { id: 4, Component: Celebration },
  ];

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory"
    >
      {sections.map(({ id, Component }) => (
        <div
          key={id}
          className={`h-screen snap-start bg-gradient-to-br ${backgroundColors[id]}`}
        >
          <Component
            isActive={currentSection === id}
            onNext={handleNext}
            isGiftOpened={isGiftOpened}
            handleGiftClick={handleGiftClick}
          />
        </div>
      ))}
    </div>
  );
}

function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 rounded-full bg-white opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 md:w-40 md:h-40 rounded-full bg-white opacity-20"
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 md:w-24 md:h-24 rounded-full bg-white opacity-20"
        animate={{
          y: [0, -50, 0],
          rotate: [0, 360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-20 h-20 md:w-36 md:h-36 rounded-full bg-white opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-28 h-28 md:w-48 md:h-48 rounded-full bg-white opacity-20"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, -180, -360],
          x: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

function GiftCard({ isActive, handleGiftClick }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full flex items-center justify-center relative"
        >
          <BackgroundElements />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-2xl cursor-pointer"
            onClick={handleGiftClick}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-white">
              It's a special day!
            </h2>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-5xl md:text-6xl text-center"
            >
              🎁
            </motion.div>
            <p className="mt-4 text-lg md:text-xl text-center text-white">
              Click me to open
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WelcomeMessage({ isActive, onNext }) {
  const letters = "Happy Birthday AY!".split("");

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full flex flex-col items-center justify-center relative px-4"
        >
          <BackgroundElements />
          <div className="mb-8">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-4xl md:text-7xl font-bold text-white inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, type: "spring" }}
            className="text-3xl md:text-5xl mb-8"
          >
            {["🎉", "🎈", "🎂"].map((emoji, index) => (
              <motion.span
                key={index}
                animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="inline-block mx-2"
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-white text-purple-700 rounded-full font-semibold text-lg md:text-xl hover:bg-opacity-90 transition-colors"
            onClick={onNext}
          >
            Continue
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ImageCarousel({ isActive, onNext }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full flex flex-col items-center justify-center relative px-4"
        >
          <BackgroundElements />
          <div className="w-full max-w-md mb-8">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards, Pagination, Navigation]}
              className="w-full h-64 md:h-96"
            >
              {images.map((src, index) => (
                <SwiperSlide
                  key={index}
                  className="rounded-2xl overflow-hidden"
                >
                  <motion.img
                    src={src}
                    alt={`Celebration ${index + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-white text-purple-700 rounded-full font-semibold text-lg md:text-xl hover:bg-opacity-90 transition-colors"
            onClick={onNext}
          >
            Continue
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BirthdayWishes({ isActive, onNext }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full overflow-hidden p-4 md:p-8 relative"
        >
          <BackgroundElements />
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Birthday Wishes
          </h2>
          <div className="flex flex-col space-y-4 mb-8">
            <MarqueeRow wishes={birthdayWishes.slice(0, 10)} direction="left" />
            <MarqueeRow
              wishes={birthdayWishes.slice(10, 20)}
              direction="right"
            />
            <MarqueeRow
              wishes={birthdayWishes.slice(20, 30)}
              direction="left"
            />
            <MarqueeRow
              wishes={birthdayWishes.slice(30, 40)}
              direction="right"
            />
            <MarqueeRow wishes={birthdayWishes.slice(40)} direction="left" />
          </div>
          <div className="flex justify-center">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-white text-purple-700 rounded-full font-semibold text-lg md:text-xl hover:bg-opacity-90 transition-colors"
              onClick={onNext}
            >
              Continue
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MarqueeRow({ wishes, direction }) {
  return (
    <motion.div
      initial={{ x: direction === "left" ? "100%" : "-100%" }}
      animate={{ x: direction === "left" ? "-100%" : "100%" }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      }}
      className="flex space-x-4 whitespace-nowrap"
    >
      {wishes.map((wish) => (
        <motion.div
          key={wish.id}
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg inline-block"
          whileHover={{ scale: 1.05, rotate: 5, zIndex: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="text-sm md:text-base mb-2 text-white">{wish.message}</p>
          <p className="text-xs md:text-sm font-semibold text-white">
            - {wish.author}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Celebration({ isActive, onNext }) {
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full flex flex-col items-center justify-center relative px-4"
        >
          <BackgroundElements />
          <motion.h2
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 text-center"
          >
            Let's Celebrate!
          </motion.h2>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-3xl text-white mb-8 text-center"
          >
            Wishing you an amazing year ahead, Ayo!
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="text-5xl md:text-7xl mb-8"
          >
            {["🎊", "🥳", "🎊"].map((emoji, index) => (
              <motion.span
                key={index}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="inline-block mx-2"
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-white text-purple-700 rounded-full font-semibold text-lg md:text-xl hover:bg-opacity-90 transition-colors"
            onClick={onNext}
          >
            Start Over
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
