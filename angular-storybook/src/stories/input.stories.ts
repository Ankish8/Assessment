import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fn } from '@storybook/test';

import { InputComponent } from '../app/components/input/input.component';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule]
    })
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible input component with multiple variants, sizes, states, and icon support.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'Input type'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg'],
      description: 'Input size'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'ghost'],
      description: 'Visual variant of the input'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
      description: 'Current state of the input'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    label: {
      control: 'text',
      description: 'Label for the input'
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input'
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below the input'
    },
    startIcon: {
      control: 'text',
      description: 'Icon displayed at the start of the input'
    },
    endIcon: {
      control: 'text',
      description: 'Icon displayed at the end of the input'
    }
  },
  args: {
    valueChange: fn(),
    blurEvent: fn(),
    focusEvent: fn(),
    inputEvent: fn(),
    keyupEvent: fn(),
    keydownEvent: fn(),
    type: 'text',
    size: 'base',
    variant: 'default',
    state: 'default',
    disabled: false,
    required: false,
    placeholder: 'Enter text...',
    label: '',
    helperText: '',
    errorMessage: ''
  }
};

export default meta;
type Story = StoryObj<InputComponent>;

// Basic Input Stories
export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...'
  }
};

export const WithLabel: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name...'
  }
};

export const WithHelperText: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'john@example.com',
    helperText: 'We\'ll never share your email with anyone else.'
  }
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name...',
    required: true,
    helperText: 'This field is required'
  }
};

// Size Variants
export const SmallSize: Story = {
  args: {
    label: 'Small Input',
    size: 'sm',
    placeholder: 'Small input...'
  }
};

export const LargeSize: Story = {
  args: {
    label: 'Large Input',
    size: 'lg',
    placeholder: 'Large input...'
  }
};

// Input Types
export const EmailInput: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'your.email@example.com',
    helperText: 'Enter a valid email address'
  }
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password...',
    helperText: 'Password must be at least 8 characters'
  }
};

export const NumberInput: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '25',
    helperText: 'Enter your age in years'
  }
};

export const SearchInput: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search for anything...',
    startIcon: '🔍'
  }
};

export const PhoneInput: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
    helperText: 'Include country code'
  }
};

export const UrlInput: Story = {
  args: {
    label: 'Website',
    type: 'url',
    placeholder: 'https://example.com',
    helperText: 'Enter a valid URL'
  }
};

// Variant Styles
export const FilledVariant: Story = {
  args: {
    label: 'Filled Input',
    variant: 'filled',
    placeholder: 'Filled style input...'
  }
};

export const GhostVariant: Story = {
  args: {
    label: 'Ghost Input',
    variant: 'ghost',
    placeholder: 'Ghost style input...'
  }
};

// States
export const ErrorState: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'john@example.com',
    state: 'error',
    errorMessage: 'Please enter a valid email address'
  }
};

export const SuccessState: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username...',
    state: 'success',
    helperText: 'Username is available!'
  }
};

// Icons
export const WithStartIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search users...',
    startIcon: '🔍',
    helperText: 'Use the search icon to find users'
  }
};

export const WithEndIcon: Story = {
  args: {
    label: 'Amount',
    type: 'number',
    placeholder: '100',
    endIcon: '💰',
    helperText: 'Enter amount in USD'
  }
};

export const WithBothIcons: Story = {
  args: {
    label: 'Location',
    placeholder: 'Enter your location...',
    startIcon: '📍',
    endIcon: '🌍',
    helperText: 'We\'ll help you find nearby services'
  }
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: 'Read Only Field',
    placeholder: 'This field is disabled...',
    disabled: true,
    helperText: 'This field cannot be edited'
  }
};

export const DisabledWithValue: Story = {
  args: {
    label: 'System Generated ID',
    value: 'USER-12345',
    disabled: true,
    helperText: 'This ID is automatically generated'
  }
};

// Complex Examples
export const CompleteForm: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <app-input
          label="First Name"
          placeholder="Enter your first name..."
          required="true"
          helperText="As it appears on your ID">
        </app-input>
        
        <app-input
          label="Last Name"
          placeholder="Enter your last name..."
          required="true">
        </app-input>
        
        <app-input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          required="true"
          startIcon="📧"
          helperText="We'll use this for important notifications">
        </app-input>
        
        <app-input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          startIcon="📞"
          helperText="Include country code">
        </app-input>
        
        <app-input
          label="Website"
          type="url"
          placeholder="https://yoursite.com"
          startIcon="🌐"
          helperText="Optional: Your personal or company website">
        </app-input>
        
        <app-input
          label="Password"
          type="password"
          placeholder="Enter a strong password..."
          required="true"
          endIcon="🔒"
          helperText="Must be at least 8 characters with special characters">
        </app-input>
      </div>
    `
  })
};

export const SizeComparison: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <app-input
          label="Small Input"
          size="sm"
          placeholder="Small size input..."
          helperText="Size: sm">
        </app-input>
        
        <app-input
          label="Base Input (Default)"
          size="base"
          placeholder="Base size input..."
          helperText="Size: base (default)">
        </app-input>
        
        <app-input
          label="Large Input"
          size="lg"
          placeholder="Large size input..."
          helperText="Size: lg">
        </app-input>
      </div>
    `
  })
};

export const VariantComparison: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <app-input
          label="Default Variant"
          variant="default"
          placeholder="Default variant..."
          helperText="Variant: default">
        </app-input>
        
        <app-input
          label="Filled Variant"
          variant="filled"
          placeholder="Filled variant..."
          helperText="Variant: filled">
        </app-input>
        
        <app-input
          label="Ghost Variant"
          variant="ghost"
          placeholder="Ghost variant..."
          helperText="Variant: ghost">
        </app-input>
      </div>
    `
  })
};

export const StateComparison: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <app-input
          label="Default State"
          state="default"
          placeholder="Default state..."
          helperText="This is the normal state">
        </app-input>
        
        <app-input
          label="Success State"
          state="success"
          placeholder="Success state..."
          helperText="Input validation passed!">
        </app-input>
        
        <app-input
          label="Error State"
          state="error"
          placeholder="Error state..."
          errorMessage="This field contains an error">
        </app-input>
      </div>
    `
  })
};

export const ValidationExample: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <h3 style="margin: 0; color: #2a1f35;">Form Validation Examples</h3>
        
        <app-input
          label="Valid Email"
          type="email"
          value="user@example.com"
          state="success"
          startIcon="✅"
          helperText="Email format is correct">
        </app-input>
        
        <app-input
          label="Invalid Email"
          type="email"
          value="invalid-email"
          state="error"
          startIcon="❌"
          errorMessage="Please enter a valid email address">
        </app-input>
        
        <app-input
          label="Required Field (Empty)"
          placeholder="This field is required..."
          required="true"
          state="error"
          errorMessage="This field is required">
        </app-input>
        
        <app-input
          label="Password Strength"
          type="password"
          value="MyStr0ngP@ssw0rd!"
          state="success"
          endIcon="🔒"
          helperText="Strong password - contains numbers, symbols, and mixed case">
        </app-input>
      </div>
    `
  })
};