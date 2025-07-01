import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  HostListener,
  ViewChild,
  ElementRef,
  ContentChildren,
  QueryList,
  TemplateRef,
  AfterContentInit,
  TrackByFunction
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject, takeUntil } from 'rxjs';

import { 
  TabItem, 
  TabConfig, 
  TabState, 
  TabKeyboardNavigation, 
  TabAccessibility,
  TabEvents,
  TabSize,
  TabVariant,
  TabOrientation,
  TabAlignment
} from './tab.types';
import { TabService } from './tab.service';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', [
        animate('400ms cubic-bezier(0, 0, 0.2, 1)')
      ])
    ]),
    trigger('slideIn', [
      state('void', style({ 
        opacity: 0, 
        transform: 'translateY(8px)' 
      })),
      state('*', style({ 
        opacity: 1, 
        transform: 'translateY(0)' 
      })),
      transition('void => *', [
        animate('400ms cubic-bezier(0, 0, 0.2, 1)')
      ]),
      transition('* => void', [
        animate('150ms cubic-bezier(0.4, 0, 1, 1)', style({
          opacity: 0,
          transform: 'translateY(-8px)'
        }))
      ])
    ])
  ],
  providers: [TabService]
})
export class TabComponent implements OnInit, OnDestroy, AfterContentInit {
  
  // Primary Configuration
  @Input() tabs: TabItem[] = [];
  @Input() defaultActiveTab: number = 0;
  @Input() variant: TabVariant = 'line';
  @Input() size: TabSize = 'medium';
  @Input() orientation: TabOrientation = 'horizontal';
  @Input() alignment: TabAlignment = 'start';
  
  // Behavior Configuration
  @Input() lazyMount: boolean = false;
  @Input() keepAlive: boolean = false;
  @Input() scrollable: boolean = false;
  @Input() animated: boolean = true;
  
  // Accessibility
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  
  // Styling
  @Input() className?: string;
  @Input() tabListClassName?: string;
  @Input() tabPanelClassName?: string;
  
  // Output Events
  @Output() tabChange = new EventEmitter<{ index: number; tabId: string; previousIndex: number }>();
  @Output() tabClick = new EventEmitter<{ index: number; tabId: string; event: Event }>();
  @Output() tabFocus = new EventEmitter<{ index: number; tabId: string; event: FocusEvent }>();
  @Output() tabBlur = new EventEmitter<{ index: number; tabId: string; event: FocusEvent }>();
  @Output() tabKeyDown = new EventEmitter<{ index: number; tabId: string; event: KeyboardEvent }>();
  
  // ViewChild References
  @ViewChild('tabContainer', { static: true }) tabContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('tabList', { static: true }) tabList!: ElementRef<HTMLDivElement>;
  @ViewChild('tabContent', { static: true }) tabContent!: ElementRef<HTMLDivElement>;
  
  // ContentChildren for custom content
  @ContentChildren(TemplateRef) contentTemplates!: QueryList<TemplateRef<any>>;
  
  // Internal State
  public state: TabState = {
    activeTab: 0,
    previousTab: -1,
    isAnimating: false,
    mountedTabs: new Set()
  };
  
  // Keyboard Navigation
  public keyboardNavigation: TabKeyboardNavigation = {
    focusedIndex: -1,
    isKeyboardActive: false
  };
  
  // Accessibility
  public accessibility: TabAccessibility = {
    tabListId: '',
    tabPrefix: '',
    panelPrefix: '',
    ariaLabel: '',
    ariaLabelledBy: ''
  };
  
  // Internal Properties
  private destroy$ = new Subject<void>();
  public _uniqueId: string = '';
  private _initialized = false;
  
  constructor(
    private cdr: ChangeDetectorRef,
    private tabService: TabService
  ) {
    this._uniqueId = `tab-${Math.random().toString(36).substr(2, 9)}`;
    this.accessibility.tabListId = `${this._uniqueId}-list`;
    this.accessibility.tabPrefix = `${this._uniqueId}-tab`;
    this.accessibility.panelPrefix = `${this._uniqueId}-panel`;
  }
  
  ngOnInit(): void {
    this.initializeComponent();
    this.setupAccessibility();
    this.subscribeToStateChanges();
  }
  
