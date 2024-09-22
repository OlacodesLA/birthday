import React, { useEffect } from "react";

const AudioPlayer = () => {
  useEffect(() => {
    const audio = new Audio("/audio-file.mp3"); // Path to your audio file
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });

    // Optionally, handle audio cleanup
    return () => {
      audio.pause(); // Stop the audio if the component unmounts
      audio.currentTime = 0; // Reset the playback time
    };
  }, []); // Empty dependency array to run on mount only

  return <div></div>;
};

export default AudioPlayer;
