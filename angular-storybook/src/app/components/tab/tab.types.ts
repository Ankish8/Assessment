export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;
  
  /**
   * Display label for the tab
   */
  label: string;
  
  /**
   * Optional icon (can be any template reference or string class)
   */
  icon?: any;
  
  /**
   * Content to display when tab is active
   */
  content?: any;
  
  /**
   * Disable this specific tab
   */
  disabled?: boolean;
}

export type TabSize = 'small' | 'medium' | 'large';
export type TabVariant = 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded';
export type TabOrientation = 'horizontal' | 'vertical';
export type TabAlignment = 'start' | 'center' | 'end' | 'stretch';

export interface TabConfig {
  /**
   * Array of tab items
   */
  tabs: TabItem[];
  
  /**
   * Index of the initially active tab
   * @default 0
   */
  defaultActiveTab?: number;
  
  /**
   * Visual variant of the tabs
   * @default 'line'
   */
  variant?: TabVariant;
  
  /**
   * Size of the tabs
   * @default 'medium'
   */
  size?: TabSize;
  
  /**
   * Orientation of the tabs
   * @default 'horizontal'
   */
  orientation?: TabOrientation;
  
  /**
   * Alignment of the tabs
   * @default 'start'
   */
  alignment?: TabAlignment;
  
  /**
   * Whether to lazy load tab content
   * @default false
   */
  lazyMount?: boolean;
  
  /**
   * Whether to keep tab content alive when switching
   * @default false
   */
  keepAlive?: boolean;
  
  /**
   * Whether tabs should be scrollable
   * @default false
   */
  scrollable?: boolean;
  
  /**
   * Whether to animate tab transitions
   * @default true
   */
  animated?: boolean;
  
  /**
   * ARIA label for the tab list
   */
  ariaLabel?: string;
  
  /**
   * ARIA labelledby for the tab list
   */
  ariaLabelledBy?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Additional CSS class names for tab list
   */
  tabListClassName?: string;
  
  /**
   * Additional CSS class names for tab panels
   */
  tabPanelClassName?: string;
}

export interface TabState {
  activeTab: number;
  previousTab: number;
  isAnimating: boolean;
  mountedTabs: Set<number>;
}

export interface TabKeyboardNavigation {
  focusedIndex: number;
  isKeyboardActive: boolean;
}

export interface TabAccessibility {
  tabListId: string;
  tabPrefix: string;
  panelPrefix: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

export interface TabEvents {
  tabChange: { index: number; tabId: string; previousIndex: number };
  tabClick: { index: number; tabId: string; event: Event };
  tabFocus: { index: number; tabId: string; event: FocusEvent };
  tabBlur: { index: number; tabId: string; event: FocusEvent };
  tabKeyDown: { index: number; tabId: string; event: KeyboardEvent };
}

export interface TabAnimationConfig {
  enabled: boolean;
  duration: number;
  easing: string;
  fadeIn: boolean;
  slideTransition: boolean;
}

export interface TabScrollConfig {
  enabled: boolean;
  showButtons: boolean;
  buttonSize: number;
  scrollAmount: number;
  autoHide: boolean;
}

export interface TabCustomization {
  showIndicator: boolean;
  indicatorColor?: string;
  indicatorHeight?: number;
  tabSpacing?: number;
  contentPadding?: string;
  borderRadius?: string;
}