  ngAfterContentInit(): void {
    this.initializeTabState();
    this._initialized = true;
    this.cdr.markForCheck();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // Initialization Methods
  private initializeComponent(): void {
    const config: TabConfig = {
      tabs: this.tabs,
      defaultActiveTab: this.defaultActiveTab,
      variant: this.variant,
      size: this.size,
      orientation: this.orientation,
      alignment: this.alignment,
      lazyMount: this.lazyMount,
      keepAlive: this.keepAlive,
      scrollable: this.scrollable,
      animated: this.animated,
      ariaLabel: this.ariaLabel,
      ariaLabelledBy: this.ariaLabelledBy,
      className: this.className,
      tabListClassName: this.tabListClassName,
      tabPanelClassName: this.tabPanelClassName
    };
    
    this.tabService.initialize(config);
  }
  
  private setupAccessibility(): void {
    this.accessibility.ariaLabel = this.ariaLabel || 'Tabs';
    this.accessibility.ariaLabelledBy = this.ariaLabelledBy || '';
  }
  
  private subscribeToStateChanges(): void {
    this.tabService.state$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(state => {
      this.state = state;
      this.cdr.markForCheck();
    });
  }
  
  private initializeTabState(): void {
    // Validate default active tab
    const validIndex = Math.max(0, Math.min(this.defaultActiveTab, this.tabs.length - 1));
    this.state.activeTab = validIndex;
    this.state.previousTab = -1;
    
    // Initialize mounted tabs for lazy loading
    if (this.lazyMount) {
      this.state.mountedTabs.add(validIndex);
    } else {
      // Mount all tabs if not lazy loading
      for (let i = 0; i < this.tabs.length; i++) {
        this.state.mountedTabs.add(i);
      }
    }
  }
  
  // Tab Management Methods
  public selectTab(index: number, event?: Event): void {
    if (!this._initialized || index < 0 || index >= this.tabs.length) return;
    
    const tab = this.tabs[index];
    if (tab.disabled) return;
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const previousIndex = this.state.activeTab;
    
    if (index === previousIndex) return;
    
    // Update state
    this.state.previousTab = previousIndex;
    this.state.activeTab = index;
    this.state.isAnimating = this.animated;
    
    // Mount tab if lazy loading
    if (this.lazyMount) {
      this.state.mountedTabs.add(index);
    }
    
    // Reset keyboard navigation
    this.resetKeyboardNavigation();
    
    // Emit events
    this.tabChange.emit({ index, tabId: tab.id, previousIndex });
    
    if (event) {
      this.tabClick.emit({ index, tabId: tab.id, event });
    }
    
    // Handle animation timing
    if (this.animated) {
      setTimeout(() => {
        this.state.isAnimating = false;
        this.cdr.markForCheck();
      }, 400);
    }
    
    this.cdr.markForCheck();
  }
  
  public isTabActive(index: number): boolean {
    return this.state.activeTab === index;
  }
  
  public isTabMounted(index: number): boolean {
    if (!this.lazyMount) return true;
    return this.state.mountedTabs.has(index);
  }
  
  public shouldShowTabContent(index: number): boolean {
    if (!this.keepAlive && !this.isTabActive(index)) return false;
    return this.isTabMounted(index);
  }
  
  // Keyboard Navigation
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    const tabButton = target.closest('[role="tab"]');
    
    if (!tabButton) return;
    
    const tabIndex = parseInt(tabButton.getAttribute('data-tab-index') || '0', 10);
    const tab = this.tabs[tabIndex];
    
    if (!tab) return;
    
    // Emit keydown event
    this.tabKeyDown.emit({ index: tabIndex, tabId: tab.id, event });
    
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.navigateToNextTab(tabIndex);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.navigateToPreviousTab(tabIndex);
        break;
      case 'Home':
        event.preventDefault();
        this.navigateToFirstTab();
        break;
      case 'End':
        event.preventDefault();
        this.navigateToLastTab();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectTab(tabIndex, event);
        break;
    }
  }
  
  private navigateToNextTab(currentIndex: number): void {
    this.keyboardNavigation.isKeyboardActive = true;
    
    let nextIndex = currentIndex + 1;
    while (nextIndex < this.tabs.length && this.tabs[nextIndex].disabled) {
      nextIndex++;
    }
    
    if (nextIndex >= this.tabs.length) {
      // Wrap to beginning
      nextIndex = 0;
      while (nextIndex < this.tabs.length && this.tabs[nextIndex].disabled) {
        nextIndex++;
      }
    }
    
    if (nextIndex < this.tabs.length) {
      this.focusTab(nextIndex);
    }
  }
  
  private navigateToPreviousTab(currentIndex: number): void {
    this.keyboardNavigation.isKeyboardActive = true;
    
    let prevIndex = currentIndex - 1;
    while (prevIndex >= 0 && this.tabs[prevIndex].disabled) {
      prevIndex--;
    }
    
    if (prevIndex < 0) {
      // Wrap to end
      prevIndex = this.tabs.length - 1;
      while (prevIndex >= 0 && this.tabs[prevIndex].disabled) {
        prevIndex--;
      }
    }
    
    if (prevIndex >= 0) {
      this.focusTab(prevIndex);
    }
  }
  
  private navigateToFirstTab(): void {
    this.keyboardNavigation.isKeyboardActive = true;
    
    let firstIndex = 0;
    while (firstIndex < this.tabs.length && this.tabs[firstIndex].disabled) {
      firstIndex++;
    }
    
    if (firstIndex < this.tabs.length) {
      this.focusTab(firstIndex);
    }
  }
  
  private navigateToLastTab(): void {
    this.keyboardNavigation.isKeyboardActive = true;
    
    let lastIndex = this.tabs.length - 1;
    while (lastIndex >= 0 && this.tabs[lastIndex].disabled) {
      lastIndex--;
    }
    
    if (lastIndex >= 0) {
      this.focusTab(lastIndex);
    }
  }
  
  private focusTab(index: number): void {
    this.keyboardNavigation.focusedIndex = index;
    
    const tabButton = this.tabList.nativeElement.querySelector(
      `[data-tab-index="${index}"]`
    ) as HTMLElement;
    
    if (tabButton) {
      tabButton.focus();
    }
  }
  
  private resetKeyboardNavigation(): void {
    this.keyboardNavigation.focusedIndex = -1;
    this.keyboardNavigation.isKeyboardActive = false;
  }
  
  // Event Handlers
  public onTabClick(index: number, event: Event): void {
    this.selectTab(index, event);
  }
  
  public onTabFocus(index: number, event: FocusEvent): void {
    this.keyboardNavigation.focusedIndex = index;
    const tab = this.tabs[index];
    if (tab) {
      this.tabFocus.emit({ index, tabId: tab.id, event });
    }
  }
  
  public onTabBlur(index: number, event: FocusEvent): void {
    // Don't reset focused index immediately to handle keyboard navigation
    const tab = this.tabs[index];
    if (tab) {
      this.tabBlur.emit({ index, tabId: tab.id, event });
    }
    
    // Reset after a short delay to allow for keyboard navigation
    setTimeout(() => {
      if (!this.tabList.nativeElement.contains(document.activeElement)) {
        this.resetKeyboardNavigation();
      }
    }, 100);
  }
  
  // Template Helper Methods
  public get containerClasses(): string {
    return [
      'tab-container',
      this.variant,
      this.size,
      this.orientation,
      this.alignment,
      this.scrollable && 'scrollable',
      this.animated && 'animated',
      this.state.isAnimating && 'animating',
      this.className
    ].filter(Boolean).join(' ');
  }
  
  public get tabListClasses(): string {
    return [
      'tab-list',
      this.variant,
      this.size,
      this.orientation,
      this.alignment,
      this.scrollable && 'scrollable',
      this.tabListClassName
    ].filter(Boolean).join(' ');
  }
  
  public get tabContentClasses(): string {
    return [
      'tab-content',
      this.orientation,
      this.tabPanelClassName
    ].filter(Boolean).join(' ');
  }
  
  public getTabClasses(index: number): { [key: string]: boolean } {
    const tab = this.tabs[index];
    const isActive = this.isTabActive(index);
    const isFocused = this.keyboardNavigation.focusedIndex === index;
    
    return {
      'tab-item': true,
      'active': isActive,
      'disabled': tab.disabled || false,
      'focused': isFocused && this.keyboardNavigation.isKeyboardActive,
      [this.variant]: true,
      [this.size]: true
    };
  }
  
  public getTabPanelClasses(index: number): { [key: string]: boolean } {
    const isActive = this.isTabActive(index);
    
    return {
      'tab-panel': true,
      'active': isActive,
      'animated': this.animated,
      'keep-alive': this.keepAlive
    };
  }
  
  public getTabId(index: number): string {
    return `${this.accessibility.tabPrefix}-${index}`;
  }
  
  public getTabPanelId(index: number): string {
    return `${this.accessibility.panelPrefix}-${index}`;
  }
  
  public getTabIndex(index: number): number {
    const tab = this.tabs[index];
    if (tab.disabled) return -1;
    return this.isTabActive(index) ? 0 : -1;
  }
  
  // TrackBy Functions
  public trackByTabId: TrackByFunction<TabItem> = (index, tab) => tab.id;
  
  // Public API Methods
  public getActiveTab(): TabItem | null {
    return this.tabs[this.state.activeTab] || null;
  }
  
  public getActiveTabIndex(): number {
    return this.state.activeTab;
  }
  
  public getAllTabs(): TabItem[] {
    return this.tabs;
  }
  
  public setActiveTab(index: number): void {
    this.selectTab(index);
  }
  
  public addTab(tab: TabItem, index?: number): void {
    if (index !== undefined) {
      this.tabs.splice(index, 0, tab);
    } else {
      this.tabs.push(tab);
    }
    this.cdr.markForCheck();
  }
  
  public removeTab(index: number): void {
    if (index < 0 || index >= this.tabs.length) return;
    
    this.tabs.splice(index, 1);
    
    // Adjust active tab if necessary
    if (this.state.activeTab >= index && this.state.activeTab > 0) {
      this.state.activeTab--;
    } else if (this.state.activeTab >= this.tabs.length) {
      this.state.activeTab = Math.max(0, this.tabs.length - 1);
    }
    
    // Remove from mounted tabs
    this.state.mountedTabs.delete(index);
    
    this.cdr.markForCheck();
  }
  
  public updateTab(index: number, tab: Partial<TabItem>): void {
    if (index < 0 || index >= this.tabs.length) return;
    
    this.tabs[index] = { ...this.tabs[index], ...tab };
    this.cdr.markForCheck();
  }
  
  // Utility Methods
  public isTemplate(content: any): boolean {
    return content instanceof TemplateRef;
  }
  
  public isString(content: any): boolean {
    return typeof content === 'string';
  }
  
  public hasIcon(tab: TabItem): boolean {
    return !!tab.icon;
  }
  
  public getIconClass(tab: TabItem): string {
    if (typeof tab.icon === 'string') {
      return tab.icon;
    }
    return '';
  }
}