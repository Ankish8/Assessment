import type { Preview } from '@storybook/angular';

const preview: Preview = {
  // Global parameters for all stories
  parameters: {
    // Configure controls addon
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    
    // Configure actions addon
    actions: { 
      argTypesRegex: '^on[A-Z].*',
      handles: ['click', 'change', 'input', 'submit']
    },
    
    // Configure docs addon
    docs: {
      extractComponentDescription: (component: any, { notes }: any) => {
        if (notes) {
          return typeof notes === 'string' ? notes : notes.markdown || notes.text;
        }
        return null;
      },
      source: {
        state: 'open',
      },
    },
    
    // Configure viewport addon for responsive testing
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
            width: '1024px',
            height: '768px',
          },
        },
        largeDesktop: {
          name: 'Large Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
      defaultViewport: 'desktop',
    },
    
    // Configure layout options
    layout: 'centered',
    
    // Configure backgrounds
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
    
    // Configure story sorting
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',
          'Components',
          ['Basic', 'Form', 'Navigation', 'Layout', 'Data Display'],
          'Pages',
          'Examples',
          '*',
        ],
        includeName: true,
      },
    },
  },
  
  // Global decorators
  decorators: [
    // Add margin around stories
    (Story) => ({
      template: `
        <div style="margin: 2rem; max-width: 100%; overflow-x: auto;">
          <ng-container *ngComponentOutlet="story"></ng-container>
        </div>
      `,
      props: {
        story: Story,
      },
    }),
    
    // Add accessibility testing
    (Story) => ({
      template: `
        <div role="main" style="padding: 1rem;">
          <ng-container *ngComponentOutlet="story"></ng-container>
        </div>
      `,
      props: {
        story: Story,
      },
    }),
  ],
  
  // Global arg types (for consistent prop documentation)
  argTypes: {
    // Common Angular Input properties
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
      table: {
        category: 'State',
        defaultValue: { summary: false },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the component',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'medium' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Color theme of the component',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'Visual variant of the component',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'contained' },
      },
    },
    
    // Common Angular Output events
    onClick: {
      action: 'clicked',
      description: 'Callback fired when component is clicked',
      table: {
        category: 'Events',
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when component value changes',
      table: {
        category: 'Events',
      },
    },
  },
  
  // Global args (default values)
  args: {
    disabled: false,
    size: 'medium',
    color: 'primary',
    variant: 'contained',
  },
  
  // Tags for categorization
  tags: ['autodocs'],
};

export default preview;