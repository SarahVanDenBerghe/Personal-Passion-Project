import React, { useRef, useEffect } from 'react';
import './styles.scss';
import { gsap } from 'gsap';

const Loader = ({ loading, setShowContent }) => {
const circleOne = useRef(null);
const circleTwo = useRef(null);
const circleThree = useRef(null);
const loader = useRef(null);

  useEffect(() => {
    gsap.to(
      [circleOne.current, circleTwo.current, circleThree.current],{
      y: 0,
      stagger: { each: 0.15, yoyo: true, repeat: -1 },
      ease: 'sine.inOut'
      });
  });

  useEffect(() => {
    if (!loading) {
      gsap.to(loader.current, {
        duration: 0.8,
        ease: 'Power2.easeIn',
        opacity: 0,
        scale: 0,
        transformOrigin: '50% 50%',
      });
    }

    /* Content inladen */
    setTimeout(() => setShowContent(true), 1000);
  }, [loading]);

  return (
    <div ref={loader} className="loader">
      <svg width="120" height="100">
        <circle ref={circleOne} cx="20" cy="70" r="8"></circle>
        <circle ref={circleTwo} cx="60" cy="70" r="8"></circle>
        <circle ref={circleThree} cx="100" cy="70" r="8"></circle>
      </svg>
      <p>Loading</p>
    </div>
  );
};

export default Loader;
