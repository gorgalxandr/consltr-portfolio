import { Dispatch, SetStateAction } from 'react';
import Card from "../../components/DashboardCard";

// Define the interface for Settings component props
interface SettingsProps {
  // Navigation
  setCurrentPage: Dispatch<SetStateAction<string>>;
  
  // Settings tab management
  settingsTab: string;
  setSettingsTab: Dispatch<SetStateAction<string>>;
  
  // General settings
  aiAgentName: string;
  setAiAgentName: Dispatch<SetStateAction<string>>;
  aiAgentId: string;
  vibeResponse: string;
  setVibeResponse: Dispatch<SetStateAction<string>>;
  isCalComBookingEnabled: boolean;
  setIsCalComBookingEnabled: Dispatch<SetStateAction<boolean>>;
  promptText: string;
  setPromptText: Dispatch<SetStateAction<string>>;
  selectedModel: string;
  setSelectedModel: Dispatch<SetStateAction<string>>;
  
  // Leads settings
  isEmailEnabled: boolean;
  setIsEmailEnabled: Dispatch<SetStateAction<boolean>>;
  isNameEnabled: boolean;
  setIsNameEnabled: Dispatch<SetStateAction<boolean>>;
  isPhoneEnabled: boolean;
  setIsPhoneEnabled: Dispatch<SetStateAction<boolean>>;
  
  // Discover settings
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  aiAgentTitle: string;
  setAiAgentTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  isPublic: boolean;
  setIsPublic: Dispatch<SetStateAction<boolean>>;
  socialX: string;
  setSocialX: Dispatch<SetStateAction<string>>;
  socialLinkedIn: string;
  setSocialLinkedIn: Dispatch<SetStateAction<string>>;
  socialFacebook: string;
  setSocialFacebook: Dispatch<SetStateAction<string>>;
  
  // Danger zone
  showDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}

