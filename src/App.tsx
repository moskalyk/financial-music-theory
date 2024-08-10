import { useState, useEffect, useRef } from 'react'
import './App.css'
import watr from './watr.mp3'

const AudioPlayerWithCounter = () => {
  const [_, setCounter] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [totalListenedTime, setTotalListenedTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio: any = audioRef.current;

    const handleTimeUpdate = () => {
      const currentTime = Math.floor(audio.currentTime);

      // Only increment the counter if the audio is playing and time is moving forward naturally
      if (audio.paused === false && currentTime > lastTime) {
        const timeDifference = currentTime - lastTime;
        setCounter((prevCounter) => prevCounter + timeDifference);
        setTotalListenedTime((prevTotal) => prevTotal + timeDifference);
        setLastTime(currentTime);
      }
    };

    const handleSeeked = () => {
      // When the user seeks, reset the lastTime to the new currentTime
      setLastTime(Math.floor(audio.currentTime));
    };

    const handlePlay = () => {
      setLastTime(Math.floor(audio.currentTime));
    };

    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('seeked', handleSeeked); // Listen to seeked event
      audio.addEventListener('play', handlePlay); // Listen to play event
    }

    // Cleanup event listeners on unmount
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('seeked', handleSeeked);
        audio.removeEventListener('play', handlePlay);
      }
    };
  }, [lastTime]);

  const airDrop = () => {
    const govScale = 1.10 // could be based on ip address or affiliation, politicians makin sure you're in flow
  
    const helpers: any = {
      '0x12': 0.2,
      '0x3': 0.3,
      '0x4': 0.4,
      '0x567': 0.1,
    };
  
    Object.keys(helpers).forEach((address) => {
      const baseAmount = helpers[address];
      const relativeShare = baseAmount * totalListenedTime;
      const scaledAmount = relativeShare * govScale;
  
      console.log(`Paid to ${address} amount: ${scaledAmount}`);
    });
  
    // Assuming totalListenedTime is available in the scope
    const demandSubsidy = (govScale - 1) * totalListenedTime;
    console.log(`Total demand subsidy: ${demandSubsidy}`);
  };
  
  return (
    <div>
      <audio ref={audioRef} controls>
        <source src={watr} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <p>Total time listened: {Math.floor(totalListenedTime)} seconds</p>
      <button onClick={() => airDrop()}>airdrop</button>
    </div>
  );
};


function App() {
  return (
    <>
      <AudioPlayerWithCounter/>
    </>
  )
}

export default App