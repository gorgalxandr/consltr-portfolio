import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../Contact'

// Mock fetch globally
global.fetch = vi.fn()

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, whileInView, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    button: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...rest } = props;
      return <button {...rest}>{children}</button>;
    },
    a: ({ children, ...props }: any) => {
      const { initial, whileInView, whileHover, transition, ...rest } = props;
      return <a {...rest}>{children}</a>;
    },
  },
}))

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset fetch mock
    ;(fetch as any).mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('renders contact form with all required fields', () => {
    render(<Contact />)
    
    // Check main heading
    expect(screen.getByRole('heading', { name: /start your project/i })).toBeInTheDocument()
    
    // Check required form fields
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /company/i })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /project type/i })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /budget range/i })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /timeline/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument()
    
    // Check submit button
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  test('displays validation errors for required fields', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    // The form uses HTML5 validation, so required fields should prevent submission
    // We can test by checking if the form didn't submit (no fetch call)
    expect(fetch).not.toHaveBeenCalled()
  })

  test('submits form with valid data successfully', async () => {
    const user = userEvent.setup()
    const mockResponse = { ok: true, json: () => Promise.resolve({ message: 'Success' }) }
    ;(fetch as any).mockResolvedValueOnce(mockResponse)
    
    render(<Contact />)
    
    // Fill out the form
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John Doe')
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'john@example.com')
    await user.type(screen.getByRole('textbox', { name: /company/i }), 'Test Company')
    await user.selectOptions(screen.getByRole('combobox', { name: /project type/i }), 'Web Application')
    await user.selectOptions(screen.getByRole('combobox', { name: /budget range/i }), '$10k - $25k')
    await user.selectOptions(screen.getByRole('combobox', { name: /timeline/i }), '2-3 months')
    await user.type(screen.getByRole('textbox', { name: /message/i }), 'Test message')
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    // Check fetch was called with correct data
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/public/project-inquiry',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            company: 'Test Company',
            projectType: 'Web Application',
            projectDescription: 'Test message',
            budgetRange: '$10k - $25k',
            timeline: '2-3 months',
            source: 'portfolio_website'
          })
        })
      )
    })
    
    // Check success message appears
    await waitFor(() => {
      expect(screen.getByText(/message sent!/i)).toBeInTheDocument()
    })
  })

  test('handles network error gracefully', async () => {
    const user = userEvent.setup()
    ;(fetch as any).mockRejectedValueOnce(new Error('Network error'))
    
    render(<Contact />)
    
    // Fill required fields
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John Doe')
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'john@example.com')
    await user.type(screen.getByRole('textbox', { name: /message/i }), 'Test message')
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }))
    
    // Check error message appears
    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument()
    })
  })

  test('handles API error response gracefully', async () => {
    const user = userEvent.setup()
    const mockResponse = { 
      ok: false, 
      json: () => Promise.resolve({ message: 'Server error' })
    }
    ;(fetch as any).mockResolvedValueOnce(mockResponse)
    
    render(<Contact />)
    
    // Fill required fields
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John Doe')
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'john@example.com')
    await user.type(screen.getByRole('textbox', { name: /message/i }), 'Test message')
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }))
    
    // Check error message appears
    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument()
    })
  })

  test('form fields update correctly on user input', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const messageInput = screen.getByRole('textbox', { name: /message/i })
    
    await user.type(nameInput, 'Test Name')
    await user.type(emailInput, 'test@example.com')
    await user.type(messageInput, 'Test message content')
    
    expect(nameInput).toHaveValue('Test Name')
    expect(emailInput).toHaveValue('test@example.com')
    expect(messageInput).toHaveValue('Test message content')
  })

  test('clears form after successful submission', async () => {
    const user = userEvent.setup()
    const mockResponse = { ok: true, json: () => Promise.resolve({ message: 'Success' }) }
    ;(fetch as any).mockResolvedValueOnce(mockResponse)
    
    render(<Contact />)
    
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const messageInput = screen.getByRole('textbox', { name: /message/i })
    
    // Fill form
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'Test message')
    
    // Submit
    await user.click(screen.getByRole('button', { name: /send message/i }))
    
    // Wait for success and form clear
    await waitFor(() => {
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(messageInput).toHaveValue('')
    })
  })

  test('contact information is displayed correctly', () => {
    render(<Contact />)
    
    expect(screen.getByText('hello@consltr.com')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
  })

  test('API documentation link uses correct environment URL', () => {
    // Test development environment (default)
    render(<Contact />)
    
    const apiLink = screen.getByRole('link', { name: /view api docs/i })
    expect(apiLink).toHaveAttribute('href', expect.stringContaining('localhost:3000'))
  })
})