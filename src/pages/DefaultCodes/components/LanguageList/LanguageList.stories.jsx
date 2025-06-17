import { useState } from 'react';
import LanguageList from './LanguageList';

export default {
  title: 'Components/LanguageList',
  component: LanguageList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selectedLanguages: {
      control: 'object',
    },
    currentLanguage: {
      control: { type: 'select' },
      options: ['java', 'javascript', 'python', 'cpp', 'c', 'ruby', 'php', 'python3', 'scala', 'kotlin'],
    },
    onLanguageSelect: {
      action: 'language selected',
    },
    onLanguageChange: {
      action: 'current language changed',
    },
  },
};

// Helper component for interactive examples
const LanguageListExample = ({ 
  initialSelected = new Set(['javascript']), 
  initialCurrent = 'javascript',
  ...props 
}) => {
  const [selectedLanguages, setSelectedLanguages] = useState(initialSelected);
  const [currentLanguage, setCurrentLanguage] = useState(initialCurrent);

  const handleLanguageSelect = (languageId) => {
    setSelectedLanguages(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(languageId)) {
        newSelected.delete(languageId);
        // If we're deselecting the current language, switch to another
        if (languageId === currentLanguage && newSelected.size > 0) {
          setCurrentLanguage(Array.from(newSelected)[0]);
        }
      } else {
        newSelected.add(languageId);
        // If this is the first language selected, make it current
        if (newSelected.size === 1) {
          setCurrentLanguage(languageId);
        }
      }
      return newSelected;
    });
  };

  const handleLanguageChange = (languageId) => {
    if (selectedLanguages.has(languageId)) {
      setCurrentLanguage(languageId);
    }
  };

  return (
    <div style={{ width: '300px' }}>
      <LanguageList
        selectedLanguages={selectedLanguages}
        currentLanguage={currentLanguage}
        onLanguageSelect={handleLanguageSelect}
        onLanguageChange={handleLanguageChange}
        {...props}
      />
    </div>
  );
};

export const Default = {
  render: () => <LanguageListExample />,
};

export const NoLanguagesSelected = {
  render: () => (
    <LanguageListExample
      initialSelected={new Set()}
      initialCurrent=""
    />
  ),
};

export const MultipleLanguagesSelected = {
  render: () => (
    <LanguageListExample
      initialSelected={new Set(['javascript', 'python', 'java', 'cpp'])}
      initialCurrent="python"
    />
  ),
};

export const AllLanguagesSelected = {
  render: () => (
    <LanguageListExample
      initialSelected={new Set(['java', 'c', 'cpp', 'ruby', 'python', 'php', 'javascript', 'python3', 'scala', 'kotlin'])}
      initialCurrent="javascript"
    />
  ),
};

export const BackendLanguages = {
  render: () => (
    <LanguageListExample
      initialSelected={new Set(['java', 'python', 'python3', 'php'])}
      initialCurrent="java"
    />
  ),
};

export const SystemsLanguages = {
  render: () => (
    <LanguageListExample
      initialSelected={new Set(['c', 'cpp', 'rust'])}
      initialCurrent="cpp"
    />
  ),
};

