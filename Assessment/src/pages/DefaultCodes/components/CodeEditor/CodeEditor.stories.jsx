import { useState } from 'react';
import CodeEditor from './CodeEditor';

export default {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    language: {
      control: { type: 'select' },
      options: ['java', 'javascript', 'python', 'cpp', 'c', 'ruby', 'php', 'python3', 'scala', 'kotlin'],
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    savedBadgeVisible: {
      control: 'boolean',
    },
  },
};

// Helper component for interactive examples
const CodeEditorExample = ({ 
  initialCode, 
  language = 'javascript', 
  theme: initialTheme = 'light',
  ...props 
}) => {
  const [code, setCode] = useState(initialCode || '// Write your code here\nconsole.log("Hello, World!");');
  const [theme, setTheme] = useState(initialTheme);
  const [savedBadgeVisible, setSavedBadgeVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    console.log('Code copied to clipboard');
  };

  const handleFormat = () => {
    // Simple formatting example
    const formatted = code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n    ');
    setCode(formatted);
    console.log('Code formatted');
  };

  const handleReset = () => {
    setCode(initialCode || '// Write your code here\nconsole.log("Hello, World!");');
    console.log('Code reset');
  };

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    // Show saved badge temporarily
    setSavedBadgeVisible(true);
    setTimeout(() => setSavedBadgeVisible(false), 2000);
  };

  return (
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <CodeEditor
        language={language}
        code={code}
        theme={theme}
        savedBadgeVisible={savedBadgeVisible}
        onCodeChange={handleCodeChange}
        onThemeToggle={handleThemeToggle}
        onCopy={handleCopy}
        onFormat={handleFormat}
        onReset={handleReset}
        {...props}
      />
    </div>
  );
};

export const JavaScriptEditor = {
  render: () => (
    <CodeEditorExample
      language="javascript"
      initialCode={`function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`}
    />
  ),
};

export const PythonEditor = {
  render: () => (
    <CodeEditorExample
      language="python"
      initialCode={`def two_sum(nums, target):
    """
    Find two numbers that add up to target
    """
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []`}
    />
  ),
};

export const JavaEditor = {
  render: () => (
    <CodeEditorExample
      language="java"
      initialCode={`public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            
            map.put(nums[i], i);
        }
        
        return new int[]{};
    }
}`}
    />
  ),
};

export const CppEditor = {
  render: () => (
    <CodeEditorExample
      language="cpp"
      initialCode={`#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            
            map[nums[i]] = i;
        }
        
        return {};
    }
};`}
    />
  ),
};

export const DarkTheme = {
  render: () => (
    <CodeEditorExample
      language="javascript"
      theme="dark"
      initialCode={`// Dark theme example
const darkModeFeatures = {
    reducedEyeStrain: true,
    betterFocus: true,
    modernLook: true
};

function enableDarkMode() {
    document.body.classList.add('dark-theme');
    console.log('Dark mode enabled!');
}`}
    />
  ),
};

export const EmptyEditor = {
  render: () => (
    <CodeEditorExample
      language="javascript"
      initialCode=""
    />
  ),
};

export const WithSavedBadge = {
  render: () => {
    const [code, setCode] = useState('console.log("This code is saved!");');
    
    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <CodeEditor
          language="javascript"
          code={code}
          theme="light"
          savedBadgeVisible={true}
          onCodeChange={setCode}
          onThemeToggle={() => {}}
          onCopy={() => console.log('Copied')}
          onFormat={() => console.log('Formatted')}
          onReset={() => setCode('console.log("This code is saved!");')}
        />
      </div>
    );
  },
};

export const MultipleLanguages = {
  render: () => {
    const codeExamples = {
      javascript: 'console.log("Hello from JavaScript!");',
      python: 'print("Hello from Python!")',
      java: 'System.out.println("Hello from Java!");',
      cpp: '#include <iostream>\nstd::cout << "Hello from C++!" << std::endl;',
      c: '#include <stdio.h>\nprintf("Hello from C!");'
    };

    const [selectedLanguage, setSelectedLanguage] = useState('javascript');

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ marginRight: '8px', fontWeight: '500' }}>Language:</label>
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{ 
              padding: '4px 8px', 
              borderRadius: '4px', 
              border: '1px solid #d0d5dd' 
            }}
          >
            {Object.keys(codeExamples).map(lang => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <CodeEditorExample
          language={selectedLanguage}
          initialCode={codeExamples[selectedLanguage]}
          key={selectedLanguage} // Force re-render when language changes
        />
      </div>
    );
  },
};