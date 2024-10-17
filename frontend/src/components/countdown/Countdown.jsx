import React, { useEffect, useRef, useState } from 'react';
import './countdown.css';

const Countdown = ({ targetDate }) => {
  const [time, setTime] = useState(0);
  const [previousTime, setPreviousTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const cardRefs = {
    daysTens: useRef(),
    daysOnes: useRef(),
    hoursTens: useRef(),
    hoursOnes: useRef(),
    minutesTens: useRef(),
    minutesOnes: useRef(),
    secondsTens: useRef(),
    secondsOnes: useRef(),
  };

  const calculateTimeDifference = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = Math.floor((target - now) / 1000);
    return difference > 0 ? difference : 0;
  };

  const flip = (flipCard, newNumber) => {
    const top = flipCard.current.querySelector('.top');
    const bottom = flipCard.current.querySelector('.bottom');
    const startNumber = top.textContent;

    if (newNumber === startNumber) return;

    top.textContent = startNumber;
    bottom.textContent = startNumber;

    flipCard.current.dataset.currentNumber = newNumber;
    flipCard.current.dataset.nextNumber = newNumber;

    flipCard.current.addEventListener('animationstart', () => {
      top.textContent = newNumber;
    });

    flipCard.current.addEventListener('animationend', () => {
      bottom.textContent = newNumber;
      flipCard.current.classList.remove('flip');
    });

    flipCard.current.classList.add('flip');
  };

  const flipAllCards = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600) % 24;
    const days = Math.floor(time / 86400);

    // Check and flip only if values have changed
    if (Math.floor(days / 10) !== Math.floor(previousTime.days / 10)) {
      flip(cardRefs.daysTens, Math.floor(days / 10));
    }
    if (days % 10 !== previousTime.days % 10) {
      flip(cardRefs.daysOnes, days % 10);
    }
    if (Math.floor(hours / 10) !== Math.floor(previousTime.hours / 10)) {
      flip(cardRefs.hoursTens, Math.floor(hours / 10));
    }
    if (hours % 10 !== previousTime.hours % 10) {
      flip(cardRefs.hoursOnes, hours % 10);
    }
    if (Math.floor(minutes / 10) !== Math.floor(previousTime.minutes / 10)) {
      flip(cardRefs.minutesTens, Math.floor(minutes / 10));
    }
    if (minutes % 10 !== previousTime.minutes % 10) {
      flip(cardRefs.minutesOnes, minutes % 10);
    }
    if (Math.floor(seconds / 10) !== Math.floor(previousTime.seconds / 10)) {
      flip(cardRefs.secondsTens, Math.floor(seconds / 10));
    }
    if (seconds % 10 !== previousTime.seconds % 10) {
      flip(cardRefs.secondsOnes, seconds % 10);
    }

    // Update previous time
    setPreviousTime({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    const initialTime = calculateTimeDifference(targetDate);
    setTime(initialTime);

    const interval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = calculateTimeDifference(targetDate);
        if (newTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    flipAllCards(time);
  }, [time]);

  return (
    <div>
      <div className="countdown-container">
        <div className="countdown-cards">
          <div className='card-title'>Days</div>
          <div className='card-container'>
            <div className="flip-card" ref={cardRefs.daysTens}>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" ref={cardRefs.daysOnes}>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
        <div className="countdown-cards">
          <div className='card-title'>Hours</div>
          <div className='card-container'>
            <div className="flip-card" ref={cardRefs.hoursTens}>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" ref={cardRefs.hoursOnes}>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
        <div className="countdown-cards">
          <div className='card-title'>Minutes</div>
          <div className='card-container'>
            <div className="flip-card" ref={cardRefs.minutesTens}>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" ref={cardRefs.minutesOnes}>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
        <div className="countdown-cards">
          <div className='card-title'>Seconds</div>
          <div className='card-container'>
            <div className="flip-card" ref={cardRefs.secondsTens}>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" ref={cardRefs.secondsOnes}>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;