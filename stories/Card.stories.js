export default {
  title: 'Components/Card',
  render: ({ title, description, hasIcon = false }) => {
    const card = document.createElement('div');
    card.style.backgroundColor = 'white';
    card.style.borderRadius = '12px';
    card.style.padding = '24px';
    card.style.boxShadow = '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)';
    card.style.border = '1px solid #eaecf0';
    
    if (hasIcon) {
      const icon = document.createElement('div');
      icon.style.width = '48px';
      icon.style.height = '48px';
      icon.style.backgroundColor = '#f4ebff';
      icon.style.borderRadius = '10px';
      icon.style.marginBottom = '16px';
      icon.style.display = 'flex';
      icon.style.alignItems = 'center';
      icon.style.justifyContent = 'center';
      icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
              stroke="#7f56d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
      card.appendChild(icon);
    }
    
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    titleElement.style.fontSize = '18px';
    titleElement.style.fontWeight = '600';
    titleElement.style.color = '#101828';
    titleElement.style.marginBottom = '8px';
    card.appendChild(titleElement);
    
    const descElement = document.createElement('p');
    descElement.textContent = description;
    descElement.style.fontSize = '14px';
    descElement.style.color = '#475467';
    descElement.style.lineHeight = '1.5';
    card.appendChild(descElement);
    
    return card;
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    hasIcon: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    title: 'Card Title',
    description: 'This is a description of the card content. It can contain multiple lines of text.',
  },
};

export const WithIcon = {
  args: {
    title: 'Card with Icon',
    description: 'This card has an icon at the top to draw attention.',
    hasIcon: true,
  },
};