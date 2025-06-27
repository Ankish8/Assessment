import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import FloatingFooter from '../../components/common/FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import { PROGRESS_STEPS, STEP_NUMBERS } from '../../constants/progressSteps';
import styles from './TestCases.module.css';
import '../../styles/utilities.css';

const TestCases = () => {
  const navigate = useNavigate();
  
  // State management
  const [testCases, setTestCases] = useState([]);
  const [showInitialState, setShowInitialState] = useState(true);
  const [verifyMode, setVerifyMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        // Your solution here
        System.out.println("Hello World!");
    }
}`);

  useEffect(() => {
    loadSavedState();
  }, []);

  const loadSavedState = () => {
    const saved = localStorage.getItem('testCasesData');
    if (saved) {
      const data = JSON.parse(saved);
      setTestCases(data.testCases || []);
      setShowInitialState(data.testCases?.length === 0);
    }
  };

  const saveState = () => {
    localStorage.setItem('testCasesData', JSON.stringify({ testCases }));
  };

  const startAddingTestCases = () => {
    setShowInitialState(false);
    addNewTestCase();
  };

  const addNewTestCase = () => {
    const newTestCase = {
      id: Date.now(),
      input: '',
      output: '',
      weightage: 10,
      isExpanded: true
    };
    setTestCases([...testCases, newTestCase]);
    setShowInitialState(false);
    saveState();
  };

  const updateTestCase = (id, field, value) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
    saveState();
  };

  const deleteTestCase = (id) => {
    const updatedTestCases = testCases.filter(tc => tc.id !== id);
    setTestCases(updatedTestCases);
    if (updatedTestCases.length === 0) {
      setShowInitialState(true);
    }
    saveState();
  };

  const toggleTestCase = (id) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, isExpanded: !tc.isExpanded } : tc
    ));
  };

  const toggleVerifyMode = () => {
    setVerifyMode(!verifyMode);
  };

  const goToPreviousSection = () => {
    navigate('/media-resources');
  };

  const saveAndContinue = () => {
    saveState();
    navigate('/default-codes');
  };

  return (
    <div className={`${styles.container} floating-footer-spacing`}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={goToPreviousSection}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
        </button>
        <h1 className={styles.headerTitle}>Compilable Question</h1>
      </div>

      {/* Progress Steps */}
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps steps={PROGRESS_STEPS} currentStep={STEP_NUMBERS.TEST_CASES} />
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Test Cases Section */}
        <div className={styles.testCasesSection}>
          <div className={styles.contentHeader}>
            <h2 className={styles.sectionTitle}>
              Add Test Cases
              <div className={styles.infoIcon}>?</div>
            </h2>
            <p className={styles.sectionDescription}>
              Create test cases manually or upload them in bulk using our supported format.
            </p>
            
            {/* Equalize Weightage */}
            <div className={styles.equalizeWeightage}>
              <div className={styles.checkbox}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.equalizeText}>Equalize Weightage</span>
              <span className={styles.totalWeightage}>Total Weightage 100%</span>
            </div>
          </div>

          <div className={styles.contentBody}>
            {/* Initial State */}
            {showInitialState && (
              <div className={styles.initialState}>
                <div className={styles.addNewSection}>
                  <div style={{marginBottom: '16px'}}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#98a2b3" strokeWidth="1" style={{margin: '0 auto 12px', display: 'block'}}>
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
                      <path d="M14 2V8H20"/>
                      <path d="M12 18V12M9 15H15"/>
                    </svg>
                    <h3 style={{fontSize: '16px', fontWeight: '600', color: '#101828', marginBottom: '4px'}}>
                      No test cases yet
                    </h3>
                    <p style={{fontSize: '14px', color: '#667085', marginBottom: '20px'}}>
                      Start building your test suite by creating your first test case
                    </p>
                  </div>
                  <button className={styles.addNewBtn} onClick={startAddingTestCases}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Create First Test Case
                  </button>
                  <p className={styles.addNewDescription}>
                    Use our intuitive form builder or upload bulk test cases
                  </p>
                </div>

                <div className={styles.dividerSection}>
                  <hr className={styles.dividerLine} />
                  <span className={styles.dividerText}>or</span>
                </div>

                <div className={styles.uploadSection}>
                  <div className={styles.uploadArea}>
                    <div className={styles.uploadIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
                        <path d="M14 2V8H20"/>
                        <path d="M16 13L12 17L8 13"/>
                        <path d="M12 12V17"/>
                      </svg>
                    </div>
                    <h3 className={styles.uploadTitle}>Click to upload</h3>
                    <p className={styles.uploadSubtitle}>or drag and drop test case files</p>
                    <button className={styles.uploadBtn}>Browse files</button>
                  </div>

                  <div className={styles.formatInfo}>
                    <div className={styles.formatHeader}>
                      <span className={styles.formatTitle}>Supported format</span>
                      <button className={styles.formatDetailsBtn}>View detailed format</button>
                    </div>
                    <div className={styles.formatExample}>
                      Input<br/>
                      -----mapit-----<br/>
                      Output<br/>
                      -----Endmapit-----
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Test Case State */}
            {!showInitialState && (
              <div className={styles.testCaseState}>
                <div className={styles.testCaseContainer}>
                  {testCases.map((testCase, index) => (
                    <div key={testCase.id} className={styles.testCaseItem}>
                      <div className={styles.testCaseHeader}>
                        <div className={styles.testCaseTitle}>
                          <span className={styles.testCaseNumber}>#{index + 1}</span>
                          Test Case {index + 1}
                        </div>
                        <div className={styles.testCaseActions}>
                          <button 
                            className={styles.expandBtn}
                            onClick={() => toggleTestCase(testCase.id)}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                              <path d={testCase.isExpanded ? "M12 6L8 10L4 6" : "M6 4L10 8L6 12"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button 
                            className={styles.deleteBtn}
                            onClick={() => deleteTestCase(testCase.id)}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {testCase.isExpanded && (
                        <div className={styles.testCaseForm}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Input</label>
                            <textarea
                              className={styles.formTextarea}
                              value={testCase.input}
                              onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                              placeholder="Enter test input..."
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Expected Output</label>
                            <textarea
                              className={styles.formTextarea}
                              value={testCase.output}
                              onChange={(e) => updateTestCase(testCase.id, 'output', e.target.value)}
                              placeholder="Enter expected output..."
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Weightage (%)</label>
                            <input
                              type="number"
                              className={styles.formInput}
                              value={testCase.weightage}
                              onChange={(e) => updateTestCase(testCase.id, 'weightage', parseInt(e.target.value))}
                              min="1"
                              max="100"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.testCaseActions}>
                  <button className={styles.addNewBtnTwo} onClick={addNewTestCase}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Add New
                  </button>
                  
                  <div className={styles.uploadDropzone}>
                    <div className={styles.uploadIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </div>
                    <div>
                      <span style={{color: '#667085'}}>Upload test case files (</span>
                      <button className={styles.formatLink}>see format</button>
                      <span style={{color: '#667085'}}>)</span>
                    </div>
                  </div>
                </div>

                {/* Verify Test Cases */}
                <div className={styles.verifySection}>
                  <div 
                    className={`${styles.verifyCheckbox} ${verifyMode ? styles.checked : ''}`}
                    onClick={toggleVerifyMode}
                  />
                  <label className={styles.verifyLabel} onClick={toggleVerifyMode}>
                    Verify Test Cases
                  </label>
                </div>

                {/* Code Editor */}
                {verifyMode && (
                  <div className={styles.codeEditorSection}>
                    <div className={styles.editorHeader}>
                      <div className={styles.editorControls}>
                        <label className={styles.formLabel}>Language</label>
                        <select 
                          className={styles.languageSelector}
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value)}
                        >
                          <option value="java">JAVA (1.8)</option>
                          <option value="python">Python 3.9</option>
                          <option value="cpp">C++</option>
                          <option value="javascript">Node.js</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.editorNote}>
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
                      </svg>
                      <span>For JAVA (1.8), the class name needs to be <strong>Main</strong>. Ensure proper syntax and imports.</span>
                    </div>

                    <div className={styles.codeEditorContainer}>
                      <div className={styles.editorToolbar}>
                        <div className={styles.editorTab}>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                          </svg>
                          <span>Solution.java</span>
                        </div>
                      </div>

                      <textarea
                        className={styles.codeEditor}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your solution here..."
                      />
                    </div>

                    <div className={styles.compileSection}>
                      <button className={styles.compileBtn}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                        </svg>
                        Compile & Run
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <FloatingFooter>
        <Button variant="ghost" onClick={goToPreviousSection}>
          Previous
        </Button>
        <Button variant="primary" onClick={saveAndContinue}>
          Save & Continue
        </Button>
      </FloatingFooter>
    </div>
  );
};

export default TestCases;