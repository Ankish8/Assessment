import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'ghost'],
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: {
    placeholder: 'Enter your text...',
  },
};

export const WithLabel = {
  args: {
    label: 'Email address',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const WithHelperText = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithError = {
  args: {
    label: 'Email address',
    placeholder: 'Enter your email',
    type: 'email',
    errorMessage: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const Required = {
  args: {
    label: 'Full name',
    placeholder: 'Enter your full name',
    required: true,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled field',
    placeholder: 'You cannot edit this',
    disabled: true,
    value: 'Disabled value',
  },
};

export const WithStartIcon = {
  args: {
    label: 'Search',
    placeholder: 'Search for anything...',
    startIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14 14L10.5 10.5M12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
};

export const WithEndIcon = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    type: 'number',
    endIcon: (
      <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>USD</span>
    ),
  },
};

export const Password = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    endIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8C2 8 4.5 3 8 3C11.5 3 14 8 14 8C14 8 11.5 13 8 13C4.5 13 2 8 2 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
};

// Size variants
export const Small = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
};

export const Large = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
};

// Style variants
export const Filled = {
  args: {
    variant: 'filled',
    placeholder: 'Filled input',
  },
};

export const Ghost = {
  args: {
    variant: 'ghost',
    placeholder: 'Ghost input',
  },
};

// Form example
export const FormExample = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label="First name"
        placeholder="Enter your first name"
        required
      />
      <Input
        label="Last name"
        placeholder="Enter your last name"
        required
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
        startIcon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2.5 4L8 8.5L13.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="1.5" y="3" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        }
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
        endIcon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8C2 8 4.5 3 8 3C11.5 3 14 8 14 8C14 8 11.5 13 8 13C4.5 13 2 8 2 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      />
    </div>
  ),
};