import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectorOption {
  id: string;
  label: string;
  value: any;
  description?: string;
  badge?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorComponent),
      multi: true
    }
  ],
  template: `
    <div class="selector-wrapper">
      <!-- Label -->
      <label *ngIf="label" class="selector-label">
        {{ label }}
        <span *ngIf="required" class="required-asterisk">*</span>
      </label>
      
      <!-- Helper Text -->
      <p *ngIf="helperText" class="selector-helper">{{ helperText }}</p>
      
      <!-- Single Select Dropdown -->
      <div *ngIf="mode === 'single' && layout === 'dropdown'" class="selector-dropdown">
        <select 
          [value]="selectedValue?.value || ''"
          (change)="onSingleSelect($event)"
          [disabled]="disabled"
          class="selector-select">
          <option value="" disabled>{{ placeholder || 'Select an option...' }}</option>
          <option 
            *ngFor="let option of options" 
            [value]="option.value"
            [disabled]="option.disabled">
            {{ option.label }}
            <span *ngIf="option.badge"> ({{ option.badge }})</span>
          </option>
        </select>
      </div>
      
      <!-- Grid Layout -->
      <div *ngIf="layout === 'grid'" class="selector-grid" [class]="'columns-' + gridColumns">
        <div 
          *ngFor="let option of options"
          class="selector-option-card"
          [class]="getOptionClasses(option)"
          (click)="onOptionClick(option)">
          
          <div class="option-content">
            <div class="option-header">
              <span class="option-label">{{ option.label }}</span>
              <span *ngIf="option.badge" class="option-badge">{{ option.badge }}</span>
            </div>
            <p *ngIf="option.description" class="option-description">{{ option.description }}</p>
          </div>
          
          <!-- Selection indicator -->
          <div class="selection-indicator" *ngIf="isSelected(option)">
            <span class="checkmark">✓</span>
          </div>
        </div>
      </div>
      
      <!-- List Layout -->
      <div *ngIf="layout === 'list'" class="selector-list">
        <div 
          *ngFor="let option of options"
          class="selector-option-item"
          [class]="getOptionClasses(option)"
          (click)="onOptionClick(option)">
          
          <div class="option-content">
            <span class="option-label">{{ option.label }}</span>
            <span *ngIf="option.badge" class="option-badge">{{ option.badge }}</span>
            <p *ngIf="option.description" class="option-description">{{ option.description }}</p>
          </div>
          
          <div class="selection-indicator" *ngIf="isSelected(option)">
            <span class="checkmark">✓</span>
          </div>
        </div>
      </div>
      
      <!-- Multiple Selection Display -->
      <div *ngIf="mode === 'multiple' && selectedValues.length > 0" class="selected-items">
        <span class="selected-count">{{ selectedValues.length }} selected</span>
        <div class="selected-tags">
          <span 
            *ngFor="let item of selectedValues" 
            class="selected-tag">
            {{ item.label }}
            <button class="tag-remove" (click)="removeSelected(item)">×</button>
          </span>
        </div>
      </div>
      
      <!-- Error Message -->
      <p *ngIf="errorMessage" class="selector-error">{{ errorMessage }}</p>
    </div>
  `,
  styles: [`
    .selector-wrapper {
      width: 100%;
    }
    
    .selector-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #2a1f35;
      margin-bottom: 8px;
    }
    
    .required-asterisk {
      color: #d92d20;
      margin-left: 4px;
    }
    
    .selector-helper {
      font-size: 12px;
      color: #6b5671;
      margin: 0 0 12px 0;
    }
    
    .selector-error {
      font-size: 12px;
      color: #d92d20;
      margin: 8px 0 0 0;
    }
    
    /* Dropdown Styles */
    .selector-select {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd6e3;
      border-radius: 8px;
      font-size: 16px;
      color: #2a1f35;
      background: white;
      appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b5671' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 12px center;
      background-repeat: no-repeat;
      background-size: 16px;
    }
    
    .selector-select:focus {
      outline: none;
      border-color: #611F69;
      box-shadow: 0 0 0 4px #ebd4ef;
    }
    
    .selector-select:disabled {
      background-color: #efebf2;
      color: #a695b0;
      cursor: not-allowed;
    }
    
    /* Grid Layout */
    .selector-grid {
      display: grid;
      gap: 16px;
    }
    
    .selector-grid.columns-1 { grid-template-columns: 1fr; }
    .selector-grid.columns-2 { grid-template-columns: repeat(2, 1fr); }
    .selector-grid.columns-3 { grid-template-columns: repeat(3, 1fr); }
    .selector-grid.columns-4 { grid-template-columns: repeat(4, 1fr); }
    
    .selector-option-card {
      position: relative;
      padding: 16px;
      border: 1px solid #ddd6e3;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 200ms ease;
    }
    
    .selector-option-card:hover {
      border-color: #611F69;
      box-shadow: 0 2px 8px rgba(97, 31, 105, 0.1);
    }
    
    .selector-option-card.selected {
      border-color: #611F69;
      background: #f7edf8;
    }
    
    .selector-option-card.disabled {
      background: #efebf2;
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    /* List Layout */
    .selector-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .selector-option-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border: 1px solid #ddd6e3;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 200ms ease;
    }
    
    .selector-option-item:hover {
      border-color: #611F69;
      background: #f7edf8;
    }
    
    .selector-option-item.selected {
      border-color: #611F69;
      background: #f7edf8;
    }
    
    .selector-option-item.disabled {
      background: #efebf2;
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    /* Option Content */
    .option-content {
      flex: 1;
    }
    
    .option-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    
    .option-label {
      font-size: 16px;
      font-weight: 500;
      color: #2a1f35;
    }
    
    .option-badge {
      background: #611F69;
      color: white;
      font-size: 11px;
      font-weight: 500;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    
    .option-description {
      font-size: 14px;
      color: #6b5671;
      margin: 0;
      line-height: 1.4;
    }
    
    /* Selection Indicator */
    .selection-indicator {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #611F69;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .checkmark {
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
    
    /* Selected Items */
    .selected-items {
      margin-top: 12px;
    }
    
    .selected-count {
      font-size: 14px;
      color: #6b5671;
      margin-bottom: 8px;
      display: block;
    }
    
    .selected-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .selected-tag {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #f7edf8;
      color: #611F69;
      padding: 6px 10px;
      border-radius: 16px;
      font-size: 14px;
      border: 1px solid #ebd4ef;
    }
    
    .tag-remove {
      background: none;
      border: none;
      color: #611F69;
      cursor: pointer;
      font-size: 16px;
      padding: 0;
      line-height: 1;
    }
    
    .tag-remove:hover {
      color: #d92d20;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .selector-grid.columns-3,
      .selector-grid.columns-4 {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .selector-grid.columns-2 {
        grid-template-columns: 1fr;
      }
      
      .option-label {
        font-size: 14px;
      }
      
      .option-description {
        font-size: 12px;
      }
    }
  `]
})
export class SelectorComponent implements ControlValueAccessor {
  @Input() options: SelectorOption[] = [];
  @Input() mode: 'single' | 'multiple' = 'single';
  @Input() layout: 'dropdown' | 'grid' | 'list' = 'dropdown';
  @Input() gridColumns: number = 2;
  @Input() variant: string = 'default';
  @Input() size: string = 'base';
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() helperText?: string;
  @Input() errorMessage?: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() searchable: boolean = false;
  @Input() clearable: boolean = false;
  @Input() maxSelection?: number;

