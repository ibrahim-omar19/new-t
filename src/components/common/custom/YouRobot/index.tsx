'use client';
import styles from './index.module.css';
import Button from '../../base/Button';
import {  useTranslations } from 'next-intl';
import LottieLoader from '../../base/LottieLoader';
import * as robot from '@/services/lotties/common/robot.json';
import { useEffect, useState } from 'react';

const YouRobot = () => {
  const t = useTranslations();
  const [timeRemaining, setTimeRemaining] = useState(60);
  
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Perform actions when the timer reaches zero
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className={styles.container}>
      <LottieLoader  animationData={robot} width={'120%'} />
      <p className={styles.text}>{t('lRx6rc_oVM-9jhEiOp8Dk')} </p>
      {timeRemaining >0 ?
      <p className={styles.text}>{t('Wj4Zlv-rrIeNIh7eGO6oj')} <strong>{minutes<9? "0"+ minutes:minutes}:{seconds <9 ?"0"+seconds :seconds}</strong> </p>
      :
      <Button variant="secondary" className={styles.button} onClick={()=> window?.location?.reload()}>
       {t('Ocb8VxmOJLPB69JTZYh2y')}
      </Button>
      }
    </div>
  );
};
export default YouRobot;
