import { Card } from './card.js';

export const BasicCard = () => {
  return (
    <Card>
      This is a basic card with some content inside it.
    </Card>
  );
};

export const WithTitle = () => {
  return (
    <Card title="Card Title">
      This card has a title and some content.
    </Card>
  );
};

export const WithTitleAndSubtitle = () => {
  return (
    <Card 
      title="Card Title"
      subtitle="This is a subtitle that provides additional context"
    >
      This card has both a title and subtitle.
    </Card>
  );
};

export const WithAction = () => {
  return (
    <Card 
      title="Settings"
      subtitle="Manage your account preferences"
      action={
        <button style={{ 
          background: 'none', 
          border: 'none', 
          fontSize: '16px', 
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '4px'
        }}>
          •••
        </button>
      }
    >
      Update your profile information and preferences.
    </Card>
  );
};

export const WithFooter = () => {
  return (
    <Card 
      title="Project Card"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#6b5671' }}>
            Last updated 2 hours ago
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ 
              background: 'none', 
              border: '1px solid transparent', 
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>Edit</button>
            <button style={{ 
              background: '#611F69', 
              border: 'none',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>View</button>
          </div>
        </div>
      }
    >
      This project contains multiple components and features.
    </Card>
  );
};

export const ClickableCard = () => {
  return (
    <Card 
      title="Clickable Card"
      subtitle="Click me to see the interaction"
      clickable
      onClick={() => alert('Card clicked!')}
    >
      This card is clickable and will respond to click events.
    </Card>
  );
};

export const HoverableCard = () => {
  return (
    <Card 
      title="Hoverable Card"
      subtitle="Hover over me to see the effect"
      hoverable
    >
      This card has a hover effect with elevation change.
    </Card>
  );
};

export const SelectedCard = () => {
  return (
    <Card 
      title="Selected Card"
      selected
    >
      This card appears in a selected state.
    </Card>
  );
};

export const CardVariants = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '600px' }}>
      <Card variant="elevated" title="Elevated Card">
        This card uses the elevated variant with shadow.
      </Card>
      <Card variant="outlined" title="Outlined Card">
        This card uses the outlined variant with border.
      </Card>
      <Card variant="filled" title="Filled Card">
        This card uses the filled variant with background.
      </Card>
      <Card variant="ghost" title="Ghost Card">
        This card uses the ghost variant with no background.
      </Card>
    </div>
  );
};

export const PaddingVariants = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Card padding="none" title="No Padding">
        <div style={{ padding: '16px', backgroundColor: '#f8f6fa' }}>
          This card has no internal padding.
        </div>
      </Card>
      <Card padding="sm" title="Small Padding">
        This card uses small padding.
      </Card>
      <Card padding="base" title="Base Padding">
        This card uses base padding (default).
      </Card>
      <Card padding="lg" title="Large Padding">
        This card uses large padding.
      </Card>
    </div>
  );
};

export const ComplexCard = () => {
  return (
    <div style={{ width: '320px' }}>
      <Card
        variant="elevated"
        hoverable
        title="React Component Library"
        subtitle="A collection of reusable UI components"
        action={
          <button style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '16px', 
            cursor: 'pointer',
            padding: '4px 8px'
          }}>
            •••
          </button>
        }
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ 
                padding: '2px 8px', 
                backgroundColor: '#ebd4ef', 
                color: '#611F69',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '500'
              }}>
                React
              </span>
              <span style={{ 
                padding: '2px 8px', 
                backgroundColor: '#d1fadf', 
                color: '#039855',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '500'
              }}>
                TypeScript
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ 
                background: 'none', 
                border: '1px solid transparent', 
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>Fork</button>
              <button style={{ 
                background: '#611F69', 
                border: 'none',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>View</button>
            </div>
          </div>
        }
      >
        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: '0 0 12px 0', color: '#6b5671', fontSize: '14px' }}>
            Build consistent and accessible user interfaces with our comprehensive component library.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#8a7490' }}>
            <span>⭐ 1.2k stars</span>
            <span>🍴 234 forks</span>
            <span>📈 Active</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const CardGrid = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', width: '600px' }}>
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
  );
};