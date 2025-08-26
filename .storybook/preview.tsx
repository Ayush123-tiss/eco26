import type { Preview } from '@storybook/react';
import React from 'react';
import '../client/src/index.css'; // Import your global CSS including Tailwind

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0f172a',
        },
        {
          name: 'eco-primary',
          value: '#0F766E',
        },
        {
          name: 'eco-secondary',
          value: '#14B8A6',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
    },
    docs: {
      theme: {
        brandTitle: 'EcoBingle Components',
        brandUrl: 'https://ecobingle.com',
        brandImage: undefined,
        brandTarget: '_self',
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      return (
        <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen bg-white dark:bg-gray-900`}>
          <div className="p-4">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
