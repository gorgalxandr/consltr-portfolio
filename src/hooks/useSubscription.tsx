// React Hook for RevenueCat Subscription Management
import { useState, useEffect, useCallback } from 'react';
import subscriptionService, { SubscriptionStatus, Offerings } from '../services/subscription';

interface UseSubscriptionReturn {
  status: SubscriptionStatus | null;
  offerings: Offerings | null;
  loading: boolean;
  error: string | null;
  refreshStatus: () => Promise<void>;
  startCheckout: (packageId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

export function useSubscription(): UseSubscriptionReturn {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [offerings, setOfferings] = useState<Offerings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscription status
  const fetchStatus = useCallback(async () => {
    try {
      const subscriptionStatus = await subscriptionService.getSubscriptionStatus();
      setStatus(subscriptionStatus);
      setError(null);
    } catch {
      setError('Failed to load subscription status');
    }
  }, []);

  // Fetch offerings
  const fetchOfferings = useCallback(async () => {
    try {
      const availableOfferings = await subscriptionService.getOfferings();
      setOfferings(availableOfferings);
    } catch {
      // Silently fail for offerings
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      try {
        // Initialize customer in RevenueCat
        await subscriptionService.initializeCustomer();
        
        // Fetch data in parallel
        await Promise.all([
          fetchStatus(),
          fetchOfferings()
        ]);
      } catch {
        setError('Failed to initialize subscription service');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [fetchStatus, fetchOfferings]);

  // Refresh subscription status
  const refreshStatus = useCallback(async () => {
    setLoading(true);
    try {
      await fetchStatus();
    } finally {
      setLoading(false);
    }
  }, [fetchStatus]);

  // Start checkout process
  const startCheckout = useCallback(async (packageId: string) => {
    setLoading(true);
    try {
      const checkoutUrl = await subscriptionService.startCheckout(packageId);
      
      // Redirect to checkout
      window.location.href = checkoutUrl;
    } catch (err) {
      setError('Failed to start checkout process');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancel subscription
  const cancelSubscription = useCallback(async () => {
    setLoading(true);
    try {
      const result = await subscriptionService.cancelSubscription();
      
      if (result.managementUrl) {
        // Redirect to management portal
        window.location.href = result.managementUrl;
      } else {
        // Refresh status after cancellation
        await fetchStatus();
      }
    } catch (err) {
      setError('Failed to cancel subscription');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchStatus]);

  return {
    status,
    offerings,
    loading,
    error,
    refreshStatus,
    startCheckout,
    cancelSubscription
  };
}

// Hook to check if user has access to a feature
export function useFeatureAccess(feature: 'agents' | 'messages' | 'leadGen' | 'analytics') {
  const { status } = useSubscription();
  
  const hasAccess = useCallback(() => {
    if (!status) return false;
    
    const limits = subscriptionService.getUsageLimits(status.plan);
    
    switch (feature) {
      case 'agents':
        return limits.agents > 0;
      case 'messages':
        return limits.messagesPerMonth > 0;
      case 'leadGen':
        return limits.leadGeneration;
      case 'analytics':
        return limits.analytics === 'advanced';
      default:
        return false;
    }
  }, [status, feature]);
  
  return hasAccess();
}