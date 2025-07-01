import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../components/modal/modal.component';
import { ButtonComponent } from '../components/button/button.component';

@Component({
  selector: 'app-modal-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ButtonComponent],
  template: `
    <div class="demo-container">
      <h1>Modal Component Demo</h1>
      <p>Test the Angular Modal component with various configurations.</p>
      
      <div class="demo-grid">
        <!-- Basic Modal -->
        <div class="demo-section">
          <h3>Basic Modal</h3>
          <button class="demo-button" (click)="basicModalOpen = true">
            Open Basic Modal
          </button>
          
          <app-modal
            [isOpen]="basicModalOpen"
            title="Basic Modal"
            description="This is a basic modal example."
            (onClose)="basicModalOpen = false">
            
            <p>This is the modal content. You can put any content here including forms, images, or other components.</p>
            
            <div slot="footer" class="modal-actions">
              <app-button variant="secondary" (onClick)="basicModalOpen = false">Cancel</app-button>
              <app-button variant="primary" (onClick)="basicModalOpen = false">Save</app-button>
            </div>
          </app-modal>
        </div>
        
        <!-- Different Sizes -->
        <div class="demo-section">
          <h3>Size Variants</h3>
          <div class="button-group">
            <button class="demo-button" (click)="openSizeModal('sm')">Small</button>
            <button class="demo-button" (click)="openSizeModal('base')">Base</button>
            <button class="demo-button" (click)="openSizeModal('lg')">Large</button>
            <button class="demo-button" (click)="openSizeModal('xl')">Extra Large</button>
          </div>
          
          <app-modal
            [isOpen]="sizeModalOpen"
            [size]="selectedSize"
            [title]="'Modal Size: ' + selectedSize"
            description="This modal demonstrates different size variants."
            (onClose)="sizeModalOpen = false">
            
            <p>This modal is using the <strong>{{ selectedSize }}</strong> size variant.</p>
            <p>You can adjust the modal size based on your content requirements.</p>
            
            <div slot="footer" class="modal-actions">
              <app-button variant="primary" (onClick)="sizeModalOpen = false">Close</app-button>
            </div>
          </app-modal>
        </div>
        
        <!-- Position Variants -->
        <div class="demo-section">
          <h3>Position Variants</h3>
          <div class="button-group">
            <button class="demo-button" (click)="openPositionModal('center')">Center</button>
            <button class="demo-button" (click)="openPositionModal('top')">Top</button>
            <button class="demo-button" (click)="openPositionModal('bottom')">Bottom</button>
          </div>
          
          <app-modal
            [isOpen]="positionModalOpen"
            [position]="selectedPosition"
            [title]="'Position: ' + selectedPosition"
            description="This modal demonstrates different position variants."
            (onClose)="positionModalOpen = false">
            
            <p>This modal is positioned at the <strong>{{ selectedPosition }}</strong> of the viewport.</p>
            
            <div slot="footer" class="modal-actions">
              <app-button variant="primary" (onClick)="positionModalOpen = false">Close</app-button>
            </div>
          </app-modal>
        </div>
        
        <!-- Variant Styles -->
        <div class="demo-section">
          <h3>Style Variants</h3>
          <div class="button-group">
            <button class="demo-button" (click)="openVariantModal('default')">Default</button>
            <button class="demo-button btn-danger" (click)="openVariantModal('danger')">Danger</button>
            <button class="demo-button btn-success" (click)="openVariantModal('success')">Success</button>
            <button class="demo-button btn-warning" (click)="openVariantModal('warning')">Warning</button>
          </div>
          
          <app-modal
            [isOpen]="variantModalOpen"
            [variant]="selectedVariant"
            [title]="getVariantTitle()"
            [description]="getVariantDescription()"
            (onClose)="variantModalOpen = false">
            
            <p>This modal uses the <strong>{{ selectedVariant }}</strong> variant styling.</p>
            
            <div slot="footer" class="modal-actions">
              <app-button variant="secondary" (onClick)="variantModalOpen = false">Cancel</app-button>
              <app-button variant="primary" (onClick)="variantModalOpen = false">
                {{ getVariantAction() }}
              </app-button>
            </div>
          </app-modal>
        </div>
        
        <!-- Behavior Options -->
        <div class="demo-section">
          <h3>Behavior Options</h3>
          <div class="button-group">
            <button class="demo-button" (click)="openBehaviorModal('no-backdrop')">No Backdrop Close</button>
            <button class="demo-button" (click)="openBehaviorModal('no-escape')">No Escape Close</button>
            <button class="demo-button" (click)="openBehaviorModal('no-animation')">No Animation</button>
          </div>
          
          <app-modal
            [isOpen]="behaviorModalOpen"
            [title]="getBehaviorTitle()"
            [description]="getBehaviorDescription()"
            [closeOnBackdropClick]="behaviorType !== 'no-backdrop'"
            [closeOnEscape]="behaviorType !== 'no-escape'"
            [animationEnabled]="behaviorType !== 'no-animation'"
            (onClose)="behaviorModalOpen = false">
            
            <p>{{ getBehaviorContent() }}</p>
            
            <div slot="footer" class="modal-actions">
              <app-button variant="primary" (onClick)="behaviorModalOpen = false">Close</app-button>
            </div>
          </app-modal>
        </div>
        
        <!-- Form Modal -->
        <div class="demo-section">
          <h3>Form Modal</h3>
          <button class="demo-button" (click)="formModalOpen = true">
            Open Contact Form
          </button>
          
          <app-modal
            [isOpen]="formModalOpen"
            size="lg"
            title="Contact Form"
            description="Please fill out the form below."
            (onClose)="formModalOpen = false">
            
            <form class="modal-form" (ngSubmit)="submitForm()">
              <div class="form-group">
                <label for="name">Name *</label>
                <input type="text" id="name" [(ngModel)]="formData.name" required>
              </div>
              
              <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" [(ngModel)]="formData.email" required>
              </div>
              
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" rows="4" [(ngModel)]="formData.message"></textarea>
              </div>
            </form>
            
            <div slot="footer" class="modal-actions">
              <app-button variant="secondary" (onClick)="formModalOpen = false">Cancel</app-button>
              <app-button variant="primary" (onClick)="submitForm()">Send Message</app-button>
            </div>
          </app-modal>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .demo-section {
      padding: 1.5rem;
      border: 1px solid #ddd6e3;
      border-radius: 8px;
      background: #f8f6fa;
    }
    
    .demo-section h3 {
      margin: 0 0 1rem 0;
      color: #2a1f35;
    }
    
    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .demo-button {
      padding: 0.5rem 1rem;
      background: #611F69;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
    }
    
    .demo-button:hover {
      background: #5a1f60;
    }
    
    .btn-danger {
      background: #d92d20;
    }
    
    .btn-success {
      background: #12b76a;
    }
    
    .btn-warning {
      background: #f59e0b;
    }
    
    .modal-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }
    
    .modal-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .form-group label {
      font-size: 14px;
      font-weight: 500;
      color: #2a1f35;
    }
    
    .form-group input,
    .form-group textarea {
      padding: 0.5rem;
      border: 1px solid #ddd6e3;
      border-radius: 8px;
      font-size: 16px;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #611F69;
      box-shadow: 0 0 0 4px #ebd4ef;
    }
  `]
})
export class ModalDemoComponent {
  // Basic Modal
  basicModalOpen = false;
  
