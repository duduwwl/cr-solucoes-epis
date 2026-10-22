'use client';

import { motion } from 'motion/react';

export function VerticalCutReveal({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return <span className={className} aria-label={text}>
    {words.map((word, index) => <span className="cut-word" aria-hidden="true" key={`${word}-${index}`}>
      <motion.span
        initial={{ y: '112%' }}
        animate={{ y: 0 }}
        transition={{ duration: .72, delay: .08 + index * .055, ease: [.22, 1, .36, 1] }}
      >{word}</motion.span>
    </span>)}
  </span>;
}
