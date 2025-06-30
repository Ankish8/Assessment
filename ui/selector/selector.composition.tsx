import React, { useState } from 'react';
import { Selector } from './selector';

const sampleOptions = [
  { value: 'react', label: 'React', description: 'JavaScript library for building UIs' },
  { value: 'vue', label: 'Vue.js', description: 'Progressive JavaScript framework' },
  { value: 'angular', label: 'Angular', description: 'Platform for building web apps' },
  { value: 'svelte', label: 'Svelte', description: 'Compile-time framework' }
];

const iconOptions = [
  { 
    value: 'email', 
    label: 'Email', 
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 4l6 4 6-4v8H2V4z"/></svg>,
    description: 'Email notifications'
  },
  { 
    value: 'sms', 
    label: 'SMS', 
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14 2H2v10h2l2 2 2-2h6V2z"/></svg>,
    description: 'Text message alerts'
  },
  { 
    value: 'push', 
    label: 'Push', 
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l3 3H9v4H7V4H5l3-3z"/></svg>,
    description: 'Browser notifications'
  }
];

const badgeOptions = [
  { 
    value: 'free', 
    label: 'Free Plan', 
    description: 'Basic features included',
    badge: 'Free'
  },
  { 
    value: 'pro', 
    label: 'Pro Plan', 
    description: 'Advanced features and support',
    badge: 'Popular'
  },
  { 
    value: 'enterprise', 
    label: 'Enterprise', 
    description: 'Full feature access',
    badge: 'Best Value'
  }
];

export const SingleSelection = () => {
  const [selected, setSelected] = useState('react');

  return (
    <Selector
      label="Choose your framework"
      options={sampleOptions}
      selectedValue={selected}
      onSelectionChange={setSelected}
      variant="single"
      layout="grid"
    />
  );
};

export const MultipleSelection = () => {
  const [selected, setSelected] = useState(['email', 'push']);

  return (
    <Selector
      label="Notification preferences"
      options={iconOptions}
      selectedValues={selected}
      onSelectionChange={setSelected}
      variant="multiple"
      layout="grid"
      showSelectAll={true}
      onSelectAll={setSelected}
    />
  );
};

export const ListLayout = () => {
  const [selected, setSelected] = useState('pro');

  return (
    <Selector
      label="Select your plan"
      options={badgeOptions}
      selectedValue={selected}
      onSelectionChange={setSelected}
      variant="single"
      layout="list"
      helperText="You can upgrade or downgrade at any time"
    />
  );
};

export const InlineLayout = () => {
  const [selected, setSelected] = useState(['react']);

  const inlineOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'ember', label: 'Ember' }
  ];

  return (
    <Selector
      label="Technologies (inline layout)"
      options={inlineOptions}
      selectedValues={selected}
      onSelectionChange={setSelected}
      variant="multiple"
      layout="inline"
      size="sm"
    />
  );
};

export const SmallSize = () => {
  const [selected, setSelected] = useState('react');

  const smallOptions = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'py', label: 'Python' },
    { value: 'go', label: 'Go' }
  ];

  return (
    <Selector
      label="Language (small size)"
      options={smallOptions}
      selectedValue={selected}
      onSelectionChange={setSelected}
      variant="single"
      layout="grid"
      size="sm"
    />
  );
};

export const LargeSize = () => {
  const [selected, setSelected] = useState('pro');

  return (
    <Selector
      label="Choose plan (large size)"
      options={badgeOptions}
      selectedValue={selected}
      onSelectionChange={setSelected}
      variant="single"
      layout="grid"
      size="lg"
    />
  );
};

export const WithDisabledOptions = () => {
  const [selected, setSelected] = useState('basic');

  const disabledOptions = [
    { value: 'basic', label: 'Basic Plan', description: 'Free forever' },
    { value: 'pro', label: 'Pro Plan', description: 'Coming soon', disabled: true },
    { value: 'enterprise', label: 'Enterprise', description: 'Contact sales', disabled: true }
  ];

  return (
    <Selector
      label="Available plans"
      options={disabledOptions}
      selectedValue={selected}
      onSelectionChange={setSelected}
      variant="single"
      layout="list"
    />
  );
};

export const DisabledSelector = () => {
  return (
    <Selector
      label="Disabled selector"
      options={sampleOptions}
      selectedValue="react"
      variant="single"
      layout="grid"
      disabled={true}
      helperText="This selector is currently disabled"
    />
  );
};

export const WithoutLabel = () => {
  const [selected, setSelected] = useState(['email']);

  return (
    <Selector
      options={iconOptions}
      selectedValues={selected}
      onSelectionChange={setSelected}
      variant="multiple"
      layout="grid"
    />
  );
};

export const ComplexOptions = () => {
  const [selected, setSelected] = useState(['premium']);

  const complexOptions = [
    {
      value: 'free',
      label: 'Free',
      description: 'Perfect for trying out our service',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z"/></svg>,
      badge: '0$'
    },
    {
      value: 'premium',
      label: 'Premium',
      description: 'Most popular choice for teams',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z"/></svg>,
      badge: 'Popular'
    },
    {
      value: 'enterprise',
      label: 'Enterprise',
      description: 'Advanced features for large organizations',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z"/></svg>,
      badge: 'Custom'
    }
  ];

  return (
    <Selector
      label="Subscription plan"
      options={complexOptions}
      selectedValues={selected}
      onSelectionChange={setSelected}
      variant="multiple"
      layout="list"
      showSelectAll={true}
      onSelectAll={setSelected}
      selectAllLabel="Select All Plans"
      helperText="You can select multiple plans to compare features"
    />
  );
};

export const Interactive = () => {
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [selectedNotifications, setSelectedNotifications] = useState(['email']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Selector
        label="Choose framework"
        options={sampleOptions}
        selectedValue={selectedFramework}
        onSelectionChange={setSelectedFramework}
        variant="single"
        layout="grid"
        helperText={`Selected: ${selectedFramework}`}
      />
      
      <Selector
        label="Notification settings"
        options={iconOptions}
        selectedValues={selectedNotifications}
        onSelectionChange={setSelectedNotifications}
        variant="multiple"
        layout="grid"
        showSelectAll={true}
        onSelectAll={setSelectedNotifications}
        helperText={`Selected: ${selectedNotifications.join(', ') || 'None'}`}
      />
      
      <div style={{ 
        padding: '16px', 
        backgroundColor: '#f8f6fa', 
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <strong>Current Selection:</strong>
        <br />
        Framework: {selectedFramework}
        <br />
        Notifications: {selectedNotifications.join(', ') || 'None'}
      </div>
    </div>
  );
};