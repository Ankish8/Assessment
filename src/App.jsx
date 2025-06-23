import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import QuestionTypeSelector from './components/QuestionTypeSelector/QuestionTypeSelector';
import QuestionDetails from './pages/QuestionDetails/QuestionDetails';
import DefaultCodes from './pages/DefaultCodes/DefaultCodes';
import TestCases from './pages/TestCases/TestCases';
import SubmissionQuestions from './pages/SubmissionQuestions/SubmissionQuestions';
import MediaResources from './pages/MediaResources/MediaResources';
import SubmissionQuestionDetails from './pages/SubmissionQuestionDetails/SubmissionQuestionDetails';
import EvaluationParameters from './pages/EvaluationParameters/EvaluationParameters';
import SolutionDetails from './pages/SolutionDetails/SolutionDetails';
import MultipleChoiceQuestion from './pages/MultipleChoiceQuestion/MultipleChoiceQuestion';
import FillInTheBlanks from './pages/FillInTheBlanks/FillInTheBlanks';
import PremiumModalDemo from './pages/PremiumModalDemo/PremiumModalDemo';
import './styles/variables.css';
import './index.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<QuestionTypeSelector />} />
        <Route path="/question-type-selector" element={<QuestionTypeSelector />} />
        <Route path="/question-details" element={<QuestionDetails />} />
        <Route path="/default-codes" element={<DefaultCodes />} />
        <Route path="/test-cases" element={<TestCases />} />
        <Route path="/submission-questions" element={<SubmissionQuestions />} />
        <Route path="/media-resources" element={<MediaResources />} />
        <Route path="/submission-question-details" element={<SubmissionQuestionDetails />} />
        <Route path="/evaluation-parameters" element={<EvaluationParameters />} />
        <Route path="/solution-details" element={<SolutionDetails />} />
        <Route path="/multiple-choice" element={<MultipleChoiceQuestion />} />
        <Route path="/fill-in-the-blanks" element={<FillInTheBlanks />} />
        <Route path="/premium-modal-demo" element={<PremiumModalDemo />} />
      </Routes>
    </div>
  );
}

export default App;