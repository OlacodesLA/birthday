import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  floating1,
  floating2,
  floating3,
  floating4,
  floating5,
  floating6,
  floating7,
  floating8,
} from "../data/floating";

const images = [
  floating1,
  floating2,
  floating3,
  floating4,
  floating5,
  floating6,
  floating7,
  floating8,
];

const comments = Array(30)
  .fill()
  .map((_, i) => ({
    id: i + 1,
    author: `Friend ${i + 1}`,
    text: `Happy Birthday, Ayo! Wishing you all the best on your special day! #${
      i + 1
    }`,
  }));

export default function HappyBirthdayAyo() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [confettiColor, setConfettiColor] = useState("#FFA500");
  const [isCarouselReady, setIsCarouselReady] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (isGiftOpened) {
      const timer = setTimeout(() => {
        if (currentStep < 3) {
          setCurrentStep(currentStep + 1);
        }
      }, 15000); // 15 seconds for each step

      return () => clearTimeout(timer);
    }
  }, [currentStep, isGiftOpened]);

  const shootConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
          colors: [confettiColor, "#FFFFFF", "#FFD700"],
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleGiftClick = () => {
    setIsGiftOpened(true);
    setCurrentStep(0);
    shootConfetti();
  };

  const handleConfettiColorChange = (color) => {
    setConfettiColor(color);
    shootConfetti();
  };

  const handleSlideChange = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
      setIsCarouselReady(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 to-pink-500 text-white overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {!isGiftOpened && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9, rotate: -5 }}
              className="w-64 h-64 bg-yellow-400 rounded-lg shadow-lg flex items-center justify-center cursor-pointer relative overflow-hidden"
              onClick={handleGiftClick}
            >
              <motion.div
                className="absolute inset-0 bg-red-500"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ zIndex: 1 }}
              >
                <span className="text-3xl font-bold text-purple-800">
                  Click me!
                </span>
              </motion.div>
              <motion.div
                className="absolute top-0 left-1/2 w-8 h-16 bg-yellow-300"
                style={{ zIndex: 2 }}
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </motion.div>
          </motion.div>
        )}

        {isGiftOpened && currentStep === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                delay: 0.2,
              }}
              className="text-6xl font-bold mb-4"
            >
              Happy Birthday
            </motion.h1>
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                delay: 0.4,
              }}
              className="text-8xl font-extrabold"
            >
              AYO IDOWU
            </motion.h2>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ times: [0, 0.5, 1], duration: 1, delay: 0.8 }}
            >
              <span className="text-4xl">🎉</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8"
            >
              <p className="mb-2">Choose confetti color:</p>
              <div className="flex justify-center space-x-4">
                {["#FFA500", "#FF69B4", "#00CED1", "#9370DB"].map((color) => (
                  <motion.button
                    key={color}
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleConfettiColorChange(color)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {isGiftOpened && currentStep === 1 && (
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: isCarouselReady ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto"
          >
            <Swiper
              effect={"cube"}
              grabCursor={true}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              pagination={true}
              navigation={true}
              modules={[EffectCube, Pagination, Navigation]}
              className="mySwiper"
              onSlideChange={handleSlideChange}
              ref={swiperRef}
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={src}
                    alt={`Celebration ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}

        {isGiftOpened && currentStep === 2 && (
          <motion.div
            key="comments"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl h-[80vh] overflow-hidden"
          >
            <h3 className="text-3xl font-bold mb-8 text-center">
              Birthday Wishes
            </h3>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-full p-4"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.1,
                  }}
                  className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.p
                    className="text-lg mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {comment.text}
                  </motion.p>
                  <motion.p
                    className="text-sm font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    - {comment.author}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {isGiftOpened && currentStep === 3 && (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-2xl"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://example-cloud.com/birthday-video.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {isGiftOpened && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex space-x-2">
            {[0, 1, 2, 3].map((step) => (
              <motion.button
                key={step}
                onClick={() => setCurrentStep(step)}
                className={`w-3 h-3 rounded-full ${
                  currentStep === step ? "bg-white" : "bg-white bg-opacity-50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
