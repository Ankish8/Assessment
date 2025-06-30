import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QuestionDetails from './QuestionDetails';

// Mock the navigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('FillInTheBlanks QuestionDetails', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders without crashing', () => {
    renderWithRouter(<QuestionDetails />);
    expect(screen.getByText('Fill-in-the-Blanks Questions')).toBeInTheDocument();
  });

  test('displays correct progress step', () => {
    renderWithRouter(<QuestionDetails />);
    expect(screen.getByText('Question Details')).toBeInTheDocument();
  });

  test('shows fill-in-the-blanks specific difficulty descriptions', () => {
    renderWithRouter(<QuestionDetails />);
    expect(screen.getByText('Simple vocabulary and straightforward comprehension tasks')).toBeInTheDocument();
    expect(screen.getByText('Moderate vocabulary with contextual understanding required')).toBeInTheDocument();
    expect(screen.getByText('Complex text with advanced vocabulary and nuanced comprehension')).toBeInTheDocument();
  });

  test('includes reading comprehension skills', () => {
    renderWithRouter(<QuestionDetails />);
    expect(screen.getByText('Reading Comprehension')).toBeInTheDocument();
    expect(screen.getByText('Vocabulary')).toBeInTheDocument();
    expect(screen.getByText('Grammar')).toBeInTheDocument();
  });

  test('handles form validation correctly', () => {
    renderWithRouter(<QuestionDetails />);
    
    const saveButton = screen.getByText('Save & Continue');
    expect(saveButton).toBeDisabled();
    
    // Fill in marks
    const marksInput = screen.getByLabelText('Marks');
    fireEvent.change(marksInput, { target: { value: '10' } });
    
    // Select difficulty level
    const easyLevel = screen.getByText('Easy');
    fireEvent.click(easyLevel);
    
    // Select a skill
    const readingSkill = screen.getByText('Reading Comprehension');
    fireEvent.click(readingSkill);
    
    // Now the button should be enabled
    expect(saveButton).not.toBeDisabled();
  });

  test('navigates correctly on previous button click', () => {
    renderWithRouter(<QuestionDetails />);
    
    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/fill-in-the-blanks/media-resources');
  });

  test('shows correct section descriptions for fill-in-the-blanks context', () => {
    renderWithRouter(<QuestionDetails />);
    
    expect(screen.getByText('Set the basic parameters and difficulty for this fill-in-the-blanks question')).toBeInTheDocument();
    expect(screen.getByText('Tag this question with relevant comprehension and language skills')).toBeInTheDocument();
  });
});