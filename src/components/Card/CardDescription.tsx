

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => (
  <p className={`text-xs text-muted-foreground ${className}`}>
    {children}
  </p>
);

export { CardDescription };