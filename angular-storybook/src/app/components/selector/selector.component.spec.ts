import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SelectorComponent } from './selector.component';
import { SelectorService } from './selector.service';
import { SelectorOption, SelectorGroup, SelectorMode, SelectorLayout } from './selector.types';

// Test data at module level
const mockOptions: SelectorOption[] = [
  { id: 1, label: 'Option 1', value: 'opt1', description: 'First option' },
  { id: 2, label: 'Option 2', value: 'opt2', description: 'Second option', disabled: true },
  { id: 3, label: 'Option 3', value: 'opt3', badge: 'Popular' },
  { id: 4, label: 'JavaScript', value: 'js', icon: 'fab fa-js' },
  { id: 5, label: 'TypeScript', value: 'ts', icon: 'fab fa-typescript' }
];

const mockGroups: SelectorGroup[] = [
  {
    id: 'programming',
    label: 'Programming Languages',
    description: 'Popular programming languages',
    options: [
      { id: 'js', label: 'JavaScript', value: 'javascript' },
      { id: 'ts', label: 'TypeScript', value: 'typescript' },
      { id: 'py', label: 'Python', value: 'python' }
    ]
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    options: [
      { id: 'angular', label: 'Angular', value: 'angular' },
      { id: 'react', label: 'React', value: 'react' },
      { id: 'vue', label: 'Vue', value: 'vue' }
    ]
  }
];

