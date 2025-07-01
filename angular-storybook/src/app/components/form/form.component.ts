import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  TemplateRef,
  ContentChildren,
  QueryList,
  AfterContentInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormGroup, 
  FormBuilder, 
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

export type FormLayout = 'single' | 'two-column' | 'grid' | 'inline';
export type FormSize = 'sm' | 'base' | 'lg';
export type SubmitState = 'idle' | 'loading' | 'success' | 'error';
export type FormValidationMode = 'onSubmit' | 'onChange' | 'onBlur';

export interface FormSection {
  id: string;
  title?: string;
  description?: string;
  fields: string[];
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface FormComponentProps {
  // Layout Properties
  layout: FormLayout;
  size: FormSize;
  sections: FormSection[];
  
  // Form State
  formGroup?: FormGroup;
  submitState: SubmitState;
  validationMode: FormValidationMode;
  
  // Form Configuration
  noValidate: boolean;
  autoComplete: boolean;
  showRequiredIndicator: boolean;
  
  // Submit Configuration
  submitText: string;
  cancelText: string;
  showCancel: boolean;
  submitDisabled: boolean;
  
  // Styling
  className?: string;
  formClassName?: string;
  sectionClassName?: string;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface FormComponentEvents {
  onSubmit: EventEmitter<FormGroup>;
  onCancel: EventEmitter<void>;
  onValidationChange: EventEmitter<{ valid: boolean; errors: ValidationErrors | null }>;
  onSectionToggle: EventEmitter<{ sectionId: string; collapsed: boolean }>;
  onFieldChange: EventEmitter<{ fieldName: string; value: any; valid: boolean }>;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit, OnDestroy, AfterContentInit {
  // Layout Properties
  @Input() layout: FormLayout = 'single';
  @Input() size: FormSize = 'base';
  @Input() sections: FormSection[] = [];
  
  // Form State
  @Input() formGroup?: FormGroup;
  @Input() submitState: SubmitState = 'idle';
  @Input() validationMode: FormValidationMode = 'onSubmit';
  
  // Form Configuration
  @Input() noValidate: boolean = false;
  @Input() autoComplete: boolean = true;
  @Input() showRequiredIndicator: boolean = true;
  
  // Submit Configuration
  @Input() submitText: string = 'Submit';
  @Input() cancelText: string = 'Cancel';
  @Input() showCancel: boolean = false;
  @Input() submitDisabled: boolean = false;
  
  // Styling
  @Input() className?: string;
  @Input() formClassName?: string;
  @Input() sectionClassName?: string;
  
  // Accessibility
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;

  // Output Events
  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onValidationChange = new EventEmitter<{ valid: boolean; errors: ValidationErrors | null }>();
  @Output() onSectionToggle = new EventEmitter<{ sectionId: string; collapsed: boolean }>();
  @Output() onFieldChange = new EventEmitter<{ fieldName: string; value: any; valid: boolean }>();

  // Internal properties
  private destroy$ = new Subject<void>();
  private _uniqueId: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Generate unique ID
    this._uniqueId = `form-${Math.random().toString(36).substr(2, 9)}`;
    
    // Initialize form if not provided
    if (!this.formGroup) {
      this.formGroup = this.fb.group({});
    }

    // Setup form validation monitoring
    this.setupFormValidation();
  }

  ngAfterContentInit() {
    // Additional setup after content initialization
    this.updateFormValidation();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Getters for computed properties
  get formId(): string {
    return this._uniqueId;
  }

  get formClasses(): string {
    return [
      'form',
      `layout-${this.layout}`,
      `size-${this.size}`,
      `submit-${this.submitState}`,
      this.formGroup?.invalid && this.formGroup?.touched ? 'form-invalid' : '',
      this.className
    ].filter(Boolean).join(' ');
  }

  get containerClasses(): string {
    return [
      'form-container',
      this.formClassName
    ].filter(Boolean).join(' ');
  }

  get isSubmitting(): boolean {
    return this.submitState === 'loading';
  }

  get hasErrors(): boolean {
    return this.submitState === 'error';
  }

  get isSuccess(): boolean {
    return this.submitState === 'success';
  }

  get isSubmitDisabled(): boolean {
    return this.submitDisabled || 
           this.isSubmitting || 
           (this.formGroup?.invalid === true && this.validationMode === 'onChange');
  }

  get gridColumns(): number {
    if (this.layout === 'grid') {
      return this.size === 'sm' ? 1 : this.size === 'base' ? 2 : 3;
    }
    return this.layout === 'two-column' ? 2 : 1;
  }

  // Section Management
  getSectionClasses(section: FormSection): string {
    return [
      'form-section',
      section.collapsible ? 'collapsible' : '',
      section.collapsed ? 'collapsed' : '',
      this.sectionClassName
    ].filter(Boolean).join(' ');
  }

  toggleSection(section: FormSection): void {
    if (section.collapsible) {
      section.collapsed = !section.collapsed;
      this.onSectionToggle.emit({
        sectionId: section.id,
        collapsed: section.collapsed
      });
    }
  }

  // Form Validation Setup
  private setupFormValidation(): void {
    if (!this.formGroup) return;

    // Monitor form value changes
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.updateFormValidation();
        
        // Emit field changes
        Object.keys(value).forEach(key => {
          const control = this.formGroup?.get(key);
          if (control) {
            this.onFieldChange.emit({
              fieldName: key,
              value: control.value,
              valid: control.valid
            });
          }
        });
      });

    // Monitor form status changes
    this.formGroup.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateFormValidation();
      });
  }

  private updateFormValidation(): void {
    if (!this.formGroup) return;

    const isValid = this.formGroup.valid;
    const errors = this.formGroup.errors;

    this.onValidationChange.emit({
      valid: isValid,
      errors: errors
    });
  }

  // Event Handlers
  onFormSubmit(event: Event): void {
    event.preventDefault();
    
    if (!this.formGroup || this.isSubmitDisabled) {
      return;
    }

    // Mark all fields as touched to show validation errors
    this.markAllFieldsAsTouched();

    if (this.formGroup.valid) {
      this.onSubmit.emit(this.formGroup);
    }
  }

  onFormCancel(): void {
    this.onCancel.emit();
  }

  // Utility Methods
  private markAllFieldsAsTouched(): void {
    if (!this.formGroup) return;

    Object.keys(this.formGroup.controls).forEach(key => {
      const control = this.formGroup?.get(key);
      if (control) {
        control.markAsTouched();
        
        // Handle nested form groups
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
        
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      }
    });
  }

  // Public API Methods
  resetForm(): void {
    if (this.formGroup) {
      this.formGroup.reset();
    }
  }

  validateForm(): boolean {
    if (!this.formGroup) return false;
    
    this.markAllFieldsAsTouched();
    return this.formGroup.valid;
  }

  getFieldError(fieldName: string): string | null {
    const control = this.formGroup?.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    // Return first error message
    const errors = control.errors;
    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}`;
    if (errors['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength}`;
    if (errors['pattern']) return 'Please enter a valid format';
    
    return 'Invalid value';
  }

  setFieldValue(fieldName: string, value: any): void {
    const control = this.formGroup?.get(fieldName);
    if (control) {
      control.setValue(value);
    }
  }

  setFieldError(fieldName: string, error: ValidationErrors | null): void {
    const control = this.formGroup?.get(fieldName);
    if (control) {
      control.setErrors(error);
    }
  }

  focusFirstInvalidField(): void {
    if (!this.formGroup) return;

    const firstInvalidControl = Object.keys(this.formGroup.controls)
      .find(key => {
        const control = this.formGroup?.get(key);
        return control && control.invalid && control.touched;
      });

    if (firstInvalidControl) {
      const element = document.querySelector(`[formControlName="${firstInvalidControl}"]`) as HTMLElement;
      if (element && element.focus) {
        element.focus();
      }
    }
  }
}