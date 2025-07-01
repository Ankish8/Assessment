# Input Component Specification
## Angular Implementation Blueprint

### Executive Summary
This document provides exact specifications for implementing the Input component in Angular with 100% visual parity to the React version. The Input component is a versatile form field that supports multiple sizes, variants, states, and comprehensive validation feedback.

**Priority**: High - Core UI component
**Complexity**: Medium - Multiple variants and states
**Dependencies**: Design tokens, accessibility patterns

---

## 1. Component Interface Specification

### 1.1 Input Properties (Angular @Input)
```typescript
interface InputComponentProps {
  // Basic Properties
  type: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' = 'text';
  placeholder?: string;
  value?: string;
  disabled: boolean = false;
  required: boolean = false;
  id?: string;
  
  // Styling Properties
  size: 'sm' | 'base' | 'lg' = 'base';
  variant: 'default' | 'filled' | 'ghost' = 'default';
  state: 'default' | 'error' | 'success' = 'default';
  
  // Label and Help Text
  label?: string;
  helperText?: string;
  errorMessage?: string;
  
  // Icons
  startIcon?: TemplateRef<any> | string; // For Angular template or icon name
  endIcon?: TemplateRef<any> | string;
  
  // CSS Classes
  className?: string;
  containerClassName?: string;
}
```

### 1.2 Output Events (Angular @Output)
```typescript
interface InputComponentEvents {
  valueChange: EventEmitter<string>;
  blur: EventEmitter<FocusEvent>;
  focus: EventEmitter<FocusEvent>;
  input: EventEmitter<Event>;
  keyup: EventEmitter<KeyboardEvent>;
  keydown: EventEmitter<KeyboardEvent>;
}
```

### 1.3 Template Reference Variables
```typescript
// Angular template reference for direct access
@ViewChild('inputElement', { static: false }) inputElement: ElementRef<HTMLInputElement>;
```

---

## 2. Visual Specifications

### 2.1 Container Specifications
```css
.container {
  width: 100%;
  display: block;
}
```

### 2.2 Label Specifications
```css
.label {
  display: block;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #2a1f35; /* --color-text-primary */
  margin-bottom: 8px;
  line-height: 1.25;
}

.required {
  color: #d92d20; /* --color-error-500 */
  margin-left: 4px;
}
```

### 2.3 Input Wrapper Specifications
```css
.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}
```

### 2.4 Base Input Specifications
```css
.input {
  width: 100%;
  border: 1px solid #ddd6e3; /* --color-border-primary */
  border-radius: 8px;
  background-color: #ffffff; /* --color-background-primary */
  color: #2a1f35; /* --color-text-primary */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  box-sizing: border-box;
}

.input::placeholder {
  color: #a695b0; /* --color-text-placeholder */
}
```

---

## 3. Size Variant Specifications

### 3.1 Small Size (sm)
```css
.input.sm {
  height: 32px;
  padding: 0 12px;
  font-size: 12px;
}

/* With start icon */
.input.sm.hasStartIcon {
  padding-left: 32px;
}

/* With end icon */
.input.sm.hasEndIcon {
  padding-right: 32px;
}
```

### 3.2 Base Size (base) - Default
```css
.input.base {
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
}

/* With start icon */
.input.base.hasStartIcon {
  padding-left: 40px;
}

/* With end icon */
.input.base.hasEndIcon {
  padding-right: 40px;
}
```

### 3.3 Large Size (lg)
```css
.input.lg {
  height: 48px;
  padding: 0 20px;
  font-size: 16px;
}

/* With start icon */
.input.lg.hasStartIcon {
  padding-left: 48px;
}

/* With end icon */
.input.lg.hasEndIcon {
  padding-right: 48px;
}
```

---

## 4. Style Variant Specifications

### 4.1 Default Variant
```css
.input.default {
  /* Uses base input styles */
  border: 1px solid #ddd6e3;
  background-color: #ffffff;
}
```

### 4.2 Filled Variant
```css
.input.filled {
  background-color: #f8f6fa; /* --color-background-secondary */
  border-color: transparent;
}

.input.filled:hover:not(:disabled) {
  background-color: #efebf2; /* --color-background-tertiary */
}

.input.filled:focus {
  background-color: #ffffff;
  border-color: #611f69; /* --color-primary-600 */
}
```

