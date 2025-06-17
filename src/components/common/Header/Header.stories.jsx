import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
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