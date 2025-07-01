import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  StepConfig, 
  StepClickEvent,
  StepOrientation,
  StepVariant,
  StepSize 
} from './progress-steps.types';

@Component({
  selector: 'app-progress-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-steps.component.html',
  styleUrls: ['./progress-steps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressStepsComponent {
  @Input() steps: StepConfig[] = [];
  @Input() currentStep: number = 0;
  @Input() allowNavigation: boolean = false;
  @Input() showLabels: boolean = true;
  @Input() showDescriptions: boolean = false;
  @Input() orientation: StepOrientation = 'horizontal';
  @Input() variant: StepVariant = 'default';
  @Input() size: StepSize = 'medium';
  @Input() responsive: boolean = true;

  @Output() stepClick = new EventEmitter<StepClickEvent>();
  @Output() stepChange = new EventEmitter<number>();
  @Output() complete = new EventEmitter<void>();

  get computedClasses(): string {
    return [
      `progress-steps-${this.orientation}`,
      `progress-steps-${this.variant}`,
      `progress-steps-${this.size}`,
      this.responsive ? 'progress-steps-responsive' : ''
    ].filter(Boolean).join(' ');
  }

  getStepClasses(step: StepConfig, index: number): string {
    const classes = [];
    
    if (step.completed) classes.push('completed');
    if (step.error) classes.push('error');
    if (step.disabled) classes.push('disabled');
    if (index === this.currentStep) classes.push('current');
    if (this.allowNavigation && !step.disabled) classes.push('clickable');
    
    return classes.join(' ');
  }

  getStepAriaLabel(step: StepConfig, index: number): string {
    let label = `Step ${index + 1}: ${step.label}`;
    
    if (step.completed) label += ', completed';
    if (step.error) label += ', error';
    if (step.disabled) label += ', disabled';
    if (step.optional) label += ', optional';
    if (index === this.currentStep) label += ', current step';
    
    return label;
  }

  onStepClick(step: StepConfig, index: number): void {
    if (!this.allowNavigation || step.disabled) return;
    
    const previousIndex = this.currentStep;
    this.stepClick.emit({ step, index, previousIndex });
    
    if (index !== this.currentStep) {
      this.stepChange.emit(index);
    }
  }
}