const Settings: React.FC<SettingsProps> = ({
    aiAgentId,
    aiAgentName,
    aiAgentTitle,
    description,
    isCalComBookingEnabled,
    isEmailEnabled,
    isNameEnabled,
    isPhoneEnabled,
    isPublic,
    promptText,
    selectedModel,
    setAiAgentName,
    setAiAgentTitle,
    setCurrentPage,
    setDescription,
    setIsCalComBookingEnabled,
    setIsEmailEnabled,
    setIsNameEnabled,
    setIsPhoneEnabled,
    setIsPublic,
    setShowDeleteModal,
    setPromptText,
    setSelectedModel,
    setSettingsTab,
    setSocialFacebook,
    setSocialLinkedIn,
    setSocialX,
    settingsTab,
    setUsername,
    setVibeResponse,
    showDeleteModal,
    socialFacebook,
    socialLinkedIn,
    socialX,
    username,
    vibeResponse,
}) => {
    return <>
    {/* Breadcrumbs */}
    <div className="text-sm text-gray-500 mb-6">
        <button onClick={() => setCurrentPage('dashboard')} className="hover:underline text-blue-600">Agents</button> / <span className="font-semibold">Settings</span>
    </div>

    {/* Settings Section */}
    {/* Removed grid and col-span to make it full width */}
    <div>
        <Card className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h1>
            <p className="text-gray-600 mb-6">Manage your AI Agent settings and details.</p>

            {/* Tabs for Settings */}
            <div className="flex flex-wrap border-b border-gray-200 mb-6">
                <button
                    className={`px-4 py-2 text-sm font-medium ${settingsTab === 'general' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setSettingsTab('general')}
                >
                    <i className="fas fa-cog mr-2"></i> General
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ${settingsTab === 'leads' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setSettingsTab('leads')}
                >
                    <i className="fas fa-users mr-2"></i> Leads
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ${settingsTab === 'discover' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setSettingsTab('discover')}
                >
                    <i className="fas fa-search mr-2"></i> Discover
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ${settingsTab === 'dangerZone' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setSettingsTab('dangerZone')}
                >
                    <i className="fas fa-exclamation-triangle mr-2"></i> Danger Zone
                </button>
            </div>

            {/* Tab Content */}
            {settingsTab === 'general' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ai-agent-name">
                                AI Agent Name
                            </label>
                            <p className="text-gray-500 text-xs mb-2">Only you can see this name</p>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="ai-agent-name"
                                type="text"
                                value={aiAgentName}
                                onChange={(e) => setAiAgentName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ai-agent-id">
                                AI Agent ID
                            </label>
                            <p className="text-gray-500 text-xs mb-2">Unique Bot identifier</p>
                            <div className="flex items-center">
                                <input
                                    className="shadow appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="ai-agent-id"
                                    type="text"
                                    value={aiAgentId}
                                    readOnly
                                />
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r-md transition-colors duration-300"
                                    onClick={() => navigator.clipboard.writeText(aiAgentId)}
                                >
                                    <i className="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Vibe Response
                            </label>
                            <p className="text-gray-500 text-xs mb-2">Select the tonality of the answers</p>
                            <div className="flex space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-purple-600"
                                        name="vibe-response"
                                        value="friendly"
                                        checked={vibeResponse === 'friendly'}
                                        onChange={(e) => setVibeResponse(e.target.value)}
                                    />
                                    <span className="ml-2 text-gray-700">Friendly</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-purple-600"
                                        name="vibe-response"
                                        value="neutral"
                                        checked={vibeResponse === 'neutral'}
                                        onChange={(e) => setVibeResponse(e.target.value)}
                                    />
                                    <span className="ml-2 text-gray-700">Neutral</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-purple-600"
                                        name="vibe-response"
                                        value="corporate"
                                        checked={vibeResponse === 'corporate'}
                                        onChange={(e) => setVibeResponse(e.target.value)}
                                    />
                                    <span className="ml-2 text-gray-700">Corporate</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cal-com-booking">
                                Cal.com Booking
                            </label>
                            <p className="text-gray-500 text-xs mb-2">Enable or disable the Cal.com booking feature for this agent.</p>
                            <label htmlFor="cal-com-booking" className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        id="cal-com-booking"
                                        className="sr-only"
                                        checked={isCalComBookingEnabled}
                                        onChange={() => setIsCalComBookingEnabled(!isCalComBookingEnabled)}
                                    />
                                    <div className={`block w-14 h-8 rounded-full ${isCalComBookingEnabled ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isCalComBookingEnabled ? 'translate-x-full' : ''}`}></div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
                                Prompt
                            </label>
                            <p className="text-gray-500 text-xs mb-2">Adaptive AI Agent roles: Transform your bot into an assistant or seller</p>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y h-48"
                                id="prompt"
                                value={promptText}
                                onChange={(e) => setPromptText(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Model
                            </label>
                            <p className="text-gray-500 text-xs mb-2">Select the model to base on</p>
                            <div className="flex space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-purple-600"
                                        name="model"
                                        value="GPT-3.5"
                                        checked={selectedModel === 'GPT-3.5'}
                                        onChange={(e) => setSelectedModel(e.target.value)}
                                    />
                                    <span className="ml-2 text-gray-700">GPT-3.5</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-purple-600"
                                        name="model"
                                        value="GPT-4o"
                                        checked={selectedModel === 'GPT-4o'}
                                        onChange={(e) => setSelectedModel(e.target.value)}
                                    />
                                    <span className="ml-2 text-gray-700">GPT-4o</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {settingsTab === 'leads' && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                    <p className="text-gray-600 text-sm mb-4">Activate the contact information you need.</p>

                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 font-bold">Email</label>
                        <label htmlFor="toggle-email" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggle-email"
                                    className="sr-only"
                                    checked={isEmailEnabled}
                                    onChange={() => setIsEmailEnabled(!isEmailEnabled)}
                                />
                                <div className={`block w-14 h-8 rounded-full ${isEmailEnabled ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isEmailEnabled ? 'translate-x-full' : ''}`}></div>
                            </div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 font-bold">Name</label>
                        <label htmlFor="toggle-name" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggle-name"
                                    className="sr-only"
                                    checked={isNameEnabled}
                                    onChange={() => setIsNameEnabled(!isNameEnabled)}
                                />
                                <div className={`block w-14 h-8 rounded-full ${isNameEnabled ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isNameEnabled ? 'translate-x-full' : ''}`}></div>
                            </div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 font-bold">Phone</label>
                        <label htmlFor="toggle-phone" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggle-phone"
                                    className="sr-only"
                                    checked={isPhoneEnabled}
                                    onChange={() => setIsPhoneEnabled(!isPhoneEnabled)}
                                />
                                <div className={`block w-14 h-8 rounded-full ${isPhoneEnabled ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isPhoneEnabled ? 'translate-x-full' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                </div>
            )}
            {settingsTab === 'discover' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <p className="text-gray-500 text-xs mb-2">Enter your username</p>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ai-agent-title">
                                AI Agent Title
                            </label>
                            <p className="text-gray-500 text-xs mb-2">Set your AI Agent's name.</p>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="ai-agent-title"
                                type="text"
                                value={aiAgentTitle}
                                onChange={(e) => setAiAgentTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <p className="text-gray-500 text-xs mb-2">Briefly describe your AI Agent's purpose. max. 150 characters</p>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y h-24"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength={150}
                            ></textarea>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-gray-700 text-sm font-bold" htmlFor="ai-agent-cover">
                                    AI Agent Cover
                                </label>
                                <label htmlFor="toggle-public" className="flex items-center cursor-pointer">
                                    <span className="text-sm text-gray-700 mr-2">Public</span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            id="toggle-public"
                                            className="sr-only"
                                            checked={isPublic}
                                            onChange={() => setIsPublic(!isPublic)}
                                        />
                                        <div className={`block w-14 h-8 rounded-full ${isPublic ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isPublic ? 'translate-x-full' : ''}`}></div>
                                    </div>
                                </label>
                            </div>
                            <p className="text-gray-500 text-xs mb-2">Recommended size: 430 x 430px. Limit: 1MB. (formats: .jpg, .png)</p>
                            <div className="border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center h-40 relative overflow-hidden">
                                <img src="https://placehold.co/430x430/e0e0e0/ffffff?text=AI+Agent+Cover" alt="AI Agent Cover Placeholder" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="relative z-10 flex space-x-2">
                                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-300">
                                        Remove Cover
                                    </button>
                                    <input type="file" id="ai-agent-cover" className="hidden" />
                                    <label htmlFor="ai-agent-cover" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-300 cursor-pointer">
                                        Upload Cover
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Social Links
                            </label>
                            <p className="text-gray-500 text-xs mb-2">Link your social media profiles</p>
                            <div className="space-y-3">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="x.com"
                                    value={socialX}
                                    onChange={(e) => setSocialX(e.target.value)}
                                />
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="linkedin.com/in/"
                                    value={socialLinkedIn}
                                    onChange={(e) => setSocialLinkedIn(e.target.value)}
                                />
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="web.facebook.com/"
                                    value={socialFacebook}
                                    onChange={(e) => setSocialFacebook(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {settingsTab === 'dangerZone' && (
                <div className="space-y-6">
                    <div className="flex items-start bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
                        <i className="fas fa-exclamation-triangle text-xl mr-3"></i>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Account Deletion Request</h2>
                            <p className="text-sm">Please be aware that deleting your AI Agent is irreversible and will result in the permanent removal of all your data, preferences, messages, and history with our service.</p>
                        </div>
                    </div>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete AI Agent
                    </button>
                </div>
            )}
        </Card>
        <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                Update
            </button>
        </div>
    </div>

    {/* Account Deletion Request Modal */}
    {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md p-6 text-center">
                <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Deletion Request</h2>
                <p className="text-gray-600 mb-6">
                    Please send an email to <a href="mailto:hello@consltr.com" className="text-blue-600 hover:underline">hello@consltr.com</a> with your intention to delete your chat. We will manually delete it for you.
                </p>
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors duration-300"
                    onClick={() => setShowDeleteModal(false)}
                >
                    Cancel
                </button>
            </Card>
        </div>
    )}
</>
};

export default Settings;