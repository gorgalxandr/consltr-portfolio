import { HTMLAttributes, ReactNode } from 'react';


interface DashboardCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode; // Covers almost all cases (elements, strings, arrays, etc.)
  className?: string;
}

// Reusable Card Component
const Card = ({ children, className = '' }: DashboardCardProps) => (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        {children}
    </div>
);

export default Card;