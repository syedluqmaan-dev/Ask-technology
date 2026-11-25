import React from "react";

const Mark = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 120 100" width={size} height={Math.round(size * 0.83)} aria-hidden="true">
    <defs>
      <linearGradient id="cmsL" gradientUnits="userSpaceOnUse" x1="14" y1="90" x2="58" y2="16"><stop offset="0" stopColor="#4560D0" /><stop offset="1" stopColor="#1C97DD" /></linearGradient>
      <linearGradient id="cmsR" gradientUnits="userSpaceOnUse" x1="60" y1="12" x2="96" y2="90"><stop offset="0" stopColor="#2C3E9E" /><stop offset="1" stopColor="#4560D0" /></linearGradient>
      <linearGradient id="cmsC" gradientUnits="userSpaceOnUse" x1="20" y1="88" x2="92" y2="52"><stop offset="0" stopColor="#1C97DD" /><stop offset="1" stopColor="#8AD3F7" /></linearGradient>
    </defs>
    <path d="M22 64 A13.5 13.5 0 0 1 26 38 A22 22 0 0 1 66 20 A19 19 0 0 1 100 34 A14 14 0 0 1 104 62 Z" fill="#E4F2FC" />
    <path d="M10 90 L47 18 Q50 13 55 15 L63 22 L30 90 Z" fill="url(#cmsL)" stroke="#fff" strokeWidth="3.2" strokeLinejoin="round" paintOrder="stroke" />
    <path d="M9 90 Q44 62 82 52 L85 62 Q52 70 25 90 Z" fill="url(#cmsC)" stroke="#fff" strokeWidth="3.2" strokeLinejoin="round" paintOrder="stroke" />
    <path d="M47 24 Q55 7 69 16 L106 90 H85 Z" fill="url(#cmsR)" stroke="#fff" strokeWidth="3.2" strokeLinejoin="round" paintOrder="stroke" />
  </svg>
);

/** Login screen logo. */
export function Logo() {
  return (
    <div className="ask-login-logo">
      <Mark size={64} />
      <div>
        <strong>ASK Technology</strong>
        <span>Website content manager</span>
      </div>
    </div>
  );
}

/** Small icon in the admin navigation. */
export function Icon() {
  return <Mark size={28} />;
}
