// RevenueCat Subscription Service for Frontend
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface SubscriptionStatus {
  plan: 'free' | 'pro';
  hasActiveSubscription: boolean;
  entitlements: {
    pro?: boolean;
  };
  expiresDate?: string;
  willRenew?: boolean;
}

export interface Offering {
  identifier: string;
  product: string;
  price: number;
  priceString: string;
  duration: string;
}

export interface Offerings {
  current: string;
  packages: Offering[];
}

class SubscriptionService {
  private csrfToken: string | null = null;

  // Get CSRF token for API calls
  private async getCsrfToken(): Promise<string> {
    if (!this.csrfToken) {
      const response = await axios.get(`${API_BASE_URL}/api/csrf-token`, {
        withCredentials: true
      });
      this.csrfToken = response.data.csrfToken;
    }
    return this.csrfToken || '';
  }

  // Get current subscription status
  async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/subscription/status`, {
        withCredentials: true
      });
      return response.data.subscription;
    } catch {
      // Return free status as fallback
      return {
        plan: 'free',
        hasActiveSubscription: false,
        entitlements: {}
      };
    }
  }

  // Get available offerings/products
  async getOfferings(): Promise<Offerings> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/subscription/offerings`, {
        withCredentials: true
      });
      return response.data.offerings;
    } catch {
      // Return default offerings as fallback
      return {
        current: 'default',
        packages: [
          {
            identifier: 'pro_monthly',
            product: 'consltr_pro_monthly',
            price: 19.00,
            priceString: '$19.00',
            duration: 'P1M'
          }
        ]
      };
    }
  }

  // Initialize customer in RevenueCat
  async initializeCustomer(): Promise<void> {
    try {
      const csrfToken = await this.getCsrfToken();
      await axios.post(
        `${API_BASE_URL}/api/subscription/initialize`,
        {},
        {
          withCredentials: true,
          headers: {
            'X-CSRF-Token': csrfToken
          }
        }
      );
    } catch {
      // Silently fail
    }
  }

  // Start checkout process
  async startCheckout(packageId: string): Promise<string> {
    const csrfToken = await this.getCsrfToken();
    const response = await axios.post(
      `${API_BASE_URL}/api/subscription/create-checkout`,
      {
        packageId,
        redirectUrl: `${window.location.origin}/billing?success=true`
      },
      {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': csrfToken
        }
      }
    );
    
    // Return checkout URL to redirect user
    return response.data.checkoutUrl;
  }

  // Cancel subscription
  async cancelSubscription(): Promise<{ success: boolean; managementUrl?: string }> {
    const csrfToken = await this.getCsrfToken();
    const response = await axios.post(
      `${API_BASE_URL}/api/subscription/cancel`,
      {},
      {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': csrfToken
        }
      }
    );
    return response.data;
  }

  // Check if user has pro features
  async hasProAccess(): Promise<boolean> {
    const status = await this.getSubscriptionStatus();
    return status.hasActiveSubscription && status.entitlements.pro === true;
  }

  // Get usage limits based on plan
  getUsageLimits(plan: 'free' | 'pro') {
    const limits = {
      free: {
        agents: 1,
        messagesPerMonth: 40,
        trainingSourcesPerAgent: 3,
        leadGeneration: false,
        analytics: 'basic',
        support: 'community'
      },
      pro: {
        agents: 10,
        messagesPerMonth: 2000,
        trainingSourcesPerAgent: 20,
        leadGeneration: true,
        analytics: 'advanced',
        support: 'priority'
      }
    };
    
    return limits[plan];
  }

  // Format price for display
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }
}

export const subscriptionService = new SubscriptionService();
export default subscriptionService;