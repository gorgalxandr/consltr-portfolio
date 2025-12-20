// src/pages/Dashboard.js
import { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Settings from './Agents/Settings';
import Card from '../components/DashboardCard';
import { useAuth } from '../contexts/AuthContext';

// Main App component for the Dashboard
const Dashboard = () => {
    // SECURITY: Use AuthContext instead of local state
    const { isAuthenticated } = useAuth();
    
    // State to manage the current "page" being displayed
    const [currentPage, setCurrentPage] = useState('dashboard');

    // State for the Leads/Messages section date picker (mockup)
    const [selectedDateRange, setSelectedDateRange] = useState('Filter by date range');
    const [showCalendar, setShowCalendar] = useState(false);

    // State for Visual Look tabs
    const [visualLookTab, setVisualLookTab] = useState('general');

    // States for Visual Look settings
    const [aiAgentDisplayName, setAiAgentDisplayName] = useState('Consltr Bot');
    // For simplicity, avatar upload is not fully functional, but the input is there.
    const [isAiAgentOpened, setIsAiAgentOpened] = useState(false);
    const [aiAgentColorMode, setAiAgentColorMode] = useState('Light Mode');
    const [aiAgentChatColor, setAiAgentChatColor] = useState('#3b82f6'); // Default blue for chat bubbles

    // State for Settings tabs
    const [settingsTab, setSettingsTab] = useState('general');

    // States for Settings - General
    const [aiAgentName, setAiAgentName] = useState('Consltr Bot');
    const [aiAgentId] = useState('hzco4u3c7vi3be1vmw47');
    const [vibeResponse, setVibeResponse] = useState('friendly');
    const [isCalComBookingEnabled, setIsCalComBookingEnabled] = useState(false);
    const [promptText, setPromptText] = useState("Adaptive AI Agent roles: Transform your bot into an assistant or seller\n\nAll the responses should be understood by general people. Respond with simple answers that have a maximum 3-4 sentences and could be understood by general people. If you don't know something or if it is not clearly specified in the docs respond with 'Unfortunately, we cannot help now with this information, a human agent will get back to you.'");
    const [selectedModel, setSelectedModel] = useState('GPT-3.5');

    // States for Settings - Leads
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);
    const [isNameEnabled, setIsNameEnabled] = useState(false);
    const [isPhoneEnabled, setIsPhoneEnabled] = useState(false);

    // States for Settings - Discover
    const [username, setUsername] = useState('');
    const [aiAgentTitle, setAiAgentTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    // For simplicity, AI Agent Cover upload is not fully functional, but the input is there.
    const [socialX, setSocialX] = useState('');
    const [socialLinkedIn, setSocialLinkedIn] = useState('');
    const [socialFacebook, setSocialFacebook] = useState('');

    // State for Settings - Danger Zone
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // State for current plan (for Free Demo section)
    const [currentPlan] = useState('Free Demo'); // Can be 'Free Demo', 'Pro', 'Business', 'Enterprise'


    // Function to handle successful authentication
    // const handleAuthSuccess = () => {
    //     setIsLoggedIn(true);
    //     setCurrentPage('dashboard'); // Navigate to dashboard after successful login/register
    // };

    // Function to render content based on current page
    const renderPageContent = () => {
        // if (!isLoggedIn) {
        //     return <AuthPage onAuthSuccess={handleAuthSuccess} />;
        // }

        switch (currentPage) {
            case 'dashboard':
                return (
                    <>
                        {/* Upgrade to PRO banner */}
                        <Card className="bg-blue-50 border border-blue-200 text-blue-800 flex flex-col sm:flex-row items-center justify-between mb-8 text-center sm:text-left">
                            <div>
                                <p className="font-semibold text-lg mb-1">Get the PRO Plan to unlock all features.</p>
                                <p className="text-sm">Activate a subscription for more training sources, lead generation capabilities and more.</p>
                            </div>
                            <button onClick={() => setCurrentPage('pricingPlans')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-300 mt-4 sm:mt-0">
                                Upgrade to PRO - $19
                            </button>
                        </Card>

                        {/* Statistics Cards */}
                        <Card className="mb-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center text-gray-700 font-semibold text-lg mb-2">
                                        Total AI Agents
                                        <i className="fas fa-info-circle text-gray-400 ml-2 cursor-pointer text-sm"></i>
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900">0/1</p>
                                    <p className="text-gray-500 text-sm">Number of AI Agents created</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center text-gray-700 font-semibold text-lg mb-2">
                                        Total Messages
                                        <i className="fas fa-info-circle text-gray-400 ml-2 cursor-pointer text-sm"></i>
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900">0/40</p>
                                    <p className="text-gray-500 text-sm">Consumed messages this month</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center text-gray-700 font-semibold text-lg mb-2">
                                        Total Leads
                                        <i className="fas fa-info-circle text-gray-400 ml-2 cursor-pointer text-sm"></i>
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900">0</p>
                                    <p className="text-gray-500 text-sm">Number of leads captured</p>
                                </div>
                            </div>
                        </Card>

                        {/* Build your AI Agents Section */}
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Build your AI Agents</h2>
                        <p className="text-gray-600 mb-8">Craft customized AI Agents for your business and customer support.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {/* Create AI Agent Card */}
                            <button onClick={() => setCurrentPage('createAgentUpload')} className="card flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors cursor-pointer" style={{ minHeight: '200px' }}>
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                    <i className="fas fa-plus text-3xl text-purple-600"></i>
                                </div>
                                <span className="text-lg font-semibold text-gray-800">Create AI Agent</span>
                            </button>

                            {/* Placeholder AI Agent Cards */}
                            <Card className="flex items-center justify-center p-6 bg-gray-100 border-2 border-dashed border-gray-200" style={{ minHeight: '200px' }}>
                                <i className="fas fa-image text-5xl text-gray-300"></i>
                            </Card>
                            <Card className="flex items-center justify-center p-6 bg-gray-100 border-2 border-dashed border-gray-200" style={{ minHeight: '200px' }}>
                                <i className="fas fa-image text-5xl text-gray-300"></i>
                            </Card>
                        </div>

                        {/* Get started with Consltr AI Agent Section */}
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get started with Consltr AI Agent</h2>
                        <p className="text-gray-600 mb-8">Explore our comprehensive tutorials to kickstart your journey with Consltr AI Agent.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Beginner's Guide Card */}
                            <Card className="p-6 flex flex-col items-center text-center">
                                <i className="fas fa-book-open text-5xl text-purple-600 mb-4"></i>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Beginner's Guide</h3>
                                <p className="text-gray-600 text-sm">
                                    Craft your website pages automatically. Train the bot with specific texts that. Train the bot with specific texts that.
                                </p>
                            </Card>

                            {/* FAQ Section Card */}
                            <Card className="p-6 flex flex-col items-center text-center">
                                <i className="fas fa-question-circle text-5xl text-blue-600 mb-4"></i>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">FAQ Section</h3>
                                <p className="text-gray-600 text-sm">
                                    Attach files to train your bot. Supported formats: .pdf, .docx, .csv or .txt. Train the bot with specific texts.
                                </p>
                            </Card>

                            {/* Documentation Card */}
                            <Card className="p-6 flex flex-col items-center text-center">
                                <i className="fas fa-file-alt text-5xl text-green-600 mb-4"></i>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Documentation</h3>
                                <p className="text-gray-600 text-sm">
                                    Train the bot with specific texts that cannot be found on any public area of your website or docs.
                                </p>
                            </Card>
                        </div>
                    </>
                );
            case 'overview': // New 'Overview' page
                return (
                    <>
                        <div className="text-sm text-gray-500 mb-6">
                            <button onClick={() => setCurrentPage('dashboard')} className="hover:underline text-blue-600">Agents</button> / <span className="font-semibold">Overview</span>
                        </div>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Amazing AI Agent Overview</h1>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {/* Agent Info Card */}
                            <Card className="lg:col-span-1">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Agent Details</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="agent-name">
                                        Agent Name
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="agent-name" type="text" defaultValue="My Amazing AI Agent" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="agent-status">
                                        Status
                                    </label>
                                    <select id="agent-status" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option>Active</option>
                                        <option>Paused</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <p className="text-gray-700 text-sm font-bold mb-2">Total Interactions</p>
                                    <p className="text-2xl font-bold text-gray-800">1,245</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-gray-700 text-sm font-bold mb-2">Leads Generated</p>
                                    <p className="text-2xl font-bold text-gray-800">87</p>
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition-colors duration-300">
                                    Save Changes
                                </button>
                            </Card>

                            {/* Training Data Card - moved from old View AI Agent */}
                            <Card className="lg:col-span-2">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Training Data (Overview)</h2>
                                <p className="text-gray-600 mb-4">Manage the sources your AI agent uses for information.</p>
                                
                                <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-800">Website URL: consltr.com/docs</span>
                                        <div className="flex space-x-2">
                                            <button className="text-blue-500 hover:text-blue-700 text-sm"><i className="fas fa-edit"></i> Edit</button>
                                            <button className="text-red-500 hover:text-red-700 text-sm"><i className="fas fa-trash-alt"></i> Delete</button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">Last Synced: 2025-07-01 10:30 AM</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-800">Document: Product_Manual_v2.pdf</span>
                                        <div className="flex space-x-2">
                                            <button className="text-blue-500 hover:text-blue-700 text-sm"><i className="fas fa-edit"></i> Edit</button>
                                            <button className="text-red-500 hover:text-red-700 text-sm"><i className="fas fa-trash-alt"></i> Delete</button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">Uploaded: 2025-06-15</p>
                                </div>

                                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                                    <i className="fas fa-plus mr-2"></i> Add New Source
                                </button>
                            </Card>
                        </div>

                        {/* Chat Widget Settings Card - moved from old View AI Agent */}
                        <Card className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Chat Widget Settings (Overview)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="welcome-message">
                                        Welcome Message
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="welcome-message" type="text" defaultValue="Hello! How can I help you today?" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="widget-color">
                                        Widget Color
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="widget-color" type="color" defaultValue="#6d28d9" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="widget-code">
                                    Embed Code
                                </label>
                                <textarea id="widget-code" rows={5} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" readOnly defaultValue={`<!-- Your Consltr Widget Code Here -->\n<script src="https://consltr.com/widget.js" data-agent-id="your_agent_id"></script>`}>
                                </textarea>
                                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-3 transition-colors duration-300">
                                    <i className="fas fa-copy mr-2"></i> Copy Code
                                </button>
                            </div>
                        </Card>

                        <div className="flex justify-end space-x-4">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                                <i className="fas fa-trash-alt mr-2"></i> Delete Agent
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                                <i className="fas fa-save mr-2"></i> Update All Settings
                            </button>
                        </div>
                    </>
                );
            case 'viewAgent': // New content for 'View AI Agent' from mockup
                return (
                    <>
                        <div className="text-sm text-gray-500 mb-6">
                            <button onClick={() => setCurrentPage('dashboard')} className="hover:underline text-blue-600">Agents</button> / <span className="font-semibold">View AI Agent</span>
                        </div>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Test Your AI Agent</h1>
                        <p className="text-gray-600 mb-8">Experience the appearance and functionality of your AI Agent by testing it with various questions.</p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Test Your AI Agent Chat Preview */}
                            <Card className="flex flex-col h-[500px] border border-gray-200">
                                <div className="flex items-center p-4 border-b border-gray-200">
                                    <img src="https://placehold.co/32x32/f3f4f6/a1a1aa?text=C" alt="Consltr Bot" className="h-8 w-8 rounded-full mr-3" />
                                    <span className="font-semibold text-gray-800">Consltr Bot</span>
                                    <i className="fas fa-chevron-down text-gray-400 ml-auto cursor-pointer"></i>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-700">
                                    {/* Example Messages */}
                                    <div className="flex items-start mb-4">
                                        <img src="https://placehold.co/24x24/f3f4f6/a1a1aa?text=C" alt="Consltr Bot" className="h-6 w-6 rounded-full mr-2" />
                                        <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                                            Hello! How can I help you today?
                                            <div className="text-xs text-gray-500 mt-1">7/13/2025, 12:33 PM</div>
                                        </div>
                                    </div>
                                    {/* User Input Area */}
                                </div>
                                <div className="p-4 border-t border-gray-200 flex items-center">
                                    <input type="text" placeholder="Ask me anything..." className="flex-1 border border-gray-300 rounded-full py-2 px-4 mr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                                    <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300">
                                        <i className="fas fa-arrow-up"></i>
                                    </button>
                                </div>
                                <div className="text-center text-xs text-gray-400 mt-2">
                                    Powered by Consltr
                                </div>
                            </Card>

                            {/* Training Sources and Script for Your Website */}
                            <div className="flex flex-col space-y-6">
                                <Card>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Training Sources</h2>
                                    <p className="text-gray-600 mb-4">Add training sources to improve the AI Agent's performance.</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-gray-900">10/<span className="text-gray-500">5</span></p>
                                                <p className="text-gray-500 text-xs">Links</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-gray-900">0/<span className="text-gray-500">20</span></p>
                                                <p className="text-gray-500 text-xs">Files</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-gray-900">7.9K/<span className="text-gray-500">100K</span></p>
                                                <p className="text-gray-500 text-xs">Characters</p>
                                            </div>
                                        </div>
                                        <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-300">
                                            Manage Training Sources
                                        </button>
                                    </div>
                                </Card>

                                <Card>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Script for Your Website</h2>
                                    <p className="text-gray-600 mb-4">Use this script to add the AI Agent to your website. Insert it between &lt;head&gt; and &lt;/head&gt; tags.</p>
                                    <div className="bg-gray-100 p-4 rounded-md font-mono text-sm text-gray-800 overflow-x-auto mb-4">
                                        &lt;script src="https://consltr.com/widget.js"&gt;&lt;/script&gt;<br/>
                                        &lt;script&gt;<br/>
                                        &nbsp;&nbsp;chat-hash="hzco4u3c7vi3be1vmw47"<br/>
                                        &lt;/script&gt;
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4 flex items-center">
                                        <i className="fas fa-info-circle mr-2"></i> Your script will not change if you add more Training Sources.
                                    </p>
                                    <div className="flex space-x-3">
                                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex items-center transition-colors duration-300">
                                            <i className="fas fa-copy mr-2"></i> Copy Script
                                        </button>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center transition-colors duration-300">
                                            <i className="fas fa-paper-plane mr-2"></i> Send to Developer
                                        </button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </>
                );
            case 'messages':
                return (
                    <>
                        {/* Breadcrumbs */}
                        <div className="text-sm text-gray-500 mb-6">
                            <button onClick={() => setCurrentPage('dashboard')} className="hover:underline text-blue-600">Agents</button> / <span className="font-semibold">Messages</span>
                        </div>

                        {/* Messages History Section */}
                        <Card className="mb-8">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Messages History</h1>
                            <p className="text-gray-600 mb-6">Check all the messages between your AI Agent and your users.</p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                                <div className="relative w-full sm:w-auto">
                                    <div className="flex items-center border border-gray-300 rounded-md p-2 cursor-pointer bg-white" onClick={() => setShowCalendar(!showCalendar)}>
                                        <input
                                            type="text"
                                            readOnly
                                            value={selectedDateRange}
                                            className="flex-1 outline-none cursor-pointer bg-transparent text-gray-700"
                                        />
                                        <i className="fas fa-calendar-alt text-gray-500 ml-2"></i>
                                    </div>
                                    {showCalendar && (
                                        <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-4 w-64 md:w-80">
                                            {/* Simplified Calendar Grid - similar to Leads section */}
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('Today'); setShowCalendar(false); }}>Today</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('Yesterday'); setShowCalendar(false); }}>Yesterday</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('This Week'); setShowCalendar(false); }}>This Week</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('Last Week'); setShowCalendar(false); }}>Last Week</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('This Month'); setShowCalendar(false); }}>This Month</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('Last Month'); setShowCalendar(false); }}>Last Month</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('8 days up to today'); setShowCalendar(false); }}>8 days up to today</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('X days starting today'); setShowCalendar(false); }}>X days starting today</button>
                                            </div>
                                            <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
                                                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                                            </div>
                                            <div className="grid grid-cols-7 text-center text-gray-700 gap-1">
                                                <span></span><span></span><span></span><span></span><span></span><span className="p-1 rounded-md hover:bg-gray-100">1</span><span className="p-1 rounded-md hover:bg-gray-100">2</span>
                                                <span className="p-1 rounded-md hover:bg-gray-100">3</span><span className="p-1 rounded-md hover:bg-gray-100">4</span><span className="p-1 rounded-md hover:bg-gray-100">5</span><span className="p-1 rounded-md hover:bg-gray-100 bg-blue-500 text-white">6</span><span className="p-1 rounded-md hover:bg-gray-100">7</span><span className="p-1 rounded-md hover:bg-gray-100">8</span><span className="p-1 rounded-md hover:bg-gray-100">9</span>
                                                <span className="p-1 rounded-md hover:bg-gray-100">10</span><span className="p-1 rounded-md hover:bg-gray-100 bg-blue-500 text-white">11</span><span className="p-1 rounded-md hover:bg-gray-100">12</span><span className="p-1 rounded-md hover:bg-gray-100">13</span><span className="p-1 rounded-md hover:bg-gray-100">14</span><span className="p-1 rounded-md hover:bg-gray-100">15</span><span className="p-1 rounded-md hover:bg-gray-100">16</span>
                                                <span className="p-1 rounded-md hover:bg-gray-100">17</span><span className="p-1 rounded-md hover:bg-gray-100">18</span><span className="p-1 rounded-md hover:bg-gray-100">19</span><span className="p-1 rounded-md hover:bg-gray-100">20</span><span className="p-1 rounded-md hover:bg-gray-100">21</span><span className="p-1 rounded-md hover:bg-gray-100">22</span><span className="p-1 rounded-md hover:bg-gray-100">23</span>
                                                <span className="p-1 rounded-md hover:bg-gray-100">24</span><span className="p-1 rounded-md hover:bg-gray-100">25</span><span className="p-1 rounded-md hover:bg-gray-100">26</span><span className="p-1 rounded-md hover:bg-gray-100">27</span><span className="p-1 rounded-md hover:bg-gray-100">28</span><span className="p-1 rounded-md hover:bg-gray-100">29</span><span className="p-1 rounded-md hover:bg-gray-100">30</span>
                                                <span className="p-1 rounded-md hover:bg-gray-100">31</span><span></span><span></span><span></span><span></span><span></span><span></span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md flex items-center transition-colors duration-300">
                                    <i className="fas fa-download mr-2"></i> Export
                                </button>
                            </div>

                            <p className="text-gray-500 text-center mb-6">
                                No conversations found for the specific range from 2025-07-08 to 2025-07-13. Start a new conversation with your AI Agent.
                            </p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                                START CONVERSATION
                            </button>
                        </Card>
                    </>
                );
            case 'analytics':
                return (
                    <>
                        {/* Breadcrumbs */}
                        <div className="text-sm text-gray-500 mb-6">
                            <button onClick={() => setCurrentPage('dashboard')} className="hover:underline text-blue-600">Agents</button> / <span className="font-semibold">Analytics</span>
                        </div>

                        {/* Analytics Section */}
                        <Card className="mb-8">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h1>
                            <p className="text-gray-600 mb-6">Here you can check the stats about your AI Agent.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center text-gray-700 font-semibold text-lg mb-2">
                                        Threads
                                        <i className="fas fa-info-circle text-gray-400 ml-2 cursor-pointer text-sm"></i>
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900">0</p>
                                    <p className="text-gray-500 text-sm">The number of threads that were started by your users.</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center text-gray-700 font-semibold text-lg mb-2">
                                        Messages
                                        <i className="fas fa-info-circle text-gray-400 ml-2 cursor-pointer text-sm"></i>
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900">0</p>
                                    <p className="text-gray-500 text-sm">Number of messages between your users and the AI Agent.</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center text-gray-700 font-semibold text-lg mb-2">
                                        Leads
                                        <i className="fas fa-info-circle text-gray-400 ml-2 cursor-pointer text-sm"></i>
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900">0</p>
                                    <p className="text-gray-500 text-sm">Users that wanted more details from your team and sent their contact details.</p>
                                </div>
                            </div>
                        </Card>

                        {/* Training Data Section */}
                        <Card>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Training Data</h2>
                            <p className="text-gray-600 text-sm mb-6">Here you can check the sources that your AI Agent is trained on.</p>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-900">10/<span className="text-gray-500">5</span></p>
                                        <p className="text-gray-500 text-xs">Links</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-900">0/<span className="text-gray-500">20</span></p>
                                        <p className="text-gray-500 text-xs">Files</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-900">7.9K/<span className="text-gray-500">100K</span></p>
                                        <p className="text-gray-500 text-xs">Characters</p>
                                    </div>
                                </div>
                                <button onClick={() => setCurrentPage('pricingPlans')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-300">
                                    UPGRADE
                                </button>
                            </div>
                        </Card>
                    </>
                );
            case 'leads':
                return (
                    <>
                        {/* Breadcrumbs */}
                        <div className="text-sm text-gray-500 mb-6">
                            <button onClick={() => setCurrentPage('dashboard')} className="hover:underline text-blue-600">Agents</button> / <span className="font-semibold">Leads</span>
                        </div>

                        {/* Leads Section */}
                        <Card className="mb-8">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Leads</h1>
                            <p className="text-gray-600 mb-6">Here are the details about the possible leads generated by your AI Agent.</p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                                <div className="relative w-full sm:w-auto">
                                    <div className="flex items-center border border-gray-300 rounded-md p-2 cursor-pointer bg-white" onClick={() => setShowCalendar(!showCalendar)}>
                                        <input
                                            type="text"
                                            readOnly
                                            value={selectedDateRange}
                                            className="flex-1 outline-none cursor-pointer bg-transparent text-gray-700"
                                        />
                                        <i className="fas fa-calendar-alt text-gray-500 ml-2"></i>
                                    </div>
                                    {showCalendar && (
                                        <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-4 w-64 md:w-80">
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('Today'); setShowCalendar(false); }}>Today</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('Yesterday'); setShowCalendar(false); }}>Yesterday</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('This Week'); setShowCalendar(false); }}>This Week</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('Last Week'); setShowCalendar(false); }}>Last Week</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('This Month'); setShowCalendar(false); }}>This Month</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('Last Month'); setShowCalendar(false); }}>Last Month</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('8 days up to today'); setShowCalendar(false); }}>8 days up to today</button>
                                                <button className="text-left py-2 px-3 rounded-md hover:bg-gray-100" onClick={() => { setSelectedDateRange('X days starting today'); setShowCalendar(false); }}>X days starting today</button>
                                            </div>
                                            {/* Simplified Calendar Grid */}
                                            <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
                                                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                                            </div>
                                            <div className="grid grid-cols-7 text-center text-gray-700 gap-1">
                                                {/* Example days, would be dynamically generated */}
                                                <span></span><span></span><span></span><span></span><span></span><span className="p-1 rounded-md hover:bg-gray-100">1</span><span className="p-1 rounded-md hover:bg-gray-100">2</span>
                                                <span className="p-1 rounded-md hover:bg-gray-100">3</span><span className="p-1 rounded-md hover:bg-gray-100">4</span><span className="p-1 rounded-md hover:bg-gray-100">5</span><span className="p-1 rounded-md hover:bg-gray-100 bg-blue-500 text-white">6</span><span className="p-1 rounded-md hover:bg-gray-100">7</span><span className="p-1 rounded-md hover:bg-gray-100">8</span><span className="p-1 rounded-md hover:bg-gray-100">9</span>
                                                <span className="p-1 rounded-md hover:bg-gray-100">10</span><span className="p-1 rounded-md hover:bg-gray-100 bg-blue-500 text-white">11</span><span className="p-1 rounded-md hover:bg-gray-100">12</span><span className="p-1 rounded-md hover:bg-gray-100">13</span><span className="p-1 rounded-md hover:bg-gray-100">14</span><span className="p-1 rounded-md hover:bg-gray-100">15</span><span className="p-1 rounded-md hover:bg-gray-100">16</span>
                                                <span className="p-1 rounded-md hover:bg-gray-100">17</span><span className="p-1 rounded-md hover:bg-gray-100">18</span><span className="p-1 rounded-md hover:bg-gray-100">19</span><span className="p-1 rounded-md hover:bg-gray-100">20</span><span className="p-1 rounded-md hover:bg-gray-100">21</span><span className="p-1 rounded-md hover:bg-gray-100">22</span><span className="p-1 rounded-md hover:bg-gray-100">23</span>
                                                <span className="p-1 rounded-md hover:bg-gray-100">24</span><span className="p-1 rounded-md hover:bg-gray-100">25</span><span className="p-1 rounded-md hover:bg-gray-100">26</span><span className="p-1 rounded-md hover:bg-gray-100">27</span><span className="p-1 rounded-md hover:bg-gray-100">28</span><span className="p-1 rounded-md hover:bg-gray-100">29</span><span className="p-1 rounded-md hover:bg-gray-100">30</span>
                                                <span className="p-1 rounded-md hover:bg-gray-100">31</span><span></span><span></span><span></span><span></span><span></span><span></span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md flex items-center transition-colors duration-300">
                                    <i className="fas fa-download mr-2"></i> Export
                                </button>
                            </div>

                            <div className="text-center text-gray-500 py-10 border border-gray-200 rounded-md">
                                There are no records to display
                            </div>
                        </Card>
                    </>
                );
            case 'trainingSources': // New Training Sources page
                return (
                    <>
                        {/* Breadcrumbs */}
                        <div className="text-sm text-gray-500 mb-6">
                            <button onClick={() => setCurrentPage('dashboard')} className="hover:underline text-blue-600">Agents</button> / <span className="font-semibold">Training sources</span>
                        </div>

                        {/* Upgrade to PRO banner (replicated from mockup) */}
                        <Card className="bg-blue-50 border border-blue-200 text-blue-800 flex flex-col sm:flex-row items-center justify-between mb-8 text-center sm:text-left">
                            <div>
                                <p className="font-semibold text-lg mb-1">Get the PRO Plan to unlock all features.</p>
                                <p className="text-sm">Activate a subscription for more training sources, lead generation capabilities and more.</p>
                            </div>
                            <button onClick={() => setCurrentPage('pricingPlans')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-300 mt-4 sm:mt-0">
                                Upgrade to PRO - $19
                            </button>
                        </Card>

                        {/* Training Sources Section */}
                        <Card className="mb-8">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Training Sources</h1>
                            <p className="text-gray-600 mb-6">Here you can check the sources that your AI Agent is trained on.</p>

                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-8">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-gray-900">10/<span className="text-gray-500 text-xl">5</span></p>
                                        <p className="text-gray-500 text-sm">Links</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-gray-900">0/<span className="text-gray-500 text-xl">20</span></p>
                                        <p className="text-gray-500 text-xs">Files</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-gray-900">7.9K/<span className="text-gray-500 text-xl">100K</span></p>
                                        <p className="text-gray-500 text-xs">Characters</p>
                                    </div>
                                </div>
                                <button onClick={() => setCurrentPage('pricingPlans')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-300">
                                    UPGRADE
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Website Links Card */}
                                <Card className="flex flex-col items-center text-center p-6 border border-gray-200">
                                    <i className="fas fa-globe text-5xl text-purple-600 mb-4"></i>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Website Links</h3>
                                    <p className="text-gray-600 text-sm">
                                        Crawl your website pages automatically to train your AI Agent with comprehensive knowledge.
                                    </p>
                                </Card>
                                {/* Files Card */}
                                <Card className="flex flex-col items-center text-center p-6 border border-gray-200">
                                    <i className="fas fa-file-alt text-5xl text-blue-600 mb-4"></i>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Files</h3>
                                    <p className="text-gray-600 text-sm">
                                        Attach files to train your bot. Supported formats: .pdf, .doc, .docx, .csv.
                                    </p>
                                </Card>
                                {/* Text Card */}
                                <Card className="flex flex-col items-center text-center p-6 border border-gray-200">
                                    <i className="fas fa-pencil-alt text-5xl text-green-600 mb-4"></i>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Text</h3>
                                    <p className="text-gray-600 text-sm">
                                        Train the bot with specific texts that cannot be found on any public area of your website or docs.
                                    </p>
                                </Card>
                                {/* Notion Docs Card */}
                                <Card className="flex flex-col items-center text-center p-6 border border-gray-200">
                                    <i className="fas fa-book text-5xl text-red-600 mb-4"></i>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Notion Docs <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2">NEW</span></h3>
                                    <p className="text-gray-600 text-sm">
                                        Connect your documentation from Notion and feed the bot with new information.
                                    </p>
                                </Card>
                            </div>
                        </Card>
                    </>
                );
            case 'visualLook': // New Visual Look page
                return (
                    <>
                        {/* Breadcrumbs */}
                        <div className="text-sm text-gray-500 mb-6">
                            <button onClick={() => setCurrentPage('dashboard')} className="hover:underline text-blue-600">Agents</button> / <span className="font-semibold">Visual Look</span>
                        </div>

                        {/* Upgrade to PRO banner (replicated from mockup) */}
                        <Card className="bg-blue-50 border border-blue-200 text-blue-800 flex flex-col sm:flex-row items-center justify-between mb-8 text-center sm:text-left">
                            <div>
                                <p className="font-semibold text-lg mb-1">Get the PRO Plan to unlock all features.</p>
                                <p className="text-sm">Activate a subscription for more training sources, lead generation capabilities and more.</p>
                            </div>
                            <button onClick={() => setCurrentPage('pricingPlans')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-300 mt-4 sm:mt-0">
                                Upgrade to PRO - $19
                            </button>
                        </Card>

                        {/* Visual Look Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <Card className="mb-6">
                                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Visual Look</h1>
                                    <p className="text-gray-600 mb-6">Customize the appearance and design of your AI Agent.</p>

                                    {/* Tabs for Visual Look */}
                                    <div className="flex flex-wrap border-b border-gray-200 mb-6">
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${visualLookTab === 'general' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                                            onClick={() => setVisualLookTab('general')}
                                        >
                                            <i className="fas fa-cog mr-2"></i> General
                                        </button>
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${visualLookTab === 'input' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                                            onClick={() => setVisualLookTab('input')}
                                        >
                                            <i className="fas fa-keyboard mr-2"></i> Input
                                        </button>
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${visualLookTab === 'actionButtons' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                                            onClick={() => setVisualLookTab('actionButtons')}
                                        >
                                            <i className="fas fa-mouse-pointer mr-2"></i> Action Buttons
                                        </button>
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${visualLookTab === 'messages' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                                            onClick={() => setVisualLookTab('messages')}
                                        >
                                            <i className="fas fa-comments mr-2"></i> Messages
                                        </button>
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${visualLookTab === 'humanForm' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                                            onClick={() => setVisualLookTab('humanForm')}
                                        >
                                            <i className="fas fa-user-friends mr-2"></i> Human Form
                                        </button>
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${visualLookTab === 'leadsForm' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                                            onClick={() => setVisualLookTab('leadsForm')}
                                        >
                                            <i className="fas fa-file-invoice-dollar mr-2"></i> Leads Form
                                        </button>
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${visualLookTab === 'customBrand' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                                            onClick={() => setVisualLookTab('customBrand')}
                                        >
                                            <i className="fas fa-paint-roller mr-2"></i> Custom Brand
                                        </button>
                                    </div>

                                    {/* Tab Content */}
                                    {visualLookTab === 'general' && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ai-agent-display-name">
                                                    AI Agent Display Name
                                                </label>
                                                <p className="text-gray-500 text-xs mb-2">This name is seen by those who interact with your chat (e.g. customers)</p>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="ai-agent-display-name"
                                                    type="text"
                                                    value={aiAgentDisplayName}
                                                    onChange={(e) => setAiAgentDisplayName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ai-agent-profile-avatar">
                                                    AI Agent Profile Avatar
                                                </label>
                                                <p className="text-gray-500 text-xs mb-2">Personalize your AI Agent with a custom profile picture (formats: .jpg, .png)</p>
                                                <div className="flex items-center space-x-4">
                                                    <input type="file" id="ai-agent-profile-avatar" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
                                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-300">
                                                        Upload Photo
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ai-agent-opened">
                                                    AI Agent Opened
                                                </label>
                                                <p className="text-gray-500 text-xs mb-2">When you turn on this feature, the AI Agent will open directly on your website.</p>
                                                <label htmlFor="ai-agent-opened" className="flex items-center cursor-pointer">
                                                    <div className="relative">
                                                        <input
                                                            type="checkbox"
                                                            id="ai-agent-opened"
                                                            className="sr-only"
                                                            checked={isAiAgentOpened}
                                                            onChange={() => setIsAiAgentOpened(!isAiAgentOpened)}
                                                        />
                                                        <div className={`block w-14 h-8 rounded-full ${isAiAgentOpened ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                                                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isAiAgentOpened ? 'translate-x-full' : ''}`}></div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    AI Agent Colors
                                                </label>
                                                <p className="text-gray-500 text-xs mb-2">Choose the message background color.</p>
                                                <select
                                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                                                    value={aiAgentColorMode}
                                                    onChange={(e) => setAiAgentColorMode(e.target.value)}
                                                >
                                                    <option>Light Mode</option>
                                                    <option>Dark Mode</option>
                                                </select>
                                                <input
                                                    type="color"
                                                    value={aiAgentChatColor}
                                                    onChange={(e) => setAiAgentChatColor(e.target.value)}
                                                    className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {visualLookTab === 'input' && (
                                        <div className="text-center text-gray-600 py-10">
                                            Input settings will go here.
                                        </div>
                                    )}
                                    {visualLookTab === 'actionButtons' && (
                                        <div className="text-center text-gray-600 py-10">
                                            Action Buttons settings will go here.
                                        </div>
                                    )}
                                    {visualLookTab === 'messages' && (
                                        <div className="text-center text-gray-600 py-10">
                                            Messages display settings will go here.
                                        </div>
                                    )}
                                    {visualLookTab === 'humanForm' && (
                                        <div className="text-center text-gray-600 py-10">
                                            Human Form settings will go here.
                                        </div>
                                    )}
                                    {visualLookTab === 'leadsForm' && (
                                        <div className="text-center text-gray-600 py-10">
                                            Leads Form settings will go here.
                                        </div>
                                    )}
                                    {visualLookTab === 'customBrand' && (
                                        <div className="text-center text-gray-600 py-10">
                                            Custom Brand settings will go here.
                                        </div>
                                    )}
                                </Card>
                            </div>

                            {/* Live Preview Section */}
                            <div className="lg:col-span-1">
                                <Card className="flex flex-col h-[600px] border border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Preview</h2>
                                    <div className="flex-1 flex flex-col justify-between p-4 bg-gray-50 rounded-md">
                                        {/* Chat Header */}
                                        <div className="flex items-center p-3 bg-white rounded-t-lg shadow-sm mb-4">
                                            <img src="https://placehold.co/32x32/f3f4f6/a1a1aa?text=C" alt="Consltr Bot" className="h-8 w-8 rounded-full mr-3" />
                                            <span className="font-semibold text-gray-800">{aiAgentDisplayName}</span>
                                            <i className="fas fa-chevron-down text-gray-400 ml-auto cursor-pointer"></i>
                                        </div>
                                        {/* Chat Messages Area */}
                                        <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-700 space-y-4">
                                            <div className="flex items-start">
                                                <img src="https://placehold.co/24x24/f3f4f6/a1a1aa?text=C" alt="Consltr Bot" className="h-6 w-6 rounded-full mr-2" />
                                                <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                                                    How can we help you today?
                                                    <div className="text-xs text-gray-500 mt-1">2/8/2024, 5:00:00 PM</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <div className="text-white p-3 rounded-lg max-w-[80%]" style={{ backgroundColor: aiAgentChatColor }}>
                                                    Description about analytics.
                                                    <div className="text-xs text-white mt-1">2/8/2024, 6:01:00 PM</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <img src="https://placehold.co/24x24/f3f4f6/a1a1aa?text=C" alt="Consltr Bot" className="h-6 w-6 rounded-full mr-2" />
                                                <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                                                    Is there anything else I can help you with?
                                                    <div className="text-xs text-gray-500 mt-1">2/8/2024, 6:02:00 PM</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <div className="text-white p-3 rounded-lg max-w-[80%]" style={{ backgroundColor: aiAgentChatColor }}>
                                                    Description about social media.
                                                    <div className="text-xs text-white mt-1">2/8/2024, 6:03:00 PM</div>
                                                </div>
                                            </div>
                                            {/* Human Help and Finish Conversation buttons */}
                                            <div className="flex justify-center space-x-2 mt-4">
                                                <button className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-300">Human Help</button>
                                                <button className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-300">Finish Conversation</button>
                                            </div>
                                        </div>
                                        {/* Chat Input */}
                                        <div className="p-4 border-t border-gray-200 flex items-center bg-white rounded-b-lg shadow-sm">
                                            <input type="text" placeholder="Ask me anything..." className="flex-1 border border-gray-300 rounded-full py-2 px-4 mr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                                            <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300">
                                                <i className="fas fa-arrow-up"></i>
                                            </button>
                                        </div>
                                        <div className="text-center text-xs text-gray-400 mt-2">
                                            Powered by Consltr
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </>
                );
            case 'settings':
                return (
                    <Settings
                      aiAgentId={aiAgentId}
                      aiAgentName={aiAgentName}
                      aiAgentTitle={aiAgentTitle}
                      description={description}
                      isCalComBookingEnabled={isCalComBookingEnabled}
                      isEmailEnabled={isEmailEnabled}
                      isNameEnabled={isNameEnabled}
                      isPhoneEnabled={isPhoneEnabled}
                      isPublic={isPublic}
                      promptText={promptText}
                      selectedModel={selectedModel}
                      setAiAgentName={setAiAgentName}
                      setAiAgentTitle={setAiAgentTitle}
                      setCurrentPage={setCurrentPage}
                      setDescription={setDescription}
                      setIsCalComBookingEnabled={setIsCalComBookingEnabled}
                      setIsEmailEnabled={setIsEmailEnabled}
                      setIsNameEnabled={setIsNameEnabled}
                      setIsPhoneEnabled={setIsPhoneEnabled}
                      setIsPublic={setIsPublic}
                      setPromptText={setPromptText}
                      setSelectedModel={setSelectedModel}
                      setSettingsTab={setSettingsTab}
                      setShowDeleteModal={setShowDeleteModal}
                      setSocialFacebook={setSocialFacebook}
                      setSocialLinkedIn={setSocialLinkedIn}
                      setSocialX={setSocialX}
                      settingsTab={settingsTab}
                      setUsername={setUsername}
                      setVibeResponse={setVibeResponse}
                      showDeleteModal={showDeleteModal}
                      socialFacebook={socialFacebook}
                      socialLinkedIn={socialLinkedIn}
                      socialX={socialX}
                      username={username}
                      vibeResponse={vibeResponse}
                    />
                );
            case 'pricingPlans':
                return (
                    <>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">Select the Ideal Plan</h1>
                            <p className="text-gray-600 text-lg">Pick the plan that best fits your business needs. You can start with a free plan and upgrade to premium as you grow.</p>
                        </div>

                        <div className="flex justify-center mb-10">
                            <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <button className="px-6 py-3 font-medium text-gray-800 bg-purple-100 rounded-l-lg">Monthly</button>
                                <button className="px-6 py-3 font-medium text-gray-600 hover:bg-gray-50">Yearly (save 20%)</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {/* Pro Plan Card */}
                            <Card className="price-card p-6 relative">
                                <div className="absolute top-0 right-0 p-3">
                                    <i className="fas fa-star text-yellow-500 text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Pro</h2>
                                <p className="text-4xl font-extrabold text-gray-900 mb-2">$19</p>
                                <p className="text-gray-500 mb-6">monthly</p>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">What's included</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 2 AI Agents <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 50 Training Links <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 10,000,000 Chars/AI Agent <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 4,000 Messages <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Up to 100 Lead Generation <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 20 Files Upload <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Cal.com Integration <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center text-gray-500"><i className="fas fa-times-circle text-red-500 mr-2"></i> Remove brand</li>
                                </ul>
                                <button className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md w-full transition-colors duration-300">
                                    Subscribe
                                </button>
                                <button className="mt-4 border border-purple-600 text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-md w-full transition-colors duration-300">
                                    <i className="fas fa-phone-alt mr-2"></i> Book a demo
                                </button>
                            </Card>

                            {/* Business Plan Card (Most Popular) */}
                            <Card className="price-card p-6 relative popular border-purple-500">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                                    Most Popular
                                </div>
                                <div className="absolute top-0 right-0 p-3">
                                    <i className="fas fa-hamburger text-yellow-500 text-xl"></i> {/* Placeholder icon */}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Business</h2>
                                <p className="text-4xl font-extrabold text-gray-900 mb-2">$99</p>
                                <p className="text-gray-500 mb-6">monthly</p>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">What's included</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 10 AI Agents <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 500 Training Links <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 10,000,000 Chars/AI Agent <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 10,000 Messages <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Up to 500 Lead Generation <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 100 Files Upload <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Cal.com Integration <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center text-gray-500"><i className="fas fa-times-circle text-red-500 mr-2"></i> Remove brand</li>
                                </ul>
                                <button className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md w-full transition-colors duration-300">
                                    Subscribe
                                </button>
                                <button className="mt-4 border border-purple-600 text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-md w-full transition-colors duration-300">
                                    <i className="fas fa-phone-alt mr-2"></i> Book a demo
                                </button>
                            </Card>

                            {/* Enterprise Plan Card */}
                            <Card className="price-card p-6 relative">
                                <div className="absolute top-0 right-0 p-3">
                                    <i className="fas fa-building text-yellow-500 text-xl"></i> {/* Placeholder icon */}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Enterprise</h2>
                                <p className="text-4xl font-extrabold text-gray-900 mb-2">$999</p>
                                <p className="text-gray-500 mb-6">monthly</p>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">What's included</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Unlimited AI Agents <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Unlimited Training Links <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 10,000,000 Chars/AI Agent <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 100,000 Messages <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Unlimited Lead Generation <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Unlimited Files Upload <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Multiple Language <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Cal.com Integration <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Remove brand</li>
                                </ul>
                                <button className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md w-full transition-colors duration-300">
                                    Subscribe
                                </button>
                                <button className="mt-4 border border-purple-600 text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-md w-full transition-colors duration-300">
                                    <i className="fas fa-phone-alt mr-2"></i> Book a demo
                                </button>
                            </Card>
                        </div>

                        {/* Free Demo Section */}
                        <Card className="p-6 mb-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Free Demo</h2>
                                    <p className="text-gray-600 mb-4">Test your AI Agent without any commitment. No credit card required. After 7 days of inactivity the chat will be disabled.</p>
                                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-5 rounded-md transition-colors duration-300">
                                        Get Started
                                    </button>
                                    {currentPlan === 'Free Demo' && (
                                        <p className="text-sm text-purple-600 mt-4 font-semibold">Currently Used Plan</p>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">What's included</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 1 AI Agent <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                        <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Up to 5 Lead Generation <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                        <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 5 Training Links <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                        <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 20 Files Upload <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                        <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 100,000 Chars/AI Agent <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                        <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> Remove Brand - Add-on <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                        <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> 40 Messages <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                        <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2"></i> English Language Only <i className="fas fa-info-circle text-gray-400 ml-auto cursor-pointer"></i></li>
                                    </ul>
                                </div>
                            </div>
                        </Card>

                        {/* Add-Ons Section */}
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
                            <i className="fas fa-plus-circle text-purple-600 mr-3"></i> Add-Ons
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <Card className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 flex items-center"><i className="fas fa-comment-dots text-blue-500 mr-2"></i> Extra Messages</h3>
                                    <p className="text-gray-600 text-sm mb-2">Get 1,000 extra messages every month.</p>
                                    <p className="text-2xl font-bold text-gray-900">$9<span className="text-base font-medium text-gray-500">/ month</span></p>
                                </div>
                                <button className="bg-white text-purple-600 border border-purple-600 hover:bg-purple-50 font-bold py-2 px-5 rounded-md transition-colors duration-300">
                                    Add-on
                                </button>
                            </Card>
                            <Card className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 flex items-center"><i className="fas fa-mouse-pointer text-purple-500 mr-2"></i> Extra AI Agent</h3>
                                    <p className="text-gray-600 text-sm mb-2">Get an extra AI Agent.</p>
                                    <p className="text-2xl font-bold text-gray-900">$9<span className="text-base font-medium text-gray-500">/ month</span></p>
                                </div>
                                <button className="bg-white text-purple-600 border border-purple-600 hover:bg-purple-50 font-bold py-2 px-5 rounded-md transition-colors duration-300">
                                    Add-on
                                </button>
                            </Card>
                            <Card className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 flex items-center"><i className="fas fa-rocket text-red-500 mr-2"></i> Remove Brand</h3>
                                    <p className="text-gray-600 text-sm mb-2">Eliminate the Consltr branding from widget.</p>
                                    <p className="text-2xl font-bold text-gray-900">$49<span className="text-base font-medium text-gray-500">/ month</span></p>
                                </div>
                                <button className="bg-white text-purple-600 border border-purple-600 hover:bg-purple-50 font-bold py-2 px-5 rounded-md transition-colors duration-300">
                                    Add-on
                                </button>
                            </Card>
                            <Card className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 flex items-center"><i className="fas fa-pencil-alt text-indigo-500 mr-2"></i> Custom Brand</h3>
                                    <p className="text-gray-600 text-sm mb-2">Customize the Consltr branding from widget.</p>
                                    <p className="text-2xl font-bold text-gray-900">$59<span className="text-base font-medium text-gray-500">/ month</span></p>
                                </div>
                                <button className="bg-white text-purple-600 border border-purple-600 hover:bg-purple-50 font-bold py-2 px-5 rounded-md transition-colors duration-300">
                                    Add-on
                                </button>
                            </Card>
                        </div>

                        {/* Get in touch section */}
                        <div className="bg-purple-700 text-white p-8 rounded-lg flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Get in touch to Receive</h2>
                                <ul className="list-disc list-inside text-purple-100 text-sm space-y-1">
                                    <li>Dedicated account management</li>
                                    <li>Priority support</li>
                                    <li>Custom AI Agent training solutions</li>
                                </ul>
                            </div>
                            <button className="bg-white text-purple-700 font-bold py-3 px-6 rounded-md mt-6 md:mt-0 hover:bg-gray-100 transition-colors duration-300">
                                Contact Sales
                            </button>
                        </div>
                    </>
                );
            default:
                return (
                    <div className="text-center text-gray-600 py-20">
                        Page not found. Please select an option from the sidebar.
                    </div>
                );
        }
    };

    return (
      <AppLayout>
        <div className="min-h-screen flex flex-col font-inter bg-gray-50">
            {/* Main Content Area with Sidebar */}
            <div className="flex flex-1">
                {/* Sidebar - Only show if logged in */}
                {isAuthenticated && (
                    <aside className="hidden md:block w-64 bg-white shadow-md p-4 pt-8 border-r border-gray-200 sticky top-0 h-full overflow-y-auto">
                        <nav className="space-y-2">
                            <div className="text-xs text-gray-500 uppercase font-semibold mb-2 ml-3">My AI Agents</div>
                            <button onClick={() => setCurrentPage('overview')} className={`flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium w-full text-left ${currentPage === 'overview' ? 'bg-gray-100 text-gray-900' : ''}`}>
                                <i className="fas fa-eye mr-3"></i> Overview
                            </button>
                            <button onClick={() => setCurrentPage('viewAgent')} className={`flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium w-full text-left ${currentPage === 'viewAgent' ? 'bg-gray-100 text-gray-900' : ''}`}>
                                <i className="fas fa-robot mr-3"></i> View AI Agent
                            </button>
                            <button onClick={() => setCurrentPage('analytics')} className={`flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium w-full text-left ${currentPage === 'analytics' ? 'bg-gray-100 text-gray-900' : ''}`}>
                                <i className="fas fa-chart-line mr-3"></i> Analytics
                            </button>
                            <button onClick={() => setCurrentPage('messages')} className={`flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium w-full text-left ${currentPage === 'messages' ? 'bg-gray-100 text-gray-900' : ''}`}>
                                <i className="fas fa-comments mr-3"></i> Messages
                            </button>
                            <button onClick={() => setCurrentPage('leads')} className={`flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium w-full text-left ${currentPage === 'leads' ? 'bg-gray-100 text-gray-900' : ''}`}>
                                <i className="fas fa-users mr-3"></i> Leads
                            </button>
                            <button onClick={() => setCurrentPage('trainingSources')} className={`flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium w-full text-left ${currentPage === 'trainingSources' ? 'bg-gray-100 text-gray-900' : ''}`}>
                                <i className="fas fa-database mr-3"></i> Training sources
                            </button>
                            <button onClick={() => setCurrentPage('visualLook')} className={`flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium w-full text-left ${currentPage === 'visualLook' ? 'bg-gray-100 text-gray-900' : ''}`}>
                                <i className="fas fa-paint-brush mr-3"></i> Visual Look
                            </button>
                            <button onClick={() => setCurrentPage('pricingPlans')} className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium w-full text-left">
                                <i className="fas fa-puzzle-piece mr-3"></i> Add-ons
                            </button>
                            <button onClick={() => setCurrentPage('settings')} className={`flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium w-full text-left ${currentPage === 'settings' ? 'bg-gray-100 text-gray-900' : ''}`}>
                                <i className="fas fa-cog mr-3"></i> Settings
                            </button>
                            <details className="group">
                                <summary className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium cursor-pointer">
                                    <i className="fas fa-plug mr-3"></i> Integrations
                                    <i className="fas fa-chevron-down ml-auto transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="ml-8 mt-2 space-y-1">
                                    <button onClick={() => alert('Zapier integration page would load here.')} className="block p-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm w-full text-left">Zapier</button>
                                    <button onClick={() => alert('Slack integration page would load here.')} className="block p-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm w-full text-left">Slack</button>
                                </div>
                            </details>
                        </nav>
                    </aside>
                )}

                {/* Main Content Area */}
                <main className={`flex-1 p-6 md:p-8 w-full mx-auto bg-gray-50 ${!isAuthenticated ? 'md:ml-0' : ''}`}>
                    {renderPageContent()}
                </main>
            </div>

            {/* Sticky Footer Menu - Only show if logged in */}
            {/* {isLoggedIn && (
                <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-white rounded-l-lg shadow-lg z-50 flex flex-col items-center text-gray-600 text-sm">
                    <button onClick={() => alert('Feedback form would open here.')} className="flex flex-col items-center p-2 hover:text-gray-900 transition-colors duration-200">
                        <i className="fas fa-star text-lg md:text-xl mb-1"></i>
                        Feedback
                    </button>
                    <button onClick={() => alert('Book a call modal would open here.')} className="flex flex-col items-center p-2 hover:text-gray-900 transition-colors duration-200">
                        <i className="fas fa-phone-alt text-lg md:text-xl mb-1"></i>
                        Book a call
                    </button>
                </div>
            )} */}
        </div>
      </AppLayout>
    );
};

export default Dashboard;
