import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Hero from "./components/hero";
import BuzzWords from "./components/buzz";
import Scene from "./components/reveal/paint-reveal";
import Text from "./components/reveal/text";
import { AnimatePresence } from "framer-motion";
import Birthday from "./components/wishes";
import useWindow from "./utils";
import Glitch from "./components/glitch";
import AudioPlayer from "./components/autoplay";

function App() {
  const [reveal, setReveal] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.select();
  };
  const { dimension } = useWindow();
  console.log("Dimension", dimension);

  useState(() => {
    setTimeout(() => {
      setReveal(true);
    }, 3000);
  });
  return (
    <>
      {dimension?.width > 760 ? (
        <div className="w-full md:flex flex-col hidden">
          {reveal ? (
            <AnimatePresence mode="wait">
              <AudioPlayer>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 200,
                    delay: 0.5,
                    damping: 7,
                  }}
                  className=""
                >
                  <Hero />
                  <Birthday />
                  <BuzzWords />
                </motion.div>
              </AudioPlayer>
            </AnimatePresence>
          ) : (
            <Glitch />
          )}
        </div>
      ) : (
        <div className="text-lg text-center text-white justify-center items-center flex md:hidden w-screen h-screen">
          This screen is only available on a Desktop
        </div>
      )}
    </>
  );
}

export default App;
