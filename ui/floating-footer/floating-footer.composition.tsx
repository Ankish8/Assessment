import React from 'react';
import { FloatingFooter } from './floating-footer';

// Basic FloatingFooter with buttons
export const BasicFloatingFooter = () => {
  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <FloatingFooter>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#f0f0f0', 
          border: '1px solid #d0d0d0',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#611F69', 
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Save
        </button>
      </FloatingFooter>
    </div>
  );
};

// FloatingFooter with validation alert
export const WithValidationAlert = () => {
  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={true}
        validationMessage="Please fill in all required fields"
      >
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#f0f0f0', 
          border: '1px solid #d0d0d0',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#611F69', 
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Save
        </button>
      </FloatingFooter>
    </div>
  );
};

// FloatingFooter with multiple buttons
export const MultipleButtons = () => {
  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <FloatingFooter>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f0f0f0', 
            border: '1px solid #d0d0d0',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Reset
          </button>
          <button style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f0f0f0', 
            border: '1px solid #d0d0d0',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Draft
          </button>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f0f0f0', 
            border: '1px solid #d0d0d0',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
          <button style={{ 
            padding: '8px 16px', 
            backgroundColor: '#611F69', 
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Publish
          </button>
        </div>
      </FloatingFooter>
    </div>
  );
};

// FloatingFooter with custom styling
export const CustomStyled = () => {
  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <FloatingFooter className="custom-footer">
        <button style={{ 
          padding: '12px 24px', 
          backgroundColor: '#dc2626', 
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          Delete
        </button>
        <button style={{ 
          padding: '12px 24px', 
          backgroundColor: '#16a34a', 
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          Confirm
        </button>
      </FloatingFooter>
    </div>
  );
};

// FloatingFooter with long validation message
export const LongValidationMessage = () => {
  return (
    <div style={{ height: '250px', position: 'relative' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={true}
        validationMessage="This is a very long validation message that should wrap properly and display all the important information to the user about what went wrong with their submission"
      >
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#f0f0f0', 
          border: '1px solid #d0d0d0',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Go Back
        </button>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#611F69', 
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Try Again
        </button>
      </FloatingFooter>
    </div>
  );
};

// FloatingFooter with single button
export const SingleButton = () => {
  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <FloatingFooter>
        <div></div>
        <button style={{ 
          padding: '12px 32px', 
          backgroundColor: '#611F69', 
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px'
        }}>
          Continue
        </button>
      </FloatingFooter>
    </div>
  );
};

// FloatingFooter with form controls
export const WithFormControls = () => {
  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <FloatingFooter>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '14px', color: '#666' }}>
            <input type="checkbox" style={{ marginRight: '6px' }} />
            Save as draft
          </label>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f0f0f0', 
            border: '1px solid #d0d0d0',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
          <button style={{ 
            padding: '8px 16px', 
            backgroundColor: '#611F69', 
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Submit
          </button>
        </div>
      </FloatingFooter>
    </div>
  );
};

// FloatingFooter with disabled state
export const DisabledState = () => {
  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={true}
        validationMessage="Form is incomplete"
      >
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#f0f0f0', 
          border: '1px solid #d0d0d0',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button 
          disabled
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#d0d0d0', 
            color: '#888',
            border: 'none',
            borderRadius: '6px',
            cursor: 'not-allowed'
          }}
        >
          Save (Disabled)
        </button>
      </FloatingFooter>
    </div>
  );
};

// FloatingFooter with loading state
export const LoadingState = () => {
  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <FloatingFooter>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#f0f0f0', 
          border: '1px solid #d0d0d0',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#611F69', 
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid #ffffff',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Saving...
        </button>
      </FloatingFooter>
    </div>
  );
};

// FloatingFooter with icons
export const WithIcons = () => {
  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <FloatingFooter>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#f0f0f0', 
          border: '1px solid #d0d0d0',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <i className="fas fa-times"></i>
          Cancel
        </button>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#611F69', 
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <i className="fas fa-check"></i>
          Save
        </button>
      </FloatingFooter>
    </div>
  );
};

// FloatingFooter mobile simulation
export const MobileSimulation = () => {
  return (
    <div style={{ height: '300px', position: 'relative', width: '375px', margin: '0 auto', border: '1px solid #ccc' }}>
      <div style={{ padding: '16px', fontSize: '14px', color: '#666' }}>
        Mobile view simulation (375px width)
      </div>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={true}
        validationMessage="Please check your input"
      >
        <button style={{ 
          padding: '12px 24px', 
          backgroundColor: '#f0f0f0', 
          border: '1px solid #d0d0d0',
          borderRadius: '6px',
          cursor: 'pointer',
          width: '100%'
        }}>
          Cancel
        </button>
        <button style={{ 
          padding: '12px 24px', 
          backgroundColor: '#611F69', 
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          width: '100%'
        }}>
          Submit
        </button>
      </FloatingFooter>
    </div>
  );
};

// FloatingFooter hidden validation
export const HiddenValidation = () => {
  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={false}
        validationMessage="This message is hidden"
      >
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#f0f0f0', 
          border: '1px solid #d0d0d0',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#611F69', 
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Save
        </button>
      </FloatingFooter>
    </div>
  );
};