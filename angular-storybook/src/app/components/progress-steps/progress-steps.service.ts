import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepConfig } from './progress-steps.types';

@Injectable({
  providedIn: 'root'
})
export class ProgressStepsService {
  private stepsSubject = new BehaviorSubject<StepConfig[]>([]);
  private currentStepSubject = new BehaviorSubject<number>(0);
  private allowNavigationSubject = new BehaviorSubject<boolean>(false);

  steps$ = this.stepsSubject.asObservable();
  currentStep$ = this.currentStepSubject.asObservable();
  allowNavigation$ = this.allowNavigationSubject.asObservable();

  get steps(): StepConfig[] {
    return this.stepsSubject.value;
  }

  get currentStep(): number {
    return this.currentStepSubject.value;
  }

  get allowNavigation(): boolean {
    return this.allowNavigationSubject.value;
  }

  setSteps(steps: StepConfig[]): void {
    this.stepsSubject.next([...steps]);
  }

  setAllowNavigation(allow: boolean): void {
    this.allowNavigationSubject.next(allow);
  }

  goToStep(index: number): boolean {
    const steps = this.stepsSubject.value;
    
    if (index < 0 || index >= steps.length) {
      return false;
    }

    const targetStep = steps[index];
    if (targetStep.disabled) {
      return false;
    }

    // If navigation is not allowed, only allow forward to next step or backward if completed
    if (!this.allowNavigation) {
      const currentIndex = this.currentStepSubject.value;
      
      // Allow forward to next step only
      if (index > currentIndex && index !== currentIndex + 1) {
        return false;
      }
      
      // Allow backward navigation only to completed steps
      if (index < currentIndex && !steps[index].completed) {
        return false;
      }
    }

    this.currentStepSubject.next(index);
    return true;
  }

  nextStep(): boolean {
    const current = this.currentStepSubject.value;
    const steps = this.stepsSubject.value;
    let nextIndex = current + 1;

    // Skip optional steps if not explicitly navigated to
    while (nextIndex < steps.length && steps[nextIndex].disabled) {
      nextIndex++;
    }

    if (nextIndex < steps.length) {
      return this.goToStep(nextIndex);
    }
    
    return false;
  }

  previousStep(): boolean {
    const current = this.currentStepSubject.value;
    let prevIndex = current - 1;

    // Skip disabled steps when going backward
    while (prevIndex >= 0 && this.steps[prevIndex].disabled) {
      prevIndex--;
    }

    if (prevIndex >= 0) {
      return this.goToStep(prevIndex);
    }
    
    return false;
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

  markStepPending(index: number): void {
    const steps = [...this.stepsSubject.value];
    if (steps[index]) {
      steps[index].error = false;
      steps[index].completed = false;
      this.setSteps(steps);
    }
  }

  isStepAccessible(index: number): boolean {
    const steps = this.stepsSubject.value;
    const step = steps[index];
    
    if (!step || step.disabled) {
      return false;
    }

    if (!this.allowNavigation) {
      const currentIndex = this.currentStepSubject.value;
      
      // Can access current step
      if (index === currentIndex) {
        return true;
      }
      
      // Can access next step
      if (index === currentIndex + 1) {
        return true;
      }
      
      // Can access completed previous steps
      if (index < currentIndex && step.completed) {
        return true;
      }
      
      return false;
    }

    return true;
  }

  getProgress(): number {
    const steps = this.stepsSubject.value;
    if (steps.length === 0) return 0;
    
    const completedSteps = steps.filter(step => step.completed).length;
    return Math.round((completedSteps / steps.length) * 100);
  }

  reset(): void {
    const steps = this.stepsSubject.value.map(step => ({
      ...step,
      completed: false,
      error: false
    }));
    this.setSteps(steps);
    this.currentStepSubject.next(0);
  }

  hasErrors(): boolean {
    return this.stepsSubject.value.some(step => step.error);
  }

  canProceed(): boolean {
    const current = this.currentStepSubject.value;
    const steps = this.stepsSubject.value;
    
    if (current >= steps.length) return false;
    
    const currentStep = steps[current];
    return !currentStep.error && !currentStep.disabled;
  }
}