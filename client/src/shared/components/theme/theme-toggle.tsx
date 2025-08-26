import React, { useState } from 'react';
import { useTheme, ThemeMode, AccentColor } from '@/shared/contexts/theme-context';
import { Button } from '@/shared/components/ui/button';

interface ThemeToggleProps {
  className?: string;
  showAccentPicker?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showAccentPicker = false,
  size = 'md'
}) => {
  const { theme, setThemeMode, setAccentColor, toggleTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  const modeOptions: { value: ThemeMode; label: string; icon: string }[] = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' }
  ];

  const accentOptions: { value: AccentColor; label: string; color: string }[] = [
    { value: 'blue', label: 'Blue', color: '#3b82f6' },
    { value: 'green', label: 'Green', color: '#10b981' },
    { value: 'purple', label: 'Purple', color: '#8b5cf6' },
    { value: 'orange', label: 'Orange', color: '#f97316' },
    { value: 'red', label: 'Red', color: '#ef4444' },
    { value: 'teal', label: 'Teal', color: '#14b8a6' }
  ];

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8 text-sm';
      case 'lg':
        return 'h-12 w-12 text-lg';
      default:
        return 'h-10 w-10 text-base';
    }
  };

  const getCurrentIcon = () => {
    if (theme.mode === 'system') {
      return theme.isDark ? '🌙' : '☀️';
    }
    return theme.isDark ? '🌙' : '☀️';
  };

  const getCurrentLabel = () => {
    const modeOption = modeOptions.find(option => option.value === theme.mode);
    return modeOption ? `${modeOption.icon} ${modeOption.label}` : 'Theme';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Simple Toggle Button */}
      {!showAccentPicker ? (
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className={`${getSizeClasses()} ${
            theme.isDark 
              ? 'bg-gray-800 border-gray-600 text-gray-100 hover:bg-gray-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
          aria-label={`Switch to ${theme.isDark ? 'light' : 'dark'} mode`}
          title={`Current: ${getCurrentLabel()}`}
        >
          <span className="transition-transform duration-200">
            {getCurrentIcon()}
          </span>
        </Button>
      ) : (
        /* Advanced Theme Selector */
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowOptions(!showOptions)}
            className={`${getSizeClasses()} ${
              theme.isDark 
                ? 'bg-gray-800 border-gray-600 text-gray-100 hover:bg-gray-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            aria-label="Theme options"
            aria-expanded={showOptions}
            aria-haspopup="true"
          >
            <span className="transition-transform duration-200">
              {getCurrentIcon()}
            </span>
          </Button>

          {/* Theme Options Dropdown */}
          {showOptions && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowOptions(false)}
                aria-hidden="true"
              />
              
              {/* Options Panel */}
              <div className={`absolute right-0 top-full mt-2 z-20 w-64 rounded-lg border shadow-lg ${
                theme.isDark 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="p-4 space-y-4">
                  {/* Theme Mode Selection */}
                  <div>
                    <h3 className={`text-sm font-medium mb-2 ${
                      theme.isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Theme Mode
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {modeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setThemeMode(option.value);
                            setShowOptions(false);
                          }}
                          className={`p-2 rounded-md text-xs font-medium transition-colors ${
                            theme.mode === option.value
                              ? theme.isDark
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-100 text-blue-800'
                              : theme.isDark
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          aria-pressed={theme.mode === option.value}
                        >
                          <div className="flex flex-col items-center space-y-1">
                            <span>{option.icon}</span>
                            <span>{option.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accent Color Selection */}
                  <div>
                    <h3 className={`text-sm font-medium mb-2 ${
                      theme.isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Accent Color
                    </h3>
                    <div className="grid grid-cols-6 gap-2">
                      {accentOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setAccentColor(option.value);
                          }}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            theme.accentColor === option.value
                              ? 'border-gray-400 scale-110'
                              : theme.isDark
                                ? 'border-gray-600 hover:border-gray-500'
                                : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: option.color }}
                          aria-label={`Set accent color to ${option.label}`}
                          title={option.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Current Theme Info */}
                  <div className={`text-xs ${
                    theme.isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <div className="flex justify-between">
                      <span>Mode:</span>
                      <span className="capitalize">{theme.mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accent:</span>
                      <span className="capitalize">{theme.accentColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Appearance:</span>
                      <span>{theme.isDark ? 'Dark' : 'Light'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
