import React, { useState } from 'react';
import styles from './SpeakingQuestionCard.module.css';

const SpeakingQuestionCard = ({ questionData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [analysisMode, setAnalysisMode] = useState('none'); // 'none', 'confidence', 'sentiment'

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

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.questionInfo}>
          <h3>Question {questionData.id}: {questionData.type}</h3>
        </div>
        <div className={styles.scoreInfo}>
          <div className={`${styles.scoreCard} ${styles[getScoreColor(questionData.score, questionData.maxScore)]}`}>
            <i className="fas fa-chart-bar"></i>
            <div className={styles.scoreDetails}>
              <span className={styles.scoreLabel}>Score:</span>
              <span className={styles.scoreValue}>{questionData.score}/{questionData.maxScore}</span>
            </div>
          </div>
          <div className={styles.timeCard}>
            <i className="fas fa-clock"></i>
            <span>{questionData.timeSpent}s</span>
          </div>
        </div>
      </div>

      {/* Audio Section */}
      <div className={styles.section}>
        <h4><i className="fas fa-volume-up"></i> Audio Analysis</h4>
        <div className={styles.audioContainer}>
          <div className={styles.audioPlayer}>
            <button onClick={handlePlayPause} className={styles.playButton}>
              <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
            </button>
            <span className={styles.duration}>{formatTime(questionData.audio.duration)}</span>
          </div>
          <div className={styles.transcriptSection}>
            <div className={styles.transcriptHeader}>
              <div className={styles.transcriptLabel}>
                <i className="fas fa-file-alt"></i> Transcript:
              </div>
              <div className={styles.analysisControls}>
                <span className={styles.controlsLabel}>Word Analysis</span>
                <div className={styles.controlButtons}>
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
              {analysisMode === 'confidence' && questionData.audio.transcriptWords ? (
                questionData.audio.transcriptWords.map((item, index) => (
                  <span 
                    key={index}
                    className={`${styles.confidenceWord} ${styles[getConfidenceColor(item.confidence * 100)]}`}
                    title={`${Math.round(item.confidence * 100)}% confidence`}
                  >
                    {item.word}{index < questionData.audio.transcriptWords.length - 1 ? ' ' : ''}
                  </span>
                ))
              ) : analysisMode === 'sentiment' && questionData.audio.transcriptWords ? (
                questionData.audio.transcriptWords.map((item, index) => (
                  <span 
                    key={index}
                    className={`${styles.sentimentWord} ${styles[getSentimentColor(item.sentiment)]}`}
                    title={`${item.sentiment} sentiment`}
                  >
                    {item.word}{index < questionData.audio.transcriptWords.length - 1 ? ' ' : ''}
                  </span>
                ))
              ) : (
                questionData.audio.transcript
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className={styles.section}>
        <h4><i className="fas fa-robot"></i> AI Analysis Results</h4>
        <div className={styles.analysisGrid}>
          <div className={styles.analysisCard}>
            <div className={styles.analysisHeader}>
              <i className="fas fa-microphone-alt"></i>
              <div className={styles.analysisTitle}>
                <span>Fluency & Pronunciation</span>
                <span className={`${styles.analysisScore} ${styles[getScoreColor(questionData.analysis.fluency.score, questionData.analysis.fluency.maxScore)]}`}>
                  {questionData.analysis.fluency.score}/{questionData.analysis.fluency.maxScore}
                </span>
              </div>
            </div>
            <ul className={styles.detailsList}>
              {questionData.analysis.fluency.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className={styles.analysisCard}>
            <div className={styles.analysisHeader}>
              <i className="fas fa-spell-check"></i>
              <div className={styles.analysisTitle}>
                <span>Grammar & Punctuation</span>
                <span className={`${styles.analysisScore} ${styles[getScoreColor(questionData.analysis.grammar.score, questionData.analysis.grammar.maxScore)]}`}>
                  {questionData.analysis.grammar.score}/{questionData.analysis.grammar.maxScore}
                </span>
              </div>
            </div>
            <ul className={styles.detailsList}>
              {questionData.analysis.grammar.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className={styles.analysisCard}>
            <div className={styles.analysisHeader}>
              <i className="fas fa-comments"></i>
              <div className={styles.analysisTitle}>
                <span>Content & Communication</span>
                <span className={`${styles.analysisScore} ${styles[getScoreColor(questionData.analysis.content.score, questionData.analysis.content.maxScore)]}`}>
                  {questionData.analysis.content.score}/{questionData.analysis.content.maxScore}
                </span>
              </div>
            </div>
            <ul className={styles.detailsList}>
              {questionData.analysis.content.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className={styles.analysisCard}>
            <div className={styles.analysisHeader}>
              <i className="fas fa-heart"></i>
              <div className={styles.analysisTitle}>
                <span>Sentiment Analysis</span>
                <span className={styles.sentimentBadge}>{questionData.analysis.sentiment}</span>
              </div>
            </div>
            <div className={styles.sentimentContent}>
              <span className={styles.sentimentDescription}>Overall emotional tone detected in the response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section - Only show if comments exist and are not empty */}
      {questionData.evaluatorComments && questionData.evaluatorComments.trim().length > 0 && (
        <div className={styles.section}>
          <h4><i className="fas fa-comment-alt"></i> Evaluator Comments</h4>
          <div className={styles.commentsCard}>
            <p>{questionData.evaluatorComments}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeakingQuestionCard;