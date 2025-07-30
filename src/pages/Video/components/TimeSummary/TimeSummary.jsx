import React from 'react';
import styles from './TimeSummary.module.css';

const TimeSummary = ({ 
  managementSubParts = [], 
  professionalSubParts = [],
  maxTime = 60,
  warningThreshold = 45,
  showBreakdown = true,
  className = ''
}) => {
  const managementTime = managementSubParts.reduce((total, part) => total + (part.allocatedTime || 0), 0);
  const professionalTime = professionalSubParts.reduce((total, part) => total + (part.allocatedTime || 0), 0);
  const totalTime = managementTime + professionalTime;
  
  const timePercentage = (totalTime / maxTime) * 100;
  const isOverTime = totalTime > maxTime;
  const isNearLimit = totalTime > warningThreshold && !isOverTime;
  
  const getStatusColor = () => {
    if (isOverTime) return 'error';
    if (isNearLimit) return 'warning';
    return 'success';
  };

  const getStatusIcon = () => {
    if (isOverTime) return 'fas fa-exclamation-triangle';
    if (isNearLimit) return 'fas fa-exclamation-circle';
    return 'fas fa-check-circle';
  };

  const getStatusMessage = () => {
    if (isOverTime) {
      const overtime = totalTime - maxTime;
      return `${overtime} min over the recommended limit`;
    }
    if (isNearLimit) {
      return 'Approaching time limit';
    }
    return 'Within time limit';
  };

  return (
    <div className={`${styles.timeSummary} ${className}`}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          <i className="fas fa-clock"></i>
          Time Allocation Summary
        </h4>
        <div className={`${styles.status} ${styles[getStatusColor()]}`}>
          <i className={getStatusIcon()}></i>
          <span>{getStatusMessage()}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={`${styles.progressFill} ${styles[getStatusColor()]}`}
            style={{ width: `${Math.min(timePercentage, 100)}%` }}
          />
          {isOverTime && (
            <div 
              className={styles.overTimeIndicator}
              style={{ 
                left: '100%',
                width: `${((totalTime - maxTime) / maxTime) * 100}%` 
              }}
            />
          )}
        </div>
        <div className={styles.progressLabels}>
          <span className={styles.currentTime}>{totalTime} min</span>
          <span className={styles.maxTime}>{maxTime} min limit</span>
        </div>
      </div>

      {/* Breakdown */}
      {showBreakdown && (
        <div className={styles.breakdown}>
          <div className={styles.breakdownItem}>
            <div className={styles.breakdownHeader}>
              <span className={styles.breakdownLabel}>
                <i className="fas fa-users"></i>
                Management Questions
              </span>
              <span className={styles.breakdownValue}>{managementTime} min</span>
            </div>
            <div className={styles.breakdownDetails}>
              {managementSubParts.length} sub part{managementSubParts.length !== 1 ? 's' : ''}
              {managementTime > 0 && (
                <span className={styles.average}>
                  (avg: {Math.round((managementTime / Math.max(managementSubParts.length, 1)) * 10) / 10} min)
                </span>
              )}
            </div>
          </div>

          <div className={styles.breakdownItem}>
            <div className={styles.breakdownHeader}>
              <span className={styles.breakdownLabel}>
                <i className="fas fa-briefcase"></i>
                Professional Questions
              </span>
              <span className={styles.breakdownValue}>{professionalTime} min</span>
            </div>
            <div className={styles.breakdownDetails}>
              {professionalSubParts.length} sub part{professionalSubParts.length !== 1 ? 's' : ''}
              {professionalTime > 0 && (
                <span className={styles.average}>
                  (avg: {Math.round((professionalTime / Math.max(professionalSubParts.length, 1)) * 10) / 10} min)
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {(isOverTime || isNearLimit) && (
        <div className={styles.recommendations}>
          <h5 className={styles.recommendationsTitle}>
            <i className="fas fa-lightbulb"></i>
            Recommendations
          </h5>
          <ul className={styles.recommendationsList}>
            {isOverTime && (
              <li>Consider reducing time allocation for some sub parts</li>
            )}
            {managementTime > professionalTime * 2 && (
              <li>Management questions take significantly more time than professional questions</li>
            )}
            {professionalTime > managementTime * 2 && (
              <li>Professional questions take significantly more time than management questions</li>
            )}
            {managementSubParts.some(part => part.allocatedTime > 10) && (
              <li>Some management questions may be too long (>10 min)</li>
            )}
            {professionalSubParts.some(part => part.allocatedTime > 10) && (
              <li>Some professional questions may be too long (>10 min)</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimeSummary;