import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

import { SelectorComponent } from '../app/components/selector/selector.component';
import { SelectorOption, SelectorGroup, SelectorMode, SelectorLayout, SelectorSize, SelectorVariant } from '../app/components/selector/selector.types';

// Sample data for stories
const programmingLanguages: SelectorOption[] = [
  {
    id: 'js',
    label: 'JavaScript',
    value: 'javascript',
    description: 'Dynamic programming language for web development',
    icon: 'fab fa-js-square',
    badge: 'Popular'
  },
  {
    id: 'ts',
    label: 'TypeScript',
    value: 'typescript',
    description: 'Typed superset of JavaScript',
    icon: 'fab fa-js-square',
    badge: 'Growing'
  },
  {
    id: 'py',
    label: 'Python',
    value: 'python',
    description: 'High-level programming language for AI and web development',
    icon: 'fab fa-python',
    badge: 'AI/ML'
  },
  {
    id: 'java',
    label: 'Java',
    value: 'java',
    description: 'Object-oriented programming language',
    icon: 'fab fa-java'
  },
  {
    id: 'cpp',
    label: 'C++',
    value: 'cpp',
    description: 'Systems programming language',
    disabled: true
  },
  {
    id: 'rust',
    label: 'Rust',
    value: 'rust',
    description: 'Systems programming language focused on safety',
    badge: 'Fast'
  },
  {
    id: 'go',
    label: 'Go',
    value: 'go',
    description: 'Programming language developed by Google',
    badge: 'Cloud'
  },
  {
    id: 'swift',
    label: 'Swift',
    value: 'swift',
    description: 'Programming language for iOS development',
    icon: 'fab fa-swift'
  }
];

const skillGroups: SelectorGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend Technologies',
    description: 'Client-side development skills',
    options: [
      { id: 'html', label: 'HTML5', value: 'html5', description: 'Markup language for web pages' },
      { id: 'css', label: 'CSS3', value: 'css3', description: 'Styling language for web pages' },
      { id: 'sass', label: 'Sass/SCSS', value: 'sass', description: 'CSS preprocessor' },
      { id: 'angular', label: 'Angular', value: 'angular', description: 'TypeScript web framework', badge: 'Framework' },
      { id: 'react', label: 'React', value: 'react', description: 'JavaScript library for UI', badge: 'Library' },
      { id: 'vue', label: 'Vue.js', value: 'vue', description: 'Progressive JavaScript framework', badge: 'Framework' }
    ]
  },
  {
    id: 'backend',
    label: 'Backend Technologies',
    description: 'Server-side development skills',
    options: [
      { id: 'nodejs', label: 'Node.js', value: 'nodejs', description: 'JavaScript runtime for servers' },
      { id: 'express', label: 'Express.js', value: 'express', description: 'Web framework for Node.js' },
      { id: 'django', label: 'Django', value: 'django', description: 'Python web framework' },
      { id: 'spring', label: 'Spring Boot', value: 'spring', description: 'Java web framework' },
      { id: 'dotnet', label: '.NET Core', value: 'dotnet', description: 'Microsoft web framework' }
    ]
  },
  {
    id: 'database',
    label: 'Database Technologies',
    description: 'Data storage and management',
    collapsed: true,
    options: [
      { id: 'postgres', label: 'PostgreSQL', value: 'postgresql', description: 'Open source relational database' },
      { id: 'mysql', label: 'MySQL', value: 'mysql', description: 'Popular relational database' },
      { id: 'mongodb', label: 'MongoDB', value: 'mongodb', description: 'NoSQL document database' },
      { id: 'redis', label: 'Redis', value: 'redis', description: 'In-memory data store' }
    ]
  }
];

