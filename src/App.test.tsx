import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock components that might cause issues in tests
vi.mock('./components/ABTesting', () => ({
  default: () => <div data-testid="ab-testing">ABTesting</div>
}))

vi.mock('./components/AdminPanel', () => ({
  default: () => <div data-testid="admin-panel">AdminPanel</div>
}))

vi.mock('./components/Header', () => ({
  default: () => <div data-testid="header">Header</div>
}))

vi.mock('./components/Hero', () => ({
  default: () => <div data-testid="hero">Hero</div>
}))

vi.mock('./components/Portfolio', () => ({
  default: () => <div data-testid="portfolio">Portfolio</div>
}))

vi.mock('./components/About', () => ({
  default: () => <div data-testid="about">About</div>
}))

vi.mock('./components/Services', () => ({
  default: () => <div data-testid="services">Services</div>
}))

vi.mock('./components/Contact', () => ({
  default: () => <div data-testid="contact">Contact</div>
}))

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    
    // Check that main components are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('hero')).toBeInTheDocument()
  })

  it('renders all main sections', () => {
    render(<App />)
    
    expect(screen.getByTestId('portfolio')).toBeInTheDocument()
    expect(screen.getByTestId('about')).toBeInTheDocument()
    expect(screen.getByTestId('services')).toBeInTheDocument()
    expect(screen.getByTestId('contact')).toBeInTheDocument()
  })

  it('renders AB testing component', () => {
    render(<App />)
    
    expect(screen.getByTestId('ab-testing')).toBeInTheDocument()
  })
})