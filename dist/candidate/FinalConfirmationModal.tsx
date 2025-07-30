import React, { useState } from 'react';

export interface FinalConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

export function FinalConfirmationModal({ isOpen, onClose, onStart }: FinalConfirmationModalProps) {
  const [isReady, setIsReady] = useState(false);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleStart = () => {
    if (isReady) {
      onStart();
    }
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
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color: 'var(--primary-900)'}}>
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Start?</h2>
            <p className="text-gray-600">You're all set to begin your AI interview</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            
            {/* System Status Summary */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="text-base font-semibold text-green-900 mb-3 flex items-center gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                System Check Complete
              </h3>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700">Internet Speed: Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700">Audio: Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700">Camera: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700">Browser: Supported</span>
                </div>
              </div>
            </div>

            {/* Interview Details */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Interview Details</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Position:</span>
                  <span className="font-medium">Full Stack Developer</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-medium">1 of 1</span>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="font-medium">AI Interview</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Time:</span>
                  <span className="font-medium">15-30 minutes</span>
                </div>
              </div>
            </div>

            {/* Final Reminders */}
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h3 className="text-base font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600">
                  <path d="M12 9v4"/>
                  <path d="M12 17h.01"/>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                </svg>
                Important Reminders
              </h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Stay in front of the camera throughout the interview</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Speak clearly and maintain good audio quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Complete the interview in one session if possible</span>
                </li>
              </ul>
            </div>

            {/* Final Confirmation */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="final-ready"
                  checked={isReady}
                  onChange={(e) => setIsReady(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded mt-1"
                  style={{accentColor: 'var(--primary-900)'}}
                />
                <label htmlFor="final-ready" className="text-sm text-blue-900 font-medium leading-relaxed">
                  I have reviewed all instructions, completed system checks, and I am ready to begin my interview with confidence.
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium text-sm btn-secondary"
          >
            Go Back
          </button>
          <button
            onClick={handleStart}
            disabled={!isReady}
            className="px-8 py-2 rounded-lg font-medium text-sm btn-primary flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
}