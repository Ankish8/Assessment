import React, { useState, useEffect, useRef } from 'react';

export interface AudioCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

type RecordingState = 'initial' | 'recording' | 'processing' | 'success' | 'error';

export function AudioCheckModal({ isOpen, onClose, onProceed }: AudioCheckModalProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>('initial');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [recordedResponse, setRecordedResponse] = useState('');
  const [timer, setTimer] = useState(0);
  const [isAgreed, setIsAgreed] = useState(false);
  
  const expectedPhrase = "Welcome to the test.";
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setRecordingState('initial');
      setLiveTranscript('');
      setRecordedResponse('');
      setTimer(0);
      setIsAgreed(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      setRecordingState('recording');
      setTimer(0);
      setLiveTranscript('');
      
      // Start timer
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 100);

      // Simulate live transcript (in real implementation, this would use speech recognition)
      let transcriptParts = ['', 'To', 'To the', 'To the test', 'Welcome', 'Welcome to', 'Welcome to the', 'Welcome to the test'];
      let partIndex = 0;
      
      const transcriptInterval = setInterval(() => {
        if (partIndex < transcriptParts.length) {
          setLiveTranscript(transcriptParts[partIndex]);
          partIndex++;
        } else {
          clearInterval(transcriptInterval);
        }
      }, 300);

      mediaRecorder.start();
      
      mediaRecorder.ondataavailable = (event) => {
        // Handle audio data (in real implementation)
      };

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

  const submitRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    setRecordingState('processing');
    
    // Simulate processing and speech recognition
    setTimeout(() => {
      const finalTranscript = liveTranscript || 'Welcome to the test.';
      setRecordedResponse(finalTranscript);
      
      // Check if response matches (simplified matching)
      const normalizedResponse = finalTranscript.toLowerCase().replace(/[.,!?]/g, '').trim();
      const normalizedExpected = expectedPhrase.toLowerCase().replace(/[.,!?]/g, '').trim();
      
      if (normalizedResponse === normalizedExpected) {
        setRecordingState('success');
      } else {
        setRecordingState('error');
      }
    }, 1500);
  };

  const recordAgain = () => {
    setRecordingState('initial');
    setLiveTranscript('');
    setRecordedResponse('');
    setTimer(0);
  };

  const handleProceed = () => {
    if (recordingState === 'success') {
      onProceed();
    }
  };

  const formatTime = (timeInTenths: number) => {
    const seconds = Math.floor(timeInTenths / 10);
    const tenths = timeInTenths % 10;
    return `${seconds.toString().padStart(2, '0')}:${(tenths * 10).toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop"
      onClick={handleOverlayClick}
    >
      <div 
        className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color: 'var(--primary-900)'}}>
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Audio Check</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            
            {/* Instructions */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Instructions:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: 'var(--primary-500)'}}></div>
                  <span className="text-sm text-gray-700">Make sure your microphone is connected and working properly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: 'var(--primary-500)'}}></div>
                  <span className="text-sm text-gray-700">Choose a quiet environment with minimal background noise.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: 'var(--primary-500)'}}></div>
                  <span className="text-sm text-gray-700">Speak clearly and at a normal pace for accurate recognition.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: 'var(--primary-500)'}}></div>
                  <span className="text-sm text-gray-700">Wait for the countdown to appear before you start speaking.</span>
                </li>
              </ul>
            </div>

            {/* Test Phrase */}
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Please click "Start Recording" and say the sentence below clearly when the countdown starts.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-blue-900 font-medium italic">"{expectedPhrase}"</p>
              </div>
            </div>

            {/* Recording Controls */}
            {recordingState === 'initial' && (
              <div className="flex justify-center">
                <button
                  onClick={startRecording}
                  className="px-6 py-2 rounded-lg font-medium text-sm btn-primary"
                >
                  Start Recording
                </button>
              </div>
            )}

            {recordingState === 'recording' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={submitRecording}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium text-sm hover:bg-red-600 transition-colors"
                  >
                    Submit Recording
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-600 font-medium text-sm">Recording... {formatTime(timer)}</span>
                  </div>
                </div>

                {/* Live Transcript */}
                {liveTranscript && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Live Transcript:</h4>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 min-h-[50px] flex items-center">
                      <p className="text-gray-700">{liveTranscript}</p>
                    </div>
                  </div>
                )}

                {/* Loading dots */}
                <div className="flex justify-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            )}

            {recordingState === 'processing' && (
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{borderColor: 'var(--primary-900)', borderTopColor: 'transparent'}}></div>
                <p className="text-gray-600">Processing your response...</p>
              </div>
            )}

            {(recordingState === 'success' || recordingState === 'error') && (
              <div className="space-y-4">
                {recordedResponse && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Your Recorded Response:</h4>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p className="text-gray-700">{recordedResponse}</p>
                    </div>
                  </div>
                )}

                {recordingState === 'success' && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <span className="text-green-700 font-medium text-sm">Your response matched successfully. Please maintain the same pitch and clarity during the interview.</span>
                  </div>
                )}

                {recordingState === 'error' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-600">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                      </div>
                      <span className="text-red-700 font-medium text-sm">Your response didn't match. Please record again.</span>
                    </div>
                    
                    <div className="flex justify-center">
                      <button
                        onClick={recordAgain}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors"
                      >
                        Record Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={handleProceed}
            disabled={recordingState !== 'success'}
            className="px-6 py-2 rounded-lg font-medium text-sm btn-primary"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}