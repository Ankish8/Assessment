import React from 'react';
import { Modal } from './modal';

export const DirectModal = () => {
  // Modal that's always open - no button needed
  return (
    <Modal
      isOpen={true}
      onClose={() => console.log('Modal close attempted')}
      title="Direct Modal"
      subtitle="This modal is always open for testing"
    >
      <p>This modal is rendered directly without any button interaction.</p>
      <p>If you can see this, the modal component is working!</p>
    </Modal>
  );
};

export const BasicModal = () => {
  return (
    <Modal
      isOpen={true}
      onClose={() => console.log('Basic modal close attempted')}
      title="Basic Modal"
      subtitle="This is a basic modal example"
    >
      <p>This is the modal content. You can put any content here.</p>
      <p>Click the overlay or press Escape to close the modal.</p>
    </Modal>
  );
};

export const SmallModal = () => {
  return (
    <Modal
      isOpen={true}
      onClose={() => console.log('Small modal close attempted')}
      size="sm"
      title="Small Modal"
    >
      <p>This is a small modal with constrained width.</p>
    </Modal>
  );
};

export const LargeModal = () => {
  return (
    <Modal
      isOpen={true}
      onClose={() => console.log('Large modal close attempted')}
      size="lg"
      title="Large Modal"
      subtitle="This modal has more space for content"
    >
      <div>
        <h3>Section 1</h3>
        <p>This is a large modal with more content space. You can include multiple sections, forms, or complex layouts.</p>
        
        <h3>Section 2</h3>
        <p>The modal will automatically handle scrolling if the content exceeds the available height.</p>
        
        <h3>Section 3</h3>
        <p>All accessibility features are maintained regardless of the modal size.</p>
      </div>
    </Modal>
  );
};

export const AlertModal = () => {
  return (
    <Modal
      isOpen={true}
      onClose={() => console.log('Alert modal close attempted')}
      variant="alert"
      title="Alert"
      subtitle="This action cannot be undone"
    >
      <p>Are you sure you want to proceed? This action will permanently delete the selected items.</p>
    </Modal>
  );
};

export const ConfirmationModal = () => {
  return (
    <Modal
      isOpen={true}
      onClose={() => console.log('Confirmation modal close attempted')}
      variant="confirmation"
      title="Confirm Action"
      subtitle="Please review your selection"
    >
      <p>You are about to save changes to 5 items. Do you want to continue?</p>
    </Modal>
  );
};

export const WithFooter = () => {
  const footerButtons = (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
      <button
        onClick={() => console.log('Cancel clicked')}
        style={{
          padding: '8px 16px',
          backgroundColor: 'transparent',
          color: '#6b5671',
          border: '1px solid #ddd6e3',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Cancel
      </button>
      <button
        onClick={() => console.log('Confirm clicked')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#611F69',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Confirm
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={true}
      onClose={() => console.log('Footer modal close attempted')}
      title="Modal with Footer"
      subtitle="This modal includes action buttons in the footer"
      footer={footerButtons}
    >
      <p>This modal demonstrates how to use the footer prop to add action buttons or other content at the bottom of the modal.</p>
    </Modal>
  );
};

export const CustomHeader = () => {
  const customHeader = (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#611F69',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '600'
        }}>
          !
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#2a1f35' }}>
            Custom Header
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#6b5671' }}>
            With custom icon and styling
          </p>
        </div>
      </div>
      <button
        onClick={() => console.log('Custom close clicked')}
        style={{
          background: 'none',
          border: 'none',
          padding: '8px',
          borderRadius: '6px',
          color: '#8a7490',
          cursor: 'pointer',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={true}
      onClose={() => console.log('Custom header modal close attempted')}
      header={customHeader}
      showCloseButton={false}
    >
      <p>This modal uses a completely custom header with an icon and custom styling.</p>
      <p>The default close button is disabled since we have a custom one in the header.</p>
    </Modal>
  );
};