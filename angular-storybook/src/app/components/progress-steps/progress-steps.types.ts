export interface StepConfig {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  optional?: boolean;
  completed?: boolean;
  error?: boolean;
  href?: string;
  clickable?: boolean;
}

export interface ProgressStepsConfig {
  steps: StepConfig[];
  currentStep: number;
  allowNavigation?: boolean;
  showLabels?: boolean;
  showDescriptions?: boolean;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'compact' | 'minimal';
  size?: 'small' | 'medium' | 'large';
}

export interface StepClickEvent {
  step: StepConfig;
  index: number;
  previousIndex: number;
}

export type StepState = 'pending' | 'active' | 'completed' | 'error' | 'disabled' | 'optional';
export type StepOrientation = 'horizontal' | 'vertical';
export type StepVariant = 'default' | 'compact' | 'minimal';
export type StepSize = 'small' | 'medium' | 'large';