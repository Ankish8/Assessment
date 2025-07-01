import type { Meta, StoryObj } from '@storybook/angular';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { fn } from '@storybook/test';

import { FormComponent, FormSection } from '../app/components/form/form.component';
import { InputComponent } from '../app/components/input/input.component';

const meta: Meta<FormComponent> = {
  title: 'Components/Form',
  component: FormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, InputComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible form component with multiple layout options, validation, sections, and submit states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['single', 'two-column', 'grid', 'inline'],
      description: 'Form layout variant'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg'],
      description: 'Form size affecting spacing and typography'
    },
    submitState: {
      control: { type: 'select' },
      options: ['idle', 'loading', 'success', 'error'],
      description: 'Current submit state of the form'
    },
    validationMode: {
      control: { type: 'select' },
      options: ['onSubmit', 'onChange', 'onBlur'],
      description: 'When to show validation errors'
    },
    showCancel: {
      control: 'boolean',
      description: 'Show cancel button'
    },
    submitDisabled: {
      control: 'boolean',
      description: 'Disable submit button'
    },
    submitText: {
      control: 'text',
      description: 'Submit button text'
    },
    cancelText: {
      control: 'text',
      description: 'Cancel button text'
    }
  },
  args: {
    onSubmit: fn(),
    onCancel: fn(),
    onValidationChange: fn(),
    onSectionToggle: fn(),
    onFieldChange: fn(),
    layout: 'single',
    size: 'base',
    submitState: 'idle',
    validationMode: 'onSubmit',
    showCancel: false,
    submitDisabled: false,
    submitText: 'Submit',
    cancelText: 'Cancel'
  }
};

export default meta;
type Story = StoryObj<FormComponent>;

// Helper function to create form group
function createContactForm(): FormGroup {
  const fb = new FormBuilder();
  return fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });
}

export const BasicForm: Story = {
  args: {
    formGroup: createContactForm(),
    submitText: 'Send Message'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-form
        [formGroup]="formGroup"
        [layout]="layout"
        [size]="size"
        [submitState]="submitState"
        [validationMode]="validationMode"
        [showCancel]="showCancel"
        [submitDisabled]="submitDisabled"
        [submitText]="submitText"
        [cancelText]="cancelText"
        (onSubmit)="onSubmit($event)"
        (onCancel)="onCancel($event)"
        (onValidationChange)="onValidationChange($event)">
        
        <app-input
          formControlName="firstName"
          label="First Name"
          placeholder="Enter your first name..."
          required="true">
        </app-input>
        
        <app-input
          formControlName="lastName"
          label="Last Name"
          placeholder="Enter your last name..."
          required="true">
        </app-input>
        
        <app-input
          formControlName="email"
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          required="true">
        </app-input>
        
        <app-input
          formControlName="phone"
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567">
        </app-input>
        
        <app-input
          formControlName="message"
          label="Message"
          placeholder="Enter your message..."
          required="true"
          helperText="Minimum 10 characters">
        </app-input>
      </app-form>
    `
  })
};

export const TwoColumnLayout: Story = {
  args: {
    formGroup: createContactForm(),
    layout: 'two-column',
    submitText: 'Submit Form'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-form
        [formGroup]="formGroup"
        [layout]="layout"
        [size]="size"
        [submitState]="submitState"
        [validationMode]="validationMode"
        [showCancel]="showCancel"
        [submitDisabled]="submitDisabled"
        [submitText]="submitText"
        [cancelText]="cancelText"
        (onSubmit)="onSubmit($event)"
        (onCancel)="onCancel($event)"
        (onValidationChange)="onValidationChange($event)">
        
        <app-input
          formControlName="firstName"
          label="First Name"
          placeholder="Enter first name..."
          required="true">
        </app-input>
        
        <app-input
          formControlName="lastName"
          label="Last Name"
          placeholder="Enter last name..."
          required="true">
        </app-input>
        
        <app-input
          formControlName="email"
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          required="true">
        </app-input>
        
        <app-input
          formControlName="phone"
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567">
        </app-input>
        
        <app-input
          formControlName="message"
          label="Message"
          placeholder="Enter your message..."
          required="true"
          helperText="Minimum 10 characters">
        </app-input>
      </app-form>
    `
  })
};

