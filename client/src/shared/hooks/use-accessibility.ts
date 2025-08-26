import { useEffect, useRef, useCallback } from 'react';

// Focus trap hook for modals and dialogs
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isActive || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      previousFocusRef.current?.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus first element in container
      const firstFocusable = containerRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();

      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, handleKeyDown]);

  const restoreFocus = useCallback(() => {
    previousFocusRef.current?.focus();
  }, []);

  return { containerRef, restoreFocus };
}

// Keyboard navigation hook for menus and lists
export function useKeyboardNavigation(
  items: string[],
  onSelect: (item: string) => void,
  isActive: boolean = true
) {
  const currentIndexRef = useRef(0);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isActive) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        currentIndexRef.current = currentIndexRef.current === 0 
          ? items.length - 1 
          : currentIndexRef.current - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onSelect(items[currentIndexRef.current]);
        break;
      case 'Home':
        event.preventDefault();
        currentIndexRef.current = 0;
        break;
      case 'End':
        event.preventDefault();
        currentIndexRef.current = items.length - 1;
        break;
    }
  }, [items, onSelect, isActive]);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isActive, handleKeyDown]);

  return currentIndexRef.current;
}

// Live region announcer for screen readers
export function useAnnouncer() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.setAttribute('class', 'sr-only');
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, []);

  return announce;
}

// Skip to content functionality
export function useSkipToContent() {
  useEffect(() => {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    return () => {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink);
      }
    };
  }, []);
}

// Manage focus within a container
export function useFocusManager() {
  const focusFirstElement = useCallback((container: HTMLElement) => {
    const firstFocusable = container.querySelector(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    firstFocusable?.focus();
  }, []);

  const focusLastElement = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    lastFocusable?.focus();
  }, []);

  const trapFocus = useCallback((container: HTMLElement, event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const focusableElements = container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }, []);

  return { focusFirstElement, focusLastElement, trapFocus };
}
