import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProgressStepsComponent } from './progress-steps.component';
import { StepConfig, StepClickEvent } from './progress-steps.types';

describe('ProgressStepsComponent', () => {
  let component: ProgressStepsComponent;
  let fixture: ComponentFixture<ProgressStepsComponent>;

  const defaultSteps: StepConfig[] = [
    { id: '1', label: 'Step 1', description: 'First step' },
    { id: '2', label: 'Step 2', description: 'Second step' },
    { id: '3', label: 'Step 3', description: 'Third step', optional: true },
    { id: '4', label: 'Step 4', description: 'Fourth step' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressStepsComponent, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressStepsComponent);
    component = fixture.componentInstance;
    component.steps = [...defaultSteps];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should render all steps', () => {
      const stepElements = fixture.debugElement.queryAll(By.css('.step-item'));
      expect(stepElements.length).toBe(4);
    });

    it('should set first step as active by default', () => {
      const activeStep = fixture.debugElement.query(By.css('.step-item.active'));
      expect(activeStep).toBeTruthy();
      
      const stepCircle = activeStep.query(By.css('.step-circle'));
      expect(stepCircle.classes['state-active']).toBeTruthy();
    });

    it('should display step labels when showLabels is true', () => {
      component.showLabels = true;
      fixture.detectChanges();
      
      const labels = fixture.debugElement.queryAll(By.css('.step-label'));
      expect(labels.length).toBe(4);
      expect(labels[0].nativeElement.textContent.trim()).toBe('Step 1');
    });

    it('should hide step labels when showLabels is false', () => {
      component.showLabels = false;
      fixture.detectChanges();
      
      const labels = fixture.debugElement.queryAll(By.css('.step-label'));
      expect(labels.length).toBe(0);
    });

    it('should display descriptions when showDescriptions is true', () => {
      component.showDescriptions = true;
      fixture.detectChanges();
      
      const descriptions = fixture.debugElement.queryAll(By.css('.step-description'));
      expect(descriptions.length).toBe(4);
      expect(descriptions[0].nativeElement.textContent.trim()).toBe('First step');
    });
  });

  describe('Step States', () => {
    it('should correctly identify step states', () => {
      component.steps[0].completed = true;
      component.steps[1].error = true;
      component.steps[2].disabled = true;
      component.currentStep = 1;
      
      expect(component.getStepState(component.steps[0], 0)).toBe('completed');
      expect(component.getStepState(component.steps[1], 1)).toBe('error');
      expect(component.getStepState(component.steps[2], 2)).toBe('disabled');
      expect(component.getStepState(component.steps[3], 3)).toBe('pending');
    });

    it('should render completed step with checkmark icon', () => {
      component.steps[0].completed = true;
      fixture.detectChanges();
      
      const completedStep = fixture.debugElement.query(By.css('.step-item.completed'));
      const checkIcon = completedStep.query(By.css('.icon-check'));
      expect(checkIcon).toBeTruthy();
    });

    it('should render error step with error icon', () => {
      component.steps[1].error = true;
      fixture.detectChanges();
      
      const errorStep = fixture.debugElement.query(By.css('.step-item.error'));
      const errorIcon = errorStep.query(By.css('.icon-error'));
      expect(errorIcon).toBeTruthy();
    });

    it('should render optional step with optional indicator', () => {
      const optionalStep = fixture.debugElement.queryAll(By.css('.step-item'))[2];
      const optionalIndicator = optionalStep.query(By.css('.optional-indicator'));
      expect(optionalIndicator?.nativeElement.textContent.trim()).toBe('(optional)');
    });
  });

  describe('Step Navigation', () => {
    it('should emit stepClick event when step is clicked', () => {
      spyOn(component.stepClick, 'emit');
      component.allowNavigation = true;
      fixture.detectChanges();
      
      const stepCircle = fixture.debugElement.query(By.css('.step-circle'));
      stepCircle.nativeElement.click();
      
      expect(component.stepClick.emit).toHaveBeenCalledWith({
        step: component.steps[0],
        index: 0,
        previousIndex: 0
      });
    });

    it('should not allow navigation to disabled steps', () => {
      component.steps[1].disabled = true;
      component.allowNavigation = true;
      fixture.detectChanges();
      
      const isClickable = component.isStepClickable(component.steps[1], 1);
      expect(isClickable).toBeFalsy();
    });

    it('should allow navigation when allowNavigation is true', () => {
      component.allowNavigation = true;
      fixture.detectChanges();
      
      const isClickable = component.isStepClickable(component.steps[2], 2);
      expect(isClickable).toBeTruthy();
    });

    it('should restrict navigation when allowNavigation is false', () => {
      component.allowNavigation = false;
      component.currentStep = 1;
      fixture.detectChanges();
      
      // Should allow current step
      expect(component.isStepClickable(component.steps[1], 1)).toBeTruthy();
      
      // Should allow next step
      expect(component.isStepClickable(component.steps[2], 2)).toBeTruthy();
      
      // Should not allow steps beyond next
      expect(component.isStepClickable(component.steps[3], 3)).toBeFalsy();
    });
  });

  describe('Connection Lines', () => {
    it('should show incomplete connection by default', () => {
      const connectionState = component.getConnectionState(0);
      expect(connectionState).toBe('incomplete');
    });

    it('should show partial connection when current step is completed', () => {
      component.steps[0].completed = true;
      const connectionState = component.getConnectionState(0);
      expect(connectionState).toBe('partial');
    });

    it('should show complete connection when both steps are completed', () => {
      component.steps[0].completed = true;
      component.steps[1].completed = true;
      const connectionState = component.getConnectionState(0);
      expect(connectionState).toBe('complete');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const progressSteps = fixture.debugElement.query(By.css('.progress-steps'));
      const element = progressSteps.nativeElement;
      
      expect(element.getAttribute('role')).toBe('progressbar');
      expect(element.getAttribute('aria-valuenow')).toBe('1');
      expect(element.getAttribute('aria-valuemax')).toBe('4');
      expect(element.getAttribute('aria-label')).toBe('Progress through steps');
    });

    it('should generate correct ARIA labels for steps', () => {
      const ariaLabel = component.getStepAriaLabel(component.steps[0], 0);
      expect(ariaLabel).toBe('Step 1 of 4: Step 1, current');
    });

    it('should include optional in ARIA label for optional steps', () => {
      const ariaLabel = component.getStepAriaLabel(component.steps[2], 2);
      expect(ariaLabel).toContain('optional');
    });

    it('should set aria-current for active step', () => {
      const activeStep = fixture.debugElement.query(By.css('.step-item.active'));
      expect(activeStep.nativeElement.getAttribute('aria-current')).toBe('step');
    });

    it('should set aria-disabled for disabled steps', () => {
      component.steps[1].disabled = true;
      fixture.detectChanges();
      
      const disabledStep = fixture.debugElement.queryAll(By.css('.step-item'))[1];
      expect(disabledStep.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('Responsive Behavior', () => {
    it('should apply responsive class when responsive is true', () => {
      component.responsive = true;
      fixture.detectChanges();
      
      const progressSteps = fixture.debugElement.query(By.css('.progress-steps'));
      expect(progressSteps.classes['responsive']).toBeTruthy();
    });

    it('should not apply responsive class when responsive is false', () => {
      component.responsive = false;
      fixture.detectChanges();
      
      const progressSteps = fixture.debugElement.query(By.css('.progress-steps'));
      expect(progressSteps.classes['responsive']).toBeFalsy();
    });
  });

  describe('Variants and Sizes', () => {
    it('should apply correct variant class', () => {
      component.variant = 'compact';
      fixture.detectChanges();
      
      const progressSteps = fixture.debugElement.query(By.css('.progress-steps'));
      expect(progressSteps.classes['variant-compact']).toBeTruthy();
    });

    it('should apply correct size class', () => {
      component.size = 'large';
      fixture.detectChanges();
      
      const progressSteps = fixture.debugElement.query(By.css('.progress-steps'));
      expect(progressSteps.classes['size-large']).toBeTruthy();
    });

    it('should apply correct orientation class', () => {
      component.orientation = 'vertical';
      fixture.detectChanges();
      
      const progressSteps = fixture.debugElement.query(By.css('.progress-steps'));
      expect(progressSteps.classes['orientation-vertical']).toBeTruthy();
    });
  });

  describe('Progress Calculation', () => {
    it('should calculate progress correctly', () => {
      component.steps[0].completed = true;
      component.steps[1].completed = true;
      
      const progress = component.getProgress();
      expect(progress).toBe(50); // 2 out of 4 steps completed
    });

    it('should return 0 progress when no steps are completed', () => {
      const progress = component.getProgress();
      expect(progress).toBe(0);
    });

    it('should return 100 progress when all steps are completed', () => {
      component.steps.forEach(step => step.completed = true);
      
      const progress = component.getProgress();
      expect(progress).toBe(100);
    });
  });

  describe('Public Methods', () => {
    it('should navigate to step using goToStep method', () => {
      const result = component.goToStep(2);
      expect(result).toBeTruthy();
      expect(component.currentStep).toBe(2);
    });

    it('should not navigate to invalid step index', () => {
      const result = component.goToStep(10);
      expect(result).toBeFalsy();
      expect(component.currentStep).toBe(0);
    });

    it('should navigate to next step using nextStep method', () => {
      const result = component.nextStep();
      expect(result).toBeTruthy();
      expect(component.currentStep).toBe(1);
    });

    it('should navigate to previous step using previousStep method', () => {
      component.currentStep = 2;
      const result = component.previousStep();
      expect(result).toBeTruthy();
      expect(component.currentStep).toBe(1);
    });

    it('should mark step as completed', () => {
      component.markStepCompleted(1);
      expect(component.steps[1].completed).toBeTruthy();
      expect(component.steps[1].error).toBeFalsy();
    });

    it('should mark step as error', () => {
      component.markStepError(1);
      expect(component.steps[1].error).toBeTruthy();
      expect(component.steps[1].completed).toBeFalsy();
    });
  });

  describe('Event Emissions', () => {
    it('should emit stepChange event when step changes', () => {
      spyOn(component.stepChange, 'emit');
      
      component.goToStep(2);
      expect(component.stepChange.emit).toHaveBeenCalledWith(2);
    });

    it('should emit complete event when all steps are completed', () => {
      spyOn(component.complete, 'emit');
      
      // Complete all steps and set to last step
      component.steps.forEach(step => step.completed = true);
      component.currentStep = component.steps.length - 1;
      component.updateStepStates();
      
      expect(component.complete.emit).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle empty steps array gracefully', () => {
      component.steps = [];
      component.ngOnInit();
      
      expect(component.getProgress()).toBe(0);
    });

    it('should validate currentStep bounds', () => {
      component.currentStep = 10;
      component.ngOnInit();
      
      expect(component.currentStep).toBe(0);
    });

    it('should handle steps without IDs in trackBy function', () => {
      const stepsWithoutIds = [
        { id: '', label: 'Step 1' },
        { id: '', label: 'Step 2' }
      ] as StepConfig[];
      
      expect(component.trackByStepId(0, stepsWithoutIds[0])).toBe(0);
      expect(component.trackByStepId(1, stepsWithoutIds[1])).toBe(1);
    });
  });
});