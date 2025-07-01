import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormComponent, FormLayout, FormSize, SubmitState, FormSection } from '../components/form/form.component';
import { InputComponent } from '../components/input/input.component';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormComponent, 
    InputComponent, 
    CardComponent
  ],
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss']
})
export class FormDemoComponent implements OnInit {
  // Form configurations
  layouts: FormLayout[] = ['single', 'two-column', 'grid', 'inline'];
  sizes: FormSize[] = ['sm', 'base', 'lg'];
  
  // Current settings
  currentLayout: FormLayout = 'single';
  currentSize: FormSize = 'base';
  currentSubmitState: SubmitState = 'idle';
  
  // Forms
  basicForm: FormGroup;
  advancedForm: FormGroup;
  sectionedForm: FormGroup;
  
  // Form sections
  formSections: FormSection[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Please provide your personal details',
      fields: ['firstName', 'lastName', 'email'],
      collapsible: true,
      collapsed: false
    },
    {
      id: 'contact',
      title: 'Contact Information',
      description: 'Additional contact details (optional)',
      fields: ['phone', 'company', 'address'],
      collapsible: true,
      collapsed: false
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Customize your experience',
      fields: ['newsletter', 'notifications'],
      collapsible: true,
      collapsed: true
    }
  ];

  constructor(private fb: FormBuilder) {
    this.basicForm = this.createBasicForm();
    this.advancedForm = this.createAdvancedForm();
    this.sectionedForm = this.createSectionedForm();
  }

  ngOnInit() {
    // Initialize demo
  }

  // Form creation methods
  private createBasicForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private createAdvancedForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^\+?[\d\s\-\(\)]+$/)],
      company: [''],
      position: [''],
      experience: ['', Validators.required],
      skills: [''],
      portfolio: ['', Validators.pattern(/^https?:\/\/.+/)],
      availability: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      comments: ['']
    });
  }

  private createSectionedForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      address: [''],
      newsletter: [true],
      notifications: [false]
    });
  }

  // Event handlers
  onBasicFormSubmit(form: FormGroup): void {
    console.log('Basic form submitted:', form.value);
    this.simulateSubmission();
  }

  onAdvancedFormSubmit(form: FormGroup): void {
    console.log('Advanced form submitted:', form.value);
    this.simulateSubmission();
  }

  onSectionedFormSubmit(form: FormGroup): void {
    console.log('Sectioned form submitted:', form.value);
    this.simulateSubmission();
  }

  onFormCancel(): void {
    console.log('Form cancelled');
  }

  onValidationChange(event: { valid: boolean; errors: any }): void {
    console.log('Validation changed:', event);
  }

  onSectionToggle(event: { sectionId: string; collapsed: boolean }): void {
    console.log('Section toggled:', event);
  }

  onFieldChange(event: { fieldName: string; value: any; valid: boolean }): void {
    console.log('Field changed:', event);
  }

  // Utility methods
  private simulateSubmission(): void {
    this.currentSubmitState = 'loading';
    
    setTimeout(() => {
      // Randomly simulate success or error
      const isSuccess = Math.random() > 0.3;
      this.currentSubmitState = isSuccess ? 'success' : 'error';
      
      // Reset to idle after showing result
      setTimeout(() => {
        this.currentSubmitState = 'idle';
      }, 3000);
    }, 2000);
  }

  resetForms(): void {
    this.basicForm.reset();
    this.advancedForm.reset();
    this.sectionedForm.reset();
    this.currentSubmitState = 'idle';
  }

  changeLayout(layout: FormLayout): void {
    this.currentLayout = layout;
  }

  changeSize(size: FormSize): void {
    this.currentSize = size;
  }

  // Getters for template
  get isFormValid(): boolean {
    return this.basicForm.valid;
  }

  get formErrors(): string[] {
    const errors: string[] = [];
    
    Object.keys(this.basicForm.controls).forEach(key => {
      const control = this.basicForm.get(key);
      if (control && control.errors && control.touched) {
        if (control.errors['required']) {
          errors.push(`${key} is required`);
        }
        if (control.errors['email']) {
          errors.push(`${key} must be a valid email`);
        }
        if (control.errors['minlength']) {
          errors.push(`${key} must be at least ${control.errors['minlength'].requiredLength} characters`);
        }
      }
    });
    
    return errors;
  }
}