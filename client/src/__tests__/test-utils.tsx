// Test utilities and setup
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Custom render function with providers
export function renderWithProviders(ui: React.ReactElement) {
  // Add your providers here
  return render(ui);
}
