import React from 'react';
import { Form } from './form';

// Basic component validation tests for Form
export const TestFormComponent = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Test form submitted');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>Test form content</div>
    </Form>
  );
};

export const TestFormGroup = () => {
  return (
    <Form.Group columns={2}>
      <div>Column 1</div>
      <div>Column 2</div>
    </Form.Group>
  );
};

export const TestFormSection = () => {
  return (
    <Form.Section title="Test Section" subtitle="Test subtitle">
      <div>Section content</div>
    </Form.Section>
  );
};

export const TestFormActions = () => {
  return (
    <Form.Actions align="right">
      <button type="button">Cancel</button>
      <button type="submit">Submit</button>
    </Form.Actions>
  );
};

export const TestCompleteForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Complete form submitted');
  };

  return (
    <Form onSubmit={handleSubmit} gap="lg">
      <Form.Section title="User Information" subtitle="Enter your details">
        <Form.Group columns={2}>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </Form.Group>
      </Form.Section>
      
      <Form.Actions align="right">
        <button type="button">Cancel</button>
        <button type="submit">Submit</button>
      </Form.Actions>
    </Form>
  );
};