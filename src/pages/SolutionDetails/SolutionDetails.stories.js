import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SolutionDetails from './SolutionDetails';

export default {
  title: 'Pages/SolutionDetails',
  component: SolutionDetails,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Step 5 of the question creation flow. Allows instructors to provide comprehensive solution details with multiple content types using progressive disclosure UX pattern.'
      }
    }
  }
};

// Wrapper to provide router context
const WithRouter = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

// Template for all stories
const Template = (args) => <SolutionDetails {...args} />;

// Default state - no solution types selected
export const Default = Template.bind({});
Default.decorators = [WithRouter];
Default.parameters = {
  docs: {
    description: {
      story: 'Initial state of the Solution Details page with solution type selection interface.'
    }
  }
};

// With Written Explanation selected
export const WithWrittenExplanation = Template.bind({});
WithWrittenExplanation.decorators = [WithRouter];
WithWrittenExplanation.parameters = {
  docs: {
    description: {
      story: 'Shows the interface when "Written Explanation" solution type is selected, displaying the rich text editor.'
    }
  }
};

// With Code Solution selected
export const WithCodeSolution = Template.bind({});
WithCodeSolution.decorators = [WithRouter];
WithCodeSolution.parameters = {
  docs: {
    description: {
      story: 'Shows the interface when "Code Solution" is selected, displaying the code editor with language selection.'
    }
  }
};

// With External Resource selected
export const WithExternalResource = Template.bind({});
WithExternalResource.decorators = [WithRouter];
WithExternalResource.parameters = {
  docs: {
    description: {
      story: 'Shows the interface when "External Resource" is selected, displaying the URL input field.'
    }
  }
};

// With File Attachments selected
export const WithFileAttachments = Template.bind({});
WithFileAttachments.decorators = [WithRouter];
WithFileAttachments.parameters = {
  docs: {
    description: {
      story: 'Shows the interface when "File Attachments" is selected, displaying the file upload area.'
    }
  }
};

// With Multiple Types (Recommended combination)
export const WithMultipleTypes = Template.bind({});
WithMultipleTypes.decorators = [WithRouter];
WithMultipleTypes.parameters = {
  docs: {
    description: {
      story: 'Shows the complete interface when both recommended solution types (Written Explanation + Code Solution) are selected.'
    }
  }
};

// With All Types Selected
export const WithAllTypes = Template.bind({});
WithAllTypes.decorators = [WithRouter];
WithAllTypes.parameters = {
  docs: {
    description: {
      story: 'Shows the full interface when all solution types are selected, demonstrating the complete feature set.'
    }
  }
};

// Mobile View
export const Mobile = Template.bind({});
Mobile.decorators = [WithRouter];
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  },
  docs: {
    description: {
      story: 'Mobile responsive view of the Solution Details page showing the adapted layout for smaller screens.'
    }
  }
};

// Tablet View
export const Tablet = Template.bind({});
Tablet.decorators = [WithRouter];
Tablet.parameters = {
  viewport: {
    defaultViewport: 'tablet'
  },
  docs: {
    description: {
      story: 'Tablet view showing the intermediate responsive breakpoint with single-column card layout.'
    }
  }
};

// Design System Showcase
export const DesignSystemShowcase = () => (
  <BrowserRouter>
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px', color: '#1a202c' }}>Solution Details - Design System</h1>
      
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', color: '#2d3748' }}>Typography Hierarchy</h2>
        <div style={{ display: 'grid', gap: '16px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c', marginBottom: '4px' }}>
              Main Section Title (20px, 600)
            </div>
            <div style={{ fontSize: '14px', color: '#718096' }}>
              var(--font-size-xl) / var(--font-weight-semibold)
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', marginBottom: '4px' }}>
              Option/Content Title (16px, 600)
            </div>
            <div style={{ fontSize: '14px', color: '#718096' }}>
              var(--font-size-base) / var(--font-weight-semibold)
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '14px', color: '#4a5568', marginBottom: '4px' }}>
              Description Text (14px, 400)
            </div>
            <div style={{ fontSize: '14px', color: '#718096' }}>
              var(--font-size-sm) / var(--font-weight-normal)
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: '#2d3748', marginBottom: '4px' }}>
              Field Labels (14px, 500)
            </div>
            <div style={{ fontSize: '14px', color: '#718096' }}>
              var(--font-size-sm) / var(--font-weight-medium)
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '12px', fontWeight: '500', color: '#2d3748', marginBottom: '4px' }}>
              Small Details/Badges (12px, 500)
            </div>
            <div style={{ fontSize: '14px', color: '#718096' }}>
              var(--font-size-xs) / var(--font-weight-medium)
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px', color: '#2d3748' }}>UX Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Progressive Disclosure</h3>
            <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>Only show relevant fields based on user selection</p>
          </div>
          
          <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Contextual Guidance</h3>
            <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>Each option explains when and why to use it</p>
          </div>
          
          <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Visual Hierarchy</h3>
            <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>Recommended options highlighted with badges</p>
          </div>
          
          <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Smart Validation</h3>
            <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>Context-aware validation based on selections</p>
          </div>
        </div>
      </div>
      
      <SolutionDetails />
    </div>
  </BrowserRouter>
);

DesignSystemShowcase.parameters = {
  docs: {
    description: {
      story: 'Complete design system showcase demonstrating typography hierarchy, UX features, and the full Solution Details page implementation.'
    }
  }
};