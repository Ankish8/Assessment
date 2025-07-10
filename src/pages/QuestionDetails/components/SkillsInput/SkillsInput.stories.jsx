import { useState } from 'react';
import SkillsInput from './SkillsInput';

export default {
  title: 'Components/SkillsInput',
  component: SkillsInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selectedSkills: {
      control: 'object',
    },
    onOpenModal: {
      action: 'open modal',
    },
    onRemoveSkill: {
      action: 'remove skill',
    },
  },
};

// Helper component for interactive examples
const SkillsInputExample = ({ initialSkills = [], ...props }) => {
  const [selectedSkills, setSelectedSkills] = useState(initialSkills);

  const handleOpenModal = () => {
    console.log('Opening skills modal...');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  return (
    <div style={{ width: '400px' }}>
      <SkillsInput
        selectedSkills={selectedSkills}
        onOpenModal={handleOpenModal}
        onRemoveSkill={handleRemoveSkill}
        {...props}
      />
    </div>
  );
};

export const Empty = {
  render: () => <SkillsInputExample />,
};

export const WithSingleSkill = {
  render: () => (
    <SkillsInputExample
      initialSkills={['JavaScript']}
    />
  ),
};

export const WithMultipleSkills = {
  render: () => (
    <SkillsInputExample
      initialSkills={['JavaScript', 'React', 'Node.js', 'TypeScript']}
    />
  ),
};

export const WithManySkills = {
  render: () => (
    <SkillsInputExample
      initialSkills={[
        'JavaScript',
        'React',
        'Node.js',
        'TypeScript',
        'Python',
        'Django',
        'PostgreSQL',
        'Redis',
        'Docker',
        'AWS',
        'GraphQL',
        'MongoDB'
      ]}
    />
  ),
};

export const ProgrammingSkills = {
  render: () => (
    <SkillsInputExample
      initialSkills={[
        'Data Structures',
        'Algorithms',
        'System Design',
        'Database Design',
        'API Development'
      ]}
    />
  ),
};

export const InteractiveExample = {
  render: () => {
    const [selectedSkills, setSelectedSkills] = useState(['React', 'JavaScript']);
    const [availableSkills] = useState([
      'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular',
      'Node.js', 'Express.js', 'Python', 'Django', 'Flask',
      'Java', 'Spring Boot', 'C++', 'C#', '.NET',
      'PHP', 'Laravel', 'Ruby', 'Ruby on Rails',
      'Go', 'Rust', 'Swift', 'Kotlin',
      'HTML', 'CSS', 'SASS', 'Tailwind CSS',
      'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
      'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
      'Git', 'CI/CD', 'Jest', 'Cypress', 'Selenium'
    ]);

    const handleOpenModal = () => {
      // Simulate opening a modal by showing a simple prompt
      const newSkill = prompt('Enter a skill:', '');
      if (newSkill && !selectedSkills.includes(newSkill)) {
        setSelectedSkills(prev => [...prev, newSkill]);
      }
    };

    const handleRemoveSkill = (skillToRemove) => {
      setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
    };

    const addRandomSkill = () => {
      const unselectedSkills = availableSkills.filter(skill => !selectedSkills.includes(skill));
      if (unselectedSkills.length > 0) {
        const randomSkill = unselectedSkills[Math.floor(Math.random() * unselectedSkills.length)];
        setSelectedSkills(prev => [...prev, randomSkill]);
      }
    };

    const clearAllSkills = () => {
      setSelectedSkills([]);
    };

    return (
      <div style={{ width: '500px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Required Skills</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#667085' }}>
            Select the skills required for this position
          </p>
        </div>
        
        <SkillsInput
          selectedSkills={selectedSkills}
          onOpenModal={handleOpenModal}
          onRemoveSkill={handleRemoveSkill}
        />
        
        <div style={{ 
          marginTop: '16px', 
          display: 'flex', 
          gap: '8px', 
          flexWrap: 'wrap' 
        }}>
          <button
            onClick={addRandomSkill}
            style={{
              padding: '6px 12px',
              backgroundColor: '#f9fafb',
              border: '1px solid #d0d5dd',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Add Random Skill
          </button>
          <button
            onClick={clearAllSkills}
            style={{
              padding: '6px 12px',
              backgroundColor: '#fef3f2',
              border: '1px solid #fecdca',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              color: '#b42318'
            }}
          >
            Clear All
          </button>
        </div>
        
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f9fafb',
          borderRadius: '6px',
          fontSize: '12px'
        }}>
          <strong>Selected Skills:</strong> {selectedSkills.length > 0 ? selectedSkills.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};

export const FormExample = {
  render: () => {
    const [jobTitle, setJobTitle] = useState('Frontend Developer');
    const [selectedSkills, setSelectedSkills] = useState(['React', 'JavaScript', 'CSS']);

    const handleOpenModal = () => {
      const newSkill = prompt('Enter a required skill:', '');
      if (newSkill && !selectedSkills.includes(newSkill)) {
        setSelectedSkills(prev => [...prev, newSkill]);
      }
    };

    const handleRemoveSkill = (skillToRemove) => {
      setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
    };

    return (
      <div style={{ width: '500px' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
              Job Title
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d0d5dd',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
              Required Skills
            </label>
            <SkillsInput
              selectedSkills={selectedSkills}
              onOpenModal={handleOpenModal}
              onRemoveSkill={handleRemoveSkill}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
              Job Description
            </label>
            <textarea
              placeholder="Enter job description..."
              rows={4}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d0d5dd',
                borderRadius: '6px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>
          
          <button
            type="submit"
            style={{
              padding: '10px 16px',
              backgroundColor: '#7f56d9',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Post Job
          </button>
        </form>
      </div>
    );
  },
};