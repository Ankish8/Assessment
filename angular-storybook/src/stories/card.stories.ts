import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { CardComponent } from '../app/components/card/card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with multiple variants, sizes, and states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'flat'],
      description: 'Visual variant of the card'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the card'
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
      description: 'Padding inside the card'
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card is clickable'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the card is in loading state'
    },
    showFooter: {
      control: 'boolean',
      description: 'Whether to show the footer section'
    },
    headerTitle: {
      control: 'text',
      description: 'Title text for the header'
    },
    headerSubtitle: {
      control: 'text',
      description: 'Subtitle text for the header'
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label for the card'
    },
    role: {
      control: 'text',
      description: 'ARIA role for the card'
    }
  },
  args: {
    onClick: fn(),
    variant: 'default',
    size: 'medium',
    padding: 'medium',
    clickable: false,
    disabled: false,
    loading: false,
    headerTitle: '',
    headerSubtitle: '',
    showFooter: false,
    ariaLabel: '',
    role: 'region'
  }
};

export default meta;
type Story = StoryObj<CardComponent>;

// Basic card with default styling
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-card 
        [variant]="variant"
        [size]="size"
        [padding]="padding"
        [clickable]="clickable"
        [disabled]="disabled"
        [loading]="loading"
        [showFooter]="showFooter"
        [headerTitle]="headerTitle"
        [headerSubtitle]="headerSubtitle"
        [ariaLabel]="ariaLabel"
        [role]="role"
        (onClick)="onClick($event)">
        <p>This is a basic card with default styling. It can contain any content and provides a clean, structured layout.</p>
      </app-card>
    `
  })
};

// Card with elevation shadow
export const Elevated: Story = {
  args: {
    variant: 'elevated'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card 
        [variant]="variant"
        [size]="size"
        [padding]="padding"
        [clickable]="clickable"
        [disabled]="disabled"
        [loading]="loading">
        <p>This is an elevated card with a subtle shadow that gives it depth and makes it appear to float above the page.</p>
      </app-card>
    `
  })
};

// Card with outlined border
export const Outlined: Story = {
  args: {
    variant: 'outlined'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card 
        [variant]="variant"
        [size]="size"
        [padding]="padding"
        [clickable]="clickable"
        [disabled]="disabled"
        [loading]="loading">
        <p>This is an outlined card with a prominent border that clearly defines its boundaries.</p>
      </app-card>
    `
  })
};

// Card with flat background
export const Flat: Story = {
  args: {
    variant: 'flat'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card 
        [variant]="variant"
        [size]="size"
        [padding]="padding"
        [clickable]="clickable"
        [disabled]="disabled"
        [loading]="loading">
        <p>This is a flat card with a subtle background color that provides gentle contrast without borders or shadows.</p>
      </app-card>
    `
  })
};

// Interactive clickable card
export const Clickable: Story = {
  args: {
    variant: 'elevated',
    clickable: true,
    ariaLabel: 'Clickable card example'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card 
        [variant]="variant"
        [size]="size"
        [padding]="padding"
        [clickable]="clickable"
        [disabled]="disabled"
        [loading]="loading"
        [ariaLabel]="ariaLabel"
        (onClick)="handleClick($event)">
        <p>This card is clickable! Hover over it to see the interaction effects, and click to trigger an action.</p>
        <p><em>Try clicking this card or using Enter/Space when focused.</em></p>
      </app-card>
    `,
    methods: {
      handleClick: (event: MouseEvent) => {
        console.log('Card clicked!', event);
        alert('Card was clicked!');
      }
    }
  })
};

// Card with header and title
export const WithHeader: Story = {
  args: {
    variant: 'default',
    headerTitle: 'Card Title',
    headerSubtitle: 'This is a subtitle that provides more context'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card 
        [variant]="variant"
        [size]="size"
        [padding]="padding"
        [clickable]="clickable"
        [disabled]="disabled"
        [loading]="loading"
        [headerTitle]="headerTitle"
        [headerSubtitle]="headerSubtitle">
        <p>This card has a header section with a title and subtitle. The header is clearly separated from the main content.</p>
      </app-card>
    `
  })
};

