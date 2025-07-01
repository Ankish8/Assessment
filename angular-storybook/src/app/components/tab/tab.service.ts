import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TabConfig, TabState, TabItem } from './tab.types';

@Injectable()
export class TabService {
  private _state = new BehaviorSubject<TabState>({
    activeTab: 0,
    previousTab: -1,
    isAnimating: false,
    mountedTabs: new Set()
  });
  
  private _config: TabConfig | null = null;
  
  public state$ = this._state.asObservable();
  
  get currentState(): TabState {
    return this._state.value;
  }
  
  get config(): TabConfig | null {
    return this._config;
  }
  
  initialize(config: TabConfig): void {
    this._config = config;
    
    const initialState: TabState = {
      activeTab: Math.max(0, Math.min(config.defaultActiveTab || 0, config.tabs.length - 1)),
      previousTab: -1,
      isAnimating: false,
      mountedTabs: new Set()
    };
    
    // Initialize mounted tabs based on lazy loading setting
    if (config.lazyMount) {
      initialState.mountedTabs.add(initialState.activeTab);
    } else {
      for (let i = 0; i < config.tabs.length; i++) {
        initialState.mountedTabs.add(i);
      }
    }
    
    this._state.next(initialState);
  }
  
  setActiveTab(index: number): void {
    const currentState = this._state.value;
    const config = this._config;
    
    if (!config || index < 0 || index >= config.tabs.length) return;
    if (config.tabs[index].disabled) return;
    if (index === currentState.activeTab) return;
    
    const newState: TabState = {
      ...currentState,
      previousTab: currentState.activeTab,
      activeTab: index,
      isAnimating: config.animated || false
    };
    
    // Mount tab if lazy loading
    if (config.lazyMount) {
      newState.mountedTabs.add(index);
    }
    
    this._state.next(newState);
  }
  
  mountTab(index: number): void {
    const currentState = this._state.value;
    const config = this._config;
    
    if (!config || index < 0 || index >= config.tabs.length) return;
    
    if (!currentState.mountedTabs.has(index)) {
      const newMountedTabs = new Set(currentState.mountedTabs);
      newMountedTabs.add(index);
      
      this._state.next({
        ...currentState,
        mountedTabs: newMountedTabs
      });
    }
  }
  
  unmountTab(index: number): void {
    const currentState = this._state.value;
    const config = this._config;
    
    if (!config || index < 0 || index >= config.tabs.length) return;
    if (index === currentState.activeTab) return; // Don't unmount active tab
    
    if (currentState.mountedTabs.has(index)) {
      const newMountedTabs = new Set(currentState.mountedTabs);
      newMountedTabs.delete(index);
      
      this._state.next({
        ...currentState,
        mountedTabs: newMountedTabs
      });
    }
  }
  
  setAnimating(isAnimating: boolean): void {
    const currentState = this._state.value;
    
    this._state.next({
      ...currentState,
      isAnimating
    });
  }
  
  updateConfig(config: Partial<TabConfig>): void {
    if (this._config) {
      this._config = { ...this._config, ...config };
    }
  }
  
  reset(): void {
    this._state.next({
      activeTab: 0,
      previousTab: -1,
      isAnimating: false,
      mountedTabs: new Set()
    });
    this._config = null;
  }
  
  // Helper methods
  isTabActive(index: number): boolean {
    return this._state.value.activeTab === index;
  }
  
  isTabMounted(index: number): boolean {
    return this._state.value.mountedTabs.has(index);
  }
  
  getActiveTabIndex(): number {
    return this._state.value.activeTab;
  }
  
  getPreviousTabIndex(): number {
    return this._state.value.previousTab;
  }
  
  isAnimating(): boolean {
    return this._state.value.isAnimating;
  }
  
  getMountedTabs(): Set<number> {
    return new Set(this._state.value.mountedTabs);
  }
  
  validateTabIndex(index: number): boolean {
    return this._config ? index >= 0 && index < this._config.tabs.length : false;
  }
  
  getTab(index: number): TabItem | null {
    if (!this._config || !this.validateTabIndex(index)) return null;
    return this._config.tabs[index];
  }
  
  findTabById(id: string): { tab: TabItem; index: number } | null {
    if (!this._config) return null;
    
    const index = this._config.tabs.findIndex(tab => tab.id === id);
    if (index === -1) return null;
    
    return {
      tab: this._config.tabs[index],
      index
    };
  }
  
  getEnabledTabs(): { tab: TabItem; index: number }[] {
    if (!this._config) return [];
    
    return this._config.tabs
      .map((tab, index) => ({ tab, index }))
      .filter(({ tab }) => !tab.disabled);
  }
  
  getNextEnabledTab(currentIndex: number): number | null {
    const enabledTabs = this.getEnabledTabs();
    if (enabledTabs.length === 0) return null;
    
    const currentEnabledIndex = enabledTabs.findIndex(({ index }) => index === currentIndex);
    if (currentEnabledIndex === -1) return enabledTabs[0].index;
    
    const nextIndex = (currentEnabledIndex + 1) % enabledTabs.length;
    return enabledTabs[nextIndex].index;
  }
  
  getPreviousEnabledTab(currentIndex: number): number | null {
    const enabledTabs = this.getEnabledTabs();
    if (enabledTabs.length === 0) return null;
    
    const currentEnabledIndex = enabledTabs.findIndex(({ index }) => index === currentIndex);
    if (currentEnabledIndex === -1) return enabledTabs[enabledTabs.length - 1].index;
    
    const prevIndex = currentEnabledIndex === 0 ? enabledTabs.length - 1 : currentEnabledIndex - 1;
    return enabledTabs[prevIndex].index;
  }
  
  getFirstEnabledTab(): number | null {
    const enabledTabs = this.getEnabledTabs();
    return enabledTabs.length > 0 ? enabledTabs[0].index : null;
  }
  
  getLastEnabledTab(): number | null {
    const enabledTabs = this.getEnabledTabs();
    return enabledTabs.length > 0 ? enabledTabs[enabledTabs.length - 1].index : null;
  }
}