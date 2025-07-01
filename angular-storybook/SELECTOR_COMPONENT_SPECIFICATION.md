# Selector Component Specification

## Overview
Comprehensive specification for implementing an Angular Selector component that provides flexible multi-selection functionality with grid and list layouts. This component integrates seamlessly with the existing design system and follows established patterns from the Card, Input, and Form components.

## Component Interface

### TypeScript Types
```typescript
export type SelectorLayoutMode = 'grid' | 'list';
export type SelectorSelectionMode = 'single' | 'multiple';
export type SelectorVariant = 'default' | 'outlined' | 'filled';
export type SelectorSize = 'small' | 'medium' | 'large';

export interface SelectorOption {
  id: string | number;
  value: any;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: string;
  badge?: string;
  group?: string;
  metadata?: Record<string, any>;
}

export interface SelectorGroup {
  id: string;
  label: string;
  description?: string;
  collapsed?: boolean;
  options: SelectorOption[];
}

export interface SelectorSelection {
  options: SelectorOption[];
  values: any[];
  ids: (string | number)[];
}
```

### Component Properties
```typescript
@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SelectorComponent implements OnInit, OnDestroy {
  // Core Configuration
  @Input() options: SelectorOption[] = [];
  @Input() groups: SelectorGroup[] = [];
  @Input() selectedIds: (string | number)[] = [];
  @Input() selectedValues: any[] = [];
  
  // Layout & Appearance
  @Input() layoutMode: SelectorLayoutMode = 'grid';
  @Input() selectionMode: SelectorSelectionMode = 'multiple';
  @Input() variant: SelectorVariant = 'default';
  @Input() size: SelectorSize = 'medium';
  @Input() columns: number = 3; // For grid layout
  @Input() gap: string = 'medium'; // small, medium, large
  
  // Behavior
  @Input() searchable: boolean = false;
  @Input() searchPlaceholder: string = 'Search options...';
  @Input() filterable: boolean = false;
  @Input() sortable: boolean = false;
  @Input() clearable: boolean = true;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() required: boolean = false;
  
  // Limits & Validation
  @Input() maxSelections: number | null = null;
  @Input() minSelections: number = 0;
  @Input() showSelectionCount: boolean = true;
  @Input() showSelectAll: boolean = false;
  
  // Accessibility
  @Input() ariaLabel: string = '';
  @Input() ariaDescribedBy: string = '';
  @Input() className: string = '';
  
  // State Management
  @Input() trackByFn: TrackByFunction<SelectorOption> = (index, item) => item.id;
  
  // Events
  @Output() selectionChange = new EventEmitter<SelectorSelection>();
  @Output() optionClick = new EventEmitter<SelectorOption>();
  @Output() optionKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearSelection = new EventEmitter<void>();
  @Output() selectAll = new EventEmitter<void>();
  
  // Internal State
  searchTerm: string = '';
  filteredOptions: SelectorOption[] = [];
  filteredGroups: SelectorGroup[] = [];
  focusedIndex: number = -1;
  
  // Computed Properties
  get currentSelection(): SelectorSelection {
    const selectedOptions = this.options.filter(option => 
      this.selectedIds.includes(option.id)
    );
    return {
      options: selectedOptions,
      values: selectedOptions.map(option => option.value),
      ids: selectedOptions.map(option => option.id)
    };
  }
  
  get isMaxSelectionsReached(): boolean {
    return this.maxSelections !== null && 
           this.selectedIds.length >= this.maxSelections;
  }
  
  get isMinSelectionsReached(): boolean {
    return this.selectedIds.length >= this.minSelections;
  }
  
  get computedClasses(): string {
    return [
      'selector',
      `selector-${this.variant}`,
      `selector-${this.size}`,
      `selector-${this.layoutMode}`,
      `selector-${this.selectionMode}`,
      this.disabled ? 'disabled' : '',
      this.loading ? 'loading' : '',
      this.required ? 'required' : '',
      this.className
    ].filter(Boolean).join(' ');
  }
}
```