describe('SelectorComponent', () => {
  let component: SelectorComponent;
  let fixture: ComponentFixture<SelectorComponent>;
  let service: SelectorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SelectorComponent,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [SelectorService]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SelectorService);
    
    component.options = mockOptions;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.mode).toBe('single');
      expect(component.layout).toBe('list');
      expect(component.size).toBe('base');
      expect(component.variant).toBe('default');
      expect(component.searchable).toBe(true);
      expect(component.clearable).toBe(true);
      expect(component.disabled).toBe(false);
    });

    it('should generate unique ID', () => {
      expect(component._uniqueId).toMatch(/^selector-[a-z0-9]{9}$/);
    });

    it('should initialize state correctly', () => {
      expect(component.state.selectedOptions).toEqual([]);
      expect(component.state.selectedValues).toEqual([]);
      expect(component.state.filteredOptions).toEqual(mockOptions);
      expect(component.state.searchTerm).toBe('');
    });
  });

  describe('Single Selection Mode', () => {
    beforeEach(() => {
      component.mode = 'single';
      fixture.detectChanges();
    });

    it('should select single option', () => {
      const option = mockOptions[0];
      component.selectOption(option);
      
      expect(component.state.selectedOptions).toEqual([option]);
      expect(component.state.selectedValues).toEqual([option.value]);
    });

    it('should replace selection when selecting another option', () => {
      const option1 = mockOptions[0];
      const option2 = mockOptions[2];
      
      component.selectOption(option1);
      component.selectOption(option2);
      
      expect(component.state.selectedOptions).toEqual([option2]);
      expect(component.state.selectedValues).toEqual([option2.value]);
    });

    it('should emit selection change events', () => {
      spyOn(component.selectionChange, 'emit');
      spyOn(component.optionSelect, 'emit');
      
      const option = mockOptions[0];
      component.selectOption(option);
      
      expect(component.optionSelect.emit).toHaveBeenCalledWith(option);
      expect(component.selectionChange.emit).toHaveBeenCalledWith(option.value);
    });

    it('should not select disabled options', () => {
      const disabledOption = mockOptions[1];
      component.selectOption(disabledOption);
      
      expect(component.state.selectedOptions).toEqual([]);
    });
  });

  describe('Multiple Selection Mode', () => {
    beforeEach(() => {
      component.mode = 'multiple';
      fixture.detectChanges();
    });

    it('should select multiple options', () => {
      const option1 = mockOptions[0];
      const option2 = mockOptions[2];
      
      component.selectOption(option1);
      component.selectOption(option2);
      
      expect(component.state.selectedOptions).toEqual([option1, option2]);
      expect(component.state.selectedValues).toEqual([option1.value, option2.value]);
    });

    it('should deselect option when clicking selected option', () => {
      const option = mockOptions[0];
      
      component.selectOption(option);
      expect(component.isOptionSelected(option)).toBe(true);
      
      component.selectOption(option);
      expect(component.isOptionSelected(option)).toBe(false);
    });

    it('should emit deselection events', () => {
      spyOn(component.optionDeselect, 'emit');
      
      const option = mockOptions[0];
      component.selectOption(option);
      component.selectOption(option); // Deselect
      
      expect(component.optionDeselect.emit).toHaveBeenCalledWith(option);
    });

    it('should respect max selection limit', () => {
      component.maxSelection = 2;
      
      const option1 = mockOptions[0];
      const option2 = mockOptions[2];
      const option3 = mockOptions[3];
      
      component.selectOption(option1);
      component.selectOption(option2);
      component.selectOption(option3);
      
      expect(component.state.selectedOptions.length).toBe(2);
      expect(component.state.selectedOptions).toEqual([option1, option2]);
    });

    it('should clear all selections', () => {
      const option1 = mockOptions[0];
      const option2 = mockOptions[2];
      
      component.selectOption(option1);
      component.selectOption(option2);
      component.clearSelection();
      
      expect(component.state.selectedOptions).toEqual([]);
      expect(component.state.selectedValues).toEqual([]);
    });
  });

  describe('Search Functionality', () => {
    it('should filter options by label', fakeAsync(() => {
      component.onSearchChange('Option 1');
      tick(300); // Wait for debounce
      
      expect(component.state.filteredOptions.length).toBe(1);
      expect(component.state.filteredOptions[0].label).toBe('Option 1');
    }));

    it('should filter options by description', fakeAsync(() => {
      component.onSearchChange('First');
      tick(300);
      
      expect(component.state.filteredOptions.length).toBe(1);
      expect(component.state.filteredOptions[0].description).toBe('First option');
    }));

    it('should filter options by badge', fakeAsync(() => {
      component.onSearchChange('Popular');
      tick(300);
      
      expect(component.state.filteredOptions.length).toBe(1);
      expect(component.state.filteredOptions[0].badge).toBe('Popular');
    }));

    it('should be case insensitive', fakeAsync(() => {
      component.onSearchChange('OPTION');
      tick(300);
      
      expect(component.state.filteredOptions.length).toBe(3);
    }));

    it('should emit search change events', () => {
      spyOn(component.searchChange, 'emit');
      
      component.onSearchChange('test');
      
      expect(component.searchChange.emit).toHaveBeenCalledWith('test');
    });

    it('should reset filters when search is cleared', fakeAsync(() => {
      component.onSearchChange('Option 1');
      tick(300);
      expect(component.state.filteredOptions.length).toBe(1);
      
      component.onSearchChange('');
      tick(300);
      expect(component.state.filteredOptions.length).toBe(mockOptions.length);
    }));
  });

  describe('Group Functionality', () => {
    beforeEach(() => {
      component.groups = mockGroups;
      component.groupable = true;
      fixture.detectChanges();
    });

    it('should initialize groups as expanded by default', () => {
      mockGroups.forEach(group => {
        expect(component.isGroupExpanded(group.id)).toBe(true);
      });
    });

    it('should toggle group expansion', () => {
      const groupId = mockGroups[0].id;
      
      expect(component.isGroupExpanded(groupId)).toBe(true);
      component.toggleGroup(groupId);
      expect(component.isGroupExpanded(groupId)).toBe(false);
    });

    it('should emit group toggle events', () => {
      spyOn(component.groupToggle, 'emit');
      
      const groupId = mockGroups[0].id;
      component.toggleGroup(groupId);
      
      expect(component.groupToggle.emit).toHaveBeenCalledWith(groupId);
    });

    it('should filter groups by search term', fakeAsync(() => {
      component.onSearchChange('JavaScript');
      tick(300);
      
      expect(component.state.filteredGroups.length).toBe(1);
      expect(component.state.filteredGroups[0].id).toBe('programming');
      expect(component.state.filteredGroups[0].options.length).toBe(1);
    }));
  });

  describe('Validation', () => {
    it('should validate required selection', () => {
      component.required = true;
      const errorMessage = component.validateSelectionConfig(component.getValidationConfig());
      
      expect(errorMessage).toBe('Selection is required');
    });

    it('should validate minimum selection', () => {
      component.mode = 'multiple';
      component.minSelection = 2;
      
      component.selectOption(mockOptions[0]);
      const errorMessage = component.validateSelectionConfig(component.getValidationConfig());
      
      expect(errorMessage).toBe('Select at least 2 options');
    });

    it('should validate maximum selection', () => {
      component.mode = 'multiple';
      component.maxSelection = 1;
      
      component.selectOption(mockOptions[0]);
      component.selectOption(mockOptions[2]);
      const errorMessage = component.validateSelectionConfig(component.getValidationConfig());
      
      expect(errorMessage).toBe('Select at most 1 option');
    });

    it('should emit validation change events', () => {
      spyOn(component.validationChange, 'emit');
      
      component.required = true;
      component.validateSelection();
      
      expect(component.validationChange.emit).toHaveBeenCalledWith('Selection is required');
    });
  });

  describe('Keyboard Navigation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should handle arrow down navigation', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      spyOn(event, 'preventDefault');
      
      component.onKeyDown(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.keyboardNavigation.focusedIndex).toBe(0);
    });

    it('should handle arrow up navigation', () => {
      component.keyboardNavigation.focusedIndex = 2;
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      spyOn(event, 'preventDefault');
      
      component.onKeyDown(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.keyboardNavigation.focusedIndex).toBe(1);
    });

    it('should handle enter key selection', () => {
      component.keyboardNavigation.focusedIndex = 0;
      spyOn(component, 'selectOption');
      
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(event, 'preventDefault');
      
      component.onKeyDown(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.selectOption).toHaveBeenCalledWith(mockOptions[0]);
    });

    it('should handle escape key', () => {
      component.keyboardNavigation.focusedIndex = 2;
      
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.onKeyDown(event);
      
      expect(component.keyboardNavigation.focusedIndex).toBe(-1);
      expect(component.keyboardNavigation.isKeyboardActive).toBe(false);
    });

    it('should handle home key', () => {
      component.keyboardNavigation.focusedIndex = 2;
      
      const event = new KeyboardEvent('keydown', { key: 'Home' });
      spyOn(event, 'preventDefault');
      
      component.onKeyDown(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.keyboardNavigation.focusedIndex).toBe(0);
    });

    it('should handle end key', () => {
      const event = new KeyboardEvent('keydown', { key: 'End' });
      spyOn(event, 'preventDefault');
      
      component.onKeyDown(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.keyboardNavigation.focusedIndex).toBe(mockOptions.length - 1);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value for single selection', () => {
      component.mode = 'single';
      component.writeValue('opt1');
      
      expect(component.state.selectedValues).toEqual(['opt1']);
      expect(component.state.selectedOptions.length).toBe(1);
      expect(component.state.selectedOptions[0].value).toBe('opt1');
    });

    it('should write value for multiple selection', () => {
      component.mode = 'multiple';
      component.writeValue(['opt1', 'opt3']);
      
      expect(component.state.selectedValues).toEqual(['opt1', 'opt3']);
      expect(component.state.selectedOptions.length).toBe(2);
    });

    it('should handle null values', () => {
      component.writeValue(null);
      
      expect(component.state.selectedOptions).toEqual([]);
      expect(component.state.selectedValues).toEqual([]);
    });

    it('should call onChange when selection changes', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      component.selectOption(mockOptions[0]);
      
      expect(onChangeSpy).toHaveBeenCalledWith(mockOptions[0].value);
    });

    it('should call onTouched when component loses focus', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      
      component.onBlur(new FocusEvent('blur'));
      
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      
      expect(component.disabled).toBe(true);
    });
  });

  describe('Utility Methods', () => {
    it('should check if option is selected', () => {
      const option = mockOptions[0];
      
      expect(component.isOptionSelected(option)).toBe(false);
      
      component.selectOption(option);
      expect(component.isOptionSelected(option)).toBe(true);
    });

    it('should highlight search terms', () => {
      component.state.searchTerm = 'Option';
      component.highlight = { enabled: true };
      
      const highlighted = component.highlightSearchTerm('Option 1');
      expect(highlighted).toContain('<span class="selector-highlight">Option</span>');
    });

    it('should not highlight when disabled', () => {
      component.state.searchTerm = 'Option';
      component.highlight = { enabled: false };
      
      const highlighted = component.highlightSearchTerm('Option 1');
      expect(highlighted).toBe('Option 1');
    });

    it('should get selected options', () => {
      component.selectOption(mockOptions[0]);
      component.selectOption(mockOptions[2]);
      
      const selected = component.getSelectedOptions();
      expect(selected).toEqual([mockOptions[0], mockOptions[2]]);
    });

    it('should get selected values', () => {
      component.selectOption(mockOptions[0]);
      component.selectOption(mockOptions[2]);
      
      const values = component.getSelectedValues();
      expect(values).toEqual([mockOptions[0].value, mockOptions[2].value]);
    });
  });

  describe('Template Helpers', () => {
    it('should return correct container classes', () => {
      component.mode = 'multiple';
      component.layout = 'grid';
      component.size = 'lg';
      component.variant = 'card';
      component.disabled = true;
      component.state.hasError = true;
      component.loading = true;
      
      const classes = component.containerClasses;
      
      expect(classes).toContain('selector-container');
      expect(classes).toContain('lg');
      expect(classes).toContain('card');
      expect(classes).toContain('multiple');
      expect(classes).toContain('grid');
      expect(classes).toContain('disabled');
      expect(classes).toContain('error');
      expect(classes).toContain('loading');
    });

    it('should return correct options classes', () => {
      component.layout = 'grid';
      component.size = 'lg';
      component.gridColumns = 4;
      
      const classes = component.optionsClasses;
      
      expect(classes).toContain('selector-options');
      expect(classes).toContain('grid');
      expect(classes).toContain('lg');
      expect(classes).toContain('grid-cols-4');
    });

    it('should show empty state when no results', () => {
      component.state.filteredOptions = [];
      component.state.filteredGroups = [];
      component.loading = false;
      component.state.isSearching = false;
      
      expect(component.showEmptyState).toBe(true);
    });

    it('should show results when options available', () => {
      component.state.filteredOptions = mockOptions;
      
      expect(component.hasResults).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      component.ariaLabel = 'Select options';
      component.required = true;
      component.state.hasError = true;
      fixture.detectChanges();
      
      const container = fixture.debugElement.query(By.css('.selector-container'));
      
      expect(container.nativeElement.getAttribute('aria-label')).toBe('Select options');
      expect(container.nativeElement.getAttribute('aria-required')).toBe('true');
      expect(container.nativeElement.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have proper role attributes', () => {
      component.mode = 'multiple';
      fixture.detectChanges();
      
      const container = fixture.debugElement.query(By.css('.selector-container'));
      
      expect(container.nativeElement.getAttribute('role')).toBe('listbox');
      expect(container.nativeElement.getAttribute('aria-multiselectable')).toBe('true');
    });

    it('should have proper tabindex', () => {
      fixture.detectChanges();
      
      const container = fixture.debugElement.query(By.css('.selector-container'));
      expect(container.nativeElement.getAttribute('tabindex')).toBe('0');
      
      component.disabled = true;
      fixture.detectChanges();
      
      expect(container.nativeElement.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty options array', () => {
      component.options = [];
      fixture.detectChanges();
      
      expect(component.state.filteredOptions).toEqual([]);
      expect(component.hasResults).toBe(false);
    });

    it('should handle options with duplicate IDs', () => {
      const duplicateOptions = [
        { id: 1, label: 'Option 1', value: 'opt1' },
        { id: 1, label: 'Option 1 Duplicate', value: 'opt1-dup' }
      ];
      
      component.options = duplicateOptions;
      fixture.detectChanges();
      
      // Should handle gracefully without errors
      expect(component.state.filteredOptions.length).toBe(2);
    });

    it('should handle very long option labels', () => {
      const longLabel = 'A'.repeat(1000);
      const longOption = { id: 'long', label: longLabel, value: 'long' };
      
      component.options = [longOption];
      fixture.detectChanges();
      
      expect(component.state.filteredOptions[0].label).toBe(longLabel);
    });

    it('should handle rapid selection changes', () => {
      const option = mockOptions[0];
      
      // Rapid clicks
      for (let i = 0; i < 10; i++) {
        component.selectOption(option);
      }
      
      // Should end up in consistent state
      expect(component.state.selectedOptions.length).toBeLessThanOrEqual(1);
    });
  });
});

