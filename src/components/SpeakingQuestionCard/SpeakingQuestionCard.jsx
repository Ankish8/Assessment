import React, { useState } from 'react';
import styles from './SpeakingQuestionCard.module.css';

const SpeakingQuestionCard = ({ questionData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [analysisMode, setAnalysisMode] = useState('none'); // 'none', 'confidence', 'sentiment'
  const [expandedSections, setExpandedSections] = useState({
    assessment: true,
    analysis: true
  });
  // Set initial active tab based on available data
  const getInitialActiveTab = () => {
    if (questionData.grammar_issues && questionData.grammar_issues.length > 0) return 'grammar';
    if (questionData.vocabulary_issues && questionData.vocabulary_issues.length > 0) return 'vocabulary';
    return 'grammar'; // fallback
  };
  
  const [activeAnalysisTab, setActiveAnalysisTab] = useState(getInitialActiveTab()); // 'grammar', 'vocabulary'

  // Transform real API data to component format
  const transformedData = {
    // Use provided data or fallback to defaults
    id: questionData.id || 1,
    type: questionData.type || "Speaking Assessment",
    score: questionData.correctness_score || questionData.score || 0,
    maxScore: 5,
    timeSpent: questionData.timeSpent || 0,
    totalTimeOutside: questionData.totalTimeOutside || 0,
    moveCount: questionData.moveCount || 0,
    confidence: questionData.confidence || { level: "MODERATE", percentage: 50 },
    
    audio: {
      url: questionData.audio?.url || null,
      duration: questionData.audio?.duration || 0,
      transcript: questionData.corrected_text || questionData.audio?.transcript || "",
      transcriptWords: questionData.audio?.transcriptWords || []
    },
    
    analysis: {
      fluency: {
        score: questionData.analysis?.fluency?.score || 0,
        maxScore: 5,
        details: questionData.grammar_issues?.map(issue => 
          `${issue.issue} - Suggestion: ${issue.suggestion}`) || 
          questionData.analysis?.fluency?.details || []
      },
      lexical: {
        score: questionData.vocabulary_score || questionData.analysis?.lexical?.score || 0,
        maxScore: 5,
        details: questionData.vocabulary_issues?.map(issue => 
          `Word: "${issue.word}" - ${issue.issue} - Suggestion: ${issue.suggestion}`) || 
          questionData.analysis?.lexical?.details || []
      },
      grammar: {
        score: questionData.grammar_score || questionData.analysis?.grammar?.score || 0,
        maxScore: 5,
        details: questionData.grammar_issues?.map(issue => 
          `"${issue.original}" - ${issue.issue} - Suggestion: "${issue.suggestion}"`) || 
          questionData.analysis?.grammar?.details || []
      },
      sentiment: questionData.analysis?.sentiment || "NEUTRAL"
    },
    
    evaluatorComments: questionData.ai_feedback_summary || questionData.correctness_feedback || questionData.evaluatorComments || null
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAnalysisModeChange = (mode) => {
    setAnalysisMode(mode === analysisMode ? 'none' : mode);
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment === 'positive') return 'positive';
    if (sentiment === 'negative') return 'negative';
    return 'neutral';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) return 'success';
    if (percentage >= 40) return 'warning';
    return 'error';
  };

  const getConfidenceColor = (percentage) => {
    if (percentage >= 70) return 'success';
    if (percentage >= 40) return 'warning';
    return 'error';
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.questionInfo}>
          <h3>Question {transformedData.id}: {transformedData.type}</h3>
        </div>
        <div className={styles.scoreInfo}>
          <div className={`${styles.scoreCard} ${styles[getScoreColor(questionData.correctness_score || transformedData.score, 10)]}`}>
            <i className="fas fa-chart-bar"></i>
            <div className={styles.scoreDetails}>
              <span className={styles.scoreLabel}>Score:</span>
              <span className={styles.scoreValue}>{questionData.correctness_score || transformedData.score}/10</span>
            </div>
          </div>
          <div className={styles.timeCard}>
            <i className="fas fa-clock"></i>
            <span>Time spent: {transformedData.timeSpent} secs</span>
          </div>
        </div>
      </div>


      {/* Audio Section */}
      <div className={styles.section}>
        <div className={styles.audioSectionHeader}>
          <h4>Audio Submitted</h4>
          <div className={styles.activityStats}>
            <div className={styles.statItem}>
              <i className="fas fa-external-link-alt"></i>
              <span>Tab switches: {transformedData.totalTimeOutside}s</span>
            </div>
            <div className={styles.statItem}>
              <i className="fas fa-mouse-pointer"></i>
              <span>Focus changes: {transformedData.moveCount}</span>
            </div>
          </div>
        </div>
        <div className={styles.audioPlayer}>
          <button onClick={handlePlayPause} className={styles.playButton}>
            <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
          </button>
          
          <div className={styles.waveform}>
            {Array.from({ length: 150 }, (_, i) => {
              const heights = [40, 60, 30, 75, 45, 80, 35, 65, 50, 85, 25, 70, 55, 40, 90, 30, 75, 60, 45, 80, 35, 70, 50, 85, 40, 65, 55, 75, 30, 80];
              const height = heights[i % heights.length];
              return (
                <div 
                  key={i} 
                  className={`${styles.waveformBar} ${isPlaying ? styles.animating : ''}`}
                  style={{
                    height: `${Math.max(height, 20)}%`,
                    animationDelay: `${i * 0.01}s`
                  }}
                ></div>
              );
            })}
          </div>
          
          <div className={styles.audioTimerInfo}>
            <span className={styles.duration}>
              {formatTime(transformedData.audio.duration)}
            </span>
            {isPlaying && (
              <span className={styles.status}>Playing...</span>
            )}
          </div>
        </div>

        <div className={styles.transcriptSection}>
          <div className={styles.transcriptHeader}>
            <span className={styles.transcriptLabel}>Transcript:</span>
            <div className={styles.analysisControls}>
              <button 
                className={`${styles.analysisButton} ${analysisMode === 'confidence' ? styles.active : ''}`}
                onClick={() => handleAnalysisModeChange('confidence')}
              >
                <i className="fas fa-signal"></i>
                Confidence
              </button>
              <button 
                className={`${styles.analysisButton} ${analysisMode === 'sentiment' ? styles.active : ''}`}
                onClick={() => handleAnalysisModeChange('sentiment')}
              >
                <i className="fas fa-smile"></i>
                Sentiment
              </button>
            </div>
          </div>
          
          {analysisMode === 'confidence' && (
            <div className={styles.confidenceLegend}>
              <span className={styles.legendTitle}>Confidence Levels:</span>
              <div className={styles.legendItems}>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.success}`}></span>
                  High (70%+)
                </span>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.warning}`}></span>
                  Medium (40-70%)
                </span>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.error}`}></span>
                  Low (&lt;40%)
                </span>
              </div>
            </div>
          )}

          {analysisMode === 'sentiment' && (
            <div className={styles.sentimentLegend}>
              <span className={styles.legendTitle}>Sentiment Analysis:</span>
              <div className={styles.legendItems}>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.positive}`}></span>
                  Positive statement
                </span>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.neutral}`}></span>
                  Neutral statement
                </span>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.negative}`}></span>
                  Negative statement
                </span>
              </div>
            </div>
          )}
          
          <div className={styles.transcriptText}>
            {analysisMode === 'confidence' && transformedData.audio.transcriptWords ? (
              transformedData.audio.transcriptWords.map((item, index) => (
                <span 
                  key={index}
                  className={`${styles.confidenceWord} ${styles[getConfidenceColor(item.confidence * 100)]}`}
                  title={`${Math.round(item.confidence * 100)}% confidence`}
                >
                  {item.word}{index < transformedData.audio.transcriptWords.length - 1 ? ' ' : ''}
                </span>
              ))
            ) : analysisMode === 'sentiment' && transformedData.audio.transcriptWords ? (
              transformedData.audio.transcriptWords.map((item, index) => (
                <span 
                  key={index}
                  className={`${styles.sentimentWord} ${styles[getSentimentColor(item.sentiment)]}`}
                  title={`${item.sentiment} sentiment`}
                >
                  {item.word}{index < transformedData.audio.transcriptWords.length - 1 ? ' ' : ''}
                </span>
              ))
            ) : (
              transformedData.audio.transcript
            )}
          </div>
        </div>
      </div>

      {/* AI Feedback - Always visible */}
      {questionData.correctness_feedback && (
        <div className={styles.section}>
          <h4>AI Feedback</h4>
          <div className={styles.feedbackCard}>
            <p>{questionData.correctness_feedback}</p>
          </div>
        </div>
      )}

      {/* Corrected Text - Immediately after feedback */}
      {questionData.corrected_text && (
        <div className={styles.section}>
          <h4>Corrected Text</h4>
          <div className={styles.correctedTextCard}>
            <p>"{questionData.corrected_text}"</p>
          </div>
        </div>
      )}

      {/* Score Breakdown - Collapsible */}
      <div className={styles.collapsibleSection}>
        <button 
          className={styles.collapsibleHeader}
          onClick={() => toggleSection('assessment')}
        >
          <div className={styles.headerContent}>
            <i className="fas fa-chart-bar"></i>
            <span>Score Breakdown</span>
          </div>
          <i className={`fas ${expandedSections.assessment ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </button>
        
        {expandedSections.assessment && (
          <div className={styles.collapsibleContent}>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <span className={styles.summaryLabel}>Grammar Score:</span>
                <span className={`${styles.summaryValue} ${styles[getScoreColor(questionData.grammar_score || 0, 10)]}`}>
                  {questionData.grammar_score || 0}/10
                </span>
              </div>
              <div className={styles.summaryCard}>
                <span className={styles.summaryLabel}>Vocabulary Score:</span>
                <span className={`${styles.summaryValue} ${styles[getScoreColor(questionData.vocabulary_score || 0, 10)]}`}>
                  {questionData.vocabulary_score || 0}/10
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Issues Analysis - Collapsible with Tabs */}
      {/* Always show if any of the two issue types exist in the data */}
      {(questionData.grammar_issues !== undefined || questionData.vocabulary_issues !== undefined) && (
        <div className={styles.collapsibleSection}>
          <button 
            className={styles.collapsibleHeader}
            onClick={() => toggleSection('analysis')}
          >
            <div className={styles.headerContent}>
              <i className="fas fa-microscope"></i>
              <span>Issues Analysis</span>
              <span className={styles.badge}>
                {(questionData.grammar_issues?.length || 0) + (questionData.vocabulary_issues?.length || 0)} issues
              </span>
            </div>
            <i className={`fas ${expandedSections.analysis ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          
          {expandedSections.analysis && (
            <div className={styles.collapsibleContent}>
              <div className={styles.analysisTabContainer}>
                <div className={styles.analysisTabNav}>
                  <button
                    className={`${styles.analysisTabButton} ${activeAnalysisTab === 'grammar' ? styles.active : ''}`}
                    onClick={() => setActiveAnalysisTab('grammar')}
                  >
                    <i className="fas fa-spell-check"></i>
                    Grammar ({questionData.grammar_issues?.length || 0})
                  </button>
                  <button
                    className={`${styles.analysisTabButton} ${activeAnalysisTab === 'vocabulary' ? styles.active : ''}`}
                    onClick={() => setActiveAnalysisTab('vocabulary')}
                  >
                    <i className="fas fa-book"></i>
                    Vocabulary ({questionData.vocabulary_issues?.length || 0})
                  </button>
                </div>
                
                <div className={styles.analysisTabContent}>
                  {activeAnalysisTab === 'grammar' && (
                    <div className={styles.issuesContainer}>
                      {questionData.grammar_issues?.length > 0 ? (
                        questionData.grammar_issues.map((issue, index) => (
                          <div key={`grammar-${index}`} className={styles.issueCard}>
                            <div className={styles.issueType}>Grammar Issue</div>
                            <div className={styles.issueOriginal}>
                              <strong>Original:</strong> "{issue.original}"
                            </div>
                            <div className={styles.issueDescription}>
                              <strong>Issue:</strong> {issue.issue}
                            </div>
                            <div className={styles.issueSuggestion}>
                              <strong>Suggestion:</strong> "{issue.suggestion}"
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={styles.noIssuesCard}>
                          <p>No grammar issues identified.</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeAnalysisTab === 'vocabulary' && (
                    <div className={styles.issuesContainer}>
                      {questionData.vocabulary_issues?.length > 0 ? (
                        questionData.vocabulary_issues.map((issue, index) => (
                          <div key={`vocabulary-${index}`} className={styles.issueCard}>
                            <div className={styles.issueType}>Vocabulary Issue</div>
                            <div className={styles.issueOriginal}>
                              <strong>Problematic phrase:</strong> "{issue.word}"
                            </div>
                            <div className={styles.issueDescription}>
                              <strong>Issue:</strong> {issue.issue}
                            </div>
                            <div className={styles.issueSuggestion}>
                              <strong>Suggestion:</strong> "{issue.suggestion}"
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={styles.noIssuesCard}>
                          <p>No vocabulary issues identified.</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default SpeakingQuestionCard;