## Visual Specifications

### Base Selector Styles
```scss
.selector {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  font-family: var(--font-family-base);
  width: 100%;
}

.selector.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.selector.loading {
  position: relative;
}

.selector-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
}

.selector-search {
  flex: 1;
  max-width: 320px;
}

.selector-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.selector-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.selector-actions {
  display: flex;
  gap: var(--spacing-1);
}
```

### Layout Mode Specifications

#### Grid Layout
```scss
.selector-grid {
  display: grid;
  gap: var(--spacing-3);
  width: 100%;
}

.selector-grid.columns-1 { grid-template-columns: 1fr; }
.selector-grid.columns-2 { grid-template-columns: repeat(2, 1fr); }
.selector-grid.columns-3 { grid-template-columns: repeat(3, 1fr); }
.selector-grid.columns-4 { grid-template-columns: repeat(4, 1fr); }
.selector-grid.columns-5 { grid-template-columns: repeat(5, 1fr); }
.selector-grid.columns-6 { grid-template-columns: repeat(6, 1fr); }

.selector-grid.gap-small { gap: var(--spacing-2); }
.selector-grid.gap-medium { gap: var(--spacing-3); }
.selector-grid.gap-large { gap: var(--spacing-4); }

@media (max-width: 1024px) {
  .selector-grid.columns-6 { grid-template-columns: repeat(3, 1fr); }
  .selector-grid.columns-5 { grid-template-columns: repeat(2, 1fr); }
  .selector-grid.columns-4 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .selector-grid.columns-6,
  .selector-grid.columns-5,
  .selector-grid.columns-4,
  .selector-grid.columns-3 { 
    grid-template-columns: repeat(2, 1fr); 
  }
}

@media (max-width: 480px) {
  .selector-grid { 
    grid-template-columns: 1fr; 
  }
}
```

#### List Layout
```scss
.selector-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  width: 100%;
}

.selector-list.gap-small { gap: var(--spacing-1); }
.selector-list.gap-medium { gap: var(--spacing-2); }
.selector-list.gap-large { gap: var(--spacing-3); }
```

### Option Item Specifications

#### Base Option Styles
```scss
.selector-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--animation-duration-base) var(--animation-ease-in-out);
  position: relative;
  border: 1px solid transparent;
  background-color: var(--color-background-primary);
  min-height: 48px;
}

.selector-option:hover:not(.disabled) {
  background-color: var(--color-background-secondary);
}

.selector-option:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.selector-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.selector-option.selected {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-600);
}

.selector-option.selected:hover:not(.disabled) {
  background-color: var(--color-primary-100);
}
```

#### Variant Specifications

##### Default Variant
```scss
.selector-default .selector-option {
  background-color: var(--color-background-primary);
  border: 1px solid var(--color-border-primary);
}

.selector-default .selector-option:hover:not(.disabled) {
  border-color: var(--color-border-hover);
  background-color: var(--color-background-secondary);
}

.selector-default .selector-option.selected {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-600);
}
```

##### Outlined Variant
```scss
.selector-outlined .selector-option {
  background-color: transparent;
  border: 2px solid var(--color-border-primary);
}

.selector-outlined .selector-option:hover:not(.disabled) {
  border-color: var(--color-primary-300);
  background-color: var(--color-background-secondary);
}

.selector-outlined .selector-option.selected {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-600);
}
```

##### Filled Variant
```scss
.selector-filled .selector-option {
  background-color: var(--color-background-secondary);
  border: 1px solid transparent;
}

.selector-filled .selector-option:hover:not(.disabled) {
  background-color: var(--color-background-tertiary);
}

.selector-filled .selector-option.selected {
  background-color: var(--color-primary-100);
  border-color: var(--color-primary-600);
}
```

### Size Specifications

#### Small Size
```scss
.selector-small .selector-option {
  padding: var(--spacing-2) var(--spacing-3);
  min-height: 36px;
  font-size: var(--font-size-sm);
}

.selector-small .selector-option-icon {
  width: 16px;
  height: 16px;
}

.selector-small .selector-option-checkbox {
  width: 16px;
  height: 16px;
}
```

