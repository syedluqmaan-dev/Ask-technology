import type { IconName } from "@/data/products";

type P = { size?: number; color?: string };
const S = ({ size = 22, children, color = "currentColor", sw = 1.8 }: { size?: number; children: React.ReactNode; color?: string; sw?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const paths: Record<IconName, React.ReactNode> = {
  order: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  chain: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  box: <><path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  factory: <><path d="M3 21V10l6 4V10l6 4V6h6v15H3z" /><path d="M7 17h2M12 17h2M17 17h2" /></>,
  wallet: <><rect x="3" y="6" width="18" height="14" rx="3" /><path d="M3 10h18M16 15h2" /></>,
  invoice: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
  cloud: <path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19 10a4 4 0 0 1-1 8H7z" />,
  offline: <><path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="19.5" r="1" /></>,
  spark: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 20a6 6 0 0 0-3-5.2" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  truck: <><path d="M2 6h12v10H2zM14 10h4l4 3v3h-8" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.5" cy="8.5" r="1.5" /></>,
  swatch: <><path d="M4 4h6v16H4zM10 7l5-2 4 13-5 2" /><circle cx="7" cy="16" r="1" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></>,
  mobile: <><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></>,
  bell: <><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2z" /><path d="M10 21h4" /></>,
  store: <><path d="M4 9l1.5-5h13L20 9" /><path d="M4 9h16v2a3 3 0 0 1-5 2 3 3 0 0 1-6 0 3 3 0 0 1-5-2V9z" /><path d="M5 13v8h14v-8" /></>,
};

export function Icon({ name, size = 22, color }: { name: IconName; size?: number; color?: string }) {
  return <S size={size} color={color}>{paths[name]}</S>;
}

export const Check = ({ size = 18, color = "#1C97DD" }: P) => (
  <S size={size} color={color} sw={2.6}><path d="M5 12l5 5 9-10" /></S>
);
export const Chevron = ({ size = 16 }: P) => <S size={size} sw={2.2}><path d="M6 9l6 6 6-6" /></S>;
export const Plus = ({ size = 20 }: P) => <S size={size} sw={2}><path d="M12 5v14M5 12h14" /></S>;
export const Menu = () => <S size={22} color="#17213F" sw={2}><path d="M4 7h16M4 12h16M4 17h16" /></S>;
export const Close = () => <S size={22} color="#17213F" sw={2}><path d="M6 6l12 12M18 6L6 18" /></S>;
export const Arrow = ({ size = 16, color = "currentColor" }: P) => <S size={size} color={color} sw={2.4}><path d="M5 12h14M13 6l6 6-6 6" /></S>;

export const LinkedIn = () => <S size={18}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></S>;
export const YouTube = () => <S size={18}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5l5 2.5-5 2.5z" /></S>;
export const Instagram = () => <S size={18}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /></S>;
export const Facebook = () => <S size={18}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></S>;
export const WhatsApp = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z" />
  </svg>
);

export const productIcon: Record<string, IconName> = {
  "garment-erp-knit-woven": "factory",
  "buying-house-management": "store",
  "garment-inspection-software": "shield",
  "garment-erp-brands": "swatch",
  "operation-bulletin-quick-ob": "clock",
};
