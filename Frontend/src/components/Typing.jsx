// Typing.jsx
import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function Typing({ onTypingEnd }) {
  const [step, setStep] = useState(1);

  

  const normalTextStyle = {
    fontSize: '3rem',
    fontWeight: 300,
    color: '#fff',
    lineHeight: 1.2,
  };

  const importantNameStyle = {
    fontSize: '5rem',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.2,
    marginLeft: '0.5rem',
  };

  const importantPortfolioStyle = {
    fontSize: '5rem',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.2,
    marginLeft: '0.2rem',
  };

  useEffect(() => {
    if (step === 3 && onTypingEnd) {
      const timer = setTimeout(() => {
        onTypingEnd(); // Notify parent
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, onTypingEnd]);

  return (
    <div style={{ transform: 'translateY(-10vh)' }}>
      {step === 1 && (
        <div>
          <span style={normalTextStyle}>
            <TypeAnimation
              sequence={['Hi, I\'m ', 800]}
              speed={50}
              wrapper="span"
              cursor={false}
            />
          </span>
          <span style={importantNameStyle}>
            <TypeAnimation
              sequence={[
                500,
                'Adrian!',
                800,
                () => setStep(2),
              ]}
              speed={50}
              wrapper="span"
              cursor={false}
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
              sequence={[
                800,
                'Portfolio.',
                800,
                () => setStep(3),
              ]}
              speed={50}
              wrapper="span"
              cursor={false}
            />
          </span>
        </div>
      )}
    </div>
  );
}
