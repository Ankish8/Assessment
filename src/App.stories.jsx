import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestCases from './pages/TestCases/TestCases';
import QuestionDetails from './pages/QuestionDetails/QuestionDetails';
import DefaultCodes from './pages/DefaultCodes/DefaultCodes';

// Mock components for routes that aren't implemented yet
const MockQuestionStatement = () => (
  <div style={{ padding: '40px', textAlign: 'center', background: '#f9fafb', minHeight: '100vh' }}>
    <h1>Question Statement</h1>
    <p>This page would contain the question statement form.</p>
  </div>
);

const MockSolutionDetails = () => (
  <div style={{ padding: '40px', textAlign: 'center', background: '#f9fafb', minHeight: '100vh' }}>
    <h1>Solution Details</h1>
    <p>This page would contain the solution details form.</p>
  </div>
);

const AppWrapper = () => (
  <BrowserRouter>
    <div style={{ 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      backgroundColor: '#f8f6fa',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      <Routes>
        <Route path="/" element={<TestCases />} />
        <Route path="/question-statement" element={<MockQuestionStatement />} />
        <Route path="/test-cases" element={<TestCases />} />
        <Route path="/default-codes" element={<DefaultCodes />} />
        <Route path="/question-details" element={<QuestionDetails />} />
        <Route path="/solution-details" element={<MockSolutionDetails />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default {
  title: 'Application/Full App',
  component: AppWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete application showing the React conversion of the original HTML-based question creation tool.',
      },
    },
  },
};

export const TestCasesPage = {
  name: 'Test Cases Page',
  parameters: {
    docs: {
      description: {
        story: 'The main Test Cases page showing the "Add Test Cases" interface with upload functionality.',
      },
    },
  },
};

export const DefaultCodesPage = {
  name: 'Default Codes Page',
  render: () => (
    <BrowserRouter>
      <div style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        backgroundColor: '#f8f6fa',
        minHeight: '100vh',
        margin: 0,
        padding: 0
      }}>
        <DefaultCodes />
      </div>
    </BrowserRouter>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The Default Codes page for setting up programming language templates.',
      },
    },
  },
};

export const QuestionDetailsPage = {
  name: 'Question Details Page',
  render: () => (
    <BrowserRouter>
      <div style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        backgroundColor: '#f8f6fa',
        minHeight: '100vh',
        margin: 0,
        padding: 0
      }}>
        <QuestionDetails />
      </div>
    </BrowserRouter>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The Question Details page for configuring question metadata and settings.',
      },
    },
  },
};