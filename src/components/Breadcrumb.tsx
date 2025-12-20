import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav className="flex mb-6" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-3">
      {items.map((item, index) => (
        <li key={index} className="inline-flex items-center">
          {index > 0 && (
            <span className="mx-2 text-gray-400">/</span>
          )}
          {item.href ? (
            <button
              onClick={() => item.onClick?.()}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-900 text-sm font-medium">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);