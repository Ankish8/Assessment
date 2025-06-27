export default {
  title: 'Components/Button',
  render: ({ label, variant = 'primary', size = 'medium', disabled = false, onClick }) => {
    // Create wrapper to hold HTML string
    const wrapper = document.createElement('div');
    
    // Build HTML string
    const styles = `
      padding: ${size === 'small' ? '8px 16px' : size === 'large' ? '12px 24px' : '10px 20px'};
      font-size: ${size === 'small' ? '14px' : size === 'large' ? '18px' : '16px'};
      border-radius: 8px;
      border: ${variant === 'secondary' ? '1px solid #d0d5dd' : 'none'};
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      font-weight: 500;
      transition: all 0.2s ease;
      background-color: ${variant === 'primary' ? '#7f56d9' : '#f9fafb'};
      color: ${variant === 'primary' ? 'white' : '#344054'};
      opacity: ${disabled ? '0.5' : '1'};
    `.trim().replace(/\s+/g, ' ');
    
    const htmlString = `<button style="${styles}"${disabled ? ' disabled' : ''}>${label}</button>`;
    
    // Set the HTML
    wrapper.innerHTML = htmlString;
    
    // Add click handler to the actual button element
    const button = wrapper.querySelector('button');
    if (button && onClick) {
      button.addEventListener('click', onClick);
    }
    
    // Store the source for "Show code"
    wrapper._source = htmlString;
    
    return wrapper.firstElementChild;
  },
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      source: {
        code: `<button class="btn btn-primary">Click me</button>`,
      },
    },
  },
};

export const Primary = {
  args: {
    label: 'Button',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    label: 'Button',
    variant: 'secondary',
  },
};

export const Large = {
  args: {
    label: 'Button',
    size: 'large',
  },
};

export const Small = {
  args: {
    label: 'Button',
    size: 'small',
  },
};

export const Disabled = {
  args: {
    label: 'Button',
    disabled: true,
  },
};