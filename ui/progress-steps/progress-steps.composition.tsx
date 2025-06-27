import React from 'react';
import { ProgressSteps } from './progress-steps';

const sampleSteps = [
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Review' },
  { id: 4, label: 'Complete' }
];

const longSteps = [
  { id: 1, label: 'Project Setup' },
  { id: 2, label: 'Team Configuration' },
  { id: 3, label: 'Environment Setup' },
  { id: 4, label: 'Testing & Validation' },
  { id: 5, label: 'Deployment' },
  { id: 6, label: 'Go Live' }
];

const shortSteps = [
  { id: 1, label: 'Start' },
  { id: 2, label: 'Finish' }
];

export const Step1Active = () => {
  return (
    <ProgressSteps 
      steps={sampleSteps} 
      currentStep={1} 
    />
  );
};

export const Step2Active = () => {
  return (
    <ProgressSteps 
      steps={sampleSteps} 
      currentStep={2} 
    />
  );
};

export const Step3Active = () => {
  return (
    <ProgressSteps 
      steps={sampleSteps} 
      currentStep={3} 
    />
  );
};

export const Step4Active = () => {
  return (
    <ProgressSteps 
      steps={sampleSteps} 
      currentStep={4} 
    />
  );
};

export const AllCompleted = () => {
  return (
    <ProgressSteps 
      steps={sampleSteps} 
      currentStep={5} 
    />
  );
};

export const LongProgressSteps = () => {
  return (
    <ProgressSteps 
      steps={longSteps} 
      currentStep={3} 
    />
  );
};

export const ShortProgressSteps = () => {
  return (
    <ProgressSteps 
      steps={shortSteps} 
      currentStep={2} 
    />
  );
};

export const FormWizard = () => {
  const wizardSteps = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'contact', label: 'Contact Details' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'confirmation', label: 'Confirmation' }
  ];

  return (
    <ProgressSteps 
      steps={wizardSteps} 
      currentStep={2} 
    />
  );
};

export const OnboardingFlow = () => {
  const onboardingSteps = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'profile', label: 'Create Profile' },
    { id: 'verify', label: 'Verify Account' },
    { id: 'setup', label: 'Setup Complete' }
  ];

  return (
    <ProgressSteps 
      steps={onboardingSteps} 
      currentStep={3} 
    />
  );
};

export const CheckoutProcess = () => {
  const checkoutSteps = [
    { id: 'cart', label: 'Shopping Cart' },
    { id: 'shipping', label: 'Shipping Info' },
    { id: 'payment', label: 'Payment' },
    { id: 'review', label: 'Review Order' },
    { id: 'complete', label: 'Order Complete' }
  ];

  return (
    <ProgressSteps 
      steps={checkoutSteps} 
      currentStep={2} 
    />
  );
};

export const ProjectCreation = () => {
  const projectSteps = [
    { id: 'name', label: 'Project Name' },
    { id: 'template', label: 'Choose Template' },
    { id: 'settings', label: 'Configure Settings' },
    { id: 'team', label: 'Invite Team' },
    { id: 'launch', label: 'Launch Project' }
  ];

  return (
    <ProgressSteps 
      steps={projectSteps} 
      currentStep={4} 
    />
  );
};

export const AccountSetup = () => {
  const accountSteps = [
    { id: 'email', label: 'Email Verification' },
    { id: 'password', label: 'Set Password' },
    { id: 'profile', label: 'Profile Setup' },
    { id: 'billing', label: 'Billing Information' },
    { id: 'welcome', label: 'Welcome!' }
  ];

  return (
    <ProgressSteps 
      steps={accountSteps} 
      currentStep={1} 
    />
  );
};