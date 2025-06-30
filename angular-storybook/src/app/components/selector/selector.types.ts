import { TemplateRef } from '@angular/core';

export type SelectorMode = 'single' | 'multiple';
export type SelectorLayout = 'grid' | 'list';
export type SelectorSize = 'sm' | 'base' | 'lg';
export type SelectorVariant = 'default' | 'card' | 'minimal';

export interface SelectorOption {
  id: string | number;
  label: string;
  value: any;
  description?: string;
  icon?: string | TemplateRef<any>;
  badge?: string;
  disabled?: boolean;
  group?: string;
  metadata?: { [key: string]: any };
}

export interface SelectorGroup {
  id: string;
  label: string;
  description?: string;
  collapsed?: boolean;
  options: SelectorOption[];
}

export interface SelectorState {
  selectedOptions: SelectorOption[];
  selectedValues: any[];
  searchTerm: string;
  filteredOptions: SelectorOption[];
  filteredGroups: SelectorGroup[];
  isSearching: boolean;
  hasError: boolean;
  errorMessage?: string;
}

export interface SelectorValidation {
  required?: boolean;
  minSelection?: number;
  maxSelection?: number;
  customValidator?: (selection: any[]) => string | null;
}

export interface SelectorConfig {
  mode: SelectorMode;
  layout: SelectorLayout;
  size: SelectorSize;
  variant: SelectorVariant;
  gridColumns?: number;
  virtualScroll?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  groupable?: boolean;
  validation?: SelectorValidation;
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  loadingMessage?: string;
  maxHeight?: string;
  className?: string;
}

export interface SelectorEvents {
  selectionChange: any | any[];
  optionSelect: SelectorOption;
  optionDeselect: SelectorOption;
  searchChange: string;
  groupToggle: string;
  focus: FocusEvent;
  blur: FocusEvent;
}

export interface SelectorKeyboardNavigation {
  selectedIndex: number;
  focusedIndex: number;
  isKeyboardActive: boolean;
}

export interface SelectorAsyncConfig {
  loadOptions?: (searchTerm: string) => Promise<SelectorOption[]>;
  loadGroups?: (searchTerm: string) => Promise<SelectorGroup[]>;
  debounceTime?: number;
  minSearchLength?: number;
}

export interface SelectorTheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    warning: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: string;
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface SelectorAccessibility {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  ariaMultiSelectable?: boolean;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  ariaActivedescendant?: string;
  role?: string;
}

export interface SelectorCustomization {
  optionTemplate?: TemplateRef<any>;
  groupHeaderTemplate?: TemplateRef<any>;
  emptyStateTemplate?: TemplateRef<any>;
  loadingTemplate?: TemplateRef<any>;
  searchTemplate?: TemplateRef<any>;
  selectedTemplate?: TemplateRef<any>;
}

export interface SelectorHighlight {
  enabled: boolean;
  className?: string;
  caseSensitive?: boolean;
  wholeWord?: boolean;
}

export interface SelectorPerformance {
  virtualScrolling?: {
    enabled: boolean;
    itemHeight: number;
    bufferSize?: number;
  };
  lazy?: {
    enabled: boolean;
    threshold?: number;
  };
  debounce?: {
    search: number;
    scroll: number;
  };
}