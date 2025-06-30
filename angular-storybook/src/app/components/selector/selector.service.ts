import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { 
  SelectorOption, 
  SelectorGroup, 
  SelectorState, 
  SelectorConfig, 
  SelectorMode,
  SelectorAsyncConfig,
  SelectorHighlight 
} from './selector.types';

@Injectable()
export class SelectorService {
  private stateSubject = new BehaviorSubject<SelectorState>({
    selectedOptions: [],
    selectedValues: [],
    searchTerm: '',
    filteredOptions: [],
    filteredGroups: [],
    isSearching: false,
    hasError: false
  });

  private searchSubject = new Subject<string>();
  public state$ = this.stateSubject.asObservable();
  
  // Store original data
  private originalOptions: SelectorOption[] = [];
  private originalGroups: SelectorGroup[] = [];

  constructor() {
    // Setup search debouncing
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  /**
   * Initialize the service with options and configuration
   */
  initialize(
    options: SelectorOption[], 
    groups: SelectorGroup[] = [], 
    config: SelectorConfig,
    asyncConfig?: SelectorAsyncConfig
  ): void {
    // Store original data
    this.originalOptions = [...options];
    this.originalGroups = [...groups];
    
    const initialState: SelectorState = {
      ...this.stateSubject.value,
      filteredOptions: options,
      filteredGroups: groups,
      searchTerm: '',
      isSearching: false,
      hasError: false
    };

    this.stateSubject.next(initialState);
  }

  /**
   * Update search term and trigger filtering
   */
  updateSearch(searchTerm: string): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      searchTerm,
      isSearching: true
    });

    this.searchSubject.next(searchTerm);
  }

  /**
   * Perform the actual search filtering
   */
  private performSearch(searchTerm: string): void {
    const currentState = this.stateSubject.value;
    
    if (!searchTerm.trim()) {
      this.stateSubject.next({
        ...currentState,
        isSearching: false,
        filteredOptions: this.getAllOptions(),
        filteredGroups: this.getAllGroups()
      });
      return;
    }

    const filteredOptions = this.filterOptions(this.getAllOptions(), searchTerm);
    const filteredGroups = this.filterGroups(this.getAllGroups(), searchTerm);

    this.stateSubject.next({
      ...currentState,
      filteredOptions,
      filteredGroups,
      isSearching: false
    });
  }

  /**
   * Filter options based on search term
   */
  private filterOptions(options: SelectorOption[], searchTerm: string): SelectorOption[] {
    const term = searchTerm.toLowerCase();
    return options.filter(option => 
      option.label.toLowerCase().includes(term) ||
      (option.description && option.description.toLowerCase().includes(term)) ||
      (option.badge && option.badge.toLowerCase().includes(term))
    );
  }

  /**
   * Filter groups and their options based on search term
   */
  private filterGroups(groups: SelectorGroup[], searchTerm: string): SelectorGroup[] {
    const term = searchTerm.toLowerCase();
    
    return groups
      .map(group => ({
        ...group,
        options: this.filterOptions(group.options, searchTerm)
      }))
      .filter(group => 
        group.label.toLowerCase().includes(term) ||
        group.options.length > 0
      );
  }

  /**
   * Select an option
   */
  selectOption(option: SelectorOption, mode: SelectorMode): void {
    const currentState = this.stateSubject.value;
    let selectedOptions: SelectorOption[];
    let selectedValues: any[];

    if (mode === 'single') {
      selectedOptions = [option];
      selectedValues = [option.value];
    } else {
      // Multiple selection
      if (this.isOptionSelected(option)) {
        // Deselect option
        selectedOptions = currentState.selectedOptions.filter(opt => opt.id !== option.id);
        selectedValues = currentState.selectedValues.filter(val => val !== option.value);
      } else {
        // Select option
        selectedOptions = [...currentState.selectedOptions, option];
        selectedValues = [...currentState.selectedValues, option.value];
      }
    }

    this.stateSubject.next({
      ...currentState,
      selectedOptions,
      selectedValues
    });
  }

  /**
   * Deselect an option
   */
  deselectOption(option: SelectorOption): void {
    const currentState = this.stateSubject.value;
    const selectedOptions = currentState.selectedOptions.filter(opt => opt.id !== option.id);
    const selectedValues = currentState.selectedValues.filter(val => val !== option.value);

    this.stateSubject.next({
      ...currentState,
      selectedOptions,
      selectedValues
    });
  }

  /**
   * Clear all selections
   */
  clearSelection(): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      selectedOptions: [],
      selectedValues: []
    });
  }

  /**
   * Set selected values programmatically
   */
  setSelectedValues(values: any[]): void {
    const currentState = this.stateSubject.value;
    const allOptions = [...this.getAllOptions(), ...this.getAllGroupOptions()];
    const selectedOptions = allOptions.filter(option => values.includes(option.value));

    this.stateSubject.next({
      ...currentState,
      selectedOptions,
      selectedValues: values
    });
  }

  /**
   * Check if an option is selected
   */
  isOptionSelected(option: SelectorOption): boolean {
    const currentState = this.stateSubject.value;
    return currentState.selectedOptions.some(opt => opt.id === option.id);
  }

  /**
   * Toggle group collapse state
   */
  toggleGroup(groupId: string): void {
    // This would be implemented if groups are managed by the service
    // For now, groups are managed by the component
  }

  /**
   * Validate current selection
   */
  validateSelection(config: SelectorConfig): string | null {
    const currentState = this.stateSubject.value;
    const selectedCount = currentState.selectedOptions.length;

    if (config.validation) {
      const { required, minSelection, maxSelection, customValidator } = config.validation;

      if (required && selectedCount === 0) {
        return 'At least one option must be selected';
      }

      if (minSelection && selectedCount < minSelection) {
        return `At least ${minSelection} option${minSelection > 1 ? 's' : ''} must be selected`;
      }

      if (maxSelection && selectedCount > maxSelection) {
        return `At most ${maxSelection} option${maxSelection > 1 ? 's' : ''} can be selected`;
      }

      if (customValidator) {
        return customValidator(currentState.selectedValues);
      }
    }

    return null;
  }

  /**
   * Set error state
   */
  setError(errorMessage: string | null): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      hasError: !!errorMessage,
      errorMessage: errorMessage || undefined
    });
  }

  /**
   * Highlight search terms in text
   */
  highlightSearchTerm(text: string, searchTerm: string, config: SelectorHighlight): string {
    if (!config.enabled || !searchTerm.trim()) {
      return text;
    }

    const className = config.className || 'selector-highlight';
    const flags = config.caseSensitive ? 'g' : 'gi';
    const pattern = config.wholeWord 
      ? new RegExp(`\\b${this.escapeRegExp(searchTerm)}\\b`, flags)
      : new RegExp(this.escapeRegExp(searchTerm), flags);

    return text.replace(pattern, `<span class="${className}">$&</span>`);
  }

  /**
   * Get keyboard navigation suggestions
   */
  getNavigationOptions(): SelectorOption[] {
    const currentState = this.stateSubject.value;
    return currentState.filteredOptions.filter(option => !option.disabled);
  }

  /**
   * Get current state snapshot
   */
  getCurrentState(): SelectorState {
    return this.stateSubject.value;
  }

  /**
   * Reset service state
   */
  reset(): void {
    this.stateSubject.next({
      selectedOptions: [],
      selectedValues: [],
      searchTerm: '',
      filteredOptions: [],
      filteredGroups: [],
      isSearching: false,
      hasError: false
    });
  }

  /**
   * Helper methods
   */
  private getAllOptions(): SelectorOption[] {
    return this.originalOptions;
  }

  private getAllGroups(): SelectorGroup[] {
    return this.originalGroups;
  }

  private getAllGroupOptions(): SelectorOption[] {
    return this.getAllGroups().reduce((acc, group) => [...acc, ...group.options], [] as SelectorOption[]);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}