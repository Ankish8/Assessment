// Using template literals (this is what "Show code" will display)
const buttonTemplate = ({ label, variant = 'primary', size = 'medium', disabled = false }) => {
  const padding = size === 'small' ? '8px 16px' : size === 'large' ? '12px 24px' : '10px 20px';
  const fontSize = size === 'small' ? '14px' : size === 'large' ? '18px' : '16px';
  const backgroundColor = variant === 'primary' ? '#7f56d9' : '#f9fafb';
  const color = variant === 'primary' ? 'white' : '#344054';
  const border = variant === 'secondary' ? '1px solid #d0d5dd' : 'none';
  const opacity = disabled ? '0.5' : '1';

  return `
    <button 
      style="
        padding: ${padding};
        font-size: ${fontSize};
        border-radius: 8px;
        border: ${border};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        font-weight: 500;
        transition: all 0.2s ease;
        background-color: ${backgroundColor};
        color: ${color};
        opacity: ${opacity};
      "
      ${disabled ? 'disabled' : ''}
    >
      ${label}
    </button>
  `;
};

export default {
  title: 'Template Examples/Button',
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = buttonTemplate(args);
    return container.firstElementChild;
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