#### Medium Size (Default)
```scss
.selector-medium .selector-option {
  padding: var(--spacing-3) var(--spacing-4);
  min-height: 48px;
  font-size: var(--font-size-base);
}

.selector-medium .selector-option-icon {
  width: 20px;
  height: 20px;
}

.selector-medium .selector-option-checkbox {
  width: 18px;
  height: 18px;
}
```

#### Large Size
```scss
.selector-large .selector-option {
  padding: var(--spacing-4) var(--spacing-5);
  min-height: 56px;
  font-size: var(--font-size-lg);
}

.selector-large .selector-option-icon {
  width: 24px;
  height: 24px;
}

.selector-large .selector-option-checkbox {
  width: 20px;
  height: 20px;
}
```

### Option Content Specifications

#### Option Layout
```scss
.selector-option-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacing-1);
}

.selector-option-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
}

.selector-option-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacing-1);
}

.selector-option-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  line-height: 1.4;
}

.selector-option-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.selector-option-icon {
  flex-shrink: 0;
  color: var(--color-text-secondary);
}

.selector-option.selected .selector-option-icon {
  color: var(--color-primary-600);
}

.selector-option-badge {
  flex-shrink: 0;
  background-color: var(--color-background-tertiary);
  color: var(--color-text-secondary);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.selector-option.selected .selector-option-badge {
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}
```

#### Selection Indicators
```scss
.selector-option-checkbox {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-border-primary);
  border-radius: var(--radius-sm);
  background-color: var(--color-background-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--animation-duration-base) var(--animation-ease-in-out);
}

.selector-option-checkbox::after {
  content: '';
  width: 8px;
  height: 8px;
  background-color: var(--color-primary-600);
  border-radius: var(--radius-xs);
  opacity: 0;
  transform: scale(0);
  transition: all var(--animation-duration-base) var(--animation-ease-in-out);
}

.selector-option.selected .selector-option-checkbox {
  border-color: var(--color-primary-600);
  background-color: var(--color-primary-600);
}

.selector-option.selected .selector-option-checkbox::after {
  opacity: 1;
  transform: scale(1);
  background-color: white;
}

.selector-single .selector-option-checkbox {
  border-radius: 50%;
}

.selector-single .selector-option-checkbox::after {
  border-radius: 50%;
}
```

### Group Specifications

#### Group Layout
```scss
.selector-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
}

.selector-group:last-child {
  margin-bottom: 0;
}

.selector-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-2) 0;
  border-bottom: 1px solid var(--color-border-primary);
}

.selector-group-title {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  margin: 0;
}

.selector-group-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin: 0;
}

.selector-group-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-1);
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: all var(--animation-duration-base) var(--animation-ease-in-out);
}

.selector-group-toggle:hover {
  background-color: var(--color-background-secondary);
}

.selector-group-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.selector-group.collapsed .selector-group-content {
  display: none;
}
```

### Search and Filter Specifications

#### Search Input
```scss
.selector-search-input {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background-color: var(--color-background-primary);
  transition: all var(--animation-duration-base) var(--animation-ease-in-out);
}

.selector-search-input:focus {
  outline: none;
  border-color: var(--color-primary-600);
  box-shadow: var(--shadow-focus);
}

.selector-search-input::placeholder {
  color: var(--color-text-tertiary);
}
```

#### Empty State
```scss
.selector-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-8) var(--spacing-4);
  text-align: center;
  gap: var(--spacing-3);
}

.selector-empty-icon {
  width: 48px;
  height: 48px;
  color: var(--color-text-tertiary);
  opacity: 0.5;
}

.selector-empty-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  margin: 0;
}

.selector-empty-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin: 0;
}
```

### Loading State Specifications

#### Loading Overlay
```scss
.selector-loading {
  position: relative;
}

.selector-loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  border-radius: var(--radius-md);
}

.selector-loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-border-primary);
  border-top: 2px solid var(--color-primary-600);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 2;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
```

