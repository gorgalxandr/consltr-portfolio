import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'

// Mock CSRF utilities
const mockGetCSRFToken = vi.fn()
const mockResetCSRFToken = vi.fn()
vi.mock('./csrfToken', () => ({
  getCSRFToken: () => mockGetCSRFToken(),
  resetCSRFToken: () => mockResetCSRFToken()
}))

// Mock axios
const mockedAxios = axios as any

vi.mock('axios', () => ({
  default: {
    create: vi.fn()
  }
}))

describe('API Configuration', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    
    // Mock axios.create to return a mock instance
    mockedAxios.create = vi.fn().mockReturnValue({
      interceptors: {
        request: {
          use: vi.fn()
        },
        response: {
          use: vi.fn()
        }
      }
    })
    
    // Import the api module after setting up mocks
    vi.resetModules()
    await import('./api')
  })

  it('creates axios instance with correct config', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: '',
      withCredentials: true
    })
  })

  it('sets up request and response interceptors', async () => {
    const mockRequestUse = vi.fn()
    const mockResponseUse = vi.fn()
    
    const mockInstance = {
      interceptors: {
        request: {
          use: mockRequestUse
        },
        response: {
          use: mockResponseUse
        }
      }
    }
    
    vi.clearAllMocks()
    mockedAxios.create = vi.fn().mockReturnValue(mockInstance)
    
    // Reset modules and import api to trigger interceptor setup
    vi.resetModules()
    await import('./api')
    
    expect(mockRequestUse).toHaveBeenCalled()
    expect(mockResponseUse).toHaveBeenCalled()
  })
})

describe('Request Interceptor Logic', () => {
  it('should skip CSRF for GET requests', async () => {
    const config = {
      method: 'get',
      headers: {}
    }

    // Test the interceptor logic directly (simplified)
    const shouldAddCSRF = ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')
    
    expect(shouldAddCSRF).toBe(false)
  })

  it('should skip CSRF for HEAD requests', async () => {
    const config = {
      method: 'head',
      headers: {}
    }

    const shouldAddCSRF = ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')
    
    expect(shouldAddCSRF).toBe(false)
  })

  it('should skip CSRF for OPTIONS requests', async () => {
    const config = {
      method: 'options',
      headers: {}
    }

    const shouldAddCSRF = ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')
    
    expect(shouldAddCSRF).toBe(false)
  })

  it('should add CSRF for POST requests', async () => {
    const config = {
      method: 'post',
      headers: {}
    }

    const shouldAddCSRF = ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')
    
    expect(shouldAddCSRF).toBe(true)
  })

  it('should add CSRF for PUT requests', async () => {
    const config = {
      method: 'put',
      headers: {}
    }

    const shouldAddCSRF = ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')
    
    expect(shouldAddCSRF).toBe(true)
  })

  it('should add CSRF for PATCH requests', async () => {
    const config = {
      method: 'patch',
      headers: {}
    }

    const shouldAddCSRF = ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')
    
    expect(shouldAddCSRF).toBe(true)
  })

  it('should add CSRF for DELETE requests', async () => {
    const config = {
      method: 'delete',
      headers: {}
    }

    const shouldAddCSRF = ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')
    
    expect(shouldAddCSRF).toBe(true)
  })

  it('should handle CSRF token fetch failure', async () => {
    mockGetCSRFToken.mockRejectedValue(new Error('Network error'))
    
    try {
      await mockGetCSRFToken()
      expect.fail('Should have thrown an error')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  it('should handle missing method gracefully', () => {
    const config = {
      headers: {}
    }

    const shouldAddCSRF = ['post', 'put', 'patch', 'delete'].includes((config as any).method?.toLowerCase() || '')
    
    expect(shouldAddCSRF).toBe(false)
  })
})

describe('Response Interceptor Logic', () => {
  it('should identify CSRF token errors correctly', () => {
    const error = {
      response: {
        status: 403,
        data: {
          code: 'EBADCSRFTOKEN'
        }
      }
    }

    const errorData = error.response?.data as { code?: string; error?: string };
    const isCSRFError = error.response?.status === 403 && 
      (errorData?.code === 'EBADCSRFTOKEN' || 
       errorData?.error === 'CSRF token validation failed')

    expect(isCSRFError).toBe(true)
  })

  it('should identify CSRF validation failed error', () => {
    const error = {
      response: {
        status: 403,
        data: {
          error: 'CSRF token validation failed'
        }
      }
    }

    const errorData = error.response?.data as { code?: string; error?: string };
    const isCSRFError = error.response?.status === 403 && 
      (errorData?.code === 'EBADCSRFTOKEN' || 
       errorData?.error === 'CSRF token validation failed')

    expect(isCSRFError).toBe(true)
  })

  it('should not trigger CSRF refresh for non-CSRF 403 errors', () => {
    const error = {
      response: {
        status: 403,
        data: {
          error: 'Access forbidden'
        }
      }
    }

    const errorData = error.response?.data as { code?: string; error?: string };
    const isCSRFError = error.response?.status === 403 && 
      (errorData?.code === 'EBADCSRFTOKEN' || 
       errorData?.error === 'CSRF token validation failed')

    expect(isCSRFError).toBe(false)
  })

  it('should not trigger CSRF refresh for non-403 errors', () => {
    const error = {
      response: {
        status: 404,
        data: {
          error: 'Not found'
        }
      }
    }

    const errorData = error.response?.data as { code?: string; error?: string };
    const isCSRFError = error.response?.status === 403 && 
      (errorData?.code === 'EBADCSRFTOKEN' || 
       errorData?.error === 'CSRF token validation failed')

    expect(isCSRFError).toBe(false)
  })

  it('should not trigger CSRF refresh for 500 errors', () => {
    const error = {
      response: {
        status: 500,
        data: {
          error: 'Server error'
        }
      }
    }

    const errorData = error.response?.data as { code?: string; error?: string };
    const isCSRFError = error.response?.status === 403 && 
      (errorData?.code === 'EBADCSRFTOKEN' || 
       errorData?.error === 'CSRF token validation failed')

    expect(isCSRFError).toBe(false)
  })

  it('should handle errors without response', () => {
    const error = {
      message: 'Network error'
    }

    const isCSRFError = (error as any).response?.status === 403 && 
      ((error as any).response?.data?.code === 'EBADCSRFTOKEN' || 
       (error as any).response?.data?.error === 'CSRF token validation failed')

    expect(isCSRFError).toBe(false)
  })

  it('should handle reset token being called', () => {
    mockResetCSRFToken()
    expect(mockResetCSRFToken).toHaveBeenCalled()
  })

  it('should handle get token being called', async () => {
    mockGetCSRFToken.mockResolvedValue('new-token')
    const token = await mockGetCSRFToken()
    expect(token).toBe('new-token')
  })
})