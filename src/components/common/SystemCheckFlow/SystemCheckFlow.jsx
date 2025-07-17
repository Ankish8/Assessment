import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal/Modal';
import styles from './SystemCheckFlow.module.css';

const SystemCheckFlow = ({
  isOpen = false,
  onClose,
  onComplete,
  config = {},
  ...props
}) => {
  // Main flow state
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // System check states
  const [systemChecks, setSystemChecks] = useState({
    browser: { status: 'pending', supported: false, error: null },
    camera: { status: 'pending', available: false, stream: null, error: null },
    microphone: { status: 'pending', available: false, error: null },
    speakers: { status: 'pending', available: false, error: null }
  });
  
  // Camera setup states
  const [cameraGuidelines, setCameraGuidelines] = useState({
    termsAccepted: false,
    guidelinesRead: false
  });
  
  // Internet speed states
  const [internetCheck, setInternetCheck] = useState({
    status: 'pending',
    connected: false,
    speed: null,
    quality: 'unknown'
  });
  
  // Audio check states
  const [audioCheck, setAudioCheck] = useState({
    recordingState: 'initial',
    transcript: '',
    isMatched: false,
    timer: 0,
    mediaRecorder: null
  });
  
  // Final confirmation state
  const [finalConfirmation, setFinalConfirmation] = useState({
    readyToStart: false
  });
  
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  
  // Step configuration
  const steps = [
    {
      id: 'system-check',
      title: 'System Check',
      subtitle: 'Checking your system compatibility',
      component: 'SystemCheck'
    },
    {
      id: 'camera-guidelines',
      title: 'Important Note',
      subtitle: 'Camera setup guidelines and consent',
      component: 'CameraGuidelines'
    },
    {
      id: 'internet-check',
      title: 'Internet Speed Check',
      subtitle: 'Testing your connection quality',
      component: 'InternetCheck'
    },
    {
      id: 'audio-check',
      title: 'Audio Check',
      subtitle: 'Testing your microphone and recording',
      component: 'AudioCheck'
    },
    {
      id: 'final-confirmation',
      title: 'Ready to Start',
      subtitle: 'Final confirmation before proceeding',
      component: 'FinalConfirmation'
    }
  ];
  
  const currentStepData = steps[currentStep];
  
  // Reset all states when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsCompleted(false);
      resetAllStates();
    }
  }, [isOpen]);
  
  // Auto-start system checks when modal opens
  useEffect(() => {
    if (isOpen && currentStep === 0) {
      startSystemChecks();
    }
  }, [isOpen, currentStep]);
  
  const resetAllStates = () => {
    setSystemChecks({
      browser: { status: 'pending', supported: false, error: null },
      camera: { status: 'pending', available: false, stream: null, error: null },
      microphone: { status: 'pending', available: false, error: null },
      speakers: { status: 'pending', available: false, error: null }
    });
    setCameraGuidelines({ termsAccepted: false, guidelinesRead: false });
    setInternetCheck({ status: 'pending', connected: false, speed: null, quality: 'unknown' });
    setAudioCheck({ recordingState: 'initial', transcript: '', isMatched: false, timer: 0, mediaRecorder: null });
    setFinalConfirmation({ readyToStart: false });
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  
  const startSystemChecks = async () => {
    // Check browser compatibility
    setSystemChecks(prev => ({
      ...prev,
      browser: { ...prev.browser, status: 'checking' }
    }));
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const browserSupported = isChrome || /Firefox/.test(navigator.userAgent) || /Safari/.test(navigator.userAgent);
    
    setSystemChecks(prev => ({
      ...prev,
      browser: {
        status: browserSupported ? 'success' : 'error',
        supported: browserSupported,
        error: browserSupported ? null : 'Unsupported browser detected. Please use Chrome, Firefox, or Safari.'
      }
    }));
    
    // Check camera
    setSystemChecks(prev => ({
      ...prev,
      camera: { ...prev.camera, status: 'checking' }
    }));
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setSystemChecks(prev => ({
        ...prev,
        camera: {
          status: 'success',
          available: true,
          stream: stream,
          error: null
        }
      }));
    } catch (error) {
      setSystemChecks(prev => ({
        ...prev,
        camera: {
          status: 'error',
          available: false,
          stream: null,
          error: 'Camera access denied or not available'
        }
      }));
    }
    
    // Check microphone
    setSystemChecks(prev => ({
      ...prev,
      microphone: { ...prev.microphone, status: 'checking' }
    }));
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately after checking
      setSystemChecks(prev => ({
        ...prev,
        microphone: {
          status: 'success',
          available: true,
          error: null
        }
      }));
    } catch (error) {
      setSystemChecks(prev => ({
        ...prev,
        microphone: {
          status: 'error',
          available: false,
          error: 'Microphone access denied or not available'
        }
      }));
    }
    
    // Check speakers (always available for now)
    setSystemChecks(prev => ({
      ...prev,
      speakers: { ...prev.speakers, status: 'checking' }
    }));
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSystemChecks(prev => ({
      ...prev,
      speakers: {
        status: 'success',
        available: true,
        error: null
      }
    }));
  };
  
  const testSpeakers = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 440;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.error('Error playing test sound:', error);
    }
  };
  
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      
      // Auto-start internet check when entering that step
      if (currentStep + 1 === 2) {
        startInternetCheck();
      }
    } else {
      setIsCompleted(true);
      onComplete?.();
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const startInternetCheck = async () => {
    setInternetCheck(prev => ({ ...prev, status: 'checking' }));
    
    // Simulate internet speed test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, you would perform actual speed test
    const mockSpeed = (Math.random() * 10 + 1).toFixed(2);
    const quality = mockSpeed > 5 ? 'good' : mockSpeed > 2 ? 'fair' : 'poor';
    
    setInternetCheck({
      status: 'completed',
      connected: true,
      speed: `${mockSpeed} Mbps`,
      quality: quality
    });
  };
  
  const canProceedFromCurrentStep = () => {
    switch (currentStep) {
      case 0: // System check
        return Object.values(systemChecks).every(check => 
          check.status === 'success' || (check.status === 'error' && config.allowErrors)
        );
      case 1: // Camera guidelines
        return cameraGuidelines.termsAccepted;
      case 2: // Internet check
        return internetCheck.status === 'completed' && internetCheck.connected;
      case 3: // Audio check
        return audioCheck.isMatched;
      case 4: // Final confirmation
        return finalConfirmation.readyToStart;
      default:
        return false;
    }
  };
  
  const renderCurrentStep = () => {
    switch (currentStepData.component) {
      case 'SystemCheck':
        return renderSystemCheck();
      case 'CameraGuidelines':
        return renderCameraGuidelines();
      case 'InternetCheck':
        return renderInternetCheck();
      case 'AudioCheck':
        return renderAudioCheck();
      case 'FinalConfirmation':
        return renderFinalConfirmation();
      default:
        return <div>Unknown step</div>;
    }
  };
  
  const renderSystemCheck = () => (
    <div className={styles.systemCheck}>
      <div className={styles.checkGrid}>
        <div className={styles.checksColumn}>
          <h3 className={styles.sectionTitle}>Check Your System</h3>
          
          {Object.entries(systemChecks).map(([key, check]) => (
            <div key={key} className={styles.checkItem}>
              <div className={styles.checkStatus}>
                {check.status === 'pending' && (
                  <div className={styles.loadingSpinner} />
                )}
                {check.status === 'checking' && (
                  <div className={styles.loadingSpinner} />
                )}
                {check.status === 'success' && (
                  <div className={styles.successIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                )}
                {check.status === 'error' && (
                  <div className={styles.errorIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </div>
                )}
              </div>
              
              <div className={styles.checkContent}>
                <div className={styles.checkLabel}>
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  {check.status === 'success' && (
                    <span className={styles.statusBadge}>
                      {key === 'browser' ? 'Browser supported' : 'Device Found'}
                    </span>
                  )}
                  {check.status === 'error' && (
                    <span className={`${styles.statusBadge} ${styles.errorBadge}`}>
                      Not Available
                    </span>
                  )}
                </div>
                <div className={styles.checkDescription}>
                  {key === 'browser' && 'Chrome 138, Required'}
                  {key !== 'browser' && 'Required'}
                </div>
                {check.error && (
                  <div className={styles.errorMessage}>{check.error}</div>
                )}
                {key === 'speakers' && check.status === 'success' && (
                  <button onClick={testSpeakers} className={styles.testButton}>
                    ▶ Play and check your speaker
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.previewColumn}>
          <div className={styles.cameraPreview}>
            {systemChecks.camera.stream ? (
              <video
                ref={(video) => {
                  if (video && systemChecks.camera.stream) {
                    video.srcObject = systemChecks.camera.stream;
                    video.play();
                  }
                }}
                className={styles.previewVideo}
                autoPlay
                muted
                playsInline
              />
            ) : (
              <div className={styles.previewPlaceholder}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 7l-7 5 7 5V7z"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
                <p>Camera preview</p>
              </div>
            )}
          </div>
          
          <div className={styles.previewStatus}>
            <p>Camera Status</p>
            <div className={styles.statusIndicator}>
              <div className={`${styles.statusDot} ${systemChecks.camera.available ? styles.active : ''}`} />
              <span>{systemChecks.camera.available ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          
          <div className={styles.helpSection}>
            <h4>Having Issues?</h4>
            <p>If you're experiencing technical difficulties, we're here to help.</p>
            <a href="mailto:support@assessment.com" className={styles.supportLink}>
              📧 support@assessment.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderCameraGuidelines = () => (
    <div className={styles.cameraGuidelines}>
      <div className={styles.guidelinesCard}>
        <div className={styles.guidelinesHeader}>
          <div className={styles.guidelinesIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 7l-7 5 7 5V7z"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          </div>
          <h3>Camera Setup Guidelines</h3>
        </div>
        
        <div className={styles.guidelinesList}>
          <div className={styles.guidelineItem}>
            <span>• Ensure proper lighting and clear visibility - Position yourself centrally with good lighting</span>
          </div>
          <div className={styles.guidelineItem}>
            <span>• Remove any obstructions - Nothing should cover the camera lens</span>
          </div>
          <div className={styles.guidelineItem}>
            <span>• Maintain stable position - Keep your camera at proper view angle</span>
          </div>
        </div>
        
        <div className={styles.warningSection}>
          <div className={styles.warningIcon}>⚠</div>
          <p><strong>Warning:</strong> Unclear or suspicious images will result in application rejection.</p>
        </div>
      </div>
      
      <div className={styles.termsSection}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={cameraGuidelines.termsAccepted}
            onChange={(e) => setCameraGuidelines(prev => ({
              ...prev,
              termsAccepted: e.target.checked
            }))}
          />
          <span>I agree to the <a href="#" className={styles.termsLink}>Terms & Conditions</a></span>
        </label>
      </div>
    </div>
  );
  
  const renderInternetCheck = () => (
    <div className={styles.internetCheck}>
      <div className={styles.internetStatus}>
        <div className={styles.statusRow}>
          <span className={styles.statusLabel}>Internet Status:</span>
          <div className={styles.statusValue}>
            {internetCheck.status === 'checking' && <div className={styles.loadingSpinner} />}
            {internetCheck.connected && <div className={styles.successIcon}>✓</div>}
            <span>{internetCheck.connected ? 'Connected' : 'Checking...'}</span>
          </div>
        </div>
        
        <div className={styles.statusRow}>
          <span className={styles.statusLabel}>Internet Speed:</span>
          <div className={styles.statusValue}>
            {internetCheck.status === 'checking' && (
              <>
                <div className={styles.speedDots}>
                  <div className={styles.speedDot} />
                  <div className={styles.speedDot} />
                  <div className={styles.speedDot} />
                </div>
                <span>Testing...</span>
              </>
            )}
            {internetCheck.status === 'completed' && (
              <>
                <div className={`${styles.speedDots} ${styles[internetCheck.quality]}`}>
                  <div className={styles.speedDot} />
                  <div className={styles.speedDot} />
                  <div className={styles.speedDot} />
                </div>
                <span>{internetCheck.quality === 'good' ? 'Good' : internetCheck.quality} ({internetCheck.speed})</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.internetInstructions}>
        <ul>
          <li>• Ensure you have a stable internet connection before starting.</li>
          <li>• If proceed with low internet, you may get issues with the interview.</li>
          <li>• This will take maximum 1 minute or based on your internet speed.</li>
        </ul>
      </div>
      
      <div className={styles.readySection}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={finalConfirmation.readyToStart}
            onChange={(e) => setFinalConfirmation(prev => ({
              ...prev,
              readyToStart: e.target.checked
            }))}
          />
          <span>I have read the instructions and I am ready to start the interview</span>
        </label>
      </div>
    </div>
  );
  
  const renderAudioCheck = () => (
    <div className={styles.audioCheck}>
      <div className={styles.audioInstructions}>
        <h3>Instructions:</h3>
        <ul>
          <li>• Make sure your microphone is connected and working properly.</li>
          <li>• Choose a quiet environment with minimal background noise.</li>
          <li>• Speak clearly and at a normal pace for accurate recognition.</li>
          <li>• Wait for the countdown to appear before you start speaking.</li>
        </ul>
      </div>
      
      <div className={styles.testPhrase}>
        <p>Please click "Start Recording" and say the sentence below clearly when the countdown starts.</p>
        <div className={styles.phraseBox}>
          <p>"Welcome to the test."</p>
        </div>
      </div>
      
      {audioCheck.recordingState === 'initial' && (
        <div className={styles.audioControls}>
          <button onClick={startAudioRecording} className={styles.startRecordingButton}>
            Start Recording
          </button>
        </div>
      )}
      
      {audioCheck.recordingState === 'recording' && (
        <div className={styles.recordingState}>
          <div className={styles.recordingControls}>
            <button onClick={stopAudioRecording} className={styles.stopRecordingButton}>
              Submit Recording
            </button>
            <div className={styles.recordingIndicator}>
              <div className={styles.recordingDot} />
              <span>Recording... {formatTime(audioCheck.timer)}</span>
            </div>
          </div>
          {audioCheck.transcript && (
            <div className={styles.liveTranscript}>
              <h4>Live Transcript:</h4>
              <div className={styles.transcriptBox}>{audioCheck.transcript}</div>
            </div>
          )}
        </div>
      )}
      
      {audioCheck.recordingState === 'processing' && (
        <div className={styles.processingState}>
          <div className={styles.loadingSpinner} />
          <p>Processing your response...</p>
        </div>
      )}
      
      {(audioCheck.recordingState === 'success' || audioCheck.recordingState === 'error') && (
        <div className={styles.resultState}>
          {audioCheck.transcript && (
            <div className={styles.finalTranscript}>
              <h4>Your Recorded Response:</h4>
              <div className={styles.transcriptBox}>{audioCheck.transcript}</div>
            </div>
          )}
          
          {audioCheck.recordingState === 'success' && (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <span>Your response matched successfully. Please maintain the same pitch and clarity during the interview.</span>
            </div>
          )}
          
          {audioCheck.recordingState === 'error' && (
            <div className={styles.errorMessage}>
              <div className={styles.errorIcon}>✗</div>
              <span>Your response didn't match. Please record again.</span>
              <button onClick={resetAudioCheck} className={styles.retryButton}>
                Record Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  const renderFinalConfirmation = () => (
    <div className={styles.finalConfirmation}>
      <div className={styles.completionMessage}>
        <div className={styles.successIcon}>✓</div>
        <h3>All System Checks Complete</h3>
        <p>Your system is ready for the interview. Please review the summary below:</p>
      </div>
      
      <div className={styles.summaryList}>
        <div className={styles.summaryItem}>
          <span>✓ Browser: Compatible</span>
        </div>
        <div className={styles.summaryItem}>
          <span>✓ Camera: Working</span>
        </div>
        <div className={styles.summaryItem}>
          <span>✓ Microphone: Working</span>
        </div>
        <div className={styles.summaryItem}>
          <span>✓ Internet: {internetCheck.quality} connection</span>
        </div>
        <div className={styles.summaryItem}>
          <span>✓ Audio: Verified</span>
        </div>
      </div>
      
      <div className={styles.finalReadySection}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={finalConfirmation.readyToStart}
            onChange={(e) => setFinalConfirmation(prev => ({
              ...prev,
              readyToStart: e.target.checked
            }))}
          />
          <span>I confirm that I am ready to start the interview</span>
        </label>
      </div>
    </div>
  );
  
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      setAudioCheck(prev => ({
        ...prev,
        recordingState: 'recording',
        timer: 0,
        transcript: ''
      }));
      
      // Start timer
      timerRef.current = setInterval(() => {
        setAudioCheck(prev => ({
          ...prev,
          timer: prev.timer + 1
        }));
      }, 100);
      
      // Simulate live transcript
      let transcriptParts = ['', 'To', 'To the', 'To the test', 'Welcome', 'Welcome to', 'Welcome to the', 'Welcome to the test'];
      let partIndex = 0;
      
      const transcriptInterval = setInterval(() => {
        if (partIndex < transcriptParts.length) {
          setAudioCheck(prev => ({
            ...prev,
            transcript: transcriptParts[partIndex]
          }));
          partIndex++;
        } else {
          clearInterval(transcriptInterval);
        }
      }, 300);
      
      mediaRecorder.start();
      
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        clearInterval(transcriptInterval);
      };
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
  
  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    setAudioCheck(prev => ({
      ...prev,
      recordingState: 'processing'
    }));
    
    // Simulate processing
    setTimeout(() => {
      const finalTranscript = audioCheck.transcript || 'Welcome to the test.';
      const normalizedResponse = finalTranscript.toLowerCase().replace(/[.,!?]/g, '').trim();
      const normalizedExpected = 'welcome to the test';
      
      const isMatched = normalizedResponse === normalizedExpected;
      
      setAudioCheck(prev => ({
        ...prev,
        recordingState: isMatched ? 'success' : 'error',
        isMatched: isMatched,
        transcript: finalTranscript
      }));
    }, 1500);
  };
  
  const resetAudioCheck = () => {
    setAudioCheck({
      recordingState: 'initial',
      transcript: '',
      isMatched: false,
      timer: 0,
      mediaRecorder: null
    });
  };
  
  const formatTime = (timeInTenths) => {
    const seconds = Math.floor(timeInTenths / 10);
    const tenths = timeInTenths % 10;
    return `${seconds.toString().padStart(2, '0')}:${(tenths * 10).toString().padStart(2, '0')}`;
  };
  
  const footerContent = (
    <div className={styles.modalFooter}>
      <div className={styles.footerLeft}>
        {canProceedFromCurrentStep() && (
          <div className={styles.successIndicator}>
            <div className={styles.successIcon}>✓</div>
            <span>You are good to go.</span>
          </div>
        )}
      </div>
      
      <div className={styles.footerRight}>
        {currentStep > 0 && (
          <button onClick={goToPreviousStep} className={styles.backButton}>
            Back
          </button>
        )}
        <button
          onClick={goToNextStep}
          disabled={!canProceedFromCurrentStep()}
          className={`${styles.nextButton} ${canProceedFromCurrentStep() ? styles.enabled : styles.disabled}`}
        >
          {currentStep === steps.length - 1 ? 'Start Interview' : 'Next'}
        </button>
      </div>
    </div>
  );
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={currentStepData.title}
      size="base"
      footer={footerContent}
      className={styles.systemCheckModal}
      {...props}
    >
      <div className={styles.stepProgress}>
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`${styles.progressStep} ${
              index === currentStep ? styles.active : ''
            } ${index < currentStep ? styles.completed : ''}`}
          />
        ))}
      </div>
      
      <div className={styles.stepContent}>
        {renderCurrentStep()}
      </div>
    </Modal>
  );
};

export default SystemCheckFlow;