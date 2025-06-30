import React, { useState } from 'react';

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
   * Optional icon (can be any React element)
   */
  icon?: React.ReactNode;
  
  /**
   * Content to display when tab is active
   */
  content?: React.ReactNode;
  
  /**
   * Disable this specific tab
   */
  disabled?: boolean;
}

export interface TabProps {
  /**
   * Array of tab items
   */
  tabs?: TabItem[];
  
  /**
   * Index of the initially active tab
   * @default 0
   */
  defaultActiveTab?: number;
  
  /**
   * Callback when tab changes
   */
  onChange?: (index: number, tabId: string) => void;
  
  /**
   * Tab content as children (alternative to content in tabs)
   */
  children?: React.ReactNode[];
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

export function Tab({ 
  tabs = [], 
  defaultActiveTab = 0,
  onChange,
  children,
  className = '',
  ...props 
}: TabProps & React.ComponentProps<'div'>) {
  
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  // Design tokens converted to actual values (exact from original)
  const tokens = {
    // Colors
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#f8f6fa',
    borderSecondary: '#c4b8cd',
    primary400: '#8b5a97',
    primary600: '#611F69',
    textPrimary: '#2a1f35',
    textSecondary: '#6b5671',
    textTertiary: '#8a7490',
    
    // Typography
    fontSizeXs: '12px',
    fontSizeSm: '14px',
    fontWeightMedium: 500,
    fontWeightSemibold: 600,
    
    // Spacing
    spacing1: '4px',
    spacing2: '8px',
    spacing3: '12px',
    spacing5: '20px',
    spacing6: '24px',
    
    // Radius & shadows
    radiusMd: '8px',
    radiusLg: '12px',
    shadowXs: '0 1px 2px rgba(16, 24, 40, 0.05)',
    shadowSm: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
    
    // Animation
    animationDurationBase: '200ms',
    animationDurationSlow: '400ms',
    animationEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    animationEaseOut: 'cubic-bezier(0, 0, 0.2, 1)',
  };

  const handleTabClick = (index: number, tabId: string) => {
    if (tabs[index]?.disabled) return;
    
    setActiveTab(index);
    if (onChange) {
      onChange(index, tabId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number, tabId: string) => {
    if (tabs[index]?.disabled) return;
    
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      handleTabClick(nextIndex, tabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = index === 0 ? tabs.length - 1 : index - 1;
      handleTabClick(prevIndex, tabs[prevIndex].id);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabClick(index, tabId);
    }
  };

  // Styles
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const tabNavStyles: React.CSSProperties = {
    display: 'flex',
    backgroundColor: tokens.backgroundSecondary,
    borderRadius: tokens.radiusLg,
    padding: tokens.spacing1,
    marginBottom: tokens.spacing6,
    position: 'relative',
    boxShadow: tokens.shadowXs,
  };

  const baseButtonStyles: React.CSSProperties = {
    flex: 1,
    background: 'none',
    border: 'none',
    padding: `${tokens.spacing3} ${tokens.spacing5}`,
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.textSecondary,
    borderRadius: tokens.radiusMd,
    cursor: 'pointer',
    transition: `all ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing2,
  };

  const activeButtonStyles: React.CSSProperties = {
    ...baseButtonStyles,
    backgroundColor: tokens.backgroundPrimary,
    color: tokens.primary600,
    boxShadow: tokens.shadowSm,
    fontWeight: tokens.fontWeightSemibold,
  };

  const disabledButtonStyles: React.CSSProperties = {
    ...baseButtonStyles,
    opacity: 0.5,
    cursor: 'not-allowed',
    color: tokens.textTertiary,
  };

  const tabContentStyles: React.CSSProperties = {
    flex: 1,
    overflow: 'hidden',
  };

  const tabPanelStyles: React.CSSProperties = {
    display: 'none',
    height: '100%',
  };

  const activePanelStyles: React.CSSProperties = {
    ...tabPanelStyles,
    display: 'block',
    animation: `fadeIn ${tokens.animationDurationSlow} ${tokens.animationEaseOut}`,
  };

  const tabPanelInnerStyles: React.CSSProperties = {
    height: '100%',
    overflowY: 'auto',
    paddingRight: tokens.spacing2,
  };

  // Handle hover, focus, and animation effects with CSS-in-JS
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .tab-button:hover:not(:disabled) {
        color: ${tokens.textPrimary} !important;
      }
      
      .tab-button:focus {
        outline: 2px solid ${tokens.primary400} !important;
        outline-offset: 2px !important;
      }
      
      .tab-panel-inner::-webkit-scrollbar {
        width: 6px;
      }
      
      .tab-panel-inner::-webkit-scrollbar-track {
        background: ${tokens.backgroundSecondary};
        border-radius: 3px;
      }
      
      .tab-panel-inner::-webkit-scrollbar-thumb {
        background: ${tokens.borderSecondary};
        border-radius: 3px;
      }
      
      .tab-panel-inner::-webkit-scrollbar-thumb:hover {
        background: ${tokens.textTertiary};
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @media (max-width: 640px) {
        .tab-button {
          padding: ${tokens.spacing2} ${tokens.spacing3} !important;
          font-size: ${tokens.fontSizeXs} !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const containerClassNames = [
    'tab-container',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassNames} style={containerStyles} {...props}>
      {/* Tab Navigation */}
      <div style={tabNavStyles} role="tablist">
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          const isDisabled = tab.disabled;
          
          const buttonStyles = isDisabled 
            ? disabledButtonStyles 
            : isActive 
            ? activeButtonStyles 
            : baseButtonStyles;

          return (
            <button
              key={tab.id || index}
              className="tab-button"
              style={buttonStyles}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id || index}`}
              id={`tab-${tab.id || index}`}
              tabIndex={isActive ? 0 : -1}
              disabled={isDisabled}
              onClick={() => handleTabClick(index, tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index, tab.id)}
            >
              {tab.icon && <span style={{ fontSize: tokens.fontSizeSm }}>{tab.icon}</span>}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div style={tabContentStyles}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          const panelStyles = isActive ? activePanelStyles : tabPanelStyles;

          return (
            <div
              key={tab.id || index}
              style={panelStyles}
              role="tabpanel"
              id={`tabpanel-${tab.id || index}`}
              aria-labelledby={`tab-${tab.id || index}`}
              hidden={!isActive}
            >
              <div className="tab-panel-inner" style={tabPanelInnerStyles}>
                {tab.content || (children && children[index])}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}