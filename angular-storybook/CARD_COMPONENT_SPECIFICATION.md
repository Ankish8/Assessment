# Card Component Specification

## Overview
Comprehensive specification for implementing an Angular Card component that integrates seamlessly with the existing design system. Based on systematic analysis of the current component architecture and design tokens.

## Component Interface

### TypeScript Types
```typescript
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';
export type CardSize = 'small' | 'medium' | 'large';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';
```

### Component Properties
```typescript
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() size: CardSize = 'medium';
  @Input() padding: CardPadding = 'medium';
  @Input() clickable: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() className: string = '';
  @Input() ariaLabel: string = '';
  @Input() role: string = 'region';
  
  // Header content projection
  @Input() showHeader: boolean = false;
  @Input() headerTitle: string = '';
  @Input() headerSubtitle: string = '';
  
  // Footer content projection  
  @Input() showFooter: boolean = false;
  
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
}
```

## Visual Specifications

### Base Card Styles
```scss
.card {
  display: flex;
  flex-direction: column;
  font-family: var(--font-family-base);
  border-radius: var(--radius-md);
  transition: all var(--animation-duration-base) var(--animation-ease-in-out);
  position: relative;
  overflow: hidden;
  background-color: var(--color-background-primary);
  border: 1px solid transparent;
}

.card:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Variant Specifications

#### Default Variant
```scss
.default {
  background-color: var(--color-background-primary);
  border: 1px solid var(--color-border-primary);
  box-shadow: none;
}

.default:hover:not(.disabled) {
  border-color: var(--color-border-hover);
}
```

#### Elevated Variant
```scss
.elevated {
  background-color: var(--color-background-primary);
  border: 1px solid transparent;
  box-shadow: var(--shadow-sm);
}

.elevated:hover:not(.disabled) {
  box-shadow: 0 4px 6px rgba(16, 24, 40, 0.1), 0 2px 4px rgba(16, 24, 40, 0.06);
  transform: translateY(-1px);
}
```

#### Outlined Variant
```scss
.outlined {
  background-color: var(--color-background-primary);
  border: 2px solid var(--color-border-primary);
  box-shadow: none;
}

.outlined:hover:not(.disabled) {
  border-color: var(--color-primary-600);
  box-shadow: var(--shadow-xs);
}
```

#### Flat Variant
```scss
.flat {
  background-color: var(--color-background-secondary);
  border: 1px solid transparent;
  box-shadow: none;
}

.flat:hover:not(.disabled) {
  background-color: var(--color-background-tertiary);
}
```

### Size Specifications

#### Small Size
```scss
.small {
  min-height: 120px;
  max-width: 280px;
}

.small .card-header {
  font-size: var(--font-size-sm);
}

.small .card-body {
  font-size: var(--font-size-sm);
}
```

#### Medium Size (Default)
```scss
.medium {
  min-height: 160px;
  max-width: 400px;
}

.medium .card-header {
  font-size: var(--font-size-base);
}

.medium .card-body {
  font-size: var(--font-size-base);
}
```

#### Large Size
```scss
.large {
  min-height: 200px;
  max-width: 600px;
}

.large .card-header {
  font-size: var(--font-size-lg);
}

.large .card-body {
  font-size: var(--font-size-base);
}
```

### Padding Specifications

#### None Padding
```scss
.padding-none {
  padding: 0;
}

.padding-none .card-header,
.padding-none .card-body,
.padding-none .card-footer {
  padding: 0;
}
```

#### Small Padding
```scss
.padding-small {
  padding: var(--spacing-3);
}

.padding-small .card-header {
  padding: var(--spacing-3) var(--spacing-3) var(--spacing-2) var(--spacing-3);
}

.padding-small .card-body {
  padding: 0 var(--spacing-3) var(--spacing-2) var(--spacing-3);
}

.padding-small .card-footer {
  padding: var(--spacing-2) var(--spacing-3) var(--spacing-3) var(--spacing-3);
}
```

#### Medium Padding (Default)
```scss
.padding-medium {
  padding: var(--spacing-4);
}

.padding-medium .card-header {
  padding: var(--spacing-4) var(--spacing-4) var(--spacing-3) var(--spacing-4);
}

.padding-medium .card-body {
  padding: 0 var(--spacing-4) var(--spacing-3) var(--spacing-4);
}

.padding-medium .card-footer {
  padding: var(--spacing-3) var(--spacing-4) var(--spacing-4) var(--spacing-4);
}
```

#### Large Padding
```scss
.padding-large {
  padding: var(--spacing-6);
}

.padding-large .card-header {
  padding: var(--spacing-6) var(--spacing-6) var(--spacing-4) var(--spacing-6);
}

.padding-large .card-body {
  padding: 0 var(--spacing-6) var(--spacing-4) var(--spacing-6);
}

.padding-large .card-footer {
  padding: var(--spacing-4) var(--spacing-6) var(--spacing-6) var(--spacing-6);
}
```

## Layout Structure

### Card Header Specifications
```scss
.card-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  border-bottom: 1px solid var(--color-border-primary);
}

.card-header:last-child {
  border-bottom: none;
}

.card-header-title {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.4;
}

.card-header-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
  line-height: 1.4;
}
```

### Card Body Specifications
```scss
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: var(--color-text-primary);
  line-height: 1.5;
}

.card-body:first-child {
  padding-top: var(--spacing-4);
}

.card-body:last-child {
  padding-bottom: var(--spacing-4);
}
```

### Card Footer Specifications
```scss
.card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-3);
  border-top: 1px solid var(--color-border-primary);
}

.card-footer:first-child {
  border-top: none;
}

.card-footer.justify-start {
  justify-content: flex-start;
}

