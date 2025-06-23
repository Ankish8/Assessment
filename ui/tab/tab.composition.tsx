import React from 'react';
import { Tab } from './tab';

const basicTabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div style={{ padding: '20px' }}>
        <h3>Overview Content</h3>
        <p>This is the overview tab content. It contains general information about the project.</p>
        <ul>
          <li>Project status: Active</li>
          <li>Team members: 5</li>
          <li>Completion: 75%</li>
        </ul>
      </div>
    )
  },
  {
    id: 'details',
    label: 'Details',
    content: (
      <div style={{ padding: '20px' }}>
        <h3>Detailed Information</h3>
        <p>Here you can find detailed information about the project specifications.</p>
        <div style={{ backgroundColor: '#f8f6fa', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
          <strong>Technical Details:</strong>
          <br />• Framework: React
          <br />• Language: TypeScript
          <br />• Build Tool: Vite
        </div>
      </div>
    )
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div style={{ padding: '20px' }}>
        <h3>Project Settings</h3>
        <p>Configure your project settings here.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" defaultChecked />
            Enable notifications
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            Auto-save changes
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" defaultChecked />
            Dark mode
          </label>
        </div>
      </div>
    )
  }
];

const iconTabs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2h5v5H2V2zm7 0h5v5H9V2zM2 9h5v5H2V9zm7 0h5v5H9V9z"/></svg>,
    content: (
      <div style={{ padding: '20px' }}>
        <h3>📊 Dashboard</h3>
        <p>Welcome to your dashboard! Here you can see an overview of all your activities.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div style={{ padding: '16px', backgroundColor: '#f8f6fa', borderRadius: '8px' }}>
            <strong>Total Projects</strong><br />12
          </div>
          <div style={{ padding: '16px', backgroundColor: '#f8f6fa', borderRadius: '8px' }}>
            <strong>Active Tasks</strong><br />8
          </div>
          <div style={{ padding: '16px', backgroundColor: '#f8f6fa', borderRadius: '8px' }}>
            <strong>Team Members</strong><br />5
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M1 11l3-3 3 3 6-6v2l-6 6-3-3-3 3V11z"/></svg>,
    content: (
      <div style={{ padding: '20px' }}>
        <h3>📈 Analytics</h3>
        <p>Track your performance with detailed analytics and insights.</p>
        <div style={{ marginTop: '20px' }}>
          <div style={{ height: '200px', backgroundColor: '#f8f6fa', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#6b5671' }}>
            [Chart Placeholder]
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2h12v12H2V2zm1 1v10h10V3H3zm2 2h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z"/></svg>,
    content: (
      <div style={{ padding: '20px' }}>
        <h3>📄 Reports</h3>
        <p>Generate and view various reports for your projects.</p>
        <div style={{ marginTop: '20px' }}>
          <button style={{ padding: '8px 16px', marginRight: '8px', backgroundColor: '#611F69', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Generate Report
          </button>
          <button style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#611F69', border: '1px solid #611F69', borderRadius: '6px', cursor: 'pointer' }}>
            Export Data
          </button>
        </div>
      </div>
    )
  }
];

const longContentTabs = [
  {
    id: 'long1',
    label: 'Documentation',
    content: (
      <div style={{ padding: '20px' }}>
        <h3>📚 Documentation</h3>
        <p>Comprehensive documentation for the project.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <h4>Section {i + 1}</h4>
            <p>This is section {i + 1} of the documentation. It contains detailed information about various aspects of the project. The content is designed to test the scrolling functionality of the tab component.</p>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'long2',
    label: 'Code Examples',
    content: (
      <div style={{ padding: '20px' }}>
        <h3>💻 Code Examples</h3>
        <p>Various code examples and snippets.</p>
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <h4>Example {i + 1}</h4>
            <div style={{ backgroundColor: '#f8f6fa', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px' }}>
              <code>
                {`function example${i + 1}() {
  console.log('This is example ${i + 1}');
  return 'Hello World';
}`}
              </code>
            </div>
          </div>
        ))}
      </div>
    )
  }
];

export const BasicTabs = () => {
  return (
    <div style={{ height: '400px' }}>
      <Tab tabs={basicTabs} />
    </div>
  );
};

export const WithIcons = () => {
  return (
    <div style={{ height: '400px' }}>
      <Tab tabs={iconTabs} />
    </div>
  );
};

export const WithScrollableContent = () => {
  return (
    <div style={{ height: '500px' }}>
      <Tab tabs={longContentTabs} />
    </div>
  );
};

export const WithChildren = () => {
  const childrenTabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' }
  ];

  const children = [
    <div key="1" style={{ padding: '20px' }}>
      <h3>First Tab Content</h3>
      <p>This content is passed as children rather than in the tab configuration.</p>
    </div>,
    <div key="2" style={{ padding: '20px' }}>
      <h3>Second Tab Content</h3>
      <p>Each child corresponds to a tab in the same order.</p>
    </div>,
    <div key="3" style={{ padding: '20px' }}>
      <h3>Third Tab Content</h3>
      <p>This approach is useful when you want to define content separately.</p>
    </div>
  ];

  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={childrenTabs}>
        {children}
      </Tab>
    </div>
  );
};

export const WithDisabledTab = () => {
  const disabledTabs = [
    {
      id: 'available',
      label: 'Available',
      content: (
        <div style={{ padding: '20px' }}>
          <h3>Available Content</h3>
          <p>This tab is available and can be clicked.</p>
        </div>
      )
    },
    {
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      content: (
        <div style={{ padding: '20px' }}>
          <h3>Disabled Content</h3>
          <p>This content should not be accessible.</p>
        </div>
      )
    },
    {
      id: 'another',
      label: 'Another Tab',
      content: (
        <div style={{ padding: '20px' }}>
          <h3>Another Tab</h3>
          <p>This is another available tab.</p>
        </div>
      )
    }
  ];

  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={disabledTabs} />
    </div>
  );
};

export const CustomDefaultTab = () => {
  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={basicTabs} defaultActiveTab={1} />
    </div>
  );
};

