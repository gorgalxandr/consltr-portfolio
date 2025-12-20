import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { user } = useAuth();

  // Helper function to format the user's name
  const formatUserName = () => {
    if (!user) return 'Guest';
    
    if (user.firstname && user.lastname) {
      return `${user.firstname} ${user.lastname}`;
    }
    if (user.firstname) return user.firstname;
    if (user.lastname) return user.lastname;
    return user.email.split('@')[0] || 'User';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Application!</h1>
      {user ? (
        <div className="space-y-4">
          <p className="text-lg">
            Hello, {formatUserName()}! You are logged in.
          </p>
          <div className="flex space-x-4">
            <Link 
              to="/agents" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/products" 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg">Please sign in to access all features.</p>
          <div className="flex space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;