import { useState } from 'react';
import ToggleCard from './ToggleCard';

export default {
  title: 'Components/ToggleCard',
  component: ToggleCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    enabled: {
      control: 'boolean',
    },
    onToggle: {
      action: 'toggled',
    },
  },
};

// Helper component for interactive examples
const ToggleCardExample = (props) => {
  const [enabled, setEnabled] = useState(props.enabled || false);
  
  return (
    <ToggleCard
      enabled={enabled}
      onToggle={setEnabled}
      {...props}
    />
  );
};

export const Default = {
  render: () => <ToggleCardExample />,
};

export const Enabled = {
  render: () => <ToggleCardExample enabled={true} />,
};

export const Disabled = {
  render: () => <ToggleCardExample enabled={false} />,
};

export const Interactive = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <ToggleCard
          enabled={enabled}
          onToggle={setEnabled}
        />
        <div style={{ 
          padding: '12px', 
          backgroundColor: enabled ? 'var(--color-success-50, #ecfdf3)' : 'var(--color-secondary-50, #f9fafb)', 
          borderRadius: '6px',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          Starter code is <strong>{enabled ? 'enabled' : 'disabled'}</strong>
        </div>
      </div>
    );
  },
};

export const CustomContent = {
  render: () => {
    // Create a custom version to show flexibility
    const CustomToggleCard = ({ enabled, onToggle, title, description }) => {
      const handleToggle = (e) => {
        onToggle(e.target.checked);
      };

      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          border: '1px solid var(--color-border-primary, #eaecf0)',
          borderRadius: '8px',
          backgroundColor: 'var(--color-background-primary, #ffffff)',
          gap: '16px'
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
              {title}
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary, #667085)' }}>
              {description}
            </p>
          </div>
          <label style={{
            position: 'relative',
            display: 'inline-block',
            width: '44px',
            height: '24px',
          }}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={handleToggle}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: enabled ? 'var(--color-primary-600, #7f56d9)' : 'var(--color-secondary-300, #d0d5dd)',
              transition: '0.2s',
              borderRadius: '24px',
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '20px',
                width: '20px',
                left: enabled ? '22px' : '2px',
                bottom: '2px',
                backgroundColor: 'white',
                transition: '0.2s',
                borderRadius: '50%',
                display: 'block'
              }} />
            </span>
          </label>
        </div>
      );
    };

    const [notifications, setNotifications] = useState(true);
    const [analytics, setAnalytics] = useState(false);
    const [sharing, setSharing] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
        <CustomToggleCard
          enabled={notifications}
          onToggle={setNotifications}
          title="Email Notifications"
          description="Receive email updates about question submissions and candidate progress"
        />
        <CustomToggleCard
          enabled={analytics}
          onToggle={setAnalytics}
          title="Analytics Tracking"
          description="Allow collection of anonymous usage data to improve the platform"
        />
        <CustomToggleCard
          enabled={sharing}
          onToggle={setSharing}
          title="Public Sharing"
          description="Make this question available in the public question library"
        />
      </div>
    );
  },
};