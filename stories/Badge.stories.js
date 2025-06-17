export default {
  title: 'Components/Badge',
  render: ({ label, color = 'purple' }) => {
    const badge = document.createElement('span');
    badge.textContent = label;
    badge.style.display = 'inline-block';
    badge.style.padding = '2px 10px';
    badge.style.borderRadius = '16px';
    badge.style.fontSize = '12px';
    badge.style.fontWeight = '500';
    badge.style.lineHeight = '18px';
    
    const colors = {
      purple: { bg: '#f4ebff', text: '#6941c6', border: '#e9d7fe' },
      green: { bg: '#ecfdf3', text: '#027a48', border: '#abefc6' },
      red: { bg: '#fef3f2', text: '#b42318', border: '#fecdca' },
      blue: { bg: '#eff8ff', text: '#026aa2', border: '#b2ddff' },
      gray: { bg: '#f9fafb', text: '#344054', border: '#eaecf0' },
    };
    
    const colorScheme = colors[color] || colors.purple;
    badge.style.backgroundColor = colorScheme.bg;
    badge.style.color = colorScheme.text;
    badge.style.border = `1px solid ${colorScheme.border}`;
    
    return badge;
  },
  argTypes: {
    label: { control: 'text' },
    color: {
      control: { type: 'select' },
      options: ['purple', 'green', 'red', 'blue', 'gray'],
    },
  },
};

export const Default = {
  args: {
    label: 'Badge',
  },
};

export const Success = {
  args: {
    label: 'Active',
    color: 'green',
  },
};

export const Error = {
  args: {
    label: 'Failed',
    color: 'red',
  },
};

export const Info = {
  args: {
    label: 'In Progress',
    color: 'blue',
  },
};

export const Neutral = {
  args: {
    label: 'Draft',
    color: 'gray',
  },
};