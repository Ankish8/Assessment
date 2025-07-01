import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fn } from '@storybook/test';

import { TabComponent } from '../app/components/tab/tab.component';
import { TabItem } from '../app/components/tab/tab.types';

// Sample tab data
const basicTabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'Overview',
    content: 'This is the Overview tab content. It provides a general summary of the information.'
  },
  {
    id: 'tab2',
    label: 'Details',
    content: 'This is the Details tab content. It contains more specific information and data.'
  },
  {
    id: 'tab3',
    label: 'Settings',
    content: 'This is the Settings tab content. Here you can configure various options.'
  }
];

const iconTabs: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: '🏠',
    content: 'Welcome to the home page. This is your starting point for navigation.'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: '👤',
    content: 'Manage your profile information and personal settings here.'
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: '💬',
    content: 'View and manage your messages and communications.'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: '🔔',
    content: 'Check your notifications and alerts.'
  }
];

const complexTabs: TabItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    content: 'Dashboard with analytics and overview metrics.'
  },
  {
    id: 'users',
    label: 'Users',
    icon: '👥',
    content: 'User management and administration panel.'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '📈',
    content: 'Generate and view detailed reports.'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    content: 'System settings and configuration options.'
  },
  {
    id: 'help',
    label: 'Help',
    icon: '❓',
    disabled: true,
    content: 'Help and documentation (currently disabled).'
  }
];

const meta: Meta<TabComponent> = {
  title: 'Components/Tab',
  component: TabComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule]
    })
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible tab component with multiple variants, sizes, keyboard navigation, and accessibility features.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['line', 'enclosed', 'soft-rounded', 'solid-rounded'],
      description: 'Visual variant of the tabs'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the tabs'
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tabs'
    },
    alignment: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Alignment of the tabs'
    },
    defaultActiveTab: {
      control: { type: 'number', min: 0 },
      description: 'Index of the initially active tab'
    },
    lazyMount: {
      control: 'boolean',
      description: 'Whether to lazy load tab content'
    },
    keepAlive: {
      control: 'boolean',
      description: 'Whether to keep tab content alive when switching'
    },
    scrollable: {
      control: 'boolean',
      description: 'Whether tabs should be scrollable'
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate tab transitions'
    }
  },
  args: {
    tabChange: fn(),
    tabClick: fn(),
    tabFocus: fn(),
    tabBlur: fn(),
    tabKeyDown: fn(),
    tabs: basicTabs,
    defaultActiveTab: 0,
    variant: 'line',
    size: 'medium',
    orientation: 'horizontal',
    alignment: 'start',
    lazyMount: false,
    keepAlive: false,
    scrollable: false,
    animated: true
  }
};

export default meta;
type Story = StoryObj<TabComponent>;

// Basic Tab Stories
export const Default: Story = {
  args: {
    tabs: basicTabs
  }
};

export const WithIcons: Story = {
  args: {
    tabs: iconTabs,
    defaultActiveTab: 0
  }
};

// Variant Stories
export const LineVariant: Story = {
  args: {
    tabs: iconTabs,
    variant: 'line'
  }
};

export const EnclosedVariant: Story = {
  args: {
    tabs: iconTabs,
    variant: 'enclosed'
  }
};

export const SoftRoundedVariant: Story = {
  args: {
    tabs: iconTabs,
    variant: 'soft-rounded'
  }
};

export const SolidRoundedVariant: Story = {
  args: {
    tabs: iconTabs,
    variant: 'solid-rounded'
  }
};

// Size Stories
export const SmallSize: Story = {
  args: {
    tabs: basicTabs,
    size: 'small'
  }
};

export const LargeSize: Story = {
  args: {
    tabs: basicTabs,
    size: 'large'
  }
};

// Orientation Stories
export const VerticalOrientation: Story = {
  args: {
    tabs: iconTabs,
    orientation: 'vertical'
  },
  parameters: {
    layout: 'centered'
  }
};

// Alignment Stories
export const CenterAlignment: Story = {
  args: {
    tabs: basicTabs,
    alignment: 'center'
  }
};

export const EndAlignment: Story = {
  args: {
    tabs: basicTabs,
    alignment: 'end'
  }
};

export const StretchAlignment: Story = {
  args: {
    tabs: basicTabs,
    alignment: 'stretch'
  }
};

// Behavior Stories
export const LazyMount: Story = {
  args: {
    tabs: complexTabs,
    lazyMount: true
  }
};

export const KeepAlive: Story = {
  args: {
    tabs: iconTabs,
    keepAlive: true
  }
};

export const NoAnimation: Story = {
  args: {
    tabs: iconTabs,
    animated: false
  }
};

export const WithDisabledTab: Story = {
  args: {
    tabs: complexTabs,
    defaultActiveTab: 0
  }
};

