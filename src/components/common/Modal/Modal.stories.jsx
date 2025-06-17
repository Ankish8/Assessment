import { useState } from 'react';
import Modal from './Modal';
import Button from '../Button';
import Input from '../Input';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg', 'xl', 'full'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'dialog', 'alert', 'confirmation'],
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
    closeOnEscapeKey: {
      control: 'boolean',
    },
    showCloseButton: {
      control: 'boolean',
    },
  },
};

// Helper component for stories
const ModalExample = ({ children, buttonText = 'Open Modal', ...modalProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{buttonText}</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        {...modalProps}
      >
        {children}
      </Modal>
    </>
  );
};

export const Default = {
  render: () => (
    <ModalExample title="Default Modal">
      <p>This is a basic modal with default settings. You can close it by clicking the X button, pressing Escape, or clicking outside the modal.</p>
    </ModalExample>
  ),
};

export const WithSubtitle = {
  render: () => (
    <ModalExample 
      title="Modal with Subtitle"
      subtitle="This subtitle provides additional context"
    >
      <p>This modal includes both a title and subtitle in the header.</p>
    </ModalExample>
  ),
};

export const WithFooter = {
  render: () => (
    <ModalExample 
      title="Modal with Footer"
      footer={
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="ghost">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      }
    >
      <p>This modal includes a footer with action buttons.</p>
    </ModalExample>
  ),
};

export const SmallSize = {
  render: () => (
    <ModalExample 
      size="sm"
      title="Small Modal"
      buttonText="Open Small Modal"
    >
      <p>This is a small modal, perfect for simple confirmations or alerts.</p>
    </ModalExample>
  ),
};

export const LargeSize = {
  render: () => (
    <ModalExample 
      size="lg"
      title="Large Modal"
      buttonText="Open Large Modal"
    >
      <p>This is a large modal with more space for content. It's suitable for forms, detailed information, or complex interactions.</p>
      <p>You can add more content here, and it will be scrollable if it exceeds the modal's maximum height.</p>
    </ModalExample>
  ),
};

export const ExtraLargeSize = {
  render: () => (
    <ModalExample 
      size="xl"
      title="Extra Large Modal"
      buttonText="Open XL Modal"
    >
      <div>
        <p>This is an extra large modal with even more space for complex content.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div>
            <h3>Left Column</h3>
            <p>Content can be organized in multiple columns.</p>
          </div>
          <div>
            <h3>Right Column</h3>
            <p>Perfect for dashboards or detailed forms.</p>
          </div>
        </div>
      </div>
    </ModalExample>
  ),
};

export const FullScreen = {
  render: () => (
    <ModalExample 
      size="full"
      title="Full Screen Modal"
      buttonText="Open Full Screen"
    >
      <div>
        <p>This modal takes up the full screen (with small margins). Perfect for complex interfaces or mobile experiences.</p>
        <div style={{ height: '200px', backgroundColor: 'var(--color-background-secondary)', padding: '20px', marginTop: '20px' }}>
          <p>Content area with lots of space</p>
        </div>
      </div>
    </ModalExample>
  ),
};

export const ConfirmationDialog = {
  render: () => (
    <ModalExample 
      variant="confirmation"
      title="Delete Item"
      subtitle="This action cannot be undone"
      size="sm"
      buttonText="Delete Item"
      footer={
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Delete</Button>
        </div>
      }
    >
      <p>Are you sure you want to delete this item? This action cannot be undone and will permanently remove the item from your account.</p>
    </ModalExample>
  ),
};

export const AlertDialog = {
  render: () => (
    <ModalExample 
      variant="alert"
      title="Error Occurred"
      size="sm"
      buttonText="Trigger Error"
      showCloseButton={false}
      closeOnOverlayClick={false}
      footer={
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button>Acknowledge</Button>
        </div>
      }
    >
      <p>An error occurred while processing your request. Please try again later or contact support if the problem persists.</p>
    </ModalExample>
  ),
};

export const FormModal = {
  render: () => (
    <ModalExample 
      title="Add New User"
      subtitle="Fill in the details to create a new user account"
      size="lg"
      buttonText="Add User"
      footer={
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="ghost">Cancel</Button>
          <Button>Create User</Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Input label="First Name" placeholder="Enter first name" required />
          <Input label="Last Name" placeholder="Enter last name" required />
        </div>
        <Input 
          label="Email" 
          type="email" 
          placeholder="Enter email address" 
          required 
          startIcon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2.5 4L8 8.5L13.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="1.5" y="3" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          }
        />
        <Input label="Role" placeholder="Select role" />
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
            Permissions
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" defaultChecked />
              <span style={{ fontSize: '14px' }}>Read access</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" />
              <span style={{ fontSize: '14px' }}>Write access</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" />
              <span style={{ fontSize: '14px' }}>Admin access</span>
            </label>
          </div>
        </div>
      </div>
    </ModalExample>
  ),
};

export const ScrollableContent = {
  render: () => (
    <ModalExample 
      title="Terms and Conditions"
      subtitle="Please read and accept our terms"
      footer={
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="ghost">Decline</Button>
          <Button>Accept</Button>
        </div>
      }
    >
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <h4>Section {i + 1}</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        ))}
      </div>
    </ModalExample>
  ),
};

export const CustomHeader = {
  render: () => (
    <ModalExample 
      header={
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          width: '100%',
          padding: '24px'
        }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--color-success-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="var(--color-success-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Success!</h2>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Your changes have been saved
            </p>
          </div>
        </div>
      }
      buttonText="Show Success"
    >
      <p>Your profile has been updated successfully. The changes will be visible across all your devices within a few minutes.</p>
    </ModalExample>
  ),
};