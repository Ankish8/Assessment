import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Supports icons, loading states, and full customization.',
      },
    },
  },
  argTypes: {
    children: {
      description: 'Button content/text',
      control: 'text',
    },
    variant: {
      description: 'Visual style variant',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive', 'success', 'outline'],
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Button size',
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      description: 'Disable the button',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      description: 'Show loading spinner',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    iconOnly: {
      description: 'Show only icon (hide text)',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      description: 'Expand to full width',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    iconPosition: {
      description: 'Icon position relative to text',
      control: { type: 'select' },
      options: ['left', 'right'],
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    onClick: {
      description: 'Click handler function',
      action: 'clicked',
    },
  },
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'The primary button is used for the main call-to-action. Use sparingly - typically only one primary button per page section.',
      },
    },
  },
};

export const Secondary = {
  args: {
    children: 'Button',
    variant: "ghost",
    size: "medium"
  },
};

export const Ghost = {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
};

export const Large = {
  args: {
    children: 'Large Button',
    size: 'large',
  },
};

export const Small = {
  args: {
    children: 'Small Button',
    size: 'small',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

// New variants
export const Destructive = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Success = {
  args: {
    children: 'Complete',
    variant: 'success',
  },
};

export const Outline = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

// Size variants
export const ExtraLarge = {
  args: {
    children: 'Extra Large Button',
    size: 'xlarge',
  },
};

// State variants
export const Loading = {
  args: {
    children: 'Processing...',
    loading: true,
  },
};

export const LoadingPrimary = {
  args: {
    children: 'Saving Changes',
    loading: true,
    variant: 'primary',
  },
};

// Icon variants
export const WithIcon = {
  args: {
    children: 'Save & Continue',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    iconPosition: 'right',
  },
};

export const IconOnly = {
  args: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    iconOnly: true,
    variant: 'ghost',
  },
};

export const FullWidth = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// Complex examples
export const ButtonGroup = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="ghost">Cancel</Button>
      <Button variant="outline">Save Draft</Button>
      <Button variant="primary">Publish</Button>
    </div>
  ),
};

export const ActionButtons = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button 
        variant="ghost" 
        iconOnly
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 3.5L4.5 10.5L1 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      />
      <Button 
        variant="ghost" 
        iconOnly
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      />
      <Button 
        variant="ghost" 
        iconOnly
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z" fill="currentColor"/>
            <path d="M8 4C8.55228 4 9 3.55228 9 3C9 2.44772 8.55228 2 8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4Z" fill="currentColor"/>
            <path d="M8 14C8.55228 14 9 13.5523 9 13C9 12.4477 8.55228 12 8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14Z" fill="currentColor"/>
          </svg>
        }
      />
    </div>
  ),
};

export const SizeComparison = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button size="xlarge">XLarge</Button>
    </div>
  ),
};

export const VariantShowcase = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', maxWidth: '600px' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="success">Success</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};