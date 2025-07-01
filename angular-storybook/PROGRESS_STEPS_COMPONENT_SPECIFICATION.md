# ProgressSteps Component Specification

**Sprint 3 - Advanced Components**  
**Component**: ProgressSteps  
**Status**: Ready for Implementation  
**Version**: 1.0  

## Overview

The ProgressSteps component provides a visual representation of multi-step processes with navigation capabilities, state management, and responsive design. This component serves as the foundation for complex form flows and guided user experiences.

## Component Architecture

### File Structure
```
src/app/components/progress-steps/
├── progress-steps.component.ts       # Main component logic
├── progress-steps.component.html     # Template
├── progress-steps.component.scss     # Styles
├── progress-steps.component.spec.ts  # Tests
├── progress-steps.animations.ts     # Animation definitions
├── progress-steps.types.ts          # Type definitions
├── index.ts                         # Exports
└── progress-steps.stories.ts        # Storybook stories
```

## Step Data Structure

### StepConfig Interface
```typescript
interface StepConfig {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  optional?: boolean;
  completed?: boolean;
  error?: boolean;
  href?: string;
  clickable?: boolean;
}

interface ProgressStepsConfig {
  steps: StepConfig[];
  currentStep: number;
  allowNavigation?: boolean;
  showLabels?: boolean;
  showDescriptions?: boolean;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'compact' | 'minimal';
  size?: 'small' | 'medium' | 'large';
}
```

### Step States
1. **Pending** - Not yet started (default state)
2. **Active** - Currently active step
3. **Completed** - Successfully completed
4. **Error** - Contains validation errors
5. **Disabled** - Cannot be accessed
6. **Optional** - Can be skipped

## Visual States & Styling

### Step Circle States

#### Pending State
```scss
.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--color-border-secondary);
  background: var(--color-background-secondary);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}
```

#### Active State
```scss
.step-circle.active {
  border: 2px solid var(--color-primary);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  box-shadow: 0 0 0 4px var(--color-primary-soft);
}
```

#### Completed State
```scss
.step-circle.completed {
  border: 2px solid var(--color-success);
  background: var(--color-success);
  color: var(--color-text-inverse);
}
```

#### Error State
```scss
.step-circle.error {
  border: 2px solid var(--color-error);
  background: var(--color-error);
  color: var(--color-text-inverse);
}
```

#### Disabled State
```scss
.step-circle.disabled {
  border: 2px solid var(--color-border-disabled);
  background: var(--color-background-disabled);
  color: var(--color-text-disabled);
  opacity: 0.5;
}
```

### Connection Lines

#### Default Connection
```scss
.step-connection {
  height: 2px;
  background: var(--color-border-secondary);
  flex: 1;
  margin: 0 8px;
}
```

#### Completed Connection
```scss
.step-connection.completed {
  background: var(--color-success);
}
```

#### Active Connection
```scss
.step-connection.active {
  background: linear-gradient(
    to right,
    var(--color-success) 0%,
    var(--color-success) 50%,
    var(--color-border-secondary) 50%,
    var(--color-border-secondary) 100%
  );
}
```

### Typography Specifications

#### Step Labels
```scss
.step-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-top: 8px;
  text-align: center;
}

.step-label.active {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

.step-label.completed {
  color: var(--color-success);
}

.step-label.disabled {
  color: var(--color-text-disabled);
}
```

#### Step Descriptions
```scss
.step-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: 4px;
  text-align: center;
  line-height: 1.3;
}
```

## Responsive Design

### Desktop Layout (≥768px)
- Horizontal orientation by default
- Step circles: 32px diameter
- Labels displayed below circles
- Descriptions shown when enabled
- Connection lines between steps

### Tablet Layout (≥576px, <768px)
- Maintains horizontal layout
- Step circles: 28px diameter
- Labels may wrap
- Descriptions hidden by default
- Shorter connection lines

### Mobile Layout (<576px)
- Can switch to vertical orientation
- Step circles: 24px diameter
- Labels positioned to the right of circles
- Descriptions hidden
- Vertical connection lines
- Overflow scroll for many steps

### Responsive Classes
```scss
// Desktop
.progress-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
}

// Mobile
@media (max-width: 576px) {
  .progress-steps.responsive {
    flex-direction: column;
    align-items: flex-start;
    
    .step-item {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 16px;
    }
    
    .step-connection {
      width: 2px;
      height: 16px;
      margin: 0 15px;
    }
  }
}
```

## Interactive Behavior