// Card with header and footer
export const WithHeaderAndFooter: Story = {
  args: {
    variant: 'outlined',
    headerTitle: 'Complete Card',
    headerSubtitle: 'With all sections',
    showFooter: true
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card 
        [variant]="variant"
        [size]="size"
        [padding]="padding"
        [clickable]="clickable"
        [disabled]="disabled"
        [loading]="loading"
        [showFooter]="showFooter"
        [headerTitle]="headerTitle"
        [headerSubtitle]="headerSubtitle">
        
        <!-- Custom header content -->
        <div slot="header">
          <small>Custom header content can go here</small>
        </div>
        
        <!-- Main content -->
        <p>This card demonstrates all sections: header, body, and footer. Each section can contain custom content.</p>
        
        <!-- Footer content -->
        <div slot="footer">
          <button style="margin-right: 8px; padding: 8px 16px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">Cancel</button>
          <button style="padding: 8px 16px; border: none; background: #611F69; color: white; border-radius: 4px; cursor: pointer;">Confirm</button>
        </div>
      </app-card>
    `
  })
};

// Card in loading state
export const Loading: Story = {
  args: {
    variant: 'elevated',
    loading: true
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card 
        [variant]="variant"
        [size]="size"
        [padding]="padding"
        [clickable]="clickable"
        [disabled]="disabled"
        [loading]="loading">
        <p>This card is in a loading state. Notice the spinner overlay and that the card is not interactive.</p>
      </app-card>
    `
  })
};

// Disabled card
export const Disabled: Story = {
  args: {
    variant: 'default',
    disabled: true,
    clickable: true
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card 
        [variant]="variant"
        [size]="size"
        [padding]="padding"
        [clickable]="clickable"
        [disabled]="disabled"
        [loading]="loading">
        <p>This card is disabled. Even though it's set to be clickable, the disabled state prevents interaction.</p>
      </app-card>
    `
  })
};

// All sizes demonstration
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
        <app-card variant="outlined" size="small">
          <p><strong>Small Card</strong></p>
          <p>Compact size for smaller content areas.</p>
        </app-card>
        
        <app-card variant="outlined" size="medium">
          <p><strong>Medium Card</strong></p>
          <p>Default size that works well for most content types and layouts.</p>
        </app-card>
        
        <app-card variant="outlined" size="large">
          <p><strong>Large Card</strong></p>
          <p>Spacious size for detailed content, forms, or complex layouts that need more room.</p>
        </app-card>
      </div>
    `
  })
};

// All variants demonstration
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
        <app-card variant="default">
          <p><strong>Default</strong></p>
          <p>Clean border with no shadow.</p>
        </app-card>
        
        <app-card variant="elevated">
          <p><strong>Elevated</strong></p>
          <p>Subtle shadow for depth.</p>
        </app-card>
        
        <app-card variant="outlined">
          <p><strong>Outlined</strong></p>
          <p>Prominent border definition.</p>
        </app-card>
        
        <app-card variant="flat">
          <p><strong>Flat</strong></p>
          <p>Background fill without borders.</p>
        </app-card>
      </div>
    `
  })
};

// Padding variations
export const PaddingVariations: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
        <app-card variant="outlined" padding="none">
          <p><strong>No Padding</strong></p>
          <p>Content touches edges.</p>
        </app-card>
        
        <app-card variant="outlined" padding="small">
          <p><strong>Small Padding</strong></p>
          <p>Compact spacing.</p>
        </app-card>
        
        <app-card variant="outlined" padding="medium">
          <p><strong>Medium Padding</strong></p>
          <p>Balanced spacing (default).</p>
        </app-card>
        
        <app-card variant="outlined" padding="large">
          <p><strong>Large Padding</strong></p>
          <p>Generous spacing.</p>
        </app-card>
      </div>
    `
  })
};