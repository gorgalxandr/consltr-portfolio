import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  projectNumber: string;
  gradientFrom: string;
  gradientTo: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  projectNumber,
  gradientFrom,
  gradientTo
}) => (
  <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg hover:bg-opacity-70 transition-all duration-300">
    <div 
      className={`h-48 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-lg mb-4 flex items-center justify-center`}
    >
      <span className="text-white text-2xl font-bold">{projectNumber}</span>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const PortfolioPage: React.FC = () => {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Modern e-commerce solution with advanced features.',
      projectNumber: 'Project 1',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-purple-600'
    },
    {
      title: 'Mobile Banking App',
      description: 'Secure and intuitive mobile banking experience.',
      projectNumber: 'Project 2',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-pink-600'
    },
    {
      title: 'Corporate Website',
      description: 'Professional website with custom CMS integration.',
      projectNumber: 'Project 3',
      gradientFrom: 'from-pink-500',
      gradientTo: 'to-red-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Our Portfolio
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Showcasing our latest projects and creative solutions.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            projectNumber={project.projectNumber}
            gradientFrom={project.gradientFrom}
            gradientTo={project.gradientTo}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;