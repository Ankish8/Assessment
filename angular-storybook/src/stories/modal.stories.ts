import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { fn } from '@storybook/test';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from '../app/components/modal/modal.component';

// Demo content component for modal examples
@Component({
  selector: 'modal-demo-content',
  template: `
    <div class="demo-content">
      <p style="margin: 0 0 16px 0; color: var(--color-text-secondary); line-height: 1.5;">
        This is a demo modal with sample content. You can interact with the modal using the controls in the Storybook panel.
      </p>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="padding: 12px; background: var(--color-background-secondary); border-radius: var(--radius-md);">
          <strong style="color: var(--color-text-primary);">Sample Section 1</strong>
          <p style="margin: 8px 0 0 0; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
            This demonstrates how content flows within the modal body.
          </p>
        </div>
        <div style="padding: 12px; background: var(--color-background-secondary); border-radius: var(--radius-md);">
          <strong style="color: var(--color-text-primary);">Sample Section 2</strong>
          <p style="margin: 8px 0 0 0; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
            Modal content scrolls when it exceeds the maximum height.
          </p>
        </div>
      </div>
    </div>
  `,
  standalone: true
})
class ModalDemoContentComponent {}

// Form demo component for modal
@Component({
  selector: 'modal-form-demo',
  template: `
    <form style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500; color: #2a1f35;">
          Name *
        </label>
        <input 
          type="text" 
          style="width: 100%; padding: 8px 12px; border: 1px solid #ddd6e3; border-radius: 8px; font-size: 16px; background: white;"
          placeholder="Enter your name">
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500; color: #2a1f35;">
          Email *
        </label>
        <input 
          type="email" 
          style="width: 100%; padding: 8px 12px; border: 1px solid #ddd6e3; border-radius: 8px; font-size: 16px; background: white;"
          placeholder="Enter your email">
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500; color: #2a1f35;">
          Message
        </label>
        <textarea 
          rows="4"
          style="width: 100%; padding: 8px 12px; border: 1px solid #ddd6e3; border-radius: 8px; font-size: 16px; background: white; resize: vertical;"
          placeholder="Enter your message"></textarea>
      </div>
    </form>
  `,
  standalone: true,
  imports: [CommonModule]
})
class ModalFormDemoComponent {}

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      imports: [ModalDemoContentComponent, ModalFormDemoComponent]
    })
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A modal dialog component with backdrop, header, body, and footer sections.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open/visible'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg', 'xl'],
      description: 'Size of the modal'
    },
    title: {
      control: 'text',
      description: 'Title text for the modal header'
    },
    description: {
      control: 'text',
      description: 'Description text for the modal header'
    },
    showFooter: {
      control: 'boolean',
      description: 'Whether to show the footer section'
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether clicking backdrop closes the modal'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing escape closes the modal'
    },
    position: {
      control: 'text',
      description: 'Position of the modal'
    },
    variant: {
      control: 'text',
      description: 'Visual variant of the modal'
    },
    animationEnabled: {
      control: 'boolean',
      description: 'Whether animation is enabled'
    }
  },
  args: {
    onClose: fn(),
    isOpen: true,
    size: 'base',
    title: 'Modal Title',
    description: 'Modal description',
    showFooter: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    position: '',
    variant: '',
    animationEnabled: true
  }
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-modal
        [isOpen]="isOpen"
        [size]="size"
        [title]="title"
        [description]="description"
        [showFooter]="showFooter"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [closeOnEscape]="closeOnEscape"
        [position]="position"
        [variant]="variant"
        [animationEnabled]="animationEnabled"
        (onClose)="onClose($event)">
        
        <p>This is a basic modal with default content. It demonstrates the modal's header, body, and footer sections.</p>
        
        <div slot="footer" style="display: flex; gap: 12px; justify-content: flex-end;">
          <button style="padding: 8px 16px; background: transparent; color: #6b5671; border: 1px solid #ddd6e3; border-radius: 8px; cursor: pointer;">
            Cancel
          </button>
          <button style="padding: 8px 16px; background: #611F69; color: white; border: none; border-radius: 8px; cursor: pointer;">
            Confirm
          </button>
        </div>
      </app-modal>
    `
  })
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    title: 'Small Modal',
    description: 'This is a small modal perfect for simple confirmations.'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-modal
        [isOpen]="isOpen"
        [size]="size"
        [title]="title"
        [description]="description"
        [showFooter]="showFooter"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [closeOnEscape]="closeOnEscape"
        (onClose)="onClose($event)">
        
        <p>This is a small modal with minimal content.</p>
        
        <div slot="footer" style="display: flex; gap: 12px; justify-content: flex-end;">
          <button style="padding: 8px 16px; background: #611F69; color: white; border: none; border-radius: 8px; cursor: pointer;">
            OK
          </button>
        </div>
      </app-modal>
    `
  })
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    title: 'Large Modal',
    description: 'This is a large modal suitable for complex content and forms.'
  },
  render: (args) => ({
    props: args,
    template: `
      <app-modal
        [isOpen]="isOpen"
        [size]="size"
        [title]="title"
        [description]="description"
        [showFooter]="showFooter"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [closeOnEscape]="closeOnEscape"
        (onClose)="onClose($event)">
        
        <modal-form-demo></modal-form-demo>
        
        <div slot="footer" style="display: flex; gap: 12px; justify-content: flex-end;">
          <button style="padding: 8px 16px; background: transparent; color: #6b5671; border: 1px solid #ddd6e3; border-radius: 8px; cursor: pointer;">
            Cancel
          </button>
          <button style="padding: 8px 16px; background: #611F69; color: white; border: none; border-radius: 8px; cursor: pointer;">
            Submit
          </button>
        </div>
      </app-modal>
    `
  })
};

export const NoFooter: Story = {
  args: {
    title: 'Modal without Footer',
    description: 'This modal has no footer section.',
    showFooter: false
  },
  render: (args) => ({
    props: args,
    template: `
      <app-modal
        [isOpen]="isOpen"
        [size]="size"
        [title]="title"
        [description]="description"
        [showFooter]="showFooter"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [closeOnEscape]="closeOnEscape"
        (onClose)="onClose($event)">
        
        <p>This modal has no footer. You can close it by clicking the X button, pressing Escape, or clicking the backdrop.</p>
      </app-modal>
    `
  })
};

