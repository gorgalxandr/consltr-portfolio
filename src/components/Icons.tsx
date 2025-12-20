
type IconProps = React.SVGProps<SVGSVGElement>;

// =============================================================================
// Lucide React Icons (simplified for direct SVG inclusion)
// =============================================================================
const SearchIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const BotIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 8V4H8" />
    <path d="M22 10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
    <path d="M2 12v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8" />
    <path d="M12 18h.01" />
  </svg>
);

const RocketIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84 1.26-2.19 1.5-3.5-.19-.23-.3-.48-.42-.72-.12-.25-.21-.5-.28-.75h0c-.08-.25-.13-.5-.17-.75l-1 1c-1.25 1.25-2.25 2.25-3.5 3.5Z" />
    <path d="M10 9c-1.12.86-2 3-2 3s1.78.78 3 0c.66-.43 1.16-1.02 1.5-1.72l.2-.47a1 1 0 0 1 1.45-.19c.73.58 1.48 1.15 2.22 1.72l.2.47c.34.7.84 1.29 1.5 1.72 1.22.79 3 0 3 0s-.78 1.78 0 3c.43.66 1.02 1.16 1.72 1.5l.47.2c.7.34 1.29.84 1.72 1.5.79 1.22 0 3 0 3s1.78-.78 3 0c.66-.43 1.16-1.02 1.5-1.72l.2-.47a1 1 0 0 1 .19-1.45c-.58-.73-1.15-1.48-1.72-2.22l-.47-.2a.89.89 0 0 0-.19-1.45l1-1c1.25-1.25 2.25-2.25 3.5-3.5Z" />
    <path d="M14.5 7.5c1.5-1.26 2-5 2-5s-3.74.5-5 2c-.71.84-1.26 2.19-1.5 3.5.19.23.3.48.42-.72.12-.25-.21-.5-.28-.75h0c-.08-.25-.13-.5-.17-.75l1-1c1.25-1.25 2.25-2.25 3.5-3.5Z" />
    <path d="M10 18c-1.12-.86-2-3-2-3s1.78-.78 3 0c.66.43 1.16 1.02 1.5 1.72l.2.47a1 1 0 0 0 1.45.19c.73-.58 1.48-1.15 2.22-1.72l.2-.47c.34-.7.84-1.29 1.5-1.72 1.22-.79 3 0 3 0s-.78-1.78 0-3c.43-.66 1.02-1.16 1.72-1.5l.47-.2a.89.89 0 0 0 .19-1.45c-.58.73-1.15 1.48-1.72 2.22l-.47.2a1 1 0 0 1-.19 1.45l1 1c1.25 1.25 2.25 2.25 3.5 3.5Z" />
    <path d="M2 12h20" />
    <path d="M12 2v20" />
  </svg>
);

const MicIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

const Volume2Icon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M17.8 8.2a7.14 7.14 0 0 1 0 7.6" />
    <path d="M21.7 5.3a12 12 0 0 1 0 13.4" />
  </svg>
);

// --- NEW ICONS ADDED FOR CHAT MESSAGES ---
const XCircleIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

const MicroscopeIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 18h8" />
    <path d="M3 22h18" />
    <path d="M14 22a7 7 0 0 0 0-14H9a7 7 0 0 0 0 14Z" />
    <path d="M9 14h2" />
    <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
  </svg>
);

const GlobeIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20Z" />
    <path d="M2 12h20" />
  </svg>
);

const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const PanelRightCloseIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <path d="M15 3v18" />
    <path d="m8 9 3 3-3 3" />
  </svg>
);

const PanelRightOpenIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <path d="M9 3v18" />
    <path d="m16 15-3-3 3-3" />
  </svg>
);

export type { IconProps };
export {
    BotIcon,
    CheckCircleIcon,
    GlobeIcon,
    MicIcon,
    MicroscopeIcon,
    PanelRightCloseIcon,
    PanelRightOpenIcon,
    RocketIcon,
    SearchIcon,
    Volume2Icon,
    XCircleIcon,
}