export const WithChangeHandler = () => {
  const [activeInfo, setActiveInfo] = React.useState({ index: 0, id: 'overview' });

  const handleTabChange = (index: number, tabId: string) => {
    setActiveInfo({ index, id: tabId });
    console.log(`Tab changed to: ${tabId} (index: ${index})`);
  };

  return (
    <div>
      <div style={{ 
        padding: '12px 16px', 
        backgroundColor: '#f8f6fa', 
        borderRadius: '8px', 
        marginBottom: '16px',
        fontSize: '14px'
      }}>
        <strong>Active Tab:</strong> {activeInfo.id} (Index: {activeInfo.index})
      </div>
      <div style={{ height: '300px' }}>
        <Tab tabs={basicTabs} onChange={handleTabChange} />
      </div>
    </div>
  );
};

export const TwoTabsOnly = () => {
  const twoTabs = [
    {
      id: 'first',
      label: 'First',
      content: (
        <div style={{ padding: '20px' }}>
          <h3>First Tab</h3>
          <p>This is the first of two tabs.</p>
        </div>
      )
    },
    {
      id: 'second',
      label: 'Second',
      content: (
        <div style={{ padding: '20px' }}>
          <h3>Second Tab</h3>
          <p>This is the second tab.</p>
        </div>
      )
    }
  ];

  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={twoTabs} />
    </div>
  );
};

export const ManyTabs = () => {
  const manyTabs = Array.from({ length: 6 }, (_, i) => ({
    id: `tab${i + 1}`,
    label: `Tab ${i + 1}`,
    content: (
      <div style={{ padding: '20px' }}>
        <h3>Tab {i + 1} Content</h3>
        <p>This is the content for tab number {i + 1}.</p>
      </div>
    )
  }));

  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={manyTabs} />
    </div>
  );
};

export const EmptyContent = () => {
  const emptyTabs = [
    { id: 'empty1', label: 'Empty 1' },
    { id: 'empty2', label: 'Empty 2' },
    { id: 'empty3', label: 'Empty 3' }
  ];

  return (
    <div style={{ height: '300px' }}>
      <Tab tabs={emptyTabs} />
    </div>
  );
};