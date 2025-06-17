import Card from './Card';
import Button from '../Button';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'outlined', 'filled', 'ghost'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'base', 'lg'],
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'base', 'md', 'lg', 'xl'],
    },
    hoverable: {
      control: 'boolean',
    },
    clickable: {
      control: 'boolean',
    },
    selected: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: {
    children: 'This is a basic card with some content inside it.',
  },
};

export const WithTitle = {
  args: {
    title: 'Card Title',
    children: 'This card has a title and some content.',
  },
};

export const WithTitleAndSubtitle = {
  args: {
    title: 'Card Title',
    subtitle: 'This is a subtitle that provides additional context',
    children: 'This card has both a title and subtitle.',
  },
};

export const WithAction = {
  args: {
    title: 'Settings',
    subtitle: 'Manage your account preferences',
    action: (
      <Button size="small" variant="ghost">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z" fill="currentColor"/>
          <path d="M8 4C8.55228 4 9 3.55228 9 3C9 2.44772 8.55228 2 8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4Z" fill="currentColor"/>
          <path d="M8 14C8.55228 14 9 13.5523 9 13C9 12.4477 8.55228 12 8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14Z" fill="currentColor"/>
        </svg>
      </Button>
    ),
    children: 'Update your profile information and preferences.',
  },
};

export const WithFooter = {
  args: {
    title: 'Project Card',
    children: 'This project contains multiple components and features.',
    footer: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          Last updated 2 hours ago
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="small" variant="ghost">Edit</Button>
          <Button size="small">View</Button>
        </div>
      </div>
    ),
  },
};

export const Clickable = {
  args: {
    title: 'Clickable Card',
    subtitle: 'Click me to see the interaction',
    children: 'This card is clickable and will respond to click events.',
    clickable: true,
    onClick: () => alert('Card clicked!'),
  },
};

export const Hoverable = {
  args: {
    title: 'Hoverable Card',
    subtitle: 'Hover over me to see the effect',
    children: 'This card has a hover effect with elevation change.',
    hoverable: true,
  },
};

export const Selected = {
  args: {
    title: 'Selected Card',
    children: 'This card appears in a selected state.',
    selected: true,
  },
};

// Variant examples
export const Outlined = {
  args: {
    variant: 'outlined',
    title: 'Outlined Card',
    children: 'This card uses the outlined variant.',
  },
};

export const Filled = {
  args: {
    variant: 'filled',
    title: 'Filled Card',
    children: 'This card uses the filled variant with a different background.',
  },
};

export const Ghost = {
  args: {
    variant: 'ghost',
    title: 'Ghost Card',
    children: 'This card uses the ghost variant with no background or border.',
  },
};

// Padding examples
export const NoPadding = {
  args: {
    padding: 'none',
    title: 'No Padding Card',
    children: (
      <div style={{ padding: '16px', backgroundColor: 'var(--color-background-secondary)' }}>
        This card has no internal padding. The content handles its own spacing.
      </div>
    ),
  },
};

export const SmallPadding = {
  args: {
    padding: 'sm',
    title: 'Small Padding',
    children: 'This card uses small padding.',
  },
};

export const LargePadding = {
  args: {
    padding: 'lg',
    title: 'Large Padding',
    children: 'This card uses large padding for more breathing room.',
  },
};

// Complex example
export const ComplexCard = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Card
        variant="elevated"
        hoverable
        title="React Component Library"
        subtitle="A collection of reusable UI components"
        action={
          <Button size="small" variant="ghost">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z" fill="currentColor"/>
              <path d="M8 4C8.55228 4 9 3.55228 9 3C9 2.44772 8.55228 2 8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4Z" fill="currentColor"/>
              <path d="M8 14C8.55228 14 9 13.5523 9 13C9 12.4477 8.55228 12 8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14Z" fill="currentColor"/>
            </svg>
          </Button>
        }
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ 
                padding: '2px 8px', 
                backgroundColor: 'var(--color-primary-100)', 
                color: 'var(--color-primary-700)',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '500'
              }}>
                React
              </span>
              <span style={{ 
                padding: '2px 8px', 
                backgroundColor: 'var(--color-success-100)', 
                color: 'var(--color-success-700)',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '500'
              }}>
                TypeScript
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="small" variant="ghost">Fork</Button>
              <Button size="small">View</Button>
            </div>
          </div>
        }
      >
        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: '0 0 12px 0', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            Build consistent and accessible user interfaces with our comprehensive component library.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
            <span>⭐ 1.2k stars</span>
            <span>🍴 234 forks</span>
            <span>📈 Active</span>
          </div>
        </div>
      </Card>
    </div>
  ),
};

