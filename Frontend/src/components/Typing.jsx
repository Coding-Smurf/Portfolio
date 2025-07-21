import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import './Typing.css'; // We'll define the fade-out here

export default function Typing({ onTypingEnd }) {
  const [step, setStep] = useState(1);
  const [fadeOut, setFadeOut] = useState(false);

  const normalTextStyle = {
    fontSize: '3rem',
    fontWeight: 300,
    color: '#fff',
    lineHeight: 1.2,
  };

  const importantPortfolioStyle = {
    fontSize: '5rem',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.2,
    marginLeft: '0.2rem',
  };

  useEffect(() => {
    if (step === 3) {
      // Start fade out immediately
      const fadeTimer = setTimeout(() => setFadeOut(true), 10);

      // Then trigger parent callback after fade
      const endTimer = setTimeout(() => {
        if (onTypingEnd) onTypingEnd();
      }, 3000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(endTimer);
      };
    }
  }, [step, onTypingEnd]);

  return (
    <div style={{ transform: 'translateY(-5vh)' }}>
      {step === 1 && (
        <div>
          <span style={normalTextStyle}>
            <TypeAnimation
              sequence={["Hi, I'm ", 800]}
              speed={50}
              wrapper="span"
              cursor={false}
            />
          </span>
          <span style={importantPortfolioStyle}>
            <TypeAnimation
              sequence={[500, 'Adrian!', 1500, () => setStep(2)]}
              speed={50}
              wrapper="span"
              cursor={true}
            />
          </span>
        </div>
      )}

      {step === 2 && (
        <div>
          <span style={normalTextStyle}>
            <TypeAnimation
              sequence={['Welcome to my ', 800]}
              speed={50}
              wrapper="span"
              cursor={false}
            />
          </span>
          <span style={importantPortfolioStyle}>
            <TypeAnimation
              sequence={[800, 'Portfolio.', 1500, () => setStep(3)]}
              speed={50}
              wrapper="span"
              cursor={false}
            />
          </span>
        </div>
      )}

      {step === 3 && (
        <div className={`fade-container ${fadeOut ? 'fade-out' : ''}`}>
          <span style={normalTextStyle}>Welcome to my </span>
          <span style={importantPortfolioStyle}>Portfolio.</span>
        </div>
      )}
    </div>
  );
}
