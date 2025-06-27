import React, { useState } from 'react';
import styles from './Tab.module.css';

const Tab = ({ 
  tabs = [], 
  defaultActiveTab = 0,
  onChange,
  children,
  className = '',
  ...props 
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (index, tabId) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index, tabId);
    }
  };

  const handleKeyDown = (e, index, tabId) => {
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

  return (
    <div className={`${styles.tabContainer} ${className}`} {...props}>
      {/* Tab Navigation */}
      <div className={styles.tabNav} role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.id || index}
            className={`${styles.tabButton} ${activeTab === index ? styles.active : ''}`}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${tab.id || index}`}
            id={`tab-${tab.id || index}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => handleTabClick(index, tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index, tab.id)}
          >
            {tab.icon && <i className={tab.icon}></i>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id || index}
            className={`${styles.tabPanel} ${activeTab === index ? styles.active : ''}`}
            role="tabpanel"
            id={`tabpanel-${tab.id || index}`}
            aria-labelledby={`tab-${tab.id || index}`}
            hidden={activeTab !== index}
          >
            <div className={styles.tabPanelInner}>
              {tab.content || (children && children[index])}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tab;