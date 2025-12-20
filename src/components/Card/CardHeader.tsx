

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-1 p-4 ${className}`}>
    {children}
  </div>
);

export { CardHeader };