import Link from "next/link";

type Props = { compact?: boolean; bg?: string; id?: string };

/** ASK Technology logo: cloud-ribbon mark, divider and wordmark with the sky-blue K. */
export function LogoMark({ id = "lg", bg = "#fff", size = 54 }: { id?: string; bg?: string; size?: number }) {
  return (
    <svg viewBox="0 0 120 100" width={size} height={Math.round(size * 0.83)} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}l`} gradientUnits="userSpaceOnUse" x1="14" y1="90" x2="58" y2="16">
          <stop offset="0" stopColor="#4560D0" />
          <stop offset="1" stopColor="#1C97DD" />
        </linearGradient>
        <linearGradient id={`${id}r`} gradientUnits="userSpaceOnUse" x1="60" y1="12" x2="96" y2="90">
          <stop offset="0" stopColor="#2C3E9E" />
          <stop offset="1" stopColor="#4560D0" />
        </linearGradient>
        <linearGradient id={`${id}c`} gradientUnits="userSpaceOnUse" x1="20" y1="88" x2="92" y2="52">
          <stop offset="0" stopColor="#1C97DD" />
          <stop offset="1" stopColor="#8AD3F7" />
        </linearGradient>
      </defs>
      <path d="M22 64 A13.5 13.5 0 0 1 26 38 A22 22 0 0 1 66 20 A19 19 0 0 1 100 34 A14 14 0 0 1 104 62 Z" fill="#E4F2FC" />
      <path d="M10 90 L47 18 Q50 13 55 15 L63 22 L30 90 Z" fill={`url(#${id}l)`} stroke={bg} strokeWidth="3.2" strokeLinejoin="round" paintOrder="stroke" />
      <path d="M9 90 Q44 62 82 52 L85 62 Q52 70 25 90 Z" fill={`url(#${id}c)`} stroke={bg} strokeWidth="3.2" strokeLinejoin="round" paintOrder="stroke" />
      <path d="M47 24 Q55 7 69 16 L106 90 H85 Z" fill={`url(#${id}r)`} stroke={bg} strokeWidth="3.2" strokeLinejoin="round" paintOrder="stroke" />
    </svg>
  );
}

export function Logo({ compact = false, bg = "#fff", id = "lg" }: Props) {
  return (
    <Link href="/" className="logo" aria-label="ASK Technology home">
      <LogoMark id={id} bg={bg} size={compact ? 46 : 54} />
      {!compact && <span className="rule" aria-hidden="true" />}
      <span className="word" aria-hidden="true">
        <span className="ask" style={compact ? { fontSize: 22 } : undefined}>
          AS
          <svg viewBox="0 0 58 72">
            <rect width="15.5" height="72" fill="#17213F" />
            <polygon points="13,49 41,0 58,0 30,49" fill="#1C97DD" />
            <polygon points="24,33 58,72 39,72 13,44" fill="#17213F" />
          </svg>
        </span>
        <span className="tech" style={compact ? { fontSize: 10 } : undefined}>Technology</span>
      </span>
    </Link>
  );
}
