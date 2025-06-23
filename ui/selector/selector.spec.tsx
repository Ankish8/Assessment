import React from 'react';
import { Selector } from './selector';

const testOptions = [
  { value: 'option1', label: 'Option 1', description: 'First option' },
  { value: 'option2', label: 'Option 2', description: 'Second option' },
  { value: 'option3', label: 'Option 3', description: 'Third option' }
];

// Basic component validation tests for Selector
export const TestSelectorComponent = () => {
  return (
    <Selector
      options={testOptions}
      selectedValue="option1"
      variant="single"
    />
  );
};

export const TestMultipleSelection = () => {
  return (
    <Selector
      options={testOptions}
      selectedValues={['option1', 'option3']}
      variant="multiple"
    />
  );
};

export const TestWithLabel = () => {
  return (
    <Selector
      label="Test Label"
      options={testOptions}
      selectedValue="option2"
      variant="single"
      helperText="This is helper text"
    />
  );
};

export const TestLayouts = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Grid Layout</h3>
        <Selector
          options={testOptions}
          selectedValue="option1"
          layout="grid"
        />
      </div>
      
      <div>
        <h3>List Layout</h3>
        <Selector
          options={testOptions}
          selectedValue="option2"
          layout="list"
        />
      </div>
      
      <div>
        <h3>Inline Layout</h3>
        <Selector
          options={testOptions}
          selectedValue="option3"
          layout="inline"
        />
      </div>
    </div>
  );
};

export const TestSizes = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Small Size</h3>
        <Selector
          options={testOptions}
          selectedValue="option1"
          size="sm"
        />
      </div>
      
      <div>
        <h3>Base Size</h3>
        <Selector
          options={testOptions}
          selectedValue="option2"
          size="base"
        />
      </div>
      
      <div>
        <h3>Large Size</h3>
        <Selector
          options={testOptions}
          selectedValue="option3"
          size="lg"
        />
      </div>
    </div>
  );
};

export const TestWithIcons = () => {
  const iconOptions = [
    { 
      value: 'home', 
      label: 'Home',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l6 4v8H2V5l6-4z"/></svg>
    },
    { 
      value: 'user', 
      label: 'User',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z"/></svg>
    }
  ];

  return (
    <Selector
      label="Options with icons"
      options={iconOptions}
      selectedValue="home"
      variant="single"
    />
  );
};

export const TestWithBadges = () => {
  const badgeOptions = [
    { value: 'free', label: 'Free Plan', badge: 'Free' },
    { value: 'pro', label: 'Pro Plan', badge: 'Popular' },
    { value: 'enterprise', label: 'Enterprise', badge: 'Custom' }
  ];

  return (
    <Selector
      label="Plans with badges"
      options={badgeOptions}
      selectedValue="pro"
      variant="single"
      layout="list"
    />
  );
};

export const TestDisabledStates = () => {
  const mixedOptions = [
    { value: 'enabled1', label: 'Enabled Option 1' },
    { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
    { value: 'enabled2', label: 'Enabled Option 2' },
    { value: 'disabled2', label: 'Disabled Option 2', disabled: true }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>With Disabled Options</h3>
        <Selector
          label="Mixed enabled/disabled"
          options={mixedOptions}
          selectedValue="enabled1"
          variant="single"
        />
      </div>
      
      <div>
        <h3>Completely Disabled</h3>
        <Selector
          label="Disabled selector"
          options={testOptions}
          selectedValue="option1"
          variant="single"
          disabled={true}
        />
      </div>
    </div>
  );
};

export const TestSelectAll = () => {
  const [selected, setSelected] = React.useState(['option1']);

  return (
    <Selector
      label="Multiple selection with Select All"
      options={testOptions}
      selectedValues={selected}
      onSelectionChange={setSelected}
      variant="multiple"
      showSelectAll={true}
      onSelectAll={setSelected}
      selectAllLabel="Choose All"
      helperText={`Selected: ${selected.join(', ')}`}
    />
  );
};

export const TestInteractive = () => {
  const [singleSelected, setSingleSelected] = React.useState('option2');
  const [multipleSelected, setMultipleSelected] = React.useState(['option1', 'option3']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Selector
        label="Single Selection Test"
        options={testOptions}
        selectedValue={singleSelected}
        onSelectionChange={setSingleSelected}
        variant="single"
        layout="grid"
      />
      
      <Selector
        label="Multiple Selection Test"
        options={testOptions}
        selectedValues={multipleSelected}
        onSelectionChange={setMultipleSelected}
        variant="multiple"
        layout="list"
        showSelectAll={true}
        onSelectAll={setMultipleSelected}
      />
      
      <div style={{ 
        padding: '16px', 
        backgroundColor: '#f8f6fa', 
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <strong>Current State:</strong><br />
        Single: {singleSelected}<br />
        Multiple: {multipleSelected.join(', ') || 'None'}
      </div>
    </div>
  );
};

export const TestEmpty = () => {
  return (
    <Selector
      label="Empty selector"
      options={[]}
      selectedValue=""
      variant="single"
      helperText="No options available"
    />
  );
};