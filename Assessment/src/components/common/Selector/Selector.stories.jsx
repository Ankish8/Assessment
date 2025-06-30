import { useState } from 'react';
import Selector from './Selector';

export default {
  title: 'Components/Selector',
  component: Selector,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
    },
    layout: {
      control: { type: 'select' },
      options: ['grid', 'list', 'inline'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    showSelectAll: {
      control: 'boolean',
    },
  },
};

// Helper component for stories
const SelectorExample = ({ variant = 'single', options, ...props }) => {
  const [selected, setSelected] = useState(variant === 'multiple' ? [] : null);
  
  return (
    <Selector
      variant={variant}
      options={options}
      selectedValue={variant === 'single' ? selected : undefined}
      selectedValues={variant === 'multiple' ? selected : undefined}
      onSelectionChange={setSelected}
      onSelectAll={variant === 'multiple' ? setSelected : undefined}
      {...props}
    />
  );
};

const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Intermediate' },
  { value: 'hard', label: 'Hard' }
];

const languageOptions = [
  { value: 'cpp', label: 'CPP' },
  { value: 'java', label: 'JAVA' },
  { value: 'python', label: 'PYTHON' },
  { value: 'javascript', label: 'JS' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'GO' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'RUBY' },
  { value: 'swift', label: 'SWIFT' },
  { value: 'kotlin', label: 'KOTLIN' },
  { value: 'scala', label: 'SCALA' }
];

const frameworkOptions = [
  { 
    value: 'react', 
    label: 'React',
    description: 'A JavaScript library for building user interfaces',
    badge: 'Popular'
  },
  { 
    value: 'vue', 
    label: 'Vue.js',
    description: 'The Progressive JavaScript Framework',
    badge: 'Growing'
  },
  { 
    value: 'angular', 
    label: 'Angular',
    description: 'Platform for building mobile and desktop web applications'
  },
  { 
    value: 'svelte', 
    label: 'Svelte',
    description: 'Cybernetically enhanced web apps',
    badge: 'New'
  }
];

export const DifficultySelector = {
  render: () => (
    <SelectorExample
      variant="single"
      options={difficultyOptions}
      label="Select Difficulty"
      helperText="Choose the appropriate difficulty level for this question"
    />
  ),
};

export const LanguageSelector = {
  render: () => (
    <SelectorExample
      variant="multiple"
      options={languageOptions}
      label="Select Languages"
      showSelectAll
      helperText="Choose the programming languages to support"
    />
  ),
};

export const FrameworkSelector = {
  render: () => (
    <SelectorExample
      variant="single"
      options={frameworkOptions}
      layout="list"
      label="Choose Framework"
      helperText="Select your preferred frontend framework"
    />
  ),
};

export const InlineLayout = {
  render: () => (
    <SelectorExample
      variant="multiple"
      options={[
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
        { value: 'expert', label: 'Expert' }
      ]}
      layout="inline"
      label="Skill Levels"
    />
  ),
};

export const WithIcons = {
  render: () => (
    <SelectorExample
      variant="single"
      options={[
        { 
          value: 'frontend', 
          label: 'Frontend',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3H14V13H2V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 6L7 8L5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 10H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        },
        { 
          value: 'backend', 
          label: 'Backend',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="3" width="10" height="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6H10M6 8H10M6 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        },
        { 
          value: 'fullstack', 
          label: 'Full Stack',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          )
        }
      ]}
      label="Development Focus"
    />
  ),
};

export const SmallSize = {
  render: () => (
    <SelectorExample
      variant="multiple"
      options={difficultyOptions}
      size="sm"
      label="Small Size Selector"
    />
  ),
};

export const LargeSize = {
  render: () => (
    <SelectorExample
      variant="single"
      options={frameworkOptions}
      size="lg"
      layout="list"
      label="Large Size Selector"
    />
  ),
};

export const DisabledState = {
  render: () => (
    <SelectorExample
      variant="multiple"
      options={languageOptions}
      disabled
      label="Disabled Selector"
      helperText="This selector is disabled"
    />
  ),
};

export const WithDisabledOptions = {
  render: () => (
    <SelectorExample
      variant="single"
      options={[
        { value: 'option1', label: 'Available Option' },
        { value: 'option2', label: 'Disabled Option', disabled: true },
        { value: 'option3', label: 'Another Available Option' },
        { value: 'option4', label: 'Also Disabled', disabled: true }
      ]}
      label="Mixed State Options"
      helperText="Some options are disabled"
    />
  ),
};

export const ComplexExample = {
  render: () => {
    const [selectedLanguages, setSelectedLanguages] = useState(['javascript', 'python']);
    const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '600px' }}>
        <Selector
          variant="single"
          options={difficultyOptions}
          selectedValue={selectedDifficulty}
          onSelectionChange={setSelectedDifficulty}
          label="Question Difficulty"
          helperText="Select the difficulty level for this coding challenge"
        />
        
        <Selector
          variant="multiple"
          options={languageOptions}
          selectedValues={selectedLanguages}
          onSelectionChange={setSelectedLanguages}
          onSelectAll={setSelectedLanguages}
          showSelectAll
          label="Supported Languages"
          helperText="Choose which programming languages candidates can use"
        />
        
        <div style={{ 
          padding: '16px', 
          backgroundColor: 'var(--color-background-secondary)', 
          borderRadius: 'var(--radius-md)',
          fontSize: '14px'
        }}>
          <strong>Selected:</strong>
          <br />
          Difficulty: {selectedDifficulty || 'None'}
          <br />
          Languages: {selectedLanguages.length > 0 ? selectedLanguages.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};