// Test Host Component for integration testing
@Component({
  template: `
    <form [formGroup]="form">
      <app-selector 
        formControlName="selector"
        [options]="options"
        [mode]="mode"
        [required]="required">
      </app-selector>
    </form>
  `
})
class TestHostComponent {
  form = new FormGroup({
    selector: new FormControl(null)
  });
  
  options = mockOptions;
  mode: SelectorMode = 'single';
  required = false;
}

describe('SelectorComponent Integration', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let selectorComponent: SelectorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorComponent, ReactiveFormsModule],
      declarations: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    selectorComponent = fixture.debugElement.query(By.directive(SelectorComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should integrate with reactive forms', () => {
    const option = mockOptions[0];
    selectorComponent.selectOption(option);
    
    expect(hostComponent.form.get('selector')?.value).toBe(option.value);
  });

  it('should validate with form validators', () => {
    hostComponent.form.get('selector')?.setValidators([
      (control) => control?.value ? null : { required: true }
    ]);
    
    hostComponent.form.get('selector')?.updateValueAndValidity();
    
    expect(hostComponent.form.get('selector')?.invalid).toBe(true);
    expect(hostComponent.form.get('selector')?.errors?.['required']).toBe(true);
  });

  it('should update form value when selection changes', () => {
    const option = mockOptions[0];
    selectorComponent.selectOption(option);
    
    expect(hostComponent.form.get('selector')?.value).toBe(option.value);
    expect(hostComponent.form.get('selector')?.dirty).toBe(true);
  });
});