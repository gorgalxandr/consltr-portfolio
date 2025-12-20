
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

// =============================================================================
// Shadcn/ui like components (simplified for this example)
const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', disabled = false, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 
      bg-secondary text-secondary-foreground border border-foreground hover:bg-secondary/80 hover:text-foreground
      ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
);

export { Button };
