import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DataTable from '../pages/data-table'

// Mock the bundle-optimization module
vi.mock('@/lib/bundle-optimization', () => ({
  lightweightUtils: {
    debounce: (fn: Function, delay: number) => fn // Simple mock for testing
  }
}))

describe('DataTable Component', () => {
  it('renders data table with optimization techniques', () => {
    render(<DataTable />)
    
    // Check if the table headers are present
    expect(screen.getByText('Technique')).toBeInTheDocument()
    expect(screen.getByText('Size Before')).toBeInTheDocument()
    expect(screen.getByText('Size After')).toBeInTheDocument()
    expect(screen.getByText('Savings')).toBeInTheDocument()
    expect(screen.getByText('Impact')).toBeInTheDocument()
    expect(screen.getByText('Difficulty')).toBeInTheDocument()
  })

  it('displays optimization techniques data', () => {
    render(<DataTable />)
    
    // Check if some techniques are displayed
    expect(screen.getByText('Tree Shaking')).toBeInTheDocument()
    expect(screen.getByText('Code Splitting')).toBeInTheDocument()
    expect(screen.getByText('Dynamic Imports')).toBeInTheDocument()
    expect(screen.getByText('Gzip Compression')).toBeInTheDocument()
  })

  it('filters techniques based on search input', async () => {
    const user = userEvent.setup()
    render(<DataTable />)
    
    const filterInput = screen.getByPlaceholderText('Filter techniques...')
    
    // Filter for "Tree"
    await user.type(filterInput, 'Tree')
    
    // Should show Tree Shaking technique
    expect(screen.getByText('Tree Shaking')).toBeInTheDocument()
    
    // Should not show other techniques (assuming debounce works immediately in test)
    await waitFor(() => {
      expect(screen.queryByText('Code Splitting')).not.toBeInTheDocument()
    })
  })

  it('sorts techniques when column headers are clicked', async () => {
    const user = userEvent.setup()
    render(<DataTable />)
    
    const techniqueHeader = screen.getByText('Technique')
    
    // Click to sort
    await user.click(techniqueHeader)
    
    // Should show sort indicator
    expect(screen.getByText('↑')).toBeInTheDocument()
  })

  it('displays summary statistics', () => {
    render(<DataTable />)
    
    // Check if summary cards are present
    expect(screen.getByText('Optimization Techniques')).toBeInTheDocument()
    expect(screen.getByText('Average Savings')).toBeInTheDocument()
    expect(screen.getByText('Easy to Implement')).toBeInTheDocument()
  })

  it('shows correct impact and difficulty colors', () => {
    render(<DataTable />)
    
    // Find elements with impact and difficulty
    const highImpact = screen.getAllByText('High')[0] // First occurrence
    const easyDifficulty = screen.getAllByText('Easy')[0] // First occurrence
    
    expect(highImpact).toHaveClass('text-green-600')
    expect(easyDifficulty).toHaveClass('text-green-600')
  })

  it('displays the correct count of techniques', () => {
    render(<DataTable />)
    
    // Should show "8 of 8 techniques" initially
    expect(screen.getByText('8 of 8 techniques')).toBeInTheDocument()
  })

  it('shows bundle optimization info banner', () => {
    render(<DataTable />)
    
    expect(screen.getByText('📊 Data Table with Lightweight Utilities')).toBeInTheDocument()
    expect(screen.getByText(/custom utility functions instead of heavy libraries/)).toBeInTheDocument()
  })
})
