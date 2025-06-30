import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TestCases from './TestCases';

export default {
  title: 'Pages/TestCases',
  component: TestCases,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ 
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          backgroundColor: '#f8f6fa',
          minHeight: '100vh',
          margin: 0,
          padding: 0
        }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Test Cases page for creating and managing test cases for coding questions. Features drag-and-drop upload, manual creation, and code verification.'
      }
    }
  },
};

// Mock localStorage for different states
const mockInitialState = () => {
  localStorage.removeItem('testCasesData');
};

const mockWithTestCases = () => {
  const testCasesData = {
    testCases: [
      {
        id: 1,
        input: '5 3\n1 2 3 4 5',
        output: '4',
        weightage: 25,
        isExpanded: true
      },
      {
        id: 2,
        input: '7 2\n10 20 30 40 50 60 70',
        output: '50',
        weightage: 25,
        isExpanded: false
      },
      {
        id: 3,
        input: '3 1\n100 200 300',
        output: '200',
        weightage: 25,
        isExpanded: false
      },
      {
        id: 4,
        input: '1 0\n42',
        output: '42',
        weightage: 25,
        isExpanded: false
      }
    ]
  };
  localStorage.setItem('testCasesData', JSON.stringify(testCasesData));
};

// Default state showing the initial "No test cases yet" interface
export const InitialState = {
  name: 'Initial State - Empty',
  parameters: {
    docs: {
      description: {
        story: 'Initial state when no test cases have been created yet. Shows empty state with options to create first test case or upload bulk test cases.'
      }
    }
  },
  play: async () => {
    mockInitialState();
    // Force component refresh by triggering a storage event
    window.dispatchEvent(new Event('storage'));
  }
};

export const WithTestCases = {
  name: 'With Test Cases',
  parameters: {
    docs: {
      description: {
        story: 'Page showing multiple test cases with different states - one expanded showing the form fields, others collapsed. Includes the "Add New" button and verify test cases option.'
      }
    }
  },
  play: async () => {
    mockWithTestCases();
    // Force component refresh
    window.dispatchEvent(new Event('storage'));
  }
};

export const VerifyMode = {
  name: 'Verify Mode Active', 
  parameters: {
    docs: {
      description: {
        story: 'Shows the page with test cases and the verify mode enabled, displaying the code editor for testing the solution against the created test cases.'
      }
    }
  },
  play: async () => {
    mockWithTestCases();
    window.dispatchEvent(new Event('storage'));
    // Note: In a real scenario, you'd need to simulate clicking the verify checkbox
    // This story shows the structure but won't automatically enable verify mode
  }
};