const countries: SelectorOption[] = [
  { id: 'us', label: 'United States', value: 'US', badge: 'Popular' },
  { id: 'uk', label: 'United Kingdom', value: 'UK' },
  { id: 'ca', label: 'Canada', value: 'CA' },
  { id: 'au', label: 'Australia', value: 'AU' },
  { id: 'de', label: 'Germany', value: 'DE' },
  { id: 'fr', label: 'France', value: 'FR' },
  { id: 'jp', label: 'Japan', value: 'JP' },
  { id: 'br', label: 'Brazil', value: 'BR' },
  { id: 'in', label: 'India', value: 'IN', badge: 'Growing' },
  { id: 'cn', label: 'China', value: 'CN' }
];

@Component({
  selector: 'selector-demo',
  template: `
    <div class="story-container">
      <h3>{{ title }}</h3>
      <p *ngIf="description">{{ description }}</p>
      
      <app-selector
        [options]="options"
        [groups]="groups"
        [mode]="mode"
        [layout]="layout"
        [size]="size"
        [variant]="variant"
        [gridColumns]="gridColumns"
        [searchable]="searchable"
        [clearable]="clearable"
        [groupable]="groupable"
        [disabled]="disabled"
        [loading]="loading"
        [required]="required"
        [minSelection]="minSelection"
        [maxSelection]="maxSelection"
        [label]="label"
        [placeholder]="placeholder"
        [searchPlaceholder]="searchPlaceholder"
        [helperText]="helperText"
        [errorMessage]="errorMessage"
        [maxHeight]="maxHeight"
        (selectionChange)="onSelectionChange($event)"
        (optionSelect)="onOptionSelect($event)"
        (optionDeselect)="onOptionDeselect($event)"
        (searchChange)="onSearchChange($event)">
      </app-selector>
      
      <div *ngIf="showOutput" class="output-section">
        <h4>Selected Value(s):</h4>
        <pre>{{ selectedValue | json }}</pre>
        
        <h4>Events Log:</h4>
        <div class="events-log">
          <div *ngFor="let event of events.slice(-5)" class="event-item">
            {{ event }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .story-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: var(--font-family-base);
    }
    
    .output-section {
      margin-top: 30px;
      padding: 20px;
      background-color: var(--color-background-secondary);
      border-radius: var(--radius-md);
    }
    
    .events-log {
      max-height: 150px;
      overflow-y: auto;
      background-color: var(--color-background-primary);
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-md);
      padding: 10px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
    }
    
    .event-item {
      padding: 2px 0;
      border-bottom: 1px solid var(--color-border-primary);
    }
    
    .event-item:last-child {
      border-bottom: none;
    }
    
    pre {
      background-color: var(--color-background-primary);
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-md);
      padding: 10px;
      font-size: 12px;
      overflow-x: auto;
    }
    
    h3 {
      color: var(--color-text-primary);
      margin-bottom: 10px;
    }
    
    h4 {
      color: var(--color-text-primary);
      margin: 15px 0 10px 0;
      font-size: 14px;
    }
    
    p {
      color: var(--color-text-secondary);
      margin-bottom: 20px;
    }
  `]
})
class SelectorDemoComponent {
  title = 'Selector Demo';
  description = '';
  
  // Component props
  options: SelectorOption[] = [];
  groups: SelectorGroup[] = [];
  mode: SelectorMode = 'single';
  layout: SelectorLayout = 'list';
  size: SelectorSize = 'base';
  variant: SelectorVariant = 'default';
  gridColumns = 3;
  searchable = true;
  clearable = true;
  groupable = false;
  disabled = false;
  loading = false;
  required = false;
  minSelection?: number;
  maxSelection?: number;
  label = '';
  placeholder = 'Select an option...';
  searchPlaceholder = 'Search options...';
  helperText = '';
  errorMessage = '';
  maxHeight = '300px';
  
  // Demo state
  selectedValue: any = null;
  events: string[] = [];
  showOutput = true;
  
  onSelectionChange(value: any) {
    this.selectedValue = value;
    this.events.push(`Selection changed: ${JSON.stringify(value)}`);
  }
  
  onOptionSelect(option: SelectorOption) {
    this.events.push(`Option selected: ${option.label}`);
  }
  
