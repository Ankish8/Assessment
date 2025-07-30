import React, { useState } from 'react';
import VideoQuestions from './VideoQuestions';

export default {
  title: 'Pages/Video/VideoQuestions',
  component: VideoQuestions,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Video Assessment Questions

The redesigned Video Assessment Questions interface combines Management and Professional Questions 
into a unified, tab-based experience with enhanced UX features:

## Key Features
- **Unified Interface**: Combined Management & Professional Questions in tabbed layout
- **Inline Editing**: SubPart cards with inline editing (no modals)
- **Enhanced Skills Selection**: Modal with 25+ interpersonal skills, search, and bulk actions
- **Smart Time Management**: Real-time tracking with visual progress and recommendations
- **Drag & Drop**: Reorder sub parts within categories
- **Real-time Validation**: Detailed feedback with actionable messages

## UX Improvements
- Reduced from 6 to 5 steps (17% reduction)
- Eliminated modal context switching
- Smart time allocation warnings
- Progressive form validation
- Enhanced accessibility compliance

## Component Architecture
Uses existing Storybook components (CompactHeader, CompactProgressSteps, Tab, Card, Button, FloatingFooter)
plus new specialized components (SubPartCard, SkillsModal, TimeSummary).
        `,
      },
    },
  },
};

// Wrapper to handle React Router dependencies
const VideoQuestionsWrapper = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--color-background-secondary, #f8f6fa)' 
    }}>
      <VideoQuestions />
    </div>
  );
};

export const Default = {
  render: () => <VideoQuestionsWrapper />,
  name: 'Video Assessment Questions',
};

export const WithMockData = {
  render: () => {
    const [mockQuestions] = useState({
      managementSubParts: [
        {
          id: 1,
          title: "Leadership Assessment",
          description: "Evaluate candidate's leadership style and decision-making approach in challenging scenarios.",
          skills: ["Leadership", "Decision making", "Team building"],
          allocatedTime: 8,
          category: "management",
          isEditing: false
        },
        {
          id: 2, 
          title: "Conflict Resolution",
          description: "Assess ability to handle workplace conflicts and mediate between team members.",
          skills: ["Conflict resolution", "Communication", "Active listening"],
          allocatedTime: 6,
          category: "management",
          isEditing: false
        }
      ],
      professionalSubParts: [
        {
          id: 3,
          title: "Technical Problem Solving",
          description: "Evaluate analytical thinking and problem-solving methodology.",
          skills: ["Problem solving", "Critical thinking", "Analytical thinking"],
          allocatedTime: 10,
          category: "professional", 
          isEditing: false
        }
      ]
    });

    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--color-background-secondary, #f8f6fa)' 
      }}>
        <VideoQuestions initialData={mockQuestions} />
      </div>
    );
  },
  name: 'With Sample Data',
  parameters: {
    docs: {
      description: {
        story: 'Video Questions component pre-populated with sample Management and Professional question sub-parts to demonstrate the full interface capabilities.',
      },
    },
  },
};