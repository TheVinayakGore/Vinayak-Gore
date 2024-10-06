'use client';
import React from 'react';
import { useTypewriter } from 'react-simple-typewriter';

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  time?: number;
  remove?: number;
  loop?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, time = 2000, remove = 50, loop = true }) => {
  const words = Array.isArray(text) ? text : [text];

  const [displayedText] = useTypewriter({
    words: words,
    loop: loop,
    typeSpeed: speed,
    deleteSpeed: remove,
    delaySpeed: time
  });

  return <p dangerouslySetInnerHTML={{ __html: displayedText }} />;
};

export default Typewriter;