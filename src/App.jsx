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
import FillInTheBlanksMediaResources from './pages/FillInTheBlanks/MediaResources/MediaResources';
import FillInTheBlanksQuestionDetails from './pages/FillInTheBlanks/FillInTheBlanksQuestionDetails';
import FillInTheBlanksEvaluationParameters from './pages/FillInTheBlanks/FillInTheBlanksEvaluationParameters';
import UIFrameworkQuestionStatement from './pages/UIFramework/UIFrameworkQuestionStatement';
import UIFrameworkMediaResources from './pages/UIFramework/UIFrameworkMediaResources';
import UIFrameworkQuestionDetails from './pages/UIFramework/UIFrameworkQuestionDetails';
import UIFrameworkDefaultCode from './pages/UIFramework/UIFrameworkDefaultCode';
import UIFrameworkEvaluationParameters from './pages/UIFramework/UIFrameworkEvaluationParameters';
import PremiumModalDemo from './pages/PremiumModalDemo/PremiumModalDemo';
import SpeakingQuestionStatement from './pages/Speaking/SpeakingQuestionStatement';
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
        <Route path="/fill-in-the-blanks/media-resources" element={<FillInTheBlanksMediaResources />} />
        <Route path="/fill-in-the-blanks/question-details" element={<FillInTheBlanksQuestionDetails />} />
        <Route path="/fill-in-the-blanks/evaluation-parameters" element={<FillInTheBlanksEvaluationParameters />} />
        <Route path="/ui-framework" element={<UIFrameworkQuestionStatement />} />
        <Route path="/ui-framework/media-resources" element={<UIFrameworkMediaResources />} />
        <Route path="/ui-framework/question-details" element={<UIFrameworkQuestionDetails />} />
        <Route path="/ui-framework/default-code" element={<UIFrameworkDefaultCode />} />
        <Route path="/ui-framework/evaluation-parameters" element={<UIFrameworkEvaluationParameters />} />
        <Route path="/speaking/question-statement" element={<SpeakingQuestionStatement />} />
        <Route path="/premium-modal-demo" element={<PremiumModalDemo />} />
      </Routes>
    </div>
  );
}

export default App;