import React from 'react';
import AppLayout from '../components/layout/AppLayout';

// Types
interface Stat {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
}

interface AIAgent {
  id: string;
  name: string;
  image?: string;
  isActive: boolean;
  isPlaceholder?: boolean;
}

interface GuideCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}

interface AgentsProps {
  className?: string;
  stats?: Stat[];
  aiAgents?: AIAgent[];
  guideCards?: GuideCard[];
  onUpgrade?: () => void;
  onCreateAgent?: () => void;
  onViewAgent?: (agentId: string) => void;
  onFeedback?: () => void;
  onBookCall?: () => void;
}

const Agents: React.FC<AgentsProps> = ({
  className = '',
  stats,
  aiAgents,
  guideCards,
  onUpgrade,
  onCreateAgent,
  onViewAgent,
  onFeedback,
  onBookCall
}) => {
  
  // Default data - can be overridden by props
  const defaultStats: Stat[] = [
    {
      id: '1',
      title: 'Total AI Agents',
      value: '0/1',
      description: 'Number of AI Agents created',
      icon: 'fas fa-robot'
    },
    {
      id: '2',
      title: 'Total Messages',
      value: '0/40',
      description: 'Consumed messages this month',
      icon: 'fas fa-comments'
    },
    {
      id: '3',
      title: 'Total Leads',
      value: '0',
      description: 'Number of leads captured',
      icon: 'fas fa-users'
    }
  ];

  const defaultAIAgents: AIAgent[] = [
    {
      id: 'create-new',
      name: 'Create AI Agent',
      isActive: false,
      isPlaceholder: false
    },
    {
      id: 'placeholder-1',
      name: 'Placeholder 1',
      isActive: false,
      isPlaceholder: true
    },
    {
      id: 'placeholder-2',
      name: 'Placeholder 2',
      isActive: false,
      isPlaceholder: true
    },
    {
      id: 'placeholder-3',
      name: 'Placeholder 3',
      isActive: false,
      isPlaceholder: true
    }
  ];

  const defaultGuideCards: GuideCard[] = [
    {
      id: '1',
      title: 'Our Beginner\'s Guide',
      description: 'Crawl your website pages automatically. Train the bot with specific texts that. Train the bot with specific texts that.',
      icon: 'fas fa-book-open',
      iconColor: 'text-blue-500'
    },
    {
      id: '2',
      title: 'FAQ Section',
      description: 'Attach files to train your bot. Supported formats .pdf, .doc, .docx, .csv or .txt. Train the bot with specific texts that.',
      icon: 'fas fa-question-circle',
      iconColor: 'text-green-500'
    },
    {
      id: '3',
      title: 'Documentation',
      description: 'Train the bot with specific texts that cannot be found on any public area of your website or docs.',
      icon: 'fas fa-file-alt',
      iconColor: 'text-red-500'
    }
  ];

  // Use props or default data
  const currentStats = stats || defaultStats;
  const currentAgents = aiAgents || defaultAIAgents;
  const currentGuideCards = guideCards || defaultGuideCards;

  const handleUpgrade = (): void => {
    if (onUpgrade) {
      onUpgrade();
    }
  };

  const handleCreateAgent = (): void => {
    if (onCreateAgent) {
      onCreateAgent();
    }
  };

  const handleViewAgent = (agentId: string): void => {
    if (onViewAgent) {
      onViewAgent(agentId);
    }
  };

  const handleFeedback = (): void => {
    if (onFeedback) {
      onFeedback();
    }
  };

  const handleBookCall = (): void => {
    if (onBookCall) {
      onBookCall();
    }
  };

  return (
    <AppLayout>
      <div className={`flex-1 p-6 md:p-8 w-full max-w-7xl mx-auto ${className}`}>
        {/* PRO Banner */}
        <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white rounded-lg p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-semibold mb-1">Get the PRO Plan to unlock all features.</h2>
            <p className="text-sm text-purple-100">Activate a subscription for more training sources, lead generation capabilities and more.</p>
          </div>
          <button 
            onClick={handleUpgrade}
            className="bg-white text-purple-700 font-semibold py-2 px-5 rounded-md hover:bg-purple-50 transition-colors duration-200"
          >
            Upgrade to PRO - $19
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {currentStats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-semibold text-gray-800">{stat.value}</p>
                <p className="text-gray-400 text-xs">{stat.description}</p>
              </div>
              <i className={`${stat.icon} text-gray-300 text-4xl`}></i>
            </div>
          ))}
        </div>

        {/* AI Agents Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Build your AI Agents</h2>
        <p className="text-gray-600 mb-6">Craft customized AI Agents for your business and customer support</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {currentAgents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-lg shadow-sm overflow-hidden h-60 md:h-72">
              {agent.id === 'create-new' ? (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg h-full flex flex-col justify-center items-center text-gray-500 cursor-pointer hover:border-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={handleCreateAgent}
                >
                  <div className="bg-purple-600 bg-opacity-70 rounded-full p-4 mb-2">
                    <i className="fas fa-plus text-white text-3xl"></i>
                  </div>
                  <p className="text-lg font-medium">Create AI Agent</p>
                </div>
              ) : agent.isPlaceholder ? (
                <div className="bg-gray-200 h-full flex justify-center items-center">
                  <i className="fas fa-image text-gray-400 text-5xl"></i>
                </div>
              ) : (
                <div 
                  className="h-full cursor-pointer hover:shadow-md transition-shadow duration-200"
                  onClick={() => handleViewAgent(agent.id)}
                >
                  <div className="bg-gray-200 h-3/4 flex justify-center items-center">
                    {agent.image ? (
                      <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                    ) : (
                      <i className="fas fa-robot text-gray-400 text-5xl"></i>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 truncate">{agent.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${agent.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {agent.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Guide Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Get started with Consltr AI Agent</h2>
        <p className="text-gray-600 mb-6">Explore our comprehensive tutorials to kickstart your journey with Consltr AI Agent.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentGuideCards.map((card) => (
            <div key={card.id} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <i className={`${card.icon} mr-2 ${card.iconColor}`}></i>
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Sticky Footer Menu */}
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 lg:right-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 bg-white rounded-l-lg shadow-lg z-50 p-3 md:flex md:flex-col max-md:bottom-4 max-md:right-2 max-md:top-auto max-md:transform-none max-md:flex-row max-md:rounded-lg max-md:shadow-md">
          <button 
            onClick={handleFeedback}
            className="block text-center p-2 text-gray-600 text-sm mb-2 md:mb-2 max-md:mx-2 max-md:mb-0 hover:text-gray-800 transition-colors"
          >
            <i className="fas fa-star block mb-1 text-lg md:text-xl"></i>
            Feedback
          </button>
          <button 
            onClick={handleBookCall}
            className="block text-center p-2 text-gray-600 text-sm max-md:mx-2 hover:text-gray-800 transition-colors"
          >
            <i className="fas fa-phone-alt block mb-1 text-lg md:text-xl"></i>
            Book a call
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Agents;