### 4.3 Ghost Variant
```css
.input.ghost {
  background-color: transparent;
  border-color: transparent;
  padding-left: 0;
  padding-right: 0;
}

.input.ghost:hover:not(:disabled) {
  background-color: #f8f6fa;
  border-color: #ddd6e3;
}

.input.ghost:focus {
  background-color: #ffffff;
  border-color: #611f69;
}
```

---

## 5. Interactive State Specifications

### 5.1 Default State
```css
.input:hover:not(:disabled) {
  border-color: #c4b8cd; /* --color-border-hover */
}

.input:focus {
  border-color: #611f69; /* --color-primary-600 */
  box-shadow: 0 0 0 4px #ebd4ef; /* --shadow-focus */
}
```

### 5.2 Error State
```css
.input.error {
  border-color: #fda29b; /* --color-error-300 */
  background-color: #ffffff;
}

.input.error:focus {
  border-color: #d92d20; /* --color-error-500 */
  box-shadow: 0 0 0 4px #fee4e2; /* --shadow-error-focus */
}
```

### 5.3 Success State
```css
.input.success {
  border-color: #6ce9a6; /* --color-success-300 */
}

.input.success:focus {
  border-color: #12b76a; /* --color-success-500 */
  box-shadow: 0 0 0 4px #d1fadf; /* --color-success-100 */
}
```

### 5.4 Disabled State
```css
.input:disabled {
  background-color: #efebf2; /* --color-background-disabled */
  border-color: #ddd6e3; /* --color-border-disabled */
  color: #a695b0; /* --color-text-disabled */
  cursor: not-allowed;
}
```

---

## 6. Icon Integration Specifications

### 6.1 Icon Container Specifications
```css
.startIcon,
.endIcon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8a7490; /* --color-text-tertiary */
  pointer-events: none;
  z-index: 1;
}

.startIcon {
  left: 12px;
}

.endIcon {
  right: 12px;
}
```

### 6.2 Icon Size Specifications
```css
.startIcon svg,
.endIcon svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
```

### 6.3 Icon Responsive Behavior
- Icons maintain 16px size across all input sizes
- Icon position adjusts based on input padding
- Icons are not clickable (pointer-events: none)
- Icons inherit color from parent for theming

---

## 7. Help Text and Error Message Specifications

### 7.1 Help Text Container
```css
.helpText {
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.25;
}
```

### 7.2 Helper Text Styling
```css
.helperText {
  color: #6b5671; /* --color-text-secondary */
}
```

### 7.3 Error Message Styling
```css
.errorText {
  color: #d92d20; /* --color-text-error */
  display: flex;
  align-items: center;
  gap: 4px;
}

.errorText svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}
```

### 7.4 Built-in Error Icon SVG
```svg
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8S4.4 14.5 8 14.5S14.5 11.6 14.5 8S11.6 1.5 8 1.5ZM8 10.5C7.7 10.5 7.5 10.3 7.5 10V8C7.5 7.7 7.7 7.5 8 7.5S8.5 7.7 8.5 8V10C8.5 10.3 8.3 10.5 8 10.5ZM8 6.5C7.7 6.5 7.5 6.3 7.5 6S7.7 5.5 8 5.5S8.5 5.7 8.5 6S8.3 6.5 8 6.5Z" fill="currentColor"/>
</svg>
```

---

## 8. Behavioral Specifications

### 8.1 Focus Management
- Input focuses on click anywhere in the input wrapper
- Label click focuses the input (for attribute)
- Tab navigation follows normal form flow
- Focus outline uses design system focus styles

### 8.2 Error Handling Logic
```typescript
// Error state priority (React logic to replicate)
const hasError = state === 'error' || !!errorMessage;

// Error message display logic
if (hasError) {
  // Show errorMessage if provided, otherwise show default error styling
  displayErrorMessage = errorMessage;
} else if (helperText) {
  // Show helper text when no error
  displayHelperText = helperText;
}
```

### 8.3 ID Generation
```typescript
// Auto-generate unique ID if not provided
const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
```

### 8.4 Class Combination Logic
```typescript
// Input classes combination (React logic to replicate)
const inputClasses = [
  'input',
  size, // 'sm', 'base', 'lg'
  variant, // 'default', 'filled', 'ghost'
  state, // 'default', 'error', 'success'
  startIcon && 'hasStartIcon',
  endIcon && 'hasEndIcon',
  disabled && 'disabled',
  hasError && 'error',
  className
].filter(Boolean).join(' ');
```