## HTML Template Structure

### Main Template
```html
<div [class]="computedClasses" 
     [attr.aria-label]="ariaLabel"
     [attr.aria-describedby]="ariaDescribedBy"
     role="group">
  
  <!-- Header Section -->
  <div class="selector-header" *ngIf="searchable || showSelectionCount || showSelectAll">
    <!-- Search Input -->
    <div class="selector-search" *ngIf="searchable">
      <input 
        type="text" 
        class="selector-search-input"
        [placeholder]="searchPlaceholder"
        [(ngModel)]="searchTerm"
        (input)="onSearchChange($event)"
        [disabled]="disabled">
    </div>
    
    <!-- Controls -->
    <div class="selector-controls">
      <!-- Selection Count -->
      <span class="selector-count" *ngIf="showSelectionCount">
        {{ selectedIds.length }} 
        <span *ngIf="maxSelections">of {{ maxSelections }}</span>
        selected
      </span>
      
      <!-- Actions -->
      <div class="selector-actions">
        <!-- Select All -->
        <button 
          type="button"
          class="selector-action-button"
          *ngIf="showSelectAll && selectionMode === 'multiple'"
          (click)="onSelectAll()"
          [disabled]="disabled || loading">
          Select All
        </button>
        
        <!-- Clear Selection -->
        <button 
          type="button"
          class="selector-action-button"
          *ngIf="clearable && selectedIds.length > 0"
          (click)="onClearSelection()"
          [disabled]="disabled || loading">
          Clear
        </button>
      </div>
    </div>
  </div>
  
  <!-- Content Section -->
  <div class="selector-content">
    <!-- Grouped Options -->
    <div *ngIf="groups.length > 0">
      <div class="selector-group" 
           *ngFor="let group of filteredGroups; trackBy: trackByGroup">
        <div class="selector-group-header">
          <div>
            <h4 class="selector-group-title">{{ group.label }}</h4>
            <p class="selector-group-description" *ngIf="group.description">
              {{ group.description }}
            </p>
          </div>
          <button 
            type="button"
            class="selector-group-toggle"
            (click)="toggleGroup(group)"
            [attr.aria-expanded]="!group.collapsed"
            [attr.aria-controls]="'group-' + group.id">
            <span [class]="group.collapsed ? 'icon-chevron-right' : 'icon-chevron-down'"></span>
          </button>
        </div>
        
        <div class="selector-group-content" 
             [id]="'group-' + group.id"
             [class]="layoutMode === 'grid' ? 'selector-grid columns-' + columns + ' gap-' + gap : 'selector-list gap-' + gap">
          <div class="selector-option"
               *ngFor="let option of group.options; trackBy: trackByFn"
               [class.selected]="isOptionSelected(option)"
               [class.disabled]="option.disabled || disabled"
               [tabindex]="option.disabled || disabled ? -1 : 0"
               [attr.aria-selected]="isOptionSelected(option)"
               [attr.aria-disabled]="option.disabled || disabled"
               (click)="onOptionClick(option, $event)"
               (keydown)="onOptionKeyDown(option, $event)">
            
            <!-- Selection Indicator -->
            <div class="selector-option-checkbox" 
                 *ngIf="selectionMode === 'multiple' || (selectionMode === 'single' && !isOptionSelected(option))">
            </div>
            
            <!-- Option Icon -->
            <span class="selector-option-icon" 
                  *ngIf="option.icon"
                  [class]="'icon-' + option.icon">
            </span>
            
            <!-- Option Content -->
            <div class="selector-option-content">
              <div class="selector-option-main">
                <div class="selector-option-text">
                  <span class="selector-option-label">{{ option.label }}</span>
                  <span class="selector-option-description" *ngIf="option.description">
                    {{ option.description }}
                  </span>
                </div>
                
                <!-- Option Badge -->
                <span class="selector-option-badge" *ngIf="option.badge">
                  {{ option.badge }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Flat Options -->
    <div *ngIf="groups.length === 0"
         [class]="layoutMode === 'grid' ? 'selector-grid columns-' + columns + ' gap-' + gap : 'selector-list gap-' + gap">
      <div class="selector-option"
           *ngFor="let option of filteredOptions; trackBy: trackByFn"
           [class.selected]="isOptionSelected(option)"
           [class.disabled]="option.disabled || disabled"
           [tabindex]="option.disabled || disabled ? -1 : 0"
           [attr.aria-selected]="isOptionSelected(option)"
           [attr.aria-disabled]="option.disabled || disabled"
           (click)="onOptionClick(option, $event)"
           (keydown)="onOptionKeyDown(option, $event)">
        
        <!-- Selection Indicator -->
        <div class="selector-option-checkbox" 
             *ngIf="selectionMode === 'multiple' || (selectionMode === 'single' && !isOptionSelected(option))">
        </div>
        
        <!-- Option Icon -->
        <span class="selector-option-icon" 
              *ngIf="option.icon"
              [class]="'icon-' + option.icon">
        </span>
        
        <!-- Option Content -->
        <div class="selector-option-content">
          <div class="selector-option-main">
            <div class="selector-option-text">
              <span class="selector-option-label">{{ option.label }}</span>
              <span class="selector-option-description" *ngIf="option.description">
                {{ option.description }}
              </span>
            </div>
            
            <!-- Option Badge -->
            <span class="selector-option-badge" *ngIf="option.badge">
              {{ option.badge }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div class="selector-empty" *ngIf="filteredOptions.length === 0 && groups.length === 0">
      <div class="selector-empty-icon">
        <span class="icon-search"></span>
      </div>
      <h4 class="selector-empty-title">No options found</h4>
      <p class="selector-empty-description" *ngIf="searchTerm">
        Try adjusting your search to find what you're looking for.
      </p>
    </div>
  </div>
  
  <!-- Loading Overlay -->
  <div class="selector-loading-spinner" *ngIf="loading"></div>
</div>
```

