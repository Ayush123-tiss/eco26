import React, { useRef, useEffect } from 'react';
import { cn } from '@/shared/utils';
import { useFocusTrap } from '@/shared/hooks/use-accessibility';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = 'md',
  closeOnEscape = true,
  closeOnOverlayClick = true
}: AccessibleModalProps) {
  const { containerRef, restoreFocus } = useFocusTrap(isOpen);
  const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `modal-description-${Math.random().toString(36).substr(2, 9)}` : undefined;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const handleClose = () => {
    onClose();
    restoreFocus();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className={cn(
          'relative z-10 w-full rounded-lg bg-white shadow-xl',
          sizeClasses[size],
          className
        )}
        role="document"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 id={titleId} className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
          <button
            onClick={handleClose}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Description */}
        {description && (
          <div className="px-6 py-2">
            <p id={descriptionId} className="text-sm text-gray-600">
              {description}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccessibleMenuProps {
  trigger: React.ReactNode;
  items: Array<{
    label: string;
    onClick: () => void;
    disabled?: boolean;
    destructive?: boolean;
  }>;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}

export function AccessibleMenu({ trigger, items, placement = 'bottom-start' }: AccessibleMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const placementClasses = {
    'bottom-start': 'top-full left-0 mt-1',
    'bottom-end': 'top-full right-0 mt-1',
    'top-start': 'bottom-full left-0 mb-1',
    'top-end': 'bottom-full right-0 mb-1'
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!items[focusedIndex]?.disabled) {
          items[focusedIndex]?.onClick();
          setIsOpen(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target as Node) &&
          !triggerRef.current?.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      {React.cloneElement(trigger as React.ReactElement, {
        ref: triggerRef,
        onClick: () => setIsOpen(!isOpen),
        'aria-expanded': isOpen,
        'aria-haspopup': 'menu',
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
            setFocusedIndex(0);
          }
        }
      })}

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          className={cn(
            'absolute z-50 min-w-[8rem] rounded-md border bg-white py-1 shadow-lg',
            placementClasses[placement]
          )}
          onKeyDown={handleKeyDown}
        >
          {items.map((item, index) => (
            <button
              key={index}
              role="menuitem"
              disabled={item.disabled}
              className={cn(
                'block w-full px-4 py-2 text-left text-sm transition-colors',
                'hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
                item.destructive && 'text-red-600 hover:bg-red-50 focus:bg-red-50',
                item.disabled && 'cursor-not-allowed opacity-50',
                index === focusedIndex && 'bg-gray-100'
              )}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick();
                  setIsOpen(false);
                }
              }}
              tabIndex={-1}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
