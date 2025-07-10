import Header from './Header';
import CompactHeader from '../CompactHeader/CompactHeader';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Header Components

Traditional header component with updated unified design system variant.

## Available Variants

- **Default Header**: Original header component
- **CompactHeader**: New unified design system header with consistent shadows and alignment

## Migration Note

New pages should use \`CompactHeader\` for unified design system compliance.
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
    },
    showBackButton: {
      control: 'boolean',
    },
    onBack: {
      action: 'back clicked',
    },
  },
};

export const Default = {
  args: {
    title: 'Question Details',
    onBack: () => console.log('Back clicked'),
  },
};

export const WithoutBackButton = {
  args: {
    title: 'Page Title Only',
    showBackButton: false,
  },
};

export const LongTitle = {
  args: {
    title: 'Very Long Page Title That Might Wrap to Multiple Lines',
    onBack: () => console.log('Back clicked'),
  },
};

export const DefaultCodes = {
  args: {
    title: 'Default Codes',
    onBack: () => console.log('Back clicked'),
  },
};

export const TestCases = {
  args: {
    title: 'Test Cases',
    onBack: () => console.log('Back clicked'),
  },
};

export const CustomBackHandler = {
  args: {
    title: 'Custom Back Action',
    onBack: () => alert('Custom back action triggered!'),
  },
};

export const UnifiedDesignSystem = {
  render: () => (
    <CompactHeader 
      title="Unified Design System" 
      icon="fas fa-palette"
      showBackButton={true}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Unified Design System Header

This story demonstrates the new \`CompactHeader\` component with unified design system features:

- **Consistent Shadow**: \`0 1px 3px rgba(0, 0, 0, 0.08)\`
- **Container Alignment**: Max-width matches content and footer
- **Rounded Corners**: \`var(--radius-lg)\` top corners only
- **Design Tokens**: Consistent spacing and colors
- **Icon Support**: Primary color icons with proper alignment

Use \`CompactHeader\` for new pages to maintain design system consistency.
        `,
      },
    },
  },
};