### Click Handling
```typescript
@Component({...})
export class ProgressStepsComponent {
  @Input() allowNavigation: boolean = false;
  @Output() stepClick = new EventEmitter<StepClickEvent>();
  
  onStepClick(step: StepConfig, index: number): void {
    if (!this.allowNavigation || step.disabled) {
      return;
    }
    
    const event: StepClickEvent = {
      step,
      index,
      previousIndex: this.currentStep
    };
    
    this.stepClick.emit(event);
  }
}
```

### Navigation Rules
- **Forward Navigation**: Always allowed to next incomplete step
- **Backward Navigation**: Only if `allowNavigation` is true
- **Skip Optional**: Optional steps can be bypassed
- **Disabled Steps**: Cannot be clicked or navigated to
- **Error Steps**: Must be resolved before proceeding

### Hover States
```scss
.step-circle:not(.disabled):hover {
  cursor: pointer;
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

.step-circle.clickable:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
```

## Animation System

### Step Transitions
```typescript
// progress-steps.animations.ts
export const stepTransitions = [
  trigger('stepState', [
    state('pending', style({
      transform: 'scale(1)',
      opacity: 1
    })),
    state('active', style({
      transform: 'scale(1.1)',
      opacity: 1
    })),
    state('completed', style({
      transform: 'scale(1)',
      opacity: 1
    })),
    transition('* => active', [
      animate('0.3s ease-out')
    ]),
    transition('active => completed', [
      animate('0.2s ease-in')
    ])
  ]),
  
  trigger('progressLine', [
    state('incomplete', style({
      width: '0%'
    })),
    state('complete', style({
      width: '100%'
    })),
    transition('incomplete => complete', [
      animate('0.5s ease-out')
    ])
  ])
];
```

### Icon Animations
```scss
.step-icon {
  transition: all 0.3s ease;
}

.step-circle.completed .step-icon {
  animation: checkmark 0.6s ease;
}

@keyframes checkmark {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

## Accessibility Requirements

### ARIA Patterns
```html
<ol class="progress-steps" 
    role="progressbar" 
    [attr.aria-valuenow]="currentStep + 1"
    [attr.aria-valuemax]="steps.length"
    aria-label="Progress through steps">
  
  <li *ngFor="let step of steps; let i = index"
      class="step-item"
      [class.active]="i === currentStep"
      [class.completed]="step.completed"
      [class.disabled]="step.disabled"
      role="step"
      [attr.aria-current]="i === currentStep ? 'step' : null"
      [attr.aria-disabled]="step.disabled"
      [attr.aria-describedby]="step.description ? 'step-' + i + '-desc' : null">
    
    <button class="step-circle"
            [disabled]="step.disabled || !allowNavigation"
            (click)="onStepClick(step, i)"
            [attr.aria-label]="getStepAriaLabel(step, i)">
      <span class="step-number" *ngIf="!step.completed && !step.error">
        {{ i + 1 }}
      </span>
      <i class="step-icon" 
         [class]="getStepIcon(step)"
         *ngIf="step.completed || step.error"
         aria-hidden="true"></i>
    </button>
    
    <div class="step-content">
      <div class="step-label">{{ step.label }}</div>
      <div class="step-description" 
           *ngIf="step.description && showDescriptions"
           [id]="'step-' + i + '-desc'">
        {{ step.description }}
      </div>
    </div>
  </li>
</ol>
```

### Keyboard Navigation
```typescript
@HostListener('keydown', ['$event'])
onKeyDown(event: KeyboardEvent): void {
  if (!this.allowNavigation) return;
  
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      this.navigateToNext();
      event.preventDefault();
      break;
      
    case 'ArrowLeft':
    case 'ArrowUp':
      this.navigateToPrevious();
      event.preventDefault();
      break;
      
    case 'Home':
      this.navigateToFirst();
      event.preventDefault();
      break;
      
    case 'End':
      this.navigateToLast();
      event.preventDefault();
      break;
  }
}
```

### Screen Reader Support
```typescript
getStepAriaLabel(step: StepConfig, index: number): string {
  const position = `Step ${index + 1} of ${this.steps.length}`;
  const status = step.completed ? 'completed' : 
                step.error ? 'has errors' :
                index === this.currentStep ? 'current' : 'pending';
  const optional = step.optional ? ', optional' : '';
  
  return `${position}: ${step.label}, ${status}${optional}`;
}
```

## Angular Implementation

### Component Definition
```typescript
@Component({
  selector: 'app-progress-steps',
  templateUrl: './progress-steps.component.html',
  styleUrls: ['./progress-steps.component.scss'],
  animations: [stepTransitions],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressStepsComponent implements OnInit, OnChanges {
  @Input() steps: StepConfig[] = [];
  @Input() currentStep: number = 0;
  @Input() allowNavigation: boolean = false;
  @Input() showLabels: boolean = true;
  @Input() showDescriptions: boolean = false;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() variant: 'default' | 'compact' | 'minimal' = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  @Output() stepClick = new EventEmitter<StepClickEvent>();
  @Output() stepChange = new EventEmitter<number>();
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.validateSteps();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentStep'] || changes['steps']) {
      this.updateStepStates();
    }
  }
}
```

### Service Integration
```typescript
@Injectable({
  providedIn: 'root'
})
export class ProgressStepsService {
  private stepsSubject = new BehaviorSubject<StepConfig[]>([]);
  private currentStepSubject = new BehaviorSubject<number>(0);
  