  // Size Modal
  sizeModalOpen = false;
  selectedSize: 'sm' | 'base' | 'lg' | 'xl' = 'base';
  
  // Position Modal
  positionModalOpen = false;
  selectedPosition: 'center' | 'top' | 'bottom' = 'center';
  
  // Variant Modal
  variantModalOpen = false;
  selectedVariant: 'default' | 'danger' | 'success' | 'warning' = 'default';
  
  // Behavior Modal
  behaviorModalOpen = false;
  behaviorType: 'no-backdrop' | 'no-escape' | 'no-animation' = 'no-backdrop';
  
  // Form Modal
  formModalOpen = false;
  formData = {
    name: '',
    email: '',
    message: ''
  };
  
  openSizeModal(size: 'sm' | 'base' | 'lg' | 'xl') {
    this.selectedSize = size;
    this.sizeModalOpen = true;
  }
  
  openPositionModal(position: 'center' | 'top' | 'bottom') {
    this.selectedPosition = position;
    this.positionModalOpen = true;
  }
  
  openVariantModal(variant: 'default' | 'danger' | 'success' | 'warning') {
    this.selectedVariant = variant;
    this.variantModalOpen = true;
  }
  
  openBehaviorModal(type: 'no-backdrop' | 'no-escape' | 'no-animation') {
    this.behaviorType = type;
    this.behaviorModalOpen = true;
  }
  
  getVariantTitle(): string {
    const titles = {
      default: 'Default Modal',
      danger: 'Delete Confirmation',
      success: 'Success!',
      warning: 'Warning Notice'
    };
    return titles[this.selectedVariant];
  }
  
  getVariantDescription(): string {
    const descriptions = {
      default: 'This is a standard modal with default styling.',
      danger: 'Are you sure you want to delete this item?',
      success: 'Your action has been completed successfully.',
      warning: 'Please review the following information before proceeding.'
    };
    return descriptions[this.selectedVariant];
  }
  
  getVariantAction(): string {
    const actions = {
      default: 'Confirm',
      danger: 'Delete',
      success: 'Continue',
      warning: 'Proceed'
    };
    return actions[this.selectedVariant];
  }
  
  getBehaviorTitle(): string {
    const titles = {
      'no-backdrop': 'No Backdrop Close',
      'no-escape': 'No Escape Close',
      'no-animation': 'No Animation'
    };
    return titles[this.behaviorType];
  }
  
  getBehaviorDescription(): string {
    const descriptions = {
      'no-backdrop': 'This modal cannot be closed by clicking the backdrop.',
      'no-escape': 'This modal cannot be closed with the Escape key.',
      'no-animation': 'This modal opens without animations.'
    };
    return descriptions[this.behaviorType];
  }
  
  getBehaviorContent(): string {
    const content = {
      'no-backdrop': 'Try clicking outside the modal - it won\'t close. Use the close button instead.',
      'no-escape': 'Try pressing the Escape key - it won\'t close. Use the close button instead.',
      'no-animation': 'This modal appeared instantly without any transition animations.'
    };
    return content[this.behaviorType];
  }
  
  submitForm() {
    console.log('Form submitted:', this.formData);
    this.formModalOpen = false;
    // Reset form
    this.formData = { name: '', email: '', message: '' };
  }
}