import React from 'react';
import { Modal } from './modal';

// Basic component validation tests for Modal
export const TestModalComponent = () => {
  return (
    <div>
      <Modal isOpen={true} title="Test Modal">
        <p>Modal content for testing</p>
      </Modal>
    </div>
  );
};

export const TestModalClosed = () => {
  return (
    <div>
      <Modal isOpen={false} title="Closed Modal">
        <p>This modal should not be visible</p>
      </Modal>
    </div>
  );
};

export const TestModalVariants = () => {
  return (
    <div>
      <Modal isOpen={true} variant="alert" title="Alert Modal">
        <p>Alert variant modal</p>
      </Modal>
    </div>
  );
};

export const TestModalSizes = () => {
  return (
    <div>
      <Modal isOpen={true} size="sm" title="Small Modal">
        <p>Small size modal</p>
      </Modal>
    </div>
  );
};