// Complex Examples
export const ComplexExample: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px;">
        <div>
          <h3 style="margin: 0 0 16px 0; color: #2a1f35;">Dashboard Tabs</h3>
          <app-tab
            [tabs]="dashboardTabs"
            variant="enclosed"
            size="medium"
            [defaultActiveTab]="0"
            [animated]="true">
          </app-tab>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; color: #2a1f35;">Settings Navigation</h3>
          <app-tab
            [tabs]="settingsTabs"
            variant="soft-rounded"
            size="small"
            orientation="vertical"
            [defaultActiveTab]="1"
            [animated]="true">
          </app-tab>
        </div>
      </div>
    `,
    props: {
      dashboardTabs: [
        {
          id: 'analytics',
          label: 'Analytics',
          icon: '📊',
          content: `
            <div style="padding: 20px;">
              <h4>Analytics Overview</h4>
              <p>View detailed analytics and performance metrics for your application.</p>
              <ul>
                <li>User engagement statistics</li>
                <li>Traffic analysis</li>
                <li>Conversion rates</li>
                <li>Performance monitoring</li>
              </ul>
            </div>
          `
        },
        {
          id: 'users',
          label: 'Users',
          icon: '👥',
          content: `
            <div style="padding: 20px;">
              <h4>User Management</h4>
              <p>Manage user accounts, permissions, and access controls.</p>
              <div style="margin-top: 16px;">
                <strong>Recent Activity:</strong>
                <ul style="margin-top: 8px;">
                  <li>5 new user registrations</li>
                  <li>12 profile updates</li>
                  <li>3 permission changes</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: 'content',
          label: 'Content',
          icon: '📝',
          content: `
            <div style="padding: 20px;">
              <h4>Content Management</h4>
              <p>Create, edit, and organize your content library.</p>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
                <div style="padding: 12px; background: #f8f6fa; border-radius: 8px;">
                  <strong>Articles</strong><br>
                  <span style="color: #6b5671;">24 published</span>
                </div>
                <div style="padding: 12px; background: #f8f6fa; border-radius: 8px;">
                  <strong>Media</strong><br>
                  <span style="color: #6b5671;">156 files</span>
                </div>
              </div>
            </div>
          `
        }
      ],
      settingsTabs: [
        {
          id: 'general',
          label: 'General',
          content: `
            <div style="padding: 20px;">
              <h4>General Settings</h4>
              <p>Configure basic application settings and preferences.</p>
            </div>
          `
        },
        {
          id: 'security',
          label: 'Security',
          content: `
            <div style="padding: 20px;">
              <h4>Security Settings</h4>
              <p>Manage security policies, authentication, and access controls.</p>
            </div>
          `
        },
        {
          id: 'notifications',
          label: 'Notifications',
          content: `
            <div style="padding: 20px;">
              <h4>Notification Settings</h4>
              <p>Customize how and when you receive notifications.</p>
            </div>
          `
        },
        {
          id: 'integrations',
          label: 'Integrations',
          content: `
            <div style="padding: 20px;">
              <h4>Third-party Integrations</h4>
              <p>Connect with external services and APIs.</p>
            </div>
          `
        }
      ]
    }
  })
};

export const VariantComparison: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #2a1f35;">Line Variant</h4>
          <app-tab [tabs]="comparisonTabs" variant="line"></app-tab>
        </div>
        
        <div>
          <h4 style="margin: 0 0 16px 0; color: #2a1f35;">Enclosed Variant</h4>
          <app-tab [tabs]="comparisonTabs" variant="enclosed"></app-tab>
        </div>
        
        <div>
          <h4 style="margin: 0 0 16px 0; color: #2a1f35;">Soft Rounded Variant</h4>
          <app-tab [tabs]="comparisonTabs" variant="soft-rounded"></app-tab>
        </div>
        
        <div>
          <h4 style="margin: 0 0 16px 0; color: #2a1f35;">Solid Rounded Variant</h4>
          <app-tab [tabs]="comparisonTabs" variant="solid-rounded"></app-tab>
        </div>
      </div>
    `,
    props: {
      comparisonTabs: [
        {
          id: 'tab1',
          label: 'First',
          content: 'Content for the first tab.'
        },
        {
          id: 'tab2',
          label: 'Second',
          content: 'Content for the second tab.'
        },
        {
          id: 'tab3',
          label: 'Third',
          content: 'Content for the third tab.'
        }
      ]
    }
  })
};

export const SizeComparison: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #2a1f35;">Small Size</h4>
          <app-tab [tabs]="sizeTabs" size="small" variant="enclosed"></app-tab>
        </div>
        
        <div>
          <h4 style="margin: 0 0 16px 0; color: #2a1f35;">Medium Size (Default)</h4>
          <app-tab [tabs]="sizeTabs" size="medium" variant="enclosed"></app-tab>
        </div>
        
        <div>
          <h4 style="margin: 0 0 16px 0; color: #2a1f35;">Large Size</h4>
          <app-tab [tabs]="sizeTabs" size="large" variant="enclosed"></app-tab>
        </div>
      </div>
    `,
    props: {
      sizeTabs: [
        {
          id: 'first',
          label: 'First Tab',
          icon: '1️⃣',
          content: 'This is the first tab content.'
        },
        {
          id: 'second',
          label: 'Second Tab',
          icon: '2️⃣',
          content: 'This is the second tab content.'
        }
      ]
    }
  })
};

export const KeyboardNavigation: Story = {
  args: {
    tabs: iconTabs,
    variant: 'enclosed'
  },
  parameters: {
    docs: {
      description: {
        story: 'Try keyboard navigation: Use Arrow keys to navigate, Enter/Space to select, Home/End to jump to first/last tab.'
      }
    }
  }
};