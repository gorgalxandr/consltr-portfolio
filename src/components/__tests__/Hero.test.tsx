import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '../Hero'

describe('Hero Component', () => {
  it('renders the main title', () => {
    render(<Hero />)
    expect(screen.getByText(/Building/i)).toBeInTheDocument()
    expect(screen.getByText(/Tomorrow/i)).toBeInTheDocument()
    expect(screen.getByText(/Today/i)).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Hero />)
    expect(screen.getByText(/We craft digital experiences/i)).toBeInTheDocument()
  })
})
