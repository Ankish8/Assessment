import React from 'react';
import { Tab } from './tab';

const testTabs = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: <div>Content for Tab 1</div>
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: <div>Content for Tab 2</div>
  },
  {
    id: 'tab3',
    label: 'Tab 3',
    content: <div>Content for Tab 3</div>
  }
];

// Basic component validation tests for Tab
export const TestTabComponent = () => {
  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={testTabs} />
    </div>
  );
};

export const TestWithDefaultTab = () => {
  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={testTabs} defaultActiveTab={1} />
    </div>
  );
};

export const TestWithIcons = () => {
  const iconTabs = [
    {
      id: 'home',
      label: 'Home',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l6 4v8H2V5l6-4z"/></svg>,
      content: <div>Home content</div>
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"/></svg>,
      content: <div>Settings content</div>
    }
  ];

  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={iconTabs} />
    </div>
  );
};

export const TestWithChildren = () => {
  const childrenTabs = [
    { id: 'child1', label: 'Child 1' },
    { id: 'child2', label: 'Child 2' }
  ];

  const children = [
    <div key="1">Children content 1</div>,
    <div key="2">Children content 2</div>
  ];

  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={childrenTabs}>
        {children}
      </Tab>
    </div>
  );
};

export const TestDisabledTabs = () => {
  const disabledTabs = [
    {
      id: 'enabled',
      label: 'Enabled',
      content: <div>This tab is enabled</div>
    },
    {
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      content: <div>This tab is disabled</div>
    },
    {
      id: 'another',
      label: 'Another',
      content: <div>Another enabled tab</div>
    }
  ];

  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={disabledTabs} />
    </div>
  );
};

export const TestEmptyTabs = () => {
  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={[]} />
    </div>
  );
};

export const TestSingleTab = () => {
  const singleTab = [
    {
      id: 'only',
      label: 'Only Tab',
      content: <div>This is the only tab</div>
    }
  ];

  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={singleTab} />
    </div>
  );
};

export const TestManyTabs = () => {
  const manyTabs = Array.from({ length: 8 }, (_, i) => ({
    id: `many${i}`,
    label: `Tab ${i + 1}`,
    content: <div>Content for tab {i + 1}</div>
  }));

  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={manyTabs} />
    </div>
  );
};

export const TestScrollableContent = () => {
  const scrollTabs = [
    {
      id: 'scroll',
      label: 'Scrollable',
      content: (
        <div>
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} style={{ padding: '8px 0' }}>
              Line {i + 1} - This is a long line of content to test scrolling functionality
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'short',
      label: 'Short',
      content: <div>Short content</div>
    }
  ];

  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={scrollTabs} />
    </div>
  );
};

export const TestChangeHandler = () => {
  const [lastChange, setLastChange] = React.useState('None');

  const handleChange = (index: number, tabId: string) => {
    setLastChange(`Tab ${tabId} (index: ${index})`);
  };

  return (
    <div>
      <div style={{ 
        padding: '8px 12px', 
        backgroundColor: '#f8f6fa', 
        borderRadius: '6px', 
        marginBottom: '16px',
        fontSize: '14px'
      }}>
        Last change: {lastChange}
      </div>
      <div style={{ height: '250px' }}>
        <Tab tabs={testTabs} onChange={handleChange} />
      </div>
    </div>
  );
};

export const TestInteractiveState = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [tabData, setTabData] = React.useState({
    tab1Count: 0,
    tab2Count: 0,
    tab3Count: 0
  });

  const interactiveTabs = [
    {
      id: 'counter1',
      label: 'Counter 1',
      content: (
        <div style={{ padding: '20px' }}>
          <h3>Counter 1</h3>
          <p>Count: {tabData.tab1Count}</p>
          <button 
            onClick={() => setTabData(prev => ({ ...prev, tab1Count: prev.tab1Count + 1 }))}
            style={{ padding: '8px 16px', backgroundColor: '#611F69', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Increment
          </button>
        </div>
      )
    },
    {
      id: 'counter2',
      label: 'Counter 2',
      content: (
        <div style={{ padding: '20px' }}>
          <h3>Counter 2</h3>
          <p>Count: {tabData.tab2Count}</p>
          <button 
            onClick={() => setTabData(prev => ({ ...prev, tab2Count: prev.tab2Count + 1 }))}
            style={{ padding: '8px 16px', backgroundColor: '#611F69', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Increment
          </button>
        </div>
      )
    },
    {
      id: 'summary',
      label: 'Summary',
      content: (
        <div style={{ padding: '20px' }}>
          <h3>Summary</h3>
          <p>Counter 1: {tabData.tab1Count}</p>
          <p>Counter 2: {tabData.tab2Count}</p>
          <p>Total: {tabData.tab1Count + tabData.tab2Count}</p>
          <button 
            onClick={() => setTabData({ tab1Count: 0, tab2Count: 0, tab3Count: 0 })}
            style={{ padding: '8px 16px', backgroundColor: '#f04438', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Reset All
          </button>
        </div>
      )
    }
  ];

  return (
    <div style={{ height: '350px' }}>
      <Tab 
        tabs={interactiveTabs} 
        defaultActiveTab={activeTab}
        onChange={(index) => setActiveTab(index)}
      />
    </div>
  );
};