import Tab from './Tab';
import Card from '../Card';

export default {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible tab component with support for icons, keyboard navigation, and accessible design. Perfect for organizing content into logical sections.'
      }
    }
  },
  argTypes: {
    defaultActiveTab: {
      control: { type: 'number', min: 0 },
      description: 'Index of the tab that should be active by default'
    },
    onChange: {
      action: 'tab changed',
      description: 'Callback function called when tab changes'
    }
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    tabs: [
      {
        id: 'tab1',
        label: 'Tab 1',
        content: <div style={{ padding: '20px' }}>Content for Tab 1</div>
      },
      {
        id: 'tab2',
        label: 'Tab 2',
        content: <div style={{ padding: '20px' }}>Content for Tab 2</div>
      },
      {
        id: 'tab3',
        label: 'Tab 3',
        content: <div style={{ padding: '20px' }}>Content for Tab 3</div>
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic tab component with three tabs and simple content.'
      }
    }
  }
};

export const WithIcons = {
  args: {
    tabs: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'fas fa-chart-line',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Dashboard Overview</h3>
            <p>View your key metrics and performance indicators.</p>
          </div>
        )
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'fas fa-cog',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Application Settings</h3>
            <p>Configure your preferences and account settings.</p>
          </div>
        )
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: 'fas fa-user',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>User Profile</h3>
            <p>Manage your personal information and avatar.</p>
          </div>
        )
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab component with FontAwesome icons for better visual hierarchy.'
      }
    }
  }
};

export const AssessmentTabs = {
  render: () => (
    <div style={{ height: '500px' }}>
      <Tab
        tabs={[
          {
            id: 'submission',
            label: 'Submission Type',
            icon: 'fas fa-clipboard-list',
            content: (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
                <Card
                  variant="outlined"
                  hoverable
                  style={{ 
                    border: '1.5px solid #eaecf0',
                    borderRadius: '16px',
                    minHeight: '160px'
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
                      border: '1px solid #e9d7fe'
                    }}>
                      <i className="fas fa-file-alt" style={{ fontSize: '20px', color: '#7f56d9' }}></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                        General Submission
                      </h3>
                      <p style={{ fontSize: '14px', color: '#475467', marginBottom: '12px' }}>
                        Accepts text, code, files, images, audio, and URLs.
                      </p>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: '12px', color: '#667085' }}>
                        <li style={{ marginBottom: '4px' }}>• Text & code responses</li>
                        <li style={{ marginBottom: '4px' }}>• File uploads (documents, images)</li>
                        <li>• Audio recordings & URLs</li>
                      </ul>
                    </div>
                  </div>
                </Card>
                
                <Card
                  variant="outlined"
                  hoverable
                  style={{ 
                    border: '1.5px solid #eaecf0',
                    borderRadius: '16px',
                    minHeight: '160px'
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
                      background: 'linear-gradient(135deg, #eff6ff, #f0f9ff)',
                      border: '1px solid #b9e6fe'
                    }}>
                      <i className="fas fa-code" style={{ fontSize: '20px', color: '#2563eb' }}></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                        Frontend Development
                      </h3>
                      <p style={{ fontSize: '14px', color: '#475467', marginBottom: '12px' }}>
                        Code assessment using HTML, CSS, and JavaScript.
                      </p>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: '12px', color: '#667085' }}>
                        <li style={{ marginBottom: '4px' }}>• Live code editor</li>
                        <li style={{ marginBottom: '4px' }}>• Real-time preview</li>
                        <li>• Cross-browser testing</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            )
          },
          {
            id: 'interview',
            label: 'Interview Type',
            icon: 'fas fa-comments',
            content: (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
                <Card
                  variant="outlined"
                  hoverable
                  style={{ 
                    border: '1.5px solid #eaecf0',
                    borderRadius: '16px',
                    minHeight: '160px'
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
                      background: 'linear-gradient(135deg, #f8fafc, #f9fafb)',
                      border: '1px solid #d0d5dd'
                    }}>
                      <i className="fas fa-robot" style={{ fontSize: '20px', color: '#475467' }}></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                        Structured Bot Interview
                      </h3>
                      <p style={{ fontSize: '14px', color: '#475467', marginBottom: '12px' }}>
                        Standardized interview with consistent questions and evaluation.
                      </p>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: '12px', color: '#667085' }}>
                        <li style={{ marginBottom: '4px' }}>• Consistent question set</li>
                        <li style={{ marginBottom: '4px' }}>• Standardized evaluation</li>
                        <li>• Bias-free assessment</li>
                      </ul>
                    </div>
                  </div>
                </Card>
                
                <Card
                  variant="outlined"
                  hoverable
                  style={{ 
                    border: '1.5px solid #eaecf0',
                    borderRadius: '16px',
                    minHeight: '160px'
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
                      background: 'linear-gradient(135deg, #fdf4ff, #f9f5ff)',
                      border: '1px solid #e9d5ff'
                    }}>
                      <i className="fas fa-brain" style={{ fontSize: '20px', color: '#9333ea' }}></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                        Adaptive AI Interview
                      </h3>
                      <p style={{ fontSize: '14px', color: '#475467', marginBottom: '12px' }}>
                        Dynamic interview that adapts questions based on responses.
                      </p>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: '12px', color: '#667085' }}>
                        <li style={{ marginBottom: '4px' }}>• Dynamic question generation</li>
                        <li style={{ marginBottom: '4px' }}>• Adaptive difficulty levels</li>
                        <li>• Personalized experience</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            )
          }
        ]}
        onChange={(index, tabId) => console.log(`Tab changed to: ${tabId} (index: ${index})`)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example showing assessment type selection with cards in each tab panel. This demonstrates how the Tab component can be used for complex content organization.'
      }
    }
  }
};

export const WithScrollableContent = {
  args: {
    tabs: [
      {
        id: 'long-content',
        label: 'Long Content',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Scrollable Content Example</h3>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                <h4>Section {i + 1}</h4>
                <p>This is a long section with scrollable content. The tab panel will show a custom scrollbar when content overflows.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            ))}
          </div>
        )
      },
      {
        id: 'short-content',
        label: 'Short Content',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Short Content</h3>
            <p>This tab has minimal content that doesn't require scrolling.</p>
          </div>
        )
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the Tab component handles scrollable content with custom scrollbars.'
      }
    }
  }
};

export const DefaultActiveTab = {
  args: {
    defaultActiveTab: 1,
    tabs: [
      {
        id: 'first',
        label: 'First Tab',
        content: <div style={{ padding: '20px' }}>First tab content</div>
      },
      {
        id: 'second',
        label: 'Second Tab (Default Active)',
        content: <div style={{ padding: '20px' }}>This tab is active by default</div>
      },
      {
        id: 'third',
        label: 'Third Tab',
        content: <div style={{ padding: '20px' }}>Third tab content</div>
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how to set a specific tab as active by default using the defaultActiveTab prop.'
      }
    }
  }
};