.card-footer.justify-center {
  justify-content: center;
}

.card-footer.justify-between {
  justify-content: space-between;
}
```

## Interactive States

### Clickable Card States
```scss
.clickable {
  cursor: pointer;
  user-select: none;
}

.clickable:hover:not(.disabled) {
  transform: translateY(-1px);
}

.clickable:active:not(.disabled) {
  transform: translateY(0);
}

.clickable:focus {
  box-shadow: var(--shadow-focus);
}
```

### Loading State
```scss
.loading {
  position: relative;
  pointer-events: none;
}

.loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.loading-spinner {
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

## Responsive Behavior

### Mobile Breakpoints
```scss
@media (max-width: 768px) {
  .card {
    max-width: 100%;
    margin: 0 var(--spacing-2);
  }
  
  .large {
    min-height: 160px;
  }
  
  .large .card-header {
    font-size: var(--font-size-base);
  }
  
  .padding-large {
    padding: var(--spacing-4);
  }
  
  .padding-large .card-header,
  .padding-large .card-body,
  .padding-large .card-footer {
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
  }
}
```

## Content Projection Template

### HTML Template Structure
```html
<div [class]="computedClasses" 
     [attr.role]="role"
     [attr.aria-label]="ariaLabel"
     [tabindex]="clickable ? 0 : -1"
     (click)="onCardClick($event)"
     (keydown)="onCardKeyDown($event)">
  
  <!-- Header Section -->
  <div class="card-header" *ngIf="showHeader || headerTitle || headerSubtitle">
    <h3 class="card-header-title" *ngIf="headerTitle">{{ headerTitle }}</h3>
    <p class="card-header-subtitle" *ngIf="headerSubtitle">{{ headerSubtitle }}</p>
    <ng-content select="[slot=header]"></ng-content>
  </div>
  
  <!-- Body Section -->
  <div class="card-body">
    <ng-content></ng-content>
  </div>
  
  <!-- Footer Section -->
  <div class="card-footer" *ngIf="showFooter">
    <ng-content select="[slot=footer]"></ng-content>
  </div>
  
  <!-- Loading Overlay -->
  <div class="loading-spinner" *ngIf="loading"></div>
</div>
```

## Accessibility Specifications

### ARIA Support
- Default role: `region`
- Support for custom `aria-label`
- Keyboard navigation support for clickable cards
- Focus management with visual focus indicators
- Screen reader friendly content structure

### Keyboard Interactions
- **Enter/Space**: Trigger click event for clickable cards
- **Tab**: Navigate to next focusable element
- **Shift+Tab**: Navigate to previous focusable element

## Implementation Guidelines

### Component Class Structure
```typescript
get computedClasses(): string {
  return [
    'card',
    this.variant,
    this.size,
    `padding-${this.padding}`,
    this.clickable ? 'clickable' : '',
    this.disabled ? 'disabled' : '',
    this.loading ? 'loading' : '',
    this.className
  ].filter(Boolean).join(' ');
}

onCardClick(event: MouseEvent): void {
  if (!this.disabled && !this.loading && this.clickable) {
    this.onClick.emit(event);
  }
}

onCardKeyDown(event: KeyboardEvent): void {
  if (!this.disabled && !this.loading && this.clickable) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onClick.emit(event as any);
    }
    this.onKeyDown.emit(event);
  }
}
```

### Design Token Extensions
Add these tokens to the existing design system:

```scss
:root {
  // Card-specific shadows
  --card-shadow-hover: 0 4px 6px rgba(16, 24, 40, 0.1), 0 2px 4px rgba(16, 24, 40, 0.06);
  
  // Card-specific spacing
  --card-min-height-sm: 120px;
  --card-min-height-base: 160px;
  --card-min-height-lg: 200px;
  
  // Card-specific widths
  --card-max-width-sm: 280px;
  --card-max-width-base: 400px;
  --card-max-width-lg: 600px;
}
```

## Storybook Stories Structure

### Story Configuration
```typescript
const meta: Meta<CardComponent> = {
  title: 'UI/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'flat']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large']
    },
    clickable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' }
  }
};
```

### Example Stories
- **Default**: Basic card with medium size and padding
- **Elevated**: Card with shadow elevation
- **Outlined**: Card with prominent border
- **Flat**: Card with background fill
- **Clickable**: Interactive card with hover states
- **With Header**: Card with title and subtitle
- **With Footer**: Card with action buttons
- **Loading**: Card with loading spinner
- **All Sizes**: Showcase of small, medium, large variants

## Usage Examples

### Basic Card
```html
<app-card>
  <p>This is a basic card with default styling.</p>
</app-card>
```

### Card with Header and Footer
```html
<app-card headerTitle="Card Title" headerSubtitle="Card subtitle" [showFooter]="true">
  <p>Card content goes here.</p>
  <div slot="footer">
    <app-button variant="secondary">Cancel</app-button>
    <app-button variant="primary">Confirm</app-button>
  </div>
</app-card>
```

### Clickable Card
```html
<app-card variant="elevated" 
          [clickable]="true" 
          (onClick)="handleCardClick($event)"
          ariaLabel="Clickable card">
  <p>Click this entire card to trigger an action.</p>
</app-card>
```

## Testing Requirements

### Unit Tests
- All variant combinations render correctly
- Click events are emitted properly
- Keyboard navigation works as expected
- Loading states display correctly
- Accessibility attributes are applied
- Content projection works for all slots

### Visual Regression Tests
- All variant and size combinations
- Interactive states (hover, focus, active)
- Loading state overlay
- Responsive breakpoint behavior
- Content overflow handling

This specification provides complete implementation guidance for creating a Card component that seamlessly integrates with the existing Angular design system and follows established patterns.