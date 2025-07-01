import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { ButtonComponent } from '../app/components/button/button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive', 'success', 'outline']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge']
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconOnly: { control: 'boolean' }
  },
  args: { 
    onClick: fn(),
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `<app-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [iconOnly]="iconOnly" 
      (onClick)="onClick($event)">
      Primary Button
    </app-button>`
  })
};

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
  render: (args) => ({
    props: args,
    template: `<app-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [iconOnly]="iconOnly" 
      (onClick)="onClick($event)">
      Secondary Button
    </app-button>`
  })
};

export const Ghost: Story = {
  args: {
    variant: 'ghost'
  },
  render: (args) => ({
    props: args,
    template: `<app-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [iconOnly]="iconOnly" 
      (onClick)="onClick($event)">
      Ghost Button
    </app-button>`
  })
};

export const Destructive: Story = {
  args: {
    variant: 'destructive'
  },
  render: (args) => ({
    props: args,
    template: `<app-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [iconOnly]="iconOnly" 
      (onClick)="onClick($event)">
      Delete
    </app-button>`
  })
};

export const Success: Story = {
  args: {
    variant: 'success'
  },
  render: (args) => ({
    props: args,
    template: `<app-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [iconOnly]="iconOnly" 
      (onClick)="onClick($event)">
      Complete
    </app-button>`
  })
};

export const Outline: Story = {
  args: {
    variant: 'outline'
  },
  render: (args) => ({
    props: args,
    template: `<app-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [iconOnly]="iconOnly" 
      (onClick)="onClick($event)">
      Outline Button
    </app-button>`
  })
};

export const Large: Story = {
  args: {
    size: 'large'
  },
  render: (args) => ({
    props: args,
    template: `<app-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [iconOnly]="iconOnly" 
      (onClick)="onClick($event)">
      Large Button
    </app-button>`
  })
};

export const Small: Story = {
  args: {
    size: 'small'
  },
  render: (args) => ({
    props: args,
    template: `<app-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [iconOnly]="iconOnly" 
      (onClick)="onClick($event)">
      Small Button
    </app-button>`
  })
};

export const Disabled: Story = {
  args: {
    disabled: true
  },
  render: (args) => ({
    props: args,
    template: `<app-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [iconOnly]="iconOnly" 
      (onClick)="onClick($event)">
      Disabled Button
    </app-button>`
  })
};

export const Loading: Story = {
  args: {
    loading: true
  },
  render: (args) => ({
    props: args,
    template: `<app-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [iconOnly]="iconOnly" 
      (onClick)="onClick($event)">
      Loading...
    </app-button>`
  })
};

export const FullWidth: Story = {
  args: {
    fullWidth: true
  },
  render: (args) => ({
    props: args,
    template: `<app-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading" 
      [fullWidth]="fullWidth" 
      [iconOnly]="iconOnly" 
      (onClick)="onClick($event)">
      Full Width Button
    </app-button>`
  })
};
