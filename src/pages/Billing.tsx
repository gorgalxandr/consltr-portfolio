import React from 'react';
import AppLayout from '../components/layout/AppLayout';

// Types
interface PlanFeature {
  name: string;
}

interface Plan {
  name: string;
  price: number;
  features: PlanFeature[];
  isActive: boolean;
  activeSince: string;
}

interface UsageLimit {
  name: string;
  used: number;
  total: number;
  percentage: number;
}

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover';
  lastFourDigits: string;
  expiryMonth: string;
  expiryYear: string;
}

interface BillingHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  invoiceUrl?: string;
}

interface BillingProps {
  className?: string;
  currentPlan?: Plan;
  usageLimits?: UsageLimit[];
  paymentMethods?: PaymentMethod[];
  billingHistory?: BillingHistoryItem[];
  onUpgrade?: () => void;
  onAddPaymentMethod?: () => void;
  onRemovePaymentMethod?: (paymentMethodId: string) => void;
  onViewInvoice?: (invoiceUrl: string) => void;
}

const Billing: React.FC<BillingProps> = ({ 
  className = '',
  currentPlan,
  usageLimits,
  paymentMethods,
  billingHistory,
  onUpgrade,
  onAddPaymentMethod,
  onRemovePaymentMethod,
  onViewInvoice
}) => {

  // Default data - can be overridden by props
  const defaultPlan: Plan = {
    name: 'Free Plan',
    price: 0,
    features: [
      { name: '1 AI Agent' },
      { name: '40 Messages/month' },
      { name: 'Basic training sources' },
      { name: 'No lead generation' }
    ],
    isActive: true,
    activeSince: 'July 1, 2025'
  };

  const defaultUsageLimits: UsageLimit[] = [
    {
      name: 'Messages Used',
      used: 10,
      total: 40,
      percentage: 25
    },
    {
      name: 'AI Agents Created',
      used: 1,
      total: 1,
      percentage: 100
    }
  ];

  const defaultPaymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'visa',
      lastFourDigits: '1234',
      expiryMonth: '12',
      expiryYear: '27'
    }
  ];

  const defaultBillingHistory: BillingHistoryItem[] = [
    {
      id: '1',
      date: 'July 1, 2025',
      description: 'PRO Plan Subscription',
      amount: 19.00,
      invoiceUrl: '#'
    },
    {
      id: '2',
      date: 'June 1, 2025',
      description: 'PRO Plan Subscription',
      amount: 19.00,
      invoiceUrl: '#'
    }
  ];

  // Use props or default data
  const plan = currentPlan || defaultPlan;
  const limits = usageLimits || defaultUsageLimits;
  const methods = paymentMethods || defaultPaymentMethods;
  const history = billingHistory || defaultBillingHistory;

  const handleUpgradeClick = (): void => {
    if (onUpgrade) {
      onUpgrade();
    }
  };

  const handleAddPaymentMethod = (): void => {
    if (onAddPaymentMethod) {
      onAddPaymentMethod();
    }
  };

  const handleRemovePaymentMethod = (paymentMethodId: string): void => {
    if (onRemovePaymentMethod) {
      onRemovePaymentMethod(paymentMethodId);
    }
  };

  const handleViewInvoice = (invoiceUrl: string): void => {
    if (onViewInvoice) {
      onViewInvoice(invoiceUrl);
    } else {
      // Default behavior
      window.open(invoiceUrl, '_blank');
    }
  };

  const getCardIcon = (type: PaymentMethod['type']): string => {
    const iconMap: Record<PaymentMethod['type'], string> = {
      visa: 'fab fa-cc-visa',
      mastercard: 'fab fa-cc-mastercard',
      amex: 'fab fa-cc-amex',
      discover: 'fab fa-cc-discover'
    };
    return iconMap[type];
  };

  const getCardColor = (type: PaymentMethod['type']): string => {
    const colorMap: Record<PaymentMethod['type'], string> = {
      visa: 'text-blue-700',
      mastercard: 'text-red-600',
      amex: 'text-green-600',
      discover: 'text-orange-600'
    };
    return colorMap[type];
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <AppLayout>
      <div className={`p-6 md:p-8 w-full max-w-7xl mx-auto ${className}`}>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Billing & Subscription</h1>

        {/* Current Plan and Usage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Current Plan Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Current Plan</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-gray-800">{plan.name}</p>
                <p className="text-gray-500 text-sm">Active since: {plan.activeSince}</p>
              </div>
              <span className="text-green-600 font-semibold px-3 py-1 bg-green-100 rounded-full text-sm">
                {plan.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature.name}</li>
              ))}
            </ul>
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md w-full text-center transition-colors duration-300"
              onClick={handleUpgradeClick}
            >
              Upgrade to PRO - $19/month
            </button>
          </div>

          {/* Usage & Limits Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Usage & Limits (Current Month)</h2>
            
            {limits.map((limit, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-700 font-semibold mb-1">{limit.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${limit.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {limit.used} of {limit.total} {limit.name.toLowerCase()} ({limit.percentage}%)
                </p>
              </div>
            ))}
            
            {/* Warning Message */}
            {limits.some(limit => limit.percentage >= 100) && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm">
                <i className="fas fa-exclamation-triangle mr-2"></i> 
                You've reached your AI Agent limit. Upgrade to PRO to create more!
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Methods</h2>
          {methods.map((method) => (
            <div key={method.id} className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
              <div className="flex items-center">
                <i className={`${getCardIcon(method.type)} text-4xl ${getCardColor(method.type)} mr-4`}></i>
                <div>
                  <p className="font-medium text-gray-800">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)} ending in **** {method.lastFourDigits}
                  </p>
                  <p className="text-sm text-gray-500">Expires {method.expiryMonth}/{method.expiryYear}</p>
                </div>
              </div>
              <button 
                className="text-red-500 hover:text-red-700 text-sm transition-colors"
                onClick={() => handleRemovePaymentMethod(method.id)}
              >
                <i className="fas fa-trash-alt mr-1"></i> Remove
              </button>
            </div>
          ))}
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
            onClick={handleAddPaymentMethod}
          >
            <i className="fas fa-plus mr-2"></i> Add New Payment Method
          </button>
        </div>

        {/* Billing History Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {item.invoiceUrl && (
                        <button 
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          onClick={() => handleViewInvoice(item.invoiceUrl!)}
                        >
                          View Invoice
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sticky Footer Menu */}
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 lg:right-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 bg-white rounded-l-lg shadow-lg z-50 p-3 md:flex md:flex-col max-md:bottom-4 max-md:right-2 max-md:top-auto max-md:transform-none max-md:flex-row max-md:rounded-lg max-md:shadow-md">
          <a href="#" className="block text-center p-2 text-gray-600 text-sm mb-2 md:mb-2 max-md:mx-2 max-md:mb-0 hover:text-gray-800 transition-colors">
            <i className="fas fa-star block mb-1 text-lg md:text-xl"></i>
            Feedback
          </a>
          <a href="#" className="block text-center p-2 text-gray-600 text-sm max-md:mx-2 hover:text-gray-800 transition-colors">
            <i className="fas fa-phone-alt block mb-1 text-lg md:text-xl"></i>
            Book a call
          </a>
        </div>
      </div>
    </AppLayout>
  );
};

export default Billing;