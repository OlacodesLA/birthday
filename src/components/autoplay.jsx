import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AudioPlayer = ({ children }) => {
  const [hasInteracted, setHasInteracted] = useState(false); // Tracks user interaction
  const [isPlaying, setIsPlaying] = useState(false); // Tracks play/pause state
  const audioRef = useRef(null); // Create a reference for the audio element

  // Effect to play audio after user interaction and when isPlaying is true
  useEffect(() => {
    if (hasInteracted && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }

    // Cleanup function to pause and reset the audio when the component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [hasInteracted, isPlaying]); // Run when hasInteracted or isPlaying changes

  // Function to handle user interaction (sets interaction state)
  const handleUserInteraction = () => {
    setHasInteracted(true);
  };

  // Toggle play/pause functionality
  const handlePlayPause = () => {
    if (!hasInteracted) {
      setHasInteracted(true); // Ensure interaction state is set
    }
    setIsPlaying((prevState) => !prevState); // Toggle between play and pause
  };

  return (
    <div
      onMouseOver={handleUserInteraction}
      onScroll={handleUserInteraction}
      onClick={handleUserInteraction}
      onMouseDown={handleUserInteraction}
    >
      {/* Audio element controlled by the ref */}
      <audio ref={audioRef} src="/music.mp3" />
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.15, zIndex: 50 }}
          whileTap={{ scale: 0.95, zIndex: 50 }}
          className="cursor-pointer px-4 py-4 fixed bottom-10 right-10 z-50  bg-[#CAFB12] text-white rounded-md"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path>
            </svg>
          )}
        </motion.button>
      </div>
      {children}
    </div>
  );
};

export default AudioPlayer;
