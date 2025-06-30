import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  forwardRef,
  ViewChild,
  ElementRef,
  TemplateRef,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  HostListener,
  ContentChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  TrackByFunction
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

import { 
  SelectorOption, 
  SelectorGroup, 
  SelectorState, 
  SelectorConfig,
  SelectorMode,
  SelectorLayout,
  SelectorSize,
  SelectorVariant,
  SelectorValidation,
  SelectorEvents,
  SelectorKeyboardNavigation,
  SelectorAccessibility,
  SelectorCustomization,
  SelectorHighlight,
  SelectorAsyncConfig
} from './selector.types';
import { SelectorService } from './selector.service';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        overflow: 'visible'
      })),
      transition('collapsed <=> expanded', [
        animate('200ms ease-in-out')
      ])
    ])
  ],
  providers: [
    SelectorService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorComponent),
      multi: true
    }
  ]
})
export class SelectorComponent implements 
  ControlValueAccessor, 
  OnInit, 
  OnDestroy, 
  AfterViewInit, 
  OnChanges {

  // Primary Configuration
  @Input() mode: SelectorMode = 'single';
  @Input() layout: SelectorLayout = 'list';
  @Input() size: SelectorSize = 'base';
  @Input() variant: SelectorVariant = 'default';
  @Input() options: SelectorOption[] = [];
  @Input() groups: SelectorGroup[] = [];
  
  // Styling and Layout
  @Input() gridColumns: number = 3;
  @Input() maxHeight: string = '300px';
  @Input() className?: string;
  @Input() containerClassName?: string;
  
  // Functionality
  @Input() searchable: boolean = true;
  @Input() clearable: boolean = true;
  @Input() groupable: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  
  // Text and Placeholders
  @Input() placeholder: string = 'Select an option...';
  @Input() searchPlaceholder: string = 'Search options...';
  @Input() noResultsMessage: string = 'No options found';
  @Input() loadingMessage: string = 'Loading options...';
  @Input() label?: string;
  @Input() helperText?: string;
  @Input() errorMessage?: string;
  
  // Validation
  @Input() required: boolean = false;
  @Input() minSelection?: number;
  @Input() maxSelection?: number;
  @Input() validation?: SelectorValidation;
  
  // Accessibility
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
  @Input() ariaLabelledBy?: string;
  
  // Advanced Features
  @Input() highlight: SelectorHighlight = { enabled: true };
  @Input() asyncConfig?: SelectorAsyncConfig;
  
  // Template Customization
  @ContentChild('optionTemplate') optionTemplate?: TemplateRef<any>;
  @ContentChild('groupHeaderTemplate') groupHeaderTemplate?: TemplateRef<any>;
  @ContentChild('emptyStateTemplate') emptyStateTemplate?: TemplateRef<any>;
  @ContentChild('loadingTemplate') loadingTemplate?: TemplateRef<any>;
  @ContentChild('searchTemplate') searchTemplate?: TemplateRef<any>;
  @ContentChild('selectedTemplate') selectedTemplate?: TemplateRef<any>;
  
  // Output Events
  @Output() selectionChange = new EventEmitter<any | any[]>();
  @Output() optionSelect = new EventEmitter<SelectorOption>();
  @Output() optionDeselect = new EventEmitter<SelectorOption>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() groupToggle = new EventEmitter<string>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() validationChange = new EventEmitter<string | null>();

  // ViewChild References
  @ViewChild('selectorContainer', { static: true }) selectorContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('searchInput', { static: false }) searchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('optionsContainer', { static: false }) optionsContainer?: ElementRef<HTMLDivElement>;

  // Internal State
  public state: SelectorState = {
    selectedOptions: [],
    selectedValues: [],
    searchTerm: '',
    filteredOptions: [],
    filteredGroups: [],
    isSearching: false,
    hasError: false
  };

  // Keyboard Navigation
  public keyboardNavigation: SelectorKeyboardNavigation = {
    selectedIndex: -1,
    focusedIndex: -1,
    isKeyboardActive: false
  };

  // Internal Properties
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();
  public _uniqueId: string = '';
  private _value: any = null;
  private _groupStates: Map<string, boolean> = new Map();
  
  // ControlValueAccessor
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(
    private cdr: ChangeDetectorRef,
    private selectorService: SelectorService
  ) {
    this._uniqueId = `selector-${Math.random().toString(36).substr(2, 9)}`;
  }

  ngOnInit(): void {
    this.initializeService();
    this.setupSearchHandling();
    this.subscribeToStateChanges();
    this.initializeGroupStates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.updateFilteredOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['groups']) {
      this.updateFilteredOptions();
      this.cdr.markForCheck();
    }
  }

  // Initialization Methods
  private initializeService(): void {
    const config: SelectorConfig = {
      mode: this.mode,
      layout: this.layout,
      size: this.size,
      variant: this.variant,
      gridColumns: this.gridColumns,
      virtualScroll: this.virtualScroll,
      searchable: this.searchable,
      clearable: this.clearable,
      groupable: this.groupable,
      validation: this.getValidationConfig(),
      placeholder: this.placeholder,
      searchPlaceholder: this.searchPlaceholder,
      noResultsMessage: this.noResultsMessage,
      loadingMessage: this.loadingMessage,
      maxHeight: this.maxHeight,
      className: this.className
    };

    this.selectorService.initialize(this.options, this.groups, config, this.asyncConfig);
  }

  private setupSearchHandling(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  private subscribeToStateChanges(): void {
    this.selectorService.state$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(state => {
      this.state = state;
      this.updateValue();
      this.validateSelection();
      this.cdr.markForCheck();
    });
  }

  private initializeGroupStates(): void {
    this.groups.forEach(group => {
      this._groupStates.set(group.id, !group.collapsed);
    });
  }

  private updateFilteredOptions(): void {
    if (this.searchable && this.state.searchTerm) {
      this.performSearch(this.state.searchTerm);
    } else {
      this.state.filteredOptions = this.options;
      this.state.filteredGroups = this.groups;
    }
  }

  // Search and Filtering
  public onSearchChange(searchTerm: string): void {
    this.state.searchTerm = searchTerm;
    this.searchSubject.next(searchTerm);
    this.searchChange.emit(searchTerm);
  }

  private performSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.state.filteredOptions = this.options;
      this.state.filteredGroups = this.groups;
      this.state.isSearching = false;
      return;
    }

    this.state.isSearching = true;
    const term = searchTerm.toLowerCase();

    // Filter standalone options
    this.state.filteredOptions = this.options.filter(option =>
      this.matchesSearchTerm(option, term)
    );

    // Filter grouped options
    this.state.filteredGroups = this.groups
      .map(group => ({
        ...group,
        options: group.options.filter(option => this.matchesSearchTerm(option, term))
      }))
      .filter(group => group.options.length > 0);

    this.state.isSearching = false;
    this.resetKeyboardNavigation();
  }

  private matchesSearchTerm(option: SelectorOption, term: string): boolean {
    return option.label.toLowerCase().includes(term) ||
           (!!option.description && option.description.toLowerCase().includes(term)) ||
           (!!option.badge && option.badge.toLowerCase().includes(term));
  }

  // Selection Methods
  public selectOption(option: SelectorOption, event?: Event): void {
    if (option.disabled || this.disabled) return;

    event?.preventDefault();
    event?.stopPropagation();

    const wasSelected = this.isOptionSelected(option);

    if (this.mode === 'single') {
      this.state.selectedOptions = [option];
      this.state.selectedValues = [option.value];
      this.optionSelect.emit(option);
    } else {
      if (wasSelected) {
        this.deselectOption(option);
      } else {
        if (this.canSelectMore()) {
          this.state.selectedOptions = [...this.state.selectedOptions, option];
          this.state.selectedValues = [...this.state.selectedValues, option.value];
          this.optionSelect.emit(option);
        }
      }
    }

    this.updateValue();
    this.validateSelection();
    this.cdr.markForCheck();
  }

  public deselectOption(option: SelectorOption, event?: Event): void {
    if (this.disabled) return;

    event?.preventDefault();
    event?.stopPropagation();

    this.state.selectedOptions = this.state.selectedOptions.filter(opt => opt.id !== option.id);
    this.state.selectedValues = this.state.selectedValues.filter(val => val !== option.value);
    
    this.optionDeselect.emit(option);
    this.updateValue();
    this.validateSelection();
    this.cdr.markForCheck();
  }

  public clearSelection(): void {
    if (this.disabled) return;

    const deselectedOptions = [...this.state.selectedOptions];
    this.state.selectedOptions = [];
    this.state.selectedValues = [];
    
    deselectedOptions.forEach(option => this.optionDeselect.emit(option));
    this.updateValue();
    this.validateSelection();
    this.cdr.markForCheck();
  }

  public isOptionSelected(option: SelectorOption): boolean {
    return this.state.selectedOptions.some(opt => opt.id === option.id);
  }

  private canSelectMore(): boolean {
    if (this.mode === 'single') return this.state.selectedOptions.length === 0;
    if (this.maxSelection) return this.state.selectedOptions.length < this.maxSelection;
    return true;
  }

  // Group Management
  public toggleGroup(groupId: string): void {
    const currentState = this._groupStates.get(groupId) || false;
    this._groupStates.set(groupId, !currentState);
    this.groupToggle.emit(groupId);
    this.cdr.markForCheck();
  }

  public isGroupExpanded(groupId: string): boolean {
    return this._groupStates.get(groupId) || false;
  }

  // Validation
  public validateSelection(): void {
    const validationConfig = this.getValidationConfig();
    const errorMessage = this.validateSelectionConfig(validationConfig);
    
    this.state.hasError = !!errorMessage;
    this.state.errorMessage = errorMessage || undefined;
    
    this.validationChange.emit(errorMessage);
  }

  public getValidationConfig(): SelectorValidation {
    return {
      required: this.required,
      minSelection: this.minSelection,
      maxSelection: this.maxSelection,
      ...this.validation
    };
  }

  public validateSelectionConfig(config: SelectorValidation): string | null {
    const selectedCount = this.state.selectedOptions.length;

    if (config.required && selectedCount === 0) {
      return 'Selection is required';
    }

    if (config.minSelection && selectedCount < config.minSelection) {
      return `Select at least ${config.minSelection} option${config.minSelection > 1 ? 's' : ''}`;
    }

    if (config.maxSelection && selectedCount > config.maxSelection) {
      return `Select at most ${config.maxSelection} option${config.maxSelection > 1 ? 's' : ''}`;
    }

    if (config.customValidator) {
      return config.customValidator(this.state.selectedValues);
    }

    return null;
  }

  // Keyboard Navigation
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    const navigableOptions = this.getNavigableOptions();
    if (navigableOptions.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateDown(navigableOptions);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateUp(navigableOptions);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectFocusedOption(navigableOptions);
        break;
      case 'Escape':
        this.resetKeyboardNavigation();
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirstOption();
        break;
      case 'End':
        event.preventDefault();
        this.focusLastOption(navigableOptions);
        break;
    }
  }

  private getNavigableOptions(): SelectorOption[] {
    const standalone = this.state.filteredOptions.filter(opt => !opt.disabled);
    const grouped = this.state.filteredGroups.reduce((acc, group) => {
      if (this.isGroupExpanded(group.id)) {
        acc.push(...group.options.filter(opt => !opt.disabled));
      }
      return acc;
    }, [] as SelectorOption[]);
    
    return [...standalone, ...grouped];
  }

  private navigateDown(options: SelectorOption[]): void {
    this.keyboardNavigation.isKeyboardActive = true;
    this.keyboardNavigation.focusedIndex = Math.min(
      this.keyboardNavigation.focusedIndex + 1,
      options.length - 1
    );
    this.scrollToFocusedOption();
  }

  private navigateUp(options: SelectorOption[]): void {
    this.keyboardNavigation.isKeyboardActive = true;
    this.keyboardNavigation.focusedIndex = Math.max(
      this.keyboardNavigation.focusedIndex - 1,
      0
    );
    this.scrollToFocusedOption();
  }

  private selectFocusedOption(options: SelectorOption[]): void {
    if (this.keyboardNavigation.focusedIndex >= 0 && 
        this.keyboardNavigation.focusedIndex < options.length) {
      const option = options[this.keyboardNavigation.focusedIndex];
      this.selectOption(option);
    }
  }

  private focusFirstOption(): void {
    this.keyboardNavigation.isKeyboardActive = true;
    this.keyboardNavigation.focusedIndex = 0;
    this.scrollToFocusedOption();
  }

  private focusLastOption(options: SelectorOption[]): void {
    this.keyboardNavigation.isKeyboardActive = true;
    this.keyboardNavigation.focusedIndex = options.length - 1;
    this.scrollToFocusedOption();
  }

  private resetKeyboardNavigation(): void {
    this.keyboardNavigation.focusedIndex = -1;
    this.keyboardNavigation.isKeyboardActive = false;
  }

  private scrollToFocusedOption(): void {
    // Implementation for scrolling to focused option
    this.cdr.markForCheck();
  }

  // Event Handlers
  public onSearchInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.onSearchChange(target.value);
  }

  public onFocus(event: FocusEvent): void {
    this.focus.emit(event);
  }

  public onBlur(event: FocusEvent): void {
    this.onTouched();
    this.resetKeyboardNavigation();
    this.blur.emit(event);
  }

  // Utility Methods
  public highlightSearchTerm(text: string): string {
    if (!this.highlight.enabled || !this.state.searchTerm) {
      return text;
    }

    const term = this.state.searchTerm;
    const className = this.highlight.className || 'selector-highlight';
    const flags = this.highlight.caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(this.escapeRegExp(term), flags);
    
    return text.replace(regex, `<span class="${className}">$&</span>`);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Template Helper Methods
  public get hasResults(): boolean {
    return this.state.filteredOptions.length > 0 || 
           this.state.filteredGroups.some(group => group.options.length > 0);
  }

  public get showEmptyState(): boolean {
    return !this.loading && !this.hasResults && !this.state.isSearching;
  }

  public get containerClasses(): string {
    return [
      'selector-container',
      this.size,
      this.variant,
      this.mode,
      this.layout,
      this.disabled && 'disabled',
      this.state.hasError && 'error',
      this.loading && 'loading',
      this.containerClassName
    ].filter(Boolean).join(' ');
  }

  public get optionsClasses(): string {
    return [
      'selector-options',
      this.layout,
      this.size,
      this.layout === 'grid' && `grid-cols-${this.gridColumns}`,
      this.className
    ].filter(Boolean).join(' ');
  }

  public getOptionClasses(option: SelectorOption, index: number): { [key: string]: boolean } {
    return {
      'selector-option': true,
      'selected': this.isOptionSelected(option),
      'disabled': option.disabled || this.disabled,
      'focused': this.keyboardNavigation.focusedIndex === index && this.keyboardNavigation.isKeyboardActive,
      [this.size]: true,
      [this.variant]: true
    };
  }

  // ControlValueAccessor Implementation
  writeValue(value: any): void {
    this._value = value;
    
    if (value) {
      const values = Array.isArray(value) ? value : [value];
      const allOptions = [...this.options, ...this.groups.flatMap(g => g.options)];
      
      this.state.selectedOptions = allOptions.filter(option => 
        values.includes(option.value)
      );
      this.state.selectedValues = values;
    } else {
      this.state.selectedOptions = [];
      this.state.selectedValues = [];
    }
    
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  private updateValue(): void {
    const value = this.mode === 'single' 
      ? (this.state.selectedValues[0] || null)
      : this.state.selectedValues;
    
    this._value = value;
    this.onChange(value);
    this.selectionChange.emit(value);
  }

  // TrackBy Functions
  public trackByOptionId: TrackByFunction<SelectorOption> = (index, option) => option.id;
  public trackByGroupId: TrackByFunction<SelectorGroup> = (index, group) => group.id;

  // Public API Methods
  public focusSearch(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }

  public getSelectedOptions(): SelectorOption[] {
    return this.state.selectedOptions;
  }

  public getSelectedValues(): any[] {
    return this.state.selectedValues;
  }

  public getTotalOptionCount(): number {
    const standaloneOptions = this.options.length;
    const groupOptions = this.groups.reduce((acc, group) => acc + group.options.length, 0);
    return standaloneOptions + groupOptions;
  }

  public getSearchAriaLabel(): string {
    return 'Search ' + (this.label || 'options');
  }

  // Template helper methods
  public isTemplate(icon: TemplateRef<any> | string | undefined): boolean {
    return icon instanceof TemplateRef;
  }

  public isString(icon: TemplateRef<any> | string | undefined): boolean {
    return typeof icon === 'string';
  }
}