import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';
import styles from './Typing.module.css';

export default function Typing({ onTypingEnd }) {
  const { t } = useTranslation('landing');
  const [step, setStep] = useState(1);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (step === 3) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 10);
      const endTimer = setTimeout(() => {
        if (onTypingEnd) onTypingEnd();
      }, 1000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(endTimer);
      };
    }
  }, [step, onTypingEnd]);

  const renderStepOne = () => (
    <div>
      <span className={styles.normalText}>
        <TypeAnimation
          sequence={[t('typing.greeting'), 800]}
          speed={50}
          wrapper="span"
          cursor={false}
        />
      </span>
      <span className={styles.importantText}>
        <TypeAnimation
          sequence={[600, t('typing.name'), 1500, () => setStep(2)]}
          speed={50}
          wrapper="span"
          cursor={true}
        />
      </span>
    </div>
  );

  const renderStepTwo = () => (
    <div>
      <span className={styles.normalText}>
        <TypeAnimation
          sequence={[t('typing.welcome'), 800]}
          speed={50}
          wrapper="span"
          cursor={false}
        />
      </span>
      <span className={styles.importantText}>
        <TypeAnimation
          sequence={[800, t('typing.portfolio'), 1500, () => setStep(3)]}
          speed={50}
          wrapper="span"
          cursor={false}
        />
      </span>
    </div>
  );

  const renderStepThree = () => (
    <div className={`${styles.fadeContainer} ${fadeOut ? styles.fadeOut : ''}`}>
      <span className={styles.normalText}>{t('typing.welcome')}</span>
      <span className={styles.importantText}>{t('typing.portfolio')}</span>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {step === 1 && renderStepOne()}
      {step === 2 && renderStepTwo()}
      {step === 3 && renderStepThree()}
    </div>
  );
}
