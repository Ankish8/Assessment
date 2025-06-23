import React from 'react';
import { FloatingFooter } from './floating-footer';

// Basic component validation tests for FloatingFooter
export const TestBasicComponent = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter>
        <button>Test Button</button>
      </FloatingFooter>
    </div>
  );
};

export const TestWithValidation = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={true}
        validationMessage="Test validation message"
      >
        <button>Test Button</button>
      </FloatingFooter>
    </div>
  );
};

export const TestWithoutValidation = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter
        hasValidationAlert={false}
        showAlert={false}
        validationMessage="This should not show"
      >
        <button>Test Button</button>
      </FloatingFooter>
    </div>
  );
};

export const TestHiddenAlert = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={false}
        validationMessage="Hidden message"
      >
        <button>Test Button</button>
      </FloatingFooter>
    </div>
  );
};

export const TestCustomClassName = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter className="custom-footer-class">
        <button>Test Button</button>
      </FloatingFooter>
    </div>
  );
};

export const TestMultipleChildren = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </FloatingFooter>
    </div>
  );
};

export const TestEmptyValidationMessage = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={true}
        validationMessage=""
      >
        <button>Test Button</button>
      </FloatingFooter>
    </div>
  );
};

export const TestLongValidationMessage = () => {
  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={true}
        validationMessage="This is a very long validation message that should test how the component handles lengthy text content and whether it wraps properly within the available space"
      >
        <button>Test Button</button>
      </FloatingFooter>
    </div>
  );
};

export const TestValidationFlags = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ height: '150px', position: 'relative' }}>
        <h4>hasValidationAlert=true, showAlert=true</h4>
        <FloatingFooter
          hasValidationAlert={true}
          showAlert={true}
          validationMessage="Alert should show"
        >
          <button>Test</button>
        </FloatingFooter>
      </div>
      
      <div style={{ height: '150px', position: 'relative' }}>
        <h4>hasValidationAlert=true, showAlert=false</h4>
        <FloatingFooter
          hasValidationAlert={true}
          showAlert={false}
          validationMessage="Alert should not show"
        >
          <button>Test</button>
        </FloatingFooter>
      </div>
      
      <div style={{ height: '150px', position: 'relative' }}>
        <h4>hasValidationAlert=false, showAlert=true</h4>
        <FloatingFooter
          hasValidationAlert={false}
          showAlert={true}
          validationMessage="Alert should not show"
        >
          <button>Test</button>
        </FloatingFooter>
      </div>
    </div>
  );
};

export const TestDefaultProps = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter>
        <button>With Default Props</button>
      </FloatingFooter>
    </div>
  );
};

export const TestComplexChildren = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button>Left Group 1</button>
          <button>Left Group 2</button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button>Right Group 1</button>
          <button>Right Group 2</button>
        </div>
      </FloatingFooter>
    </div>
  );
};

export const TestSingleChild = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter>
        <button style={{ width: '100%' }}>Single Full Width Button</button>
      </FloatingFooter>
    </div>
  );
};

export const TestNoChildren = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter>
        {null}
      </FloatingFooter>
    </div>
  );
};

export const TestValidationMessageWithSpecialChars = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={true}
        validationMessage="Error: Invalid input! Please check & try again."
      >
        <button>Test Button</button>
      </FloatingFooter>
    </div>
  );
};

export const TestWithIcons = () => {
  return (
    <div style={{ height: '150px', position: 'relative' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={true}
        validationMessage="Form validation failed"
      >
        <button style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <i className="fas fa-times"></i>
          Cancel
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <i className="fas fa-check"></i>
          Save
        </button>
      </FloatingFooter>
    </div>
  );
};

export const TestMobileLayout = () => {
  return (
    <div style={{ width: '375px', height: '200px', position: 'relative', border: '1px solid #ccc' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={true}
        validationMessage="Mobile layout test"
      >
        <button style={{ padding: '12px 16px' }}>Cancel</button>
        <button style={{ padding: '12px 16px' }}>Save</button>
      </FloatingFooter>
    </div>
  );
};

export const TestSmallMobileLayout = () => {
  return (
    <div style={{ width: '320px', height: '200px', position: 'relative', border: '1px solid #ccc' }}>
      <FloatingFooter
        hasValidationAlert={true}
        showAlert={true}
        validationMessage="Small mobile test"
      >
        <button style={{ padding: '12px 16px' }}>Cancel</button>
        <button style={{ padding: '12px 16px' }}>Save</button>
      </FloatingFooter>
    </div>
  );
};