---

## 9. Accessibility Specifications

### 9.1 ARIA Attributes
```html
<input
  [attr.aria-invalid]="hasError"
  [attr.aria-describedby]="helpTextId"
  [attr.aria-required]="required"
  [attr.aria-label]="label"
/>
```

### 9.2 Label Association
```html
<label [for]="inputId">
  {{label}}
  <span class="required" *ngIf="required">*</span>
</label>
```

### 9.3 Help Text Association
```html
<div class="helpText" [id]="helpTextId" *ngIf="helperText || errorMessage">
  <!-- Error or helper text -->
</div>
```

### 9.4 Keyboard Navigation
- **Tab**: Navigate between form fields
- **Shift + Tab**: Navigate backward
- **Enter**: Submit form (if in form context)
- **Escape**: Clear focus (browser default)

---

## 10. Angular Implementation Guidelines

### 10.1 Component Structure
```typescript
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  // Component implementation
}
```

### 10.2 Template Structure
```html
<div class="container" [ngClass]="containerClassName">
  <label *ngIf="label" [for]="inputId" class="label">
    {{label}}
    <span class="required" *ngIf="required">*</span>
  </label>
  
  <div class="inputWrapper">
    <div class="startIcon" *ngIf="startIcon">
      <ng-container *ngIf="isTemplate(startIcon)">
        <ng-container *ngTemplateOutlet="startIcon"></ng-container>
      </ng-container>
      <span *ngIf="!isTemplate(startIcon)">{{startIcon}}</span>
    </div>
    
    <input
      #inputElement
      [id]="inputId"
      [type]="type"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [required]="required"
      [value]="value"
      [ngClass]="inputClasses"
      [attr.aria-invalid]="hasError"
      [attr.aria-describedby]="helpTextId"
      [attr.aria-required]="required"
      (input)="onInput($event)"
      (blur)="onBlur($event)"
      (focus)="onFocus($event)"
    />
    
    <div class="endIcon" *ngIf="endIcon">
      <ng-container *ngIf="isTemplate(endIcon)">
        <ng-container *ngTemplateOutlet="endIcon"></ng-container>
      </ng-container>
      <span *ngIf="!isTemplate(endIcon)">{{endIcon}}</span>
    </div>
  </div>
  
  <div class="helpText" [id]="helpTextId" *ngIf="helperText || errorMessage">
    <span class="errorText" *ngIf="hasError">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8S4.4 14.5 8 14.5S14.5 11.6 14.5 8S11.6 1.5 8 1.5ZM8 10.5C7.7 10.5 7.5 10.3 7.5 10V8C7.5 7.7 7.7 7.5 8 7.5S8.5 7.7 8.5 8V10C8.5 10.3 8.3 10.5 8 10.5ZM8 6.5C7.7 6.5 7.5 6.3 7.5 6S7.7 5.5 8 5.5S8.5 5.7 8.5 6S8.3 6.5 8 6.5Z" fill="currentColor"/>
      </svg>
      {{errorMessage}}
    </span>
    <span class="helperText" *ngIf="!hasError">{{helperText}}</span>
  </div>
</div>
```

### 10.3 Reactive Forms Integration
```typescript
// ControlValueAccessor implementation
writeValue(value: any): void {
  this.value = value;
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
```

---

## 11. Design Token Integration

### 11.1 Required Design Tokens
```scss
// Import design tokens
@import 'src/styles/tokens.scss';

// Use tokens in component styles
.input {
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  font-family: var(--font-family-base);
  transition: all var(--animation-duration-base) var(--animation-ease-in-out);
}
```

### 11.2 Token Mapping
- **Colors**: Use semantic color tokens (--color-text-primary, --color-border-primary, etc.)
- **Spacing**: Use spacing scale (--spacing-1 through --spacing-12)
- **Typography**: Use font tokens (--font-size-sm, --font-weight-medium, etc.)
- **Timing**: Use animation tokens (--animation-duration-base, --animation-ease-in-out)

---

## 12. Testing Specifications