  @Output() selectionChange = new EventEmitter<any>();

  selectedValue: SelectorOption | null = null;
  selectedValues: SelectorOption[] = [];

  private onChange = (value: any) => {};
  private onTouched = () => {};

  getOptionClasses(option: SelectorOption): string {
    const classes = [];
    if (this.isSelected(option)) classes.push('selected');
    if (option.disabled) classes.push('disabled');
    return classes.join(' ');
  }

  isSelected(option: SelectorOption): boolean {
    if (this.mode === 'single') {
      return this.selectedValue?.id === option.id;
    } else {
      return this.selectedValues.some(item => item.id === option.id);
    }
  }

  onSingleSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedOption = this.options.find(option => option.value === select.value);
    
    if (selectedOption) {
      this.selectedValue = selectedOption;
      this.onChange(selectedOption.value);
      this.selectionChange.emit(selectedOption.value);
    }
  }

  onOptionClick(option: SelectorOption): void {
    if (option.disabled) return;

    if (this.mode === 'single') {
      this.selectedValue = option;
      this.onChange(option.value);
      this.selectionChange.emit(option.value);
    } else {
      if (this.isSelected(option)) {
        this.selectedValues = this.selectedValues.filter(item => item.id !== option.id);
      } else {
        if (!this.maxSelection || this.selectedValues.length < this.maxSelection) {
          this.selectedValues = [...this.selectedValues, option];
        }
      }
      
      const values = this.selectedValues.map(item => item.value);
      this.onChange(values);
      this.selectionChange.emit(values);
    }
  }

  removeSelected(option: SelectorOption): void {
    this.selectedValues = this.selectedValues.filter(item => item.id !== option.id);
    const values = this.selectedValues.map(item => item.value);
    this.onChange(values);
    this.selectionChange.emit(values);
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (this.mode === 'single') {
      this.selectedValue = this.options.find(option => option.value === value) || null;
    } else {
      if (Array.isArray(value)) {
        this.selectedValues = this.options.filter(option => value.includes(option.value));
      } else {
        this.selectedValues = [];
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}