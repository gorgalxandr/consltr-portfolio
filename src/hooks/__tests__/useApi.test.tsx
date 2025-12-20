import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useApi } from '../useApi';
import api from '../../utils/api';

vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
  }
}));

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initial loading state is true', () => {
    const { result } = renderHook(() => useApi('/test'));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    (api.get as Mock).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useApi('/test'));

    // Initial state
    expect(result.current.loading).toBe(true);

    // Wait for the async operation to complete
    await act(async () => {
      vi.runAllTimers();
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(api.get).toHaveBeenCalledWith('/test', {});
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch error with response message', async () => {
    const mockError = {
      message: 'Network Error',
      response: { data: { message: 'Server Error' } }
    };
    (api.get as Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useApi('/test'));

    await act(async () => {
      vi.runAllTimers();
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Server Error');
    expect(result.current.data).toBeNull();
  });

  it('handles fetch error with only error message', async () => {
    const mockError = {
      message: 'Network Error'
    };
    (api.get as Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useApi('/test'));

    await act(async () => {
      vi.runAllTimers();
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Network Error');
    expect(result.current.data).toBeNull();
  });

  it('handles fetch error with no message', async () => {
    const mockError = {};
    (api.get as Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useApi('/test'));

    await act(async () => {
      vi.runAllTimers();
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('An unknown error occurred');
    expect(result.current.data).toBeNull();
  });

  it('passes options to api.get', async () => {
    const mockData = { id: 1, name: 'Test' };
    const options = { headers: { 'Authorization': 'Bearer token' } };
    (api.get as Mock).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useApi('/test', options));

    await act(async () => {
      vi.runAllTimers();
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(api.get).toHaveBeenCalledWith('/test', options);
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
  });
});
