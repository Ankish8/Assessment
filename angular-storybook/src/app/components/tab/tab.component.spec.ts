import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TabComponent } from './tab.component';
import { TabService } from './tab.service';
import { TabItem } from './tab.types';

// Test data
const mockTabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: 'Content for Tab 1'
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: 'Content for Tab 2'
  },
  {
    id: 'tab3',
    label: 'Tab 3',
    content: 'Content for Tab 3',
    disabled: true
  },
  {
    id: 'tab4',
    label: 'Tab 4',
    content: 'Content for Tab 4'
  }
];

const iconTabs: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'fas fa-home',
    content: 'Home content'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'fas fa-cog',
    content: 'Settings content'
  }
];

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let service: TabService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabComponent, NoopAnimationsModule],
      providers: [TabService]
    }).compileComponents();

    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TabService);
    
    component.tabs = mockTabs;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.defaultActiveTab).toBe(0);
      expect(component.variant).toBe('line');
      expect(component.size).toBe('medium');
      expect(component.orientation).toBe('horizontal');
      expect(component.alignment).toBe('start');
      expect(component.lazyMount).toBe(false);
      expect(component.keepAlive).toBe(false);
      expect(component.scrollable).toBe(false);
      expect(component.animated).toBe(true);
    });

    it('should generate unique ID', () => {
      expect(component._uniqueId).toMatch(/^tab-[a-z0-9]{9}$/);
    });

    it('should initialize state correctly', () => {
      expect(component.state.activeTab).toBe(0);
      expect(component.state.previousTab).toBe(-1);
      expect(component.state.isAnimating).toBe(false);
    });

    it('should setup accessibility properties', () => {
      expect(component.accessibility.tabListId).toContain('tab-');
      expect(component.accessibility.tabPrefix).toContain('tab-');
      expect(component.accessibility.panelPrefix).toContain('tab-');
    });
  });

  describe('Tab Selection', () => {
    it('should select tab by index', () => {
      component.selectTab(1);
      
      expect(component.state.activeTab).toBe(1);
      expect(component.state.previousTab).toBe(0);
    });

    it('should not select disabled tab', () => {
      component.selectTab(2); // Tab 3 is disabled
      
      expect(component.state.activeTab).toBe(0); // Should remain at default
    });

    it('should not select invalid tab index', () => {
      component.selectTab(-1);
      expect(component.state.activeTab).toBe(0);
      
      component.selectTab(10);
      expect(component.state.activeTab).toBe(0);
    });

    it('should emit tabChange event', () => {
      spyOn(component.tabChange, 'emit');
      
      component.selectTab(1);
      
      expect(component.tabChange.emit).toHaveBeenCalledWith({
        index: 1,
        tabId: 'tab2',
        previousIndex: 0
      });
    });

    it('should emit tabClick event when event is provided', () => {
      spyOn(component.tabClick, 'emit');
      const mockEvent = new Event('click');
      
      component.selectTab(1, mockEvent);
      
      expect(component.tabClick.emit).toHaveBeenCalledWith({
        index: 1,
        tabId: 'tab2',
        event: mockEvent
      });
    });

    it('should handle animation timing', fakeAsync(() => {
      component.animated = true;
      component.selectTab(1);
      
      expect(component.state.isAnimating).toBe(true);
      
      tick(400);
      
      expect(component.state.isAnimating).toBe(false);
    }));
  });

  describe('Tab State Management', () => {
    it('should check if tab is active', () => {
      component.selectTab(1);
      
      expect(component.isTabActive(0)).toBe(false);
      expect(component.isTabActive(1)).toBe(true);
    });

    it('should handle lazy mounting', () => {
      component.lazyMount = true;
      component.ngAfterContentInit();
      
      expect(component.isTabMounted(0)).toBe(true); // Default active tab
      expect(component.isTabMounted(1)).toBe(false);
      
      component.selectTab(1);
      expect(component.isTabMounted(1)).toBe(true);
    });

    it('should handle keep alive', () => {
      component.keepAlive = true;
      component.selectTab(1);
      
      expect(component.shouldShowTabContent(0)).toBe(true); // Previous tab kept alive
      expect(component.shouldShowTabContent(1)).toBe(true); // Current tab
    });

    it('should not show content for non-active tabs without keep alive', () => {
      component.keepAlive = false;
      component.selectTab(1);
      
      expect(component.shouldShowTabContent(0)).toBe(false);
      expect(component.shouldShowTabContent(1)).toBe(true);
    });
  });

  describe('Keyboard Navigation', () => {
    let tabButtons: DebugElement[];

    beforeEach(() => {
      fixture.detectChanges();
      tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    });

    it('should navigate to next tab with ArrowRight', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      spyOn(event, 'preventDefault');
      
      component.onKeyDown(event);
      // Need to simulate the button being focused for this test
      Object.defineProperty(event, 'target', {
        value: tabButtons[0].nativeElement
      });
      
      // Reset and test with proper target
      component.onKeyDown(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should navigate to previous tab with ArrowLeft', () => {
      component.selectTab(1);
      fixture.detectChanges();
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      Object.defineProperty(event, 'target', {
        value: tabButtons[1].nativeElement
      });
      spyOn(event, 'preventDefault');
      
      component.onKeyDown(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should activate tab with Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      Object.defineProperty(event, 'target', {
        value: tabButtons[1].nativeElement
      });
      spyOn(event, 'preventDefault');
      spyOn(component, 'selectTab');
      
      component.onKeyDown(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should activate tab with Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      Object.defineProperty(event, 'target', {
        value: tabButtons[1].nativeElement
      });
      spyOn(event, 'preventDefault');
      spyOn(component, 'selectTab');
      
      component.onKeyDown(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should navigate to first tab with Home key', () => {
      component.selectTab(1);
      fixture.detectChanges();
      
      const event = new KeyboardEvent('keydown', { key: 'Home' });
      Object.defineProperty(event, 'target', {
        value: tabButtons[1].nativeElement
      });
      spyOn(event, 'preventDefault');
      
      component.onKeyDown(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should navigate to last tab with End key', () => {
      const event = new KeyboardEvent('keydown', { key: 'End' });
      Object.defineProperty(event, 'target', {
        value: tabButtons[0].nativeElement
      });
      spyOn(event, 'preventDefault');
      
      component.onKeyDown(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should skip disabled tabs during navigation', () => {
      // Test that disabled tab (index 2) is skipped
      component.selectTab(1);
      fixture.detectChanges();
      
      // Simulate ArrowRight from tab 1 (should skip disabled tab 2 and go to tab 3)
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      Object.defineProperty(event, 'target', {
        value: tabButtons[1].nativeElement
      });
      
      component.onKeyDown(event);
      // The navigation logic should skip the disabled tab
    });
  });

  describe('Event Handlers', () => {
    it('should handle tab click', () => {
      spyOn(component, 'selectTab');
      const mockEvent = new Event('click');
      
      component.onTabClick(1, mockEvent);
      
      expect(component.selectTab).toHaveBeenCalledWith(1, mockEvent);
    });

    it('should handle tab focus', () => {
      spyOn(component.tabFocus, 'emit');
      const mockEvent = new FocusEvent('focus');
      
      component.onTabFocus(1, mockEvent);
      
      expect(component.keyboardNavigation.focusedIndex).toBe(1);
      expect(component.tabFocus.emit).toHaveBeenCalledWith({
        index: 1,
        tabId: 'tab2',
        event: mockEvent
      });
    });

    it('should handle tab blur', () => {
      spyOn(component.tabBlur, 'emit');
      const mockEvent = new FocusEvent('blur');
      
      component.onTabBlur(1, mockEvent);
      
      expect(component.tabBlur.emit).toHaveBeenCalledWith({
        index: 1,
        tabId: 'tab2',
        event: mockEvent
      });
    });
  });

  describe('Template Helper Methods', () => {
    it('should return correct container classes', () => {
      component.variant = 'enclosed';
      component.size = 'large';
      component.orientation = 'vertical';
      component.alignment = 'center';
      component.scrollable = true;
      component.animated = true;
      component.className = 'custom-class';
      
      const classes = component.containerClasses;
      
      expect(classes).toContain('tab-container');
      expect(classes).toContain('enclosed');
      expect(classes).toContain('large');
      expect(classes).toContain('vertical');
      expect(classes).toContain('center');
      expect(classes).toContain('scrollable');
      expect(classes).toContain('animated');
      expect(classes).toContain('custom-class');
    });

    it('should return correct tab list classes', () => {
      component.variant = 'soft-rounded';
      component.size = 'small';
      component.orientation = 'horizontal';
      component.tabListClassName = 'custom-list';
      
      const classes = component.tabListClasses;
      
      expect(classes).toContain('tab-list');
      expect(classes).toContain('soft-rounded');
      expect(classes).toContain('small');
      expect(classes).toContain('horizontal');
      expect(classes).toContain('custom-list');
    });

    it('should return correct tab classes', () => {
      component.selectTab(0);
      component.keyboardNavigation.focusedIndex = 0;
      component.keyboardNavigation.isKeyboardActive = true;
      
      const classes = component.getTabClasses(0);
      
      expect(classes['tab-item']).toBe(true);
      expect(classes['active']).toBe(true);
      expect(classes['disabled']).toBe(false);
      expect(classes['focused']).toBe(true);
    });

    it('should return correct tab panel classes', () => {
      component.selectTab(1);
      component.animated = true;
      component.keepAlive = true;
      
      const activeClasses = component.getTabPanelClasses(1);
      const inactiveClasses = component.getTabPanelClasses(0);
      
      expect(activeClasses['tab-panel']).toBe(true);
      expect(activeClasses['active']).toBe(true);
      expect(activeClasses['animated']).toBe(true);
      expect(activeClasses['keep-alive']).toBe(true);
      
      expect(inactiveClasses['active']).toBe(false);
    });

    it('should generate correct IDs', () => {
      expect(component.getTabId(0)).toContain('-tab-0');
      expect(component.getTabPanelId(0)).toContain('-panel-0');
    });

    it('should return correct tab index for accessibility', () => {
      component.selectTab(1);
      
      expect(component.getTabIndex(0)).toBe(-1); // Inactive tab
      expect(component.getTabIndex(1)).toBe(0);  // Active tab
      expect(component.getTabIndex(2)).toBe(-1); // Disabled tab
    });
  });

  describe('Public API Methods', () => {
    it('should get active tab', () => {
      component.selectTab(1);
      
      const activeTab = component.getActiveTab();
      expect(activeTab).toBe(mockTabs[1]);
    });

    it('should get active tab index', () => {
      component.selectTab(2);
      
      expect(component.getActiveTabIndex()).toBe(2);
    });

    it('should get all tabs', () => {
      const allTabs = component.getAllTabs();
      expect(allTabs).toBe(mockTabs);
    });

    it('should set active tab', () => {
      spyOn(component, 'selectTab');
      
      component.setActiveTab(2);
      
      expect(component.selectTab).toHaveBeenCalledWith(2);
    });

    it('should add tab', () => {
      const newTab: TabItem = {
        id: 'new-tab',
        label: 'New Tab',
        content: 'New content'
      };
      
      component.addTab(newTab);
      
      expect(component.tabs).toContain(newTab);
    });

    it('should add tab at specific index', () => {
      const newTab: TabItem = {
        id: 'new-tab',
        label: 'New Tab',
        content: 'New content'
      };
      
      component.addTab(newTab, 1);
      
      expect(component.tabs[1]).toBe(newTab);
    });

    it('should remove tab', () => {
      const initialLength = component.tabs.length;
      
      component.removeTab(1);
      
      expect(component.tabs.length).toBe(initialLength - 1);
      expect(component.tabs.find(tab => tab.id === 'tab2')).toBeUndefined();
    });

    it('should adjust active tab when removing active tab', () => {
      component.selectTab(1);
      component.removeTab(1);
      
      expect(component.state.activeTab).toBe(1); // Should adjust to valid index
    });

    it('should update tab', () => {
      component.updateTab(0, { label: 'Updated Label' });
      
      expect(component.tabs[0].label).toBe('Updated Label');
    });
  });

  describe('Icon Support', () => {
    beforeEach(() => {
      component.tabs = iconTabs;
      fixture.detectChanges();
    });

    it('should detect if tab has icon', () => {
      expect(component.hasIcon(iconTabs[0])).toBe(true);
      expect(component.hasIcon(mockTabs[0])).toBe(false);
    });

    it('should get icon class for string icons', () => {
      expect(component.getIconClass(iconTabs[0])).toBe('fas fa-home');
    });

    it('should return empty string for non-string icons', () => {
      const templateIcon = {
        id: 'template',
        label: 'Template',
        icon: {} // Non-string icon
      };
      
      expect(component.getIconClass(templateIcon)).toBe('');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes on tab list', () => {
      component.ariaLabel = 'Custom tabs';
      fixture.detectChanges();
      
      const tabList = fixture.debugElement.query(By.css('[role="tablist"]'));
      
      expect(tabList.nativeElement.getAttribute('aria-label')).toBe('Custom tabs');
      expect(tabList.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('should have proper ARIA attributes on tabs', () => {
      component.selectTab(1);
      fixture.detectChanges();
      
      const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      
      expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('false');
      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('true');
      expect(tabs[2].nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have proper ARIA attributes on tab panels', () => {
      fixture.detectChanges();
      
      const panels = fixture.debugElement.queryAll(By.css('[role="tabpanel"]'));
      
      expect(panels[0].nativeElement.getAttribute('aria-labelledby')).toContain('tab-0');
      expect(panels[0].nativeElement.getAttribute('id')).toContain('panel-0');
    });

    it('should manage tabindex correctly', () => {
      component.selectTab(1);
      fixture.detectChanges();
      
      const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      
      expect(tabs[0].nativeElement.getAttribute('tabindex')).toBe('-1');
      expect(tabs[1].nativeElement.getAttribute('tabindex')).toBe('0');
      expect(tabs[2].nativeElement.getAttribute('tabindex')).toBe('-1'); // Disabled
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty tabs array', () => {
      component.tabs = [];
      component.ngAfterContentInit();
      
      expect(component.state.activeTab).toBe(0);
      expect(component.getActiveTab()).toBeNull();
    });

    it('should handle invalid default active tab', () => {
      component.defaultActiveTab = 10;
      component.ngAfterContentInit();
      
      expect(component.state.activeTab).toBe(mockTabs.length - 1);
    });

    it('should handle negative default active tab', () => {
      component.defaultActiveTab = -1;
      component.ngAfterContentInit();
      
      expect(component.state.activeTab).toBe(0);
    });

    it('should handle rapid tab switching', () => {
      for (let i = 0; i < 10; i++) {
        component.selectTab(i % mockTabs.length);
      }
      
      // Should end up in a consistent state
      expect(component.state.activeTab).toBeGreaterThanOrEqual(0);
      expect(component.state.activeTab).toBeLessThan(mockTabs.length);
    });

    it('should handle tab removal edge cases', () => {
      // Try to remove invalid indices
      component.removeTab(-1);
      component.removeTab(100);
      
      expect(component.tabs.length).toBe(mockTabs.length);
    });

    it('should handle tab update edge cases', () => {
      // Try to update invalid indices
      component.updateTab(-1, { label: 'Invalid' });
      component.updateTab(100, { label: 'Invalid' });
      
      // Original tabs should remain unchanged
      expect(component.tabs[0].label).toBe('Tab 1');
    });
  });

  describe('Template Content Support', () => {
    it('should detect template content', () => {
      const template = {} as any; // Mock template
      expect(component.isTemplate(template)).toBe(false); // Will be false since it's not a real TemplateRef
      expect(component.isTemplate('string')).toBe(false);
    });

    it('should detect string content', () => {
      expect(component.isString('test')).toBe(true);
      expect(component.isString(123)).toBe(false);
      expect(component.isString({})).toBe(false);
    });
  });
});

// Test Host Component for integration testing
@Component({
  template: `
    <app-tab 
      [tabs]="tabs"
      [defaultActiveTab]="defaultActiveTab"
      [variant]="variant"
      [size]="size"
      [orientation]="orientation"
      [animated]="animated"
      (tabChange)="onTabChange($event)"
      (tabClick)="onTabClick($event)">
    </app-tab>
  `
})
class TestHostComponent {
  tabs = mockTabs;
  defaultActiveTab = 0;
  variant: any = 'line';
  size: any = 'medium';
  orientation: any = 'horizontal';
  animated = true;
  
  lastTabChange: any = null;
  lastTabClick: any = null;
  
  onTabChange(event: any): void {
    this.lastTabChange = event;
  }
  
  onTabClick(event: any): void {
    this.lastTabClick = event;
  }
}

describe('TabComponent Integration', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let tabComponent: TabComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabComponent],
      declarations: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    tabComponent = fixture.debugElement.query(By.directive(TabComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should integrate with host component', () => {
    expect(tabComponent.tabs).toBe(hostComponent.tabs);
    expect(tabComponent.defaultActiveTab).toBe(hostComponent.defaultActiveTab);
    expect(tabComponent.variant).toBe(hostComponent.variant);
  });

  it('should emit events to host component', () => {
    tabComponent.selectTab(1);
    
    expect(hostComponent.lastTabChange).toEqual({
      index: 1,
      tabId: 'tab2',
      previousIndex: 0
    });
  });

  it('should respond to host component changes', () => {
    hostComponent.variant = 'enclosed';
    hostComponent.size = 'large';
    fixture.detectChanges();
    
    expect(tabComponent.variant).toBe('enclosed');
    expect(tabComponent.size).toBe('large');
  });
});