  steps$ = this.stepsSubject.asObservable();
  currentStep$ = this.currentStepSubject.asObservable();
  
  setSteps(steps: StepConfig[]): void {
    this.stepsSubject.next(steps);
  }
  
  goToStep(index: number): void {
    this.currentStepSubject.next(index);
  }
  
  nextStep(): void {
    const current = this.currentStepSubject.value;
    const steps = this.stepsSubject.value;
    const nextIndex = current + 1;
    
    if (nextIndex < steps.length) {
      this.goToStep(nextIndex);
    }
  }
  
  previousStep(): void {
    const current = this.currentStepSubject.value;
    if (current > 0) {
      this.goToStep(current - 1);
    }
  }
  
  markStepCompleted(index: number): void {
    const steps = [...this.stepsSubject.value];
    if (steps[index]) {
      steps[index].completed = true;
      steps[index].error = false;
      this.setSteps(steps);
    }
  }
  
  markStepError(index: number): void {
    const steps = [...this.stepsSubject.value];
    if (steps[index]) {
      steps[index].error = true;
      steps[index].completed = false;
      this.setSteps(steps);
    }
  }
}
```

## Storybook Stories

### Story Configuration
```typescript
// progress-steps.stories.ts
export default {
  title: 'Components/ProgressSteps',
  component: ProgressStepsComponent,
  parameters: {
    docs: {
      description: {
        component: 'A flexible progress indicator component for multi-step processes'
      }
    }
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical']
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'minimal']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    }
  }
} as Meta;

const defaultSteps: StepConfig[] = [
  { id: '1', label: 'Personal Info', description: 'Enter your basic information' },
  { id: '2', label: 'Address', description: 'Provide your address details', completed: true },
  { id: '3', label: 'Payment', description: 'Payment and billing information' },
  { id: '4', label: 'Review', description: 'Review and confirm your details', optional: true }
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: true
  }
};

export const CompactVertical: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    orientation: 'vertical',
    variant: 'compact',
    showDescriptions: false
  }
};

export const WithErrors: Story = {
  args: {
    steps: [
      { id: '1', label: 'Step 1', completed: true },
      { id: '2', label: 'Step 2', error: true },
      { id: '3', label: 'Step 3' },
      { id: '4', label: 'Step 4', disabled: true }
    ],
    currentStep: 1
  }
};
```

## Implementation Checklist

### Phase 1: Core Component
- [ ] Create component file structure
- [ ] Implement basic step rendering
- [ ] Add step state management
- [ ] Create base styling

### Phase 2: Interactions
- [ ] Add click handlers
- [ ] Implement navigation logic
- [ ] Add hover states
- [ ] Create animation system

### Phase 3: Accessibility
- [ ] Add ARIA attributes
- [ ] Implement keyboard navigation
- [ ] Add screen reader support
- [ ] Test with accessibility tools

### Phase 4: Responsive Design
- [ ] Create mobile layouts
- [ ] Add breakpoint handling
- [ ] Test on different screen sizes
- [ ] Optimize touch interactions

### Phase 5: Advanced Features
- [ ] Add service integration
- [ ] Create variant styles
- [ ] Add icon support
- [ ] Implement overflow handling

### Phase 6: Testing & Documentation
- [ ] Write unit tests
- [ ] Create Storybook stories
- [ ] Add usage documentation
- [ ] Performance testing

## Success Criteria

✅ **Visual Consistency**: All step states render correctly with proper styling  
✅ **Responsive Design**: Component adapts seamlessly across all device sizes  
✅ **Accessibility**: Full keyboard navigation and screen reader support  
✅ **Interactive**: Smooth navigation and state transitions  
✅ **Flexible**: Supports multiple variants and configurations  
✅ **Performance**: Optimized rendering with OnPush change detection  
✅ **Tested**: Comprehensive test coverage including edge cases  
✅ **Documented**: Complete Storybook stories and usage examples  

---

**Next Steps**: Begin Phase 1 implementation with core component structure and basic rendering functionality.