export const WithCancel: Story = {
  args: {
    formGroup: createContactForm(),
    showCancel: true,
    submitText: 'Save Changes',
    cancelText: 'Discard'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-form
        [formGroup]="formGroup"
        [layout]="layout"
        [size]="size"
        [submitState]="submitState"
        [validationMode]="validationMode"
        [showCancel]="showCancel"
        [submitDisabled]="submitDisabled"
        [submitText]="submitText"
        [cancelText]="cancelText"
        (onSubmit)="onSubmit($event)"
        (onCancel)="onCancel($event)"
        (onValidationChange)="onValidationChange($event)">
        
        <app-input
          formControlName="firstName"
          label="First Name"
          placeholder="Enter first name..."
          required="true">
        </app-input>
        
        <app-input
          formControlName="lastName"
          label="Last Name"
          placeholder="Enter last name..."
          required="true">
        </app-input>
        
        <app-input
          formControlName="email"
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          required="true">
        </app-input>
      </app-form>
    `
  })
};

export const LoadingState: Story = {
  args: {
    formGroup: createContactForm(),
    submitState: 'loading',
    submitText: 'Saving...'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-form
        [formGroup]="formGroup"
        [layout]="layout"
        [size]="size"
        [submitState]="submitState"
        [validationMode]="validationMode"
        [showCancel]="showCancel"
        [submitDisabled]="submitDisabled"
        [submitText]="submitText"
        [cancelText]="cancelText"
        (onSubmit)="onSubmit($event)"
        (onCancel)="onCancel($event)"
        (onValidationChange)="onValidationChange($event)">
        
        <app-input
          formControlName="firstName"
          label="First Name"
          placeholder="Enter first name..."
          required="true">
        </app-input>
        
        <app-input
          formControlName="email"
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          required="true">
        </app-input>
      </app-form>
    `
  })
};

export const SuccessState: Story = {
  args: {
    formGroup: createContactForm(),
    submitState: 'success',
    submitText: 'Submit Another'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-form
        [formGroup]="formGroup"
        [layout]="layout"
        [size]="size"
        [submitState]="submitState"
        [validationMode]="validationMode"
        [showCancel]="showCancel"
        [submitDisabled]="submitDisabled"
        [submitText]="submitText"
        [cancelText]="cancelText"
        (onSubmit)="onSubmit($event)"
        (onCancel)="onCancel($event)"
        (onValidationChange)="onValidationChange($event)">
        
        <app-input
          formControlName="firstName"
          label="First Name"
          placeholder="Enter first name..."
          required="true">
        </app-input>
        
        <app-input
          formControlName="email"
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          required="true">
        </app-input>
      </app-form>
    `
  })
};

export const ErrorState: Story = {
  args: {
    formGroup: createContactForm(),
    submitState: 'error',
    submitText: 'Try Again'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-form
        [formGroup]="formGroup"
        [layout]="layout"
        [size]="size"
        [submitState]="submitState"
        [validationMode]="validationMode"
        [showCancel]="showCancel"
        [submitDisabled]="submitDisabled"
        [submitText]="submitText"
        [cancelText]="cancelText"
        (onSubmit)="onSubmit($event)"
        (onCancel)="onCancel($event)"
        (onValidationChange)="onValidationChange($event)">
        
        <app-input
          formControlName="firstName"
          label="First Name"
          placeholder="Enter first name..."
          required="true">
        </app-input>
        
        <app-input
          formControlName="email"
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          required="true">
        </app-input>
      </app-form>
    `
  })
};

export const SmallSize: Story = {
  args: {
    formGroup: createContactForm(),
    size: 'sm',
    submitText: 'Send'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-form
        [formGroup]="formGroup"
        [layout]="layout"
        [size]="size"
        [submitState]="submitState"
        [validationMode]="validationMode"
        [showCancel]="showCancel"
        [submitDisabled]="submitDisabled"
        [submitText]="submitText"
        [cancelText]="cancelText"
        (onSubmit)="onSubmit($event)"
        (onCancel)="onCancel($event)"
        (onValidationChange)="onValidationChange($event)">
        
        <app-input
          formControlName="firstName"
          label="Name"
          placeholder="Enter name..."
          required="true"
          size="sm">
        </app-input>
        
        <app-input
          formControlName="email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          required="true"
          size="sm">
        </app-input>
      </app-form>
    `
  })
};

export const LargeSize: Story = {
  args: {
    formGroup: createContactForm(),
    size: 'lg',
    submitText: 'Submit Application'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-form
        [formGroup]="formGroup"
        [layout]="layout"
        [size]="size"
        [submitState]="submitState"
        [validationMode]="validationMode"
        [showCancel]="showCancel"
        [submitDisabled]="submitDisabled"
        [submitText]="submitText"
        [cancelText]="cancelText"
        (onSubmit)="onSubmit($event)"
        (onCancel)="onCancel($event)"
        (onValidationChange)="onValidationChange($event)">
        
        <app-input
          formControlName="firstName"
          label="First Name"
          placeholder="Enter your first name..."
          required="true"
          size="lg">
        </app-input>
        
        <app-input
          formControlName="lastName"
          label="Last Name"
          placeholder="Enter your last name..."
          required="true"
          size="lg">
        </app-input>
        
        <app-input
          formControlName="email"
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          required="true"
          size="lg">
        </app-input>
      </app-form>
    `
  })
};