## Component Implementation

### Core Methods
```typescript
ngOnInit(): void {
  this.initializeOptions();
  this.setupKeyboardNavigation();
}

ngOnDestroy(): void {
  this.cleanupKeyboardNavigation();
}

initializeOptions(): void {
  this.filteredOptions = [...this.options];
  this.filteredGroups = [...this.groups];
  this.applyFilters();
}

// Selection Management
isOptionSelected(option: SelectorOption): boolean {
  return this.selectedIds.includes(option.id);
}

onOptionClick(option: SelectorOption, event: MouseEvent): void {
  if (this.disabled || this.loading || option.disabled) {
    return;
  }
  
  event.preventDefault();
  this.toggleOption(option);
  this.optionClick.emit(option);
}

toggleOption(option: SelectorOption): void {
  if (this.selectionMode === 'single') {
    this.selectedIds = [option.id];
  } else {
    const index = this.selectedIds.indexOf(option.id);
    if (index > -1) {
      this.selectedIds.splice(index, 1);
    } else {
      if (this.maxSelections && this.selectedIds.length >= this.maxSelections) {
        return; // Max selections reached
      }
      this.selectedIds.push(option.id);
    }
  }
  
  this.emitSelectionChange();
}

onSelectAll(): void {
  if (this.selectionMode === 'multiple') {
    const availableOptions = this.filteredOptions.filter(option => !option.disabled);
    this.selectedIds = availableOptions.map(option => option.id);
    this.emitSelectionChange();
    this.selectAll.emit();
  }
}

onClearSelection(): void {
  this.selectedIds = [];
  this.emitSelectionChange();
  this.clearSelection.emit();
}

emitSelectionChange(): void {
  this.selectionChange.emit(this.currentSelection);
}

// Search and Filtering
onSearchChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  this.searchTerm = target.value;
  this.applyFilters();
  this.searchChange.emit(this.searchTerm);
}

applyFilters(): void {
  if (this.searchTerm.trim()) {
    this.filteredOptions = this.options.filter(option =>
      option.label.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (option.description && option.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
    
    this.filteredGroups = this.groups.map(group => ({
      ...group,
      options: group.options.filter(option =>
        option.label.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (option.description && option.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
      )
    })).filter(group => group.options.length > 0);
  } else {
    this.filteredOptions = [...this.options];
    this.filteredGroups = [...this.groups];
  }
}

// Group Management
toggleGroup(group: SelectorGroup): void {
  group.collapsed = !group.collapsed;
}

trackByGroup(index: number, group: SelectorGroup): string {
  return group.id;
}

// Keyboard Navigation
setupKeyboardNavigation(): void {
  // Implement keyboard navigation setup
}

cleanupKeyboardNavigation(): void {
  // Implement cleanup
}

onOptionKeyDown(option: SelectorOption, event: KeyboardEvent): void {
  if (this.disabled || this.loading || option.disabled) {
    return;
  }
  
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      this.toggleOption(option);
      break;
    case 'ArrowDown':
      event.preventDefault();
      this.focusNextOption();
      break;
    case 'ArrowUp':
      event.preventDefault();
      this.focusPreviousOption();
      break;
  }
  
  this.optionKeyDown.emit(event);
}

focusNextOption(): void {
  // Implement focus management
}

focusPreviousOption(): void {
  // Implement focus management
}
```

