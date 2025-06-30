import ProgressSteps from './ProgressSteps';

const steps = [
  { id: 1, label: 'Question Details' },
  { id: 2, label: 'Default Codes' },
  { id: 3, label: 'Test Cases' },
  { id: 4, label: 'Question Preview' },
  { id: 5, label: 'Settings' },
];

export default {
  title: 'Components/ProgressSteps',
  component: ProgressSteps,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 5 },
    },
  },
};

export const Step1 = {
  args: {
    steps,
    currentStep: 1,
  },
};

export const Step2 = {
  args: {
    steps,
    currentStep: 2,
  },
};

export const Step3 = {
  args: {
    steps,
    currentStep: 3,
  },
};

export const Step4 = {
  args: {
    steps,
    currentStep: 4,
  },
};

export const Step5 = {
  args: {
    steps,
    currentStep: 5,
  },
};