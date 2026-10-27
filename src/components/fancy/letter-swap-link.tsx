'use client';

import Link from 'next/link';

export function LetterSwapLink({ href, children, className = '' }: { href: string; children: string; className?: string }) {
  return <Link href={href} className={`letter-swap ${className}`} aria-label={children}>
    <span className="letter-swap-track" aria-hidden="true"><span>{children}</span><span>{children}</span></span>
  </Link>;
}
