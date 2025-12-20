import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import { getCSRFToken, resetCSRFToken } from '../csrfToken'

// Mock axios
vi.mock('axios')

const mockAxios = vi.mocked(axios)

describe('CSRF Token Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear any cached token
    resetCSRFToken()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('getCSRFToken', () => {
    it('should fetch CSRF token from server', async () => {
      const mockToken = 'csrf-token-12345'
      mockAxios.get.mockResolvedValueOnce({
        data: { csrfToken: mockToken }
      })

      const token = await getCSRFToken()

      expect(mockAxios.get).toHaveBeenCalledWith('/api/csrf-token', {
        withCredentials: true
      })
      expect(token).toBe(mockToken)
    })

    it('should cache CSRF token for subsequent calls', async () => {
      const mockToken = 'cached-csrf-token'
      mockAxios.get.mockResolvedValueOnce({
        data: { csrfToken: mockToken }
      })

      // First call should fetch
      const token1 = await getCSRFToken()
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      expect(token1).toBe(mockToken)

      // Second call should use cache
      const token2 = await getCSRFToken()
      expect(mockAxios.get).toHaveBeenCalledTimes(1) // Still only 1 call
      expect(token2).toBe(mockToken)
    })

    it('should throw error when axios request fails', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Network error'))

      await expect(getCSRFToken()).rejects.toThrow('Network error')
    })

    it('should throw error when CSRF token is missing from response', async () => {
      mockAxios.get.mockResolvedValueOnce({
        data: {} // Missing csrfToken
      })

      await expect(getCSRFToken()).rejects.toThrow('Invalid CSRF token response: missing token')
    })

    it('should throw error when CSRF token is not a string', async () => {
      mockAxios.get.mockResolvedValueOnce({
        data: { csrfToken: 123 } // Not a string
      })

      await expect(getCSRFToken()).rejects.toThrow('Invalid CSRF token response: token is not a string')
    })

    it('should throw error when response data is missing', async () => {
      mockAxios.get.mockResolvedValueOnce({
        // Missing data property
      })

      await expect(getCSRFToken()).rejects.toThrow('Invalid CSRF token response: missing token')
    })

    it('should refetch token after reset', async () => {
      const firstToken = 'first-token'
      const secondToken = 'second-token'

      // First fetch
      mockAxios.get.mockResolvedValueOnce({
        data: { csrfToken: firstToken }
      })

      const token1 = await getCSRFToken()
      expect(token1).toBe(firstToken)
      expect(mockAxios.get).toHaveBeenCalledTimes(1)

      // Reset cache
      resetCSRFToken()

      // Second fetch should get new token
      mockAxios.get.mockResolvedValueOnce({
        data: { csrfToken: secondToken }
      })

      const token2 = await getCSRFToken()
      expect(token2).toBe(secondToken)
      expect(mockAxios.get).toHaveBeenCalledTimes(2)
    })
  })

  describe('resetCSRFToken', () => {
    it('should clear cached CSRF token', async () => {
      // Cache a token first
      const mockToken = 'token-to-clear'
      mockAxios.get.mockResolvedValueOnce({
        data: { csrfToken: mockToken }
      })

      await getCSRFToken()
      expect(mockAxios.get).toHaveBeenCalledTimes(1)

      // Reset cache
      resetCSRFToken()

      // Next call should fetch again
      mockAxios.get.mockResolvedValueOnce({
        data: { csrfToken: 'new-token' }
      })

      await getCSRFToken()
      expect(mockAxios.get).toHaveBeenCalledTimes(2)
    })

    it('should be safe to call multiple times', () => {
      expect(() => {
        resetCSRFToken()
        resetCSRFToken()
        resetCSRFToken()
      }).not.toThrow()
    })

    it('should not cause issues when called before any getCSRFToken calls', () => {
      expect(() => resetCSRFToken()).not.toThrow()
    })
  })
})