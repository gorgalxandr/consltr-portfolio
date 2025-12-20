import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuth } from '../contexts/AuthContext';
// import api from '../utils/api';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    company: ''
  });
  
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthColor, setPasswordStrengthColor] = useState('#ef4444');

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length > 7) strength += 1;
    if (password.length > 10) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const width = (strength / 5) * 100;
    let color;
    
    if (strength <= 1) color = '#ef4444';
    else if (strength <= 3) color = '#f59e0b';
    else color = '#10b981';
    
    setPasswordStrength(width);
    setPasswordStrengthColor(color);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Calculate password strength when password changes
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Validate required fields
    if (!formData.email || !formData.password) {
      setMessage({
        text: 'Email and password are required',
        type: 'error'
      });
      setIsLoading(false);
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage({
        text: 'Passwords do not match',
        type: 'error'
      });
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setMessage({
        text: 'Password must be at least 8 characters long',
        type: 'error'
      });
      setIsLoading(false);
      return;
    }

    try {
      await register(
        formData.email,
        formData.password,
        formData.firstname.trim() || undefined,
        formData.lastname.trim() || undefined,
        formData.company.trim() || undefined
      );
      
      setMessage({
        text: 'Registration successful! Redirecting...',
        type: 'success'
      });
      
      // Redirect to agents page
      setTimeout(() => {
        navigate('/agents');
      }, 1000);
      
    } catch (err: unknown) {
      let errorMessage = 'Registration failed';
      const error = err as AxiosError<{ message: string; code?: string }>;
      
      if (error.response) {
        // Handle CSRF errors specifically
        if (error.response.status === 403 && error.response.data?.code === 'EBADCSRFTOKEN') {
          errorMessage = 'Session expired. Please refresh the page and try again.';
        } else {
          errorMessage = error.response.data?.message || 'Registration failed';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setMessage({
        text: errorMessage,
        type: 'error'
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center w-full">
      <div className="auth-container">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Get started with your account</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-md text-sm ${
            message.type === 'success' 
              ? 'bg-green-900/50 text-green-300' 
              : 'bg-red-900/50 text-red-300'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md input-field focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full px-4 py-3 rounded-md input-field focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="password-strength">
              <div
                className="password-strength-bar"
                style={{
                  width: `${passwordStrength}%`,
                  backgroundColor: passwordStrengthColor,
                }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Password must be at least 8 characters long and contain both letters and numbers
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md input-field focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md input-field focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md input-field focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md input-field focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-bold py-3 px-4 rounded-md btn-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;