### 12.1 Unit Test Requirements
```typescript
describe('InputComponent', () => {
  // Test all prop combinations
  it('should render with default props');
  it('should render with all size variants');
  it('should render with all style variants');
  it('should render with all states');
  it('should handle error states correctly');
  it('should handle disabled state correctly');
  it('should handle required state correctly');
  it('should render with icons');
  it('should generate unique IDs');
  it('should emit events correctly');
  it('should implement ControlValueAccessor');
});
```

### 12.2 Visual Regression Testing
- Test all size variants
- Test all style variants
- Test all states (default, error, success, disabled)
- Test with and without icons
- Test with and without labels
- Test with and without help text
- Test focus states
- Test hover states

### 12.3 Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast ratios
- Focus management
- ARIA attribute correctness

---

## 13. Storybook Story Requirements

### 13.1 Required Stories
```typescript
// Primary stories
export const Default = {};
export const WithLabel = {};
export const WithHelperText = {};
export const WithError = {};
export const Required = {};
export const Disabled = {};

// Icon stories
export const WithStartIcon = {};
export const WithEndIcon = {};
export const Password = {};

// Size stories
export const Small = {};
export const Large = {};

// Variant stories
export const Filled = {};
export const Ghost = {};

// Form example
export const FormExample = {};
```

### 13.2 Interactive Controls
```typescript
export default {
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'base', 'lg'] },
    variant: { control: { type: 'select' }, options: ['default', 'filled', 'ghost'] },
    state: { control: { type: 'select' }, options: ['default', 'error', 'success'] },
    type: { control: { type: 'select' }, options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};
```

---

## 14. Implementation Checklist

### 14.1 Core Implementation
- [ ] Create Angular component with proper TypeScript interfaces
- [ ] Implement ControlValueAccessor for reactive forms
- [ ] Create comprehensive SCSS styles with design tokens
- [ ] Implement template with conditional rendering
- [ ] Add proper event handling and binding

### 14.2 Styling Implementation
- [ ] Implement all 3 size variants (sm, base, lg)
- [ ] Implement all 3 style variants (default, filled, ghost)
- [ ] Implement all 3 states (default, error, success)
- [ ] Implement disabled state styling
- [ ] Implement icon positioning and sizing
- [ ] Implement focus states and transitions

### 14.3 Accessibility Implementation
- [ ] Add proper ARIA attributes
- [ ] Implement label association
- [ ] Add keyboard navigation support
- [ ] Ensure proper color contrast
- [ ] Add screen reader support

### 14.4 Testing Implementation
- [ ] Write comprehensive unit tests
- [ ] Create Storybook stories
- [ ] Implement visual regression tests
- [ ] Add accessibility tests
- [ ] Test form integration

### 14.5 Documentation
- [ ] Create component documentation
- [ ] Add usage examples
- [ ] Document accessibility features
- [ ] Create migration guide from React

---

## 15. Success Criteria

### 15.1 Visual Parity
- ✅ 100% pixel-perfect match with React component
- ✅ All variants render identically
- ✅ All states behave identically
- ✅ Icons positioned correctly
- ✅ Transitions and animations match

### 15.2 Functional Parity
- ✅ All props and events work as expected
- ✅ Form integration works correctly
- ✅ Error handling works identically
- ✅ Accessibility features implemented
- ✅ Performance meets standards

### 15.3 Code Quality
- ✅ TypeScript fully typed
- ✅ SCSS follows design system
- ✅ Code follows Angular best practices
- ✅ Tests achieve 100% coverage
- ✅ Storybook stories comprehensive

---

## 16. Final Notes

This specification provides exact measurements, colors, and behavioral requirements for implementing the Input component in Angular. The component must achieve 100% visual and functional parity with the React version while following Angular best practices and accessibility standards.

**Critical Success Factors:**
1. Use exact design token values - no approximations
2. Implement all interactive states with correct styling
3. Ensure proper form integration with ControlValueAccessor
4. Maintain accessibility standards throughout
5. Create comprehensive test coverage

**Next Steps:**
1. Angular Dev 1 implements the component following this specification
2. Visual regression testing against React version
3. Accessibility testing and validation
4. Integration testing with forms
5. Storybook story creation and documentation

**Estimated Implementation Time:** 2-3 days for full implementation with tests
**Review Required:** Visual review against React component, accessibility audit, code review