## Accessibility Specifications

### ARIA Support
- **role="group"** for the main container
- **aria-selected** for option selection state
- **aria-disabled** for disabled options
- **aria-expanded** for collapsible groups
- **aria-controls** for group toggle buttons
- **aria-describedby** for additional descriptions

### Keyboard Navigation
- **Tab/Shift+Tab**: Navigate between options
- **Enter/Space**: Toggle option selection
- **Arrow Keys**: Navigate between options
- **Escape**: Clear search (if applicable)
- **Home/End**: Navigate to first/last option

## Storybook Stories Structure

### Story Configuration
```typescript
const meta: Meta<SelectorComponent> = {
  title: 'UI/Selector',
  component: SelectorComponent,
  tags: ['autodocs'],
  argTypes: {
    layoutMode: {
      control: { type: 'select' },
      options: ['grid', 'list']
    },
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'multiple']
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'filled']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    columns: {
      control: { type: 'range', min: 1, max: 6, step: 1 }
    }
  }
};
```

### Example Stories
- **Default Grid**: Multi-selection grid layout
- **List Layout**: Single column list view
- **Single Selection**: Radio-style selection
- **With Search**: Searchable options
- **Grouped Options**: Options organized in groups
- **With Icons**: Options with icons and badges
- **Large Dataset**: Performance with many options
- **Disabled State**: Non-interactive state
- **Loading State**: Loading indicator

## Usage Examples

### Basic Multi-Selection
```html
<app-selector 
  [options]="options"
  selectionMode="multiple"
  layoutMode="grid"
  [columns]="3"
  (selectionChange)="onSelectionChange($event)">
</app-selector>
```

### Single Selection with Search
```html
<app-selector 
  [options]="options"
  selectionMode="single"
  layoutMode="list"
  [searchable]="true"
  searchPlaceholder="Search skills..."
  (selectionChange)="onSkillChange($event)">
</app-selector>
```

### Grouped Options
```html
<app-selector 
  [groups]="skillGroups"
  selectionMode="multiple"
  layoutMode="grid"
  [columns]="2"
  [showSelectAll]="true"
  [maxSelections]="5"
  (selectionChange)="onSelectionChange($event)">
</app-selector>
```

## Testing Requirements

### Unit Tests
- Option selection and deselection
- Single vs multiple selection modes
- Search functionality
- Group collapse/expand
- Keyboard navigation
- Accessibility attributes
- Loading and disabled states
- Max selection limits

### Integration Tests
- Form integration
- Data binding
- Event emission
- Performance with large datasets

This specification provides complete implementation guidance for creating a flexible, accessible Selector component that integrates seamlessly with the existing Angular design system.