export const InteractiveExample = {
  render: () => {
    const [selectedLanguages, setSelectedLanguages] = useState(new Set(['javascript', 'python']));
    const [currentLanguage, setCurrentLanguage] = useState('javascript');

    const handleLanguageSelect = (languageId) => {
      setSelectedLanguages(prev => {
        const newSelected = new Set(prev);
        if (newSelected.has(languageId)) {
          newSelected.delete(languageId);
          // If we're deselecting the current language, switch to another
          if (languageId === currentLanguage && newSelected.size > 0) {
            setCurrentLanguage(Array.from(newSelected)[0]);
          } else if (newSelected.size === 0) {
            setCurrentLanguage('');
          }
        } else {
          newSelected.add(languageId);
          // If this is the first language selected, make it current
          if (newSelected.size === 1) {
            setCurrentLanguage(languageId);
          }
        }
        return newSelected;
      });
    };

    const handleLanguageChange = (languageId) => {
      if (selectedLanguages.has(languageId)) {
        setCurrentLanguage(languageId);
      }
    };

    const selectCommonLanguages = () => {
      const common = new Set(['javascript', 'python', 'java', 'cpp']);
      setSelectedLanguages(common);
      setCurrentLanguage('javascript');
    };

    const selectAllLanguages = () => {
      const all = new Set(['java', 'c', 'cpp', 'ruby', 'python', 'php', 'javascript', 'python3', 'scala', 'kotlin']);
      setSelectedLanguages(all);
      setCurrentLanguage('javascript');
    };

    const clearAllLanguages = () => {
      setSelectedLanguages(new Set());
      setCurrentLanguage('');
    };

    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Programming Languages</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#667085' }}>
            Select languages for code templates. Click to select/deselect, double-click to set as current.
          </p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <button
              onClick={selectCommonLanguages}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#f9fafb',
                border: '1px solid #d0d5dd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Common Languages
            </button>
            <button
              onClick={selectAllLanguages}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#f9fafb',
                border: '1px solid #d0d5dd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Select All
            </button>
            <button
              onClick={clearAllLanguages}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#fef3f2',
                border: '1px solid #fecdca',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#b42318'
              }}
            >
              Clear All
            </button>
          </div>
        </div>
        
        <LanguageList
          selectedLanguages={selectedLanguages}
          currentLanguage={currentLanguage}
          onLanguageSelect={handleLanguageSelect}
          onLanguageChange={handleLanguageChange}
        />
        
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f9fafb',
          borderRadius: '6px',
          fontSize: '12px'
        }}>
          <div><strong>Selected:</strong> {selectedLanguages.size} language(s)</div>
          <div><strong>Current:</strong> {currentLanguage || 'None'}</div>
          <div><strong>Languages:</strong> {Array.from(selectedLanguages).join(', ') || 'None'}</div>
        </div>
      </div>
    );
  },
};

export const CodeEditorIntegration = {
  render: () => {
    const [selectedLanguages, setSelectedLanguages] = useState(new Set(['javascript', 'python', 'java']));
    const [currentLanguage, setCurrentLanguage] = useState('javascript');
    
    const codeTemplates = {
      javascript: '// JavaScript template\nfunction solution() {\n    // Your code here\n}',
      python: '# Python template\ndef solution():\n    # Your code here\n    pass',
      java: '// Java template\npublic class Solution {\n    public void solution() {\n        // Your code here\n    }\n}',
      cpp: '// C++ template\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}',
      c: '// C template\n#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}'
    };

    const handleLanguageSelect = (languageId) => {
      setSelectedLanguages(prev => {
        const newSelected = new Set(prev);
        if (newSelected.has(languageId)) {
          newSelected.delete(languageId);
          if (languageId === currentLanguage && newSelected.size > 0) {
            setCurrentLanguage(Array.from(newSelected)[0]);
          } else if (newSelected.size === 0) {
            setCurrentLanguage('');
          }
        } else {
          newSelected.add(languageId);
          if (newSelected.size === 1) {
            setCurrentLanguage(languageId);
          }
        }
        return newSelected;
      });
    };

    const handleLanguageChange = (languageId) => {
      if (selectedLanguages.has(languageId)) {
        setCurrentLanguage(languageId);
      }
    };

    return (
      <div style={{ display: 'flex', gap: '24px', width: '700px' }}>
        <div style={{ width: '300px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
            Available Languages
          </h4>
          <LanguageList
            selectedLanguages={selectedLanguages}
            currentLanguage={currentLanguage}
            onLanguageSelect={handleLanguageSelect}
            onLanguageChange={handleLanguageChange}
          />
        </div>
        
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
            Code Template Preview
          </h4>
          {currentLanguage ? (
            <div>
              <div style={{ 
                marginBottom: '8px', 
                fontSize: '12px', 
                color: '#667085',
                fontWeight: '500'
              }}>
                Current: {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)}
              </div>
              <textarea
                value={codeTemplates[currentLanguage] || '// No template available'}
                readOnly
                rows={8}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                  fontSize: '12px',
                  border: '1px solid #d0d5dd',
                  borderRadius: '6px',
                  backgroundColor: '#f9fafb',
                  resize: 'none'
                }}
              />
            </div>
          ) : (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: '#667085',
              fontSize: '14px',
              border: '1px dashed #d0d5dd',
              borderRadius: '6px',
              backgroundColor: '#f9fafb'
            }}>
              Select a language to see the code template
            </div>
          )}
        </div>
      </div>
    );
  },
};