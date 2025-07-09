import React from 'react';
import FloatingFooter from './FloatingFooter';
import Button from '../Button/Button';

export default {
  title: 'Components/Common/FloatingFooter',
  component: FloatingFooter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A fixed bottom footer component that stays at the bottom of the viewport. Perfect for page-level actions like navigation buttons.'
      }
    }
  },
  argTypes: {
    hasValidationAlert: {
      control: 'boolean',
      description: 'Whether to show validation alerts'
    },
    validationMessage: {
      control: 'text',
      description: 'Validation message to display'
    },
    showAlert: {
      control: 'boolean',
      description: 'Whether to show the alert'
    },
    children: {
      control: false,
      description: 'Content to display in the footer (typically buttons)'
    }
  }
};

// Template for all stories
const Template = (args) => (
  <div style={{ height: '100vh', padding: '20px', paddingBottom: '120px' }}>
    <div style={{ marginBottom: '20px' }}>
      <h1>Page Content</h1>
      <p>This is some page content to show how the floating footer works. Scroll down to see more content.</p>
      
      {/* Add some content to demonstrate scrolling */}
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} style={{ marginBottom: '16px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      ))}
    </div>
    
    <FloatingFooter {...args} />
  </div>
);

// Basic footer with navigation buttons
export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Button variant="ghost">
        <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
        Previous
      </Button>
      <Button variant="primary">
        Save & Continue
        <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
      </Button>
    </>
  )
};

// Footer with validation alert
export const WithValidationAlert = Template.bind({});
WithValidationAlert.args = {
  hasValidationAlert: true,
  validationMessage: 'Please fix the validation errors to continue',
  showAlert: true,
  children: (
    <>
      <Button variant="ghost">
        <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
        Previous
      </Button>
      <Button variant="primary" disabled>
        Save & Continue
        <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
      </Button>
    </>
  )
};

// Footer with multiple actions
export const MultipleActions = Template.bind({});
MultipleActions.args = {
  children: (
    <>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="ghost">
          <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
          Previous
        </Button>
        <Button variant="secondary">
          <i className="fas fa-save" style={{ marginRight: '8px' }}></i>
          Save Draft
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="ghost">
          <i className="fas fa-eye" style={{ marginRight: '8px' }}></i>
          Preview
        </Button>
        <Button variant="primary">
          <i className="fas fa-check" style={{ marginRight: '8px' }}></i>
          Publish
        </Button>
      </div>
    </>
  )
};

// Footer with single centered action
export const SingleAction = Template.bind({});
SingleAction.args = {
  children: (
    <Button variant="primary" style={{ margin: '0 auto' }}>
      <i className="fas fa-check" style={{ marginRight: '8px' }}></i>
      Complete Setup
    </Button>
  )
};

// Footer for form submissions
export const FormActions = Template.bind({});
FormActions.args = {
  children: (
    <>
      <Button variant="ghost">
        Cancel
      </Button>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="secondary">
          Save Draft
        </Button>
        <Button variant="primary">
          Submit
        </Button>
      </div>
    </>
  )
};

// Footer with delete action
export const WithDestructiveAction = Template.bind({});
WithDestructiveAction.args = {
  children: (
    <>
      <Button variant="danger">
        <i className="fas fa-trash" style={{ marginRight: '8px' }}></i>
        Delete
      </Button>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="ghost">
          Cancel
        </Button>
        <Button variant="primary">
          Save Changes
        </Button>
      </div>
    </>
  )
};