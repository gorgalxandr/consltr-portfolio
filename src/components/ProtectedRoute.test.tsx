import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, Mock } from 'vitest'
import ProtectedRoute from './ProtectedRoute'

// Mock the auth context
const mockUseAuth = vi.fn()
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth()
}))

// Mock Navigate component
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => <div data-testid={`navigate-to-${to.replace('/', '')}`}>Redirecting to {to}</div>
  }
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('ProtectedRoute', () => {
  const TestChild = () => <div data-testid="protected-content">Protected Content</div>

  it('shows loading spinner when authentication is loading', () => {
    (mockUseAuth as Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true
    })

    renderWithRouter(
      <ProtectedRoute>
        <TestChild />
      </ProtectedRoute>
    )

    // Should show loading spinner
    const spinner = screen.getByText((_, element) => {
      return element?.classList.contains('animate-spin') || false
    })
    expect(spinner).toHaveClass('animate-spin')
  })

  it('redirects to login when user is not authenticated', () => {
    (mockUseAuth as Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false
    })

    renderWithRouter(
      <ProtectedRoute>
        <TestChild />
      </ProtectedRoute>
    )

    expect(screen.getByTestId('navigate-to-login')).toBeInTheDocument()
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('renders children when user is authenticated', () => {
    (mockUseAuth as Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false
    })

    renderWithRouter(
      <ProtectedRoute>
        <TestChild />
      </ProtectedRoute>
    )

    expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    expect(screen.queryByTestId('navigate-to-login')).not.toBeInTheDocument()
  })

  it('does not render children when loading', () => {
    (mockUseAuth as Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: true
    })

    renderWithRouter(
      <ProtectedRoute>
        <TestChild />
      </ProtectedRoute>
    )

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })
})