  onOptionDeselect(option: SelectorOption) {
    this.events.push(`Option deselected: ${option.label}`);
  }
  
  onSearchChange(searchTerm: string) {
    this.events.push(`Search changed: "${searchTerm}"`);
  }
}

const meta: Meta<SelectorDemoComponent> = {
  title: 'UI Components/Selector',
  component: SelectorDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SelectorComponent,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Selector Component

A comprehensive, accessible selector component for Angular applications with advanced features including:

## Features
- **Single and Multiple Selection**: Support for both single and multi-select modes
- **Advanced Search**: Real-time filtering with highlighting and debounced input
- **Flexible Layouts**: List and responsive grid layouts with configurable columns
- **Grouping Support**: Collapsible/expandable option groups with hierarchical structure
- **Rich Options**: Icons, badges, descriptions, and disabled states
- **Accessibility**: Complete ARIA implementation and keyboard navigation
- **Validation**: Built-in and custom validation with error states
- **Customizable**: Templates, themes, and extensive styling options
- **Performance**: Virtual scrolling for large datasets and optimized rendering

## Usage Examples
The selector component can be used in various scenarios including skill selection, country selection, language preferences, and more.

## Keyboard Navigation
- **Arrow Keys**: Navigate through options
- **Enter/Space**: Select focused option
- **Escape**: Clear keyboard focus
- **Home/End**: Jump to first/last option

## Accessibility
The component follows WAI-ARIA guidelines and provides:
- Screen reader support
- Keyboard navigation
- Focus management
- Proper ARIA attributes
- High contrast mode support
        `
      }
    }
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple']
    },
    layout: {
      control: { type: 'select' },
      options: ['list', 'grid']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg']
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'card', 'minimal']
    },
    gridColumns: {
      control: { type: 'range', min: 1, max: 6, step: 1 }
    }
  }
};

export default meta;
type Story = StoryObj<SelectorDemoComponent>;

// Basic Examples
export const Default: Story = {
  args: {
    title: 'Default Selector',
    description: 'Basic single selection with search functionality',
    options: programmingLanguages.slice(0, 5),
    mode: 'single',
    layout: 'list',
    label: 'Programming Language',
    placeholder: 'Choose a programming language...',
    helperText: 'Select your preferred programming language'
  }
};

export const MultipleSelection: Story = {
  args: {
    title: 'Multiple Selection',
    description: 'Select multiple programming languages with tags display',
    options: programmingLanguages,
    mode: 'multiple',
    layout: 'list',
    label: 'Programming Languages',
    placeholder: 'Choose programming languages...',
    helperText: 'Select all languages you are proficient in',
    maxSelection: 5
  }
};

export const GridLayout: Story = {
  args: {
    title: 'Grid Layout',
    description: 'Options displayed in a responsive grid with cards',
    options: programmingLanguages,
    mode: 'single',
    layout: 'grid',
    variant: 'card',
    gridColumns: 3,
    label: 'Technology Stack',
    placeholder: 'Select your primary technology...',
    maxHeight: '400px'
  }
};

export const WithGroups: Story = {
  args: {
    title: 'Grouped Options',
    description: 'Hierarchical options with collapsible groups',
    groups: skillGroups,
    mode: 'multiple',
    layout: 'list',
    groupable: true,
    label: 'Technical Skills',
    placeholder: 'Select your skills...',
    helperText: 'Choose skills from different technology categories',
    minSelection: 2,
    maxSelection: 8
  }
};

// Size Variants
export const SmallSize: Story = {
  args: {
    title: 'Small Size Selector',
    description: 'Compact selector for space-constrained layouts',
    options: countries.slice(0, 6),
    mode: 'single',
    size: 'sm',
    label: 'Country',
    placeholder: 'Select country...'
  }
};

export const LargeSize: Story = {
  args: {
    title: 'Large Size Selector',
    description: 'Spacious selector for prominent placement',
    options: programmingLanguages.slice(0, 6),
    mode: 'multiple',
    size: 'lg',
    layout: 'grid',
    gridColumns: 2,
    variant: 'card',
    label: 'Primary Technologies',
    placeholder: 'Choose technologies...'
  }
};

// Variant Styles
export const CardVariant: Story = {
  args: {
    title: 'Card Variant',
    description: 'Options styled as elevated cards',
    options: programmingLanguages.slice(0, 6),
    mode: 'single',
    layout: 'grid',
    variant: 'card',
    gridColumns: 3,
    label: 'Preferred Language',
    placeholder: 'Pick a language...'
  }
};

export const MinimalVariant: Story = {
  args: {
    title: 'Minimal Variant',
    description: 'Clean, minimal styling without borders',
    options: countries.slice(0, 8),
    mode: 'single',
    variant: 'minimal',
    label: 'Location',
    placeholder: 'Where are you located?'
  }
};

// Functional Examples
export const WithValidation: Story = {
  args: {
    title: 'Validation Example',
    description: 'Required selection with minimum/maximum constraints',
    options: programmingLanguages,
    mode: 'multiple',
    required: true,
    minSelection: 2,
    maxSelection: 4,
    label: 'Core Technologies',
    placeholder: 'Select 2-4 technologies...',
    helperText: 'Choose between 2 and 4 technologies for your project',
    errorMessage: 'Please select between 2 and 4 technologies'
  }
};

export const SearchAndFilter: Story = {
  args: {
    title: 'Search and Filtering',
    description: 'Advanced search with real-time filtering and highlighting',
    options: programmingLanguages,
    groups: skillGroups,
    mode: 'multiple',
    groupable: true,
    searchable: true,
    label: 'Technical Expertise',
    placeholder: 'Search and select skills...',
    searchPlaceholder: 'Type to search technologies...',
    helperText: 'Search by name or description to find relevant technologies'
  }
};

export const DisabledOptions: Story = {
  args: {
    title: 'Disabled Options',
    description: 'Some options are disabled and cannot be selected',
    options: [
      ...programmingLanguages.slice(0, 3),
      { ...programmingLanguages[3], disabled: true },
      { ...programmingLanguages[4], disabled: true },
      ...programmingLanguages.slice(5)
    ],
    mode: 'multiple',
    label: 'Available Languages',
    placeholder: 'Select available languages...',
    helperText: 'Some languages are currently unavailable'
  }
};

export const LoadingState: Story = {
  args: {
    title: 'Loading State',
    description: 'Selector in loading state with spinner',
    options: [],
    loading: true,
    label: 'Remote Data',
    placeholder: 'Loading options...',
    loadingMessage: 'Fetching available options...'
  }
};

export const NoSearchWithClear: Story = {
  args: {
    title: 'No Search, With Clear',
    description: 'Simple selector without search but with clear functionality',
    options: countries,
    mode: 'single',
    searchable: false,
    clearable: true,
    label: 'Country of Origin',
    placeholder: 'Select your country...'
  }
};

export const HighDensityGrid: Story = {
  args: {
    title: 'High Density Grid',
    description: 'Many options in a compact grid layout',
    options: [
      ...programmingLanguages,
      ...countries.map(c => ({ ...c, id: 'country-' + c.id, description: 'Country option' }))
    ],
    mode: 'multiple',
    layout: 'grid',
    variant: 'minimal',
    gridColumns: 4,
    size: 'sm',
    maxHeight: '250px',
    label: 'Quick Selection',
    placeholder: 'Multi-select from grid...'
  }
};

// Form Integration Example
@Component({
  selector: 'form-integration-demo',
  template: `
    <div class="story-container">
      <h3>Form Integration Demo</h3>
      <p>Selector integrated with Angular Reactive Forms</p>
      
      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
        <div class="form-row">
          <app-selector
            formControlName="primaryLanguage"
            [options]="languages"
            mode="single"
            label="Primary Programming Language"
            placeholder="Select your main language..."
            helperText="Choose the language you use most often"
            required="true">
          </app-selector>
        </div>
        
        <div class="form-row">
          <app-selector
            formControlName="skills"
            [groups]="skillGroups"
            mode="multiple"
            groupable="true"
            label="Technical Skills"
            placeholder="Select your skills..."
            helperText="Choose all applicable skills (minimum 3)"
            [minSelection]="3"
            [maxSelection]="10">
          </app-selector>
        </div>
        
        <div class="form-row">
          <app-selector
            formControlName="location"
            [options]="locations"
            mode="single"
            size="sm"
            variant="minimal"
            label="Location"
            placeholder="Where are you based?"
            searchable="true">
          </app-selector>
        </div>
        
        <div class="form-actions">
          <button type="submit" [disabled]="profileForm.invalid" class="submit-btn">
            Submit Profile
          </button>
          <button type="button" (click)="resetForm()" class="reset-btn">
            Reset Form
          </button>
        </div>
      </form>
      
      <div class="form-state">
        <h4>Form State:</h4>
        <p><strong>Valid:</strong> {{ profileForm.valid }}</p>
        <p><strong>Value:</strong></p>
        <pre>{{ profileForm.value | json }}</pre>
        
        <div *ngIf="profileForm.errors" class="form-errors">
          <h4>Form Errors:</h4>
          <pre>{{ profileForm.errors | json }}</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .story-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: var(--font-family-base);
    }
    
    .form-row {
      margin-bottom: 24px;
    }
    
    .form-actions {
      display: flex;
      gap: 12px;
      margin: 32px 0;
    }
    
    .submit-btn, .reset-btn {
      padding: 12px 24px;
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: all var(--animation-duration-base) var(--animation-ease-in-out);
    }
    
    .submit-btn {
      background-color: var(--color-primary-600);
      color: white;
      border: none;
    }
    
    .submit-btn:hover:not(:disabled) {
      background-color: var(--color-primary-700);
    }
    
    .submit-btn:disabled {
      background-color: var(--color-background-disabled);
      color: var(--color-text-disabled);
      cursor: not-allowed;
    }
    
    .reset-btn {
      background-color: transparent;
      color: var(--color-text-secondary);
      border: 1px solid var(--color-border-primary);
    }
    
    .reset-btn:hover {
      background-color: var(--color-background-tertiary);
      color: var(--color-text-primary);
    }
    
    .form-state {
      margin-top: 32px;
      padding: 20px;
      background-color: var(--color-background-secondary);
      border-radius: var(--radius-md);
    }
    
    .form-errors {
      margin-top: 16px;
      padding: 12px;
      background-color: var(--color-error-100);
      border: 1px solid var(--color-error);
      border-radius: var(--radius-md);
    }
    
    pre {
      background-color: var(--color-background-primary);
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-md);
      padding: 10px;
      font-size: 12px;
      overflow-x: auto;
      margin: 8px 0;
    }
    
    h3, h4 {
      color: var(--color-text-primary);
      margin-bottom: 10px;
    }
    
    p {
      color: var(--color-text-secondary);
      margin: 4px 0;
    }
  `]
})
class FormIntegrationDemoComponent {
  profileForm = new FormGroup({
    primaryLanguage: new FormControl(null, [
      (control) => control.value ? null : { required: true }
    ]),
    skills: new FormControl([], [
      (control) => {
        const value = control.value || [];
        if (value.length < 3) return { minSelection: true };
        if (value.length > 10) return { maxSelection: true };
        return null;
      }
    ]),
    location: new FormControl('')
  });
  
  languages = programmingLanguages.slice(0, 8);
  skillGroups = skillGroups;
  locations = countries;
  
  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Form submitted:', this.profileForm.value);
      alert('Profile submitted successfully!');
    }
  }
  
  resetForm() {
    this.profileForm.reset();
  }
}

export const FormIntegration: Story = {
  render: () => ({
    component: FormIntegrationDemoComponent,
    moduleMetadata: {
      imports: [
        SelectorComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete form integration example showing the selector component working with Angular Reactive Forms, including validation and form state management.'
      }
    }
  }
};