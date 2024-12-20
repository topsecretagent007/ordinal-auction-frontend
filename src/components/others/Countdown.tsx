// components/Countdown.tsx
import { useState, useEffect } from 'react';

type CountdownProps = {
  targetTimestamp: number; // Target time in milliseconds
};

const Countdown: React.FC<CountdownProps> = ({ targetTimestamp }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTimestamp));

  useEffect(() => {
    // Update countdown every second
    const timer = setInterval(() => {
      const _timeLeft = calculateTimeLeft(targetTimestamp)
      if (_timeLeft.total < 0) {
        return;
      } else {
        setTimeLeft(calculateTimeLeft(targetTimestamp));
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [targetTimestamp]);

  return (
    <div>
      {targetTimestamp === null || targetTimestamp === undefined ?
        <p>0 h :0 m :0 s</p>
        :
        <p>{timeLeft.hours}h :{timeLeft.minutes}m :{timeLeft.seconds}s</p>
      }
    </div>
  );
};

// Helper function to calculate time left
const calculateTimeLeft = (targetTimestamp: number) => {
  const currentTime = new Date().getTime();
  const difference = targetTimestamp - currentTime;


  // Convert difference to time components
  return {
    total: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export default Countdown;
