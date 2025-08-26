import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('combines class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('handles conditional classes', () => {
      expect(cn('base', false && 'conditional', 'always')).toBe('base always')
    })

    it('handles undefined and null values', () => {
      expect(cn('base', undefined, null, 'end')).toBe('base end')
    })

    it('merges tailwind classes correctly', () => {
      expect(cn('p-4', 'p-8')).toBe('p-8')
    })

    it('handles complex class combinations', () => {
      const result = cn(
        'bg-blue-500',
        'hover:bg-blue-600',
        false && 'hidden',
        true && 'block',
        'text-white'
      )
      expect(result).toBe('bg-blue-500 hover:bg-blue-600 block text-white')
    })

    it('returns empty string for no arguments', () => {
      expect(cn()).toBe('')
    })

    it('handles arrays of classes', () => {
      expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3')
    })
  })
})
