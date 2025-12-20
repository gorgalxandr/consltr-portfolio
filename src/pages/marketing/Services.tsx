import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faMobileAlt, faPalette } from '@fortawesome/free-solid-svg-icons';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, iconColor }) => (
  <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg hover:bg-opacity-70 transition-all duration-300">
    <div className={`${iconColor} text-4xl mb-4`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: <FontAwesomeIcon icon={faCode} />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies.',
      iconColor: 'text-blue-400'
    },
    {
      icon: <FontAwesomeIcon icon={faMobileAlt} />,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      iconColor: 'text-purple-400'
    },
    {
      icon: <FontAwesomeIcon icon={faPalette} />,
      title: 'UI/UX Design',
      description: 'User-centered design that creates memorable experiences.',
      iconColor: 'text-pink-400'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          We offer comprehensive digital solutions to help your business thrive in the modern world.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            iconColor={service.iconColor}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;