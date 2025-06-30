import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { CardComponent } from './components/card/card.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { ProgressStepsComponent } from './components/progress-steps/progress-steps.component';
import { SelectorComponent } from './components/selector/selector.component';
import { StepConfig, StepClickEvent } from './components/progress-steps/progress-steps.types';
import { SelectorOption, SelectorGroup } from './components/selector/selector.types';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ButtonComponent, InputComponent, CardComponent, ModalDemoComponent, ProgressStepsComponent, SelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular Component Library Demo';

  // Icon definitions as string SVGs for demo
  searchIcon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7 7L13 13M7 7C7 7.66667 7.66667 7 8 7S9 7.66667 9 7S8.33333 6.33333 8 6S7 6.33333 7 7ZM15 7C15 11.4183 11.4183 15 7 15C2.58172 15 -1 11.4183 -1 7C-1 2.58172 2.58172 -1 7 -1C11.4183 -1 15 2.58172 15 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  
  emailIcon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3H14C14.5523 3 15 3.44772 15 4V12C15 12.5523 14.5523 13 14 13H2C1.44772 13 1 12.5523 1 12V4C1 3.44772 1.44772 3 2 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 4L8 8.5L1 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  
  eyeIcon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8C1 8 4 2 8 2C12 2 15 8 15 8C15 8 12 14 8 14C4 14 1 8 1 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // Progress Steps demo data
  onboardingSteps: StepConfig[] = [
    { 
      id: '1', 
      label: 'Account Setup', 
      description: 'Create your account and basic profile',
      completed: true
    },
    { 
      id: '2', 
      label: 'Verification', 
      description: 'Verify your email and phone number',
      completed: true
    },
    { 
      id: '3', 
      label: 'Preferences', 
      description: 'Set your notification and privacy preferences'
    },
    { 
      id: '4', 
      label: 'Integration', 
      description: 'Connect with external services', 
      optional: true 
    },
    { 
      id: '5', 
      label: 'Complete', 
      description: 'You\'re all set to get started!'
    }
  ];

  currentOnboardingStep = 2;

  checkoutSteps: StepConfig[] = [
    { 
      id: '1', 
      label: 'Cart', 
      description: 'Review items',
      completed: true
    },
    { 
      id: '2', 
      label: 'Shipping', 
      description: 'Delivery details',
      completed: true
    },
    { 
      id: '3', 
      label: 'Payment', 
      description: 'Payment method'
    },
    { 
      id: '4', 
      label: 'Review', 
      description: 'Final confirmation'
    }
  ];

  currentCheckoutStep = 2;

  onButtonClick(event: MouseEvent) {
    console.log('Button clicked!', event);
  }

  onInputChange(inputName: string, value: string) {
    console.log(`Input ${inputName} changed:`, value);
  }

  onCardClick(event: MouseEvent) {
    console.log('Card clicked!', event);
    alert('Card was clicked! Check the console for details.');
  }

  onStepClick(event: StepClickEvent) {
    console.log('Step clicked:', event);
    if (event.step.id === '1' || event.step.id === '2') {
      this.currentOnboardingStep = event.index;
    }
  }

  onStepChange(stepIndex: number) {
    console.log('Step changed to:', stepIndex);
    this.currentOnboardingStep = stepIndex;
  }

  onProgressComplete() {
    console.log('Progress completed!');
    alert('Congratulations! You have completed all steps.');
  }

  simulateProgress() {
    // Simulate completing current step and moving to next
    if (this.currentOnboardingStep < this.onboardingSteps.length - 1) {
      this.onboardingSteps[this.currentOnboardingStep].completed = true;
      this.currentOnboardingStep++;
    }
  }

  simulateError() {
    // Simulate an error on current step
    if (this.currentOnboardingStep < this.onboardingSteps.length) {
      this.onboardingSteps[this.currentOnboardingStep].error = true;
    }
  }

  resetProgress() {
    // Reset all steps
    this.onboardingSteps.forEach(step => {
      step.completed = false;
      step.error = false;
    });
    this.onboardingSteps[0].completed = true;
    this.onboardingSteps[1].completed = true;
    this.currentOnboardingStep = 2;
  }

  get onboardingProgress(): number {
    if (!this.onboardingSteps) return 0;
    const completedSteps = this.onboardingSteps.filter(step => !!step.completed).length;
    return Math.round((completedSteps / this.onboardingSteps.length) * 100);
  }

  // Selector demo data
  programmingLanguages: SelectorOption[] = [
    {
      id: 'js',
      label: 'JavaScript',
      value: 'javascript',
      description: 'Dynamic programming language for web development',
      badge: 'Popular'
    },
    {
      id: 'ts',
      label: 'TypeScript',
      value: 'typescript',
      description: 'Typed superset of JavaScript',
      badge: 'Growing'
    },
    {
      id: 'py',
      label: 'Python',
      value: 'python',
      description: 'High-level programming language for AI and web development',
      badge: 'AI/ML'
    },
    {
      id: 'java',
      label: 'Java',
      value: 'java',
      description: 'Object-oriented programming language'
    },
    {
      id: 'cpp',
      label: 'C++',
      value: 'cpp',
      description: 'Systems programming language',
      disabled: true
    }
  ];

  countries: SelectorOption[] = [
    { id: 'us', label: 'United States', value: 'US', badge: 'Popular' },
    { id: 'uk', label: 'United Kingdom', value: 'UK' },
    { id: 'ca', label: 'Canada', value: 'CA' },
    { id: 'au', label: 'Australia', value: 'AU' },
    { id: 'de', label: 'Germany', value: 'DE' },
    { id: 'fr', label: 'France', value: 'FR' }
  ];

  selectedLanguage: any = null;
  selectedLanguages: any[] = [];
  selectedCountry: any = null;

  onLanguageChange(value: any) {
    this.selectedLanguage = value;
    console.log('Selected language:', value);
  }

  onLanguagesChange(values: any[]) {
    this.selectedLanguages = values;
    console.log('Selected languages:', values);
  }

  onCountryChange(value: any) {
    this.selectedCountry = value;
    console.log('Selected country:', value);
  }
}