// Assessment Card Examples
export const AssessmentCard = {
  render: () => (
    <div style={{ width: '350px' }}>
      <Card
        variant="outlined"
        hoverable
        clickable
        style={{ 
          border: '1.5px solid #eaecf0',
          borderRadius: '16px',
          minHeight: '160px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginRight: '16px',
            background: 'linear-gradient(135deg, #f9f5ff, #f4ebff)',
            border: '1px solid #e9d7fe',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
          }}>
            <i className="fas fa-file-alt" style={{ fontSize: '20px', color: '#7f56d9' }}></i>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: 600, 
              lineHeight: 1.3, 
              color: '#101828', 
              marginBottom: '8px', 
              letterSpacing: '-0.01em' 
            }}>
              General Submission
            </h3>
            <p style={{ 
              fontSize: '14px', 
              lineHeight: 1.5, 
              color: '#475467', 
              marginBottom: '12px' 
            }}>
              Accepts text, code, files, images, audio, and URLs.
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ 
                fontSize: '12px', 
                color: '#667085', 
                marginBottom: '4px', 
                paddingLeft: '16px', 
                position: 'relative' 
              }}>
                <span style={{ 
                  content: '•', 
                  position: 'absolute', 
                  left: 0, 
                  color: '#9e77ed', 
                  fontWeight: 600 
                }}>•</span>
                Text & code responses
              </li>
              <li style={{ 
                fontSize: '12px', 
                color: '#667085', 
                marginBottom: '4px', 
                paddingLeft: '16px', 
                position: 'relative' 
              }}>
                <span style={{ 
                  content: '•', 
                  position: 'absolute', 
                  left: 0, 
                  color: '#9e77ed', 
                  fontWeight: 600 
                }}>•</span>
                File uploads (documents, images)
              </li>
              <li style={{ 
                fontSize: '12px', 
                color: '#667085', 
                paddingLeft: '16px', 
                position: 'relative' 
              }}>
                <span style={{ 
                  content: '•', 
                  position: 'absolute', 
                  left: 0, 
                  color: '#9e77ed', 
                  fontWeight: 600 
                }}>•</span>
                Audio recordings & URLs
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const AssessmentCardSelected = {
  render: () => (
    <div style={{ width: '350px' }}>
      <Card
        variant="outlined"
        selected
        style={{ 
          border: '1.5px solid #7f56d9',
          borderRadius: '16px',
          minHeight: '160px',
          backgroundColor: '#fcfaff',
          boxShadow: '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-1.5px',
          left: '-1.5px',
          right: '-1.5px',
          bottom: '-1.5px',
          background: 'linear-gradient(135deg, #9e77ed, #7f56d9)',
          borderRadius: '16px',
          zIndex: -1
        }}></div>
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginRight: '16px',
            background: 'linear-gradient(135deg, #f9f5ff, #f4ebff)',
            border: '1px solid #e9d7fe',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
          }}>
            <i className="fas fa-code" style={{ fontSize: '20px', color: '#2563eb' }}></i>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: 600, 
              lineHeight: 1.3, 
              color: '#101828', 
              marginBottom: '8px', 
              letterSpacing: '-0.01em' 
            }}>
              Frontend Development
            </h3>
            <p style={{ 
              fontSize: '14px', 
              lineHeight: 1.5, 
              color: '#475467', 
              marginBottom: '12px' 
            }}>
              Code assessment using HTML, CSS, and JavaScript.
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ 
                fontSize: '12px', 
                color: '#667085', 
                marginBottom: '4px', 
                paddingLeft: '16px', 
                position: 'relative' 
              }}>
                <span style={{ 
                  content: '•', 
                  position: 'absolute', 
                  left: 0, 
                  color: '#9e77ed', 
                  fontWeight: 600 
                }}>•</span>
                Live code editor
              </li>
              <li style={{ 
                fontSize: '12px', 
                color: '#667085', 
                marginBottom: '4px', 
                paddingLeft: '16px', 
                position: 'relative' 
              }}>
                <span style={{ 
                  content: '•', 
                  position: 'absolute', 
                  left: 0, 
                  color: '#9e77ed', 
                  fontWeight: 600 
                }}>•</span>
                Real-time preview
              </li>
              <li style={{ 
                fontSize: '12px', 
                color: '#667085', 
                paddingLeft: '16px', 
                position: 'relative' 
              }}>
                <span style={{ 
                  content: '•', 
                  position: 'absolute', 
                  left: 0, 
                  color: '#9e77ed', 
                  fontWeight: 600 
                }}>•</span>
                Cross-browser testing
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  ),
};

// Grid example
export const CardGrid = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', width: '600px' }}>
      <Card variant="elevated" hoverable clickable title="Dashboard" subtitle="Overview of your data">
        View charts, metrics, and key performance indicators.
      </Card>
      <Card variant="elevated" hoverable clickable title="Analytics" subtitle="Deep dive into metrics">
        Analyze user behavior and application performance.
      </Card>
      <Card variant="elevated" hoverable clickable title="Settings" subtitle="Configure your preferences">
        Manage account settings and application preferences.
      </Card>
    </div>
  ),
};