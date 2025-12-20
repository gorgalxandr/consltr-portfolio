import { useState, FormEvent } from 'react';
// AuthPage Component (now integrated directly)

interface LoginProps {
  onAuthSuccess: (userData: { id: string; name: string }) => void; // Adjust the parameter type as needed
  // Other props...
}

const LoginPage = ({ onAuthSuccess }: LoginProps) => {
    const [company, setCompany] = useState('');     // New state for Company
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState(''); // New state for First Name
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register forms
    const [lastName, setLastName] = useState('');   // New state for Last Name
    const [message, setMessage] = useState(''); // For displaying success/error messages
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        if (isLogin) {
            // Simulate login
            if (email === 'user@example.com' && password === 'password') {
                setMessage('Login successful! Redirecting...');
                // In a real app, you'd integrate with Firebase Auth or your backend here
                onAuthSuccess({
                  id: '12345',
                  name: `${firstName} ${lastName}` // Use first and last name for user data
                }); // Call the prop function to signal success
            } else {
                setMessage('Invalid email or password.');
            }
        } else {
            // Simulate registration
            if (password !== confirmPassword) {
                setMessage('Passwords do not match.');
                return;
            }
            // Basic password strength check (as per image text: at least 8 characters, both letters and numbers)
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(password)) {
                setMessage('Password must be at least 8 characters long and contain both letters and numbers.');
                return;
            }

            // Check if all required fields for registration are filled
            if (email && password && firstName && lastName) {
                setMessage('Registration successful! Please log in.');
                // In a real app, you'd integrate with Firebase Auth or your backend here
                setIsLogin(true); // Switch to login form after successful registration
                // Optionally, call onAuthSuccess() here if you want to auto-login after register
                // onAuthSuccess();
            } else {
                setMessage('Please fill in all required fields (Email, Password, First Name, Last Name).');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 font-inter"> {/* Dark background */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md transform transition-all duration-300 ease-in-out"> {/* Dark card background */}
                <h2 className="text-3xl font-bold text-white text-center mb-2"> {/* White text */}
                    {isLogin ? 'Login' : 'Create Account'}
                </h2>
                {!isLogin && (
                    <p className="text-gray-400 text-center mb-6">Get started with your account</p> 
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2"> {/* Light gray text */}
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                            placeholder="" // Empty placeholder as per image
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                            placeholder="" // Empty placeholder as per image
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {!isLogin && (
                            <p className="text-gray-400 text-xs mt-2">
                                Password must be at least 8 characters long and contain both letters and numbers
                            </p>
                        )}
                    </div>

                    {!isLogin && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                                placeholder="" // Empty placeholder as per image
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {!isLogin && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Responsive grid for names */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                                    placeholder=""
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                                    placeholder=""
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {!isLogin && (
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                                placeholder=""
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                    )}

                    {message && (
                        <div className={`text-center text-sm p-3 rounded-md ${message.includes('successful') ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-md font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setMessage(''); // Clear messages on toggle
                            setEmail('');
                            setPassword('');
                            setConfirmPassword('');
                            setFirstName(''); // Clear new fields on toggle
                            setLastName('');
                            setCompany('');
                        }}
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
                    >
                        {isLogin ? 'Need an account? Register' : 'Already have an account? Sign in here'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;