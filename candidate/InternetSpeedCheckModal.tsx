import React, { useState, useEffect } from 'react';

export interface InternetSpeedCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export function InternetSpeedCheckModal({ isOpen, onClose, onProceed }: InternetSpeedCheckModalProps) {
  const [internetStatus, setInternetStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [internetSpeed, setInternetSpeed] = useState<'checking' | 'good' | 'poor'>('checking');
  const [speedValue, setSpeedValue] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Simulate internet speed check
    const timer = setTimeout(() => {
      setInternetStatus('connected');
      setInternetSpeed('good');
      setSpeedValue('5.04 Mbps');
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleProceed = () => {
    if (isAgreed) {
      onProceed();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div 
        className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Internet Speed Check</h2>
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
            
            {/* Internet Status */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900 min-w-[100px]">Internet Status:</span>
              <div className="flex items-center gap-2">
                {internetStatus === 'checking' && (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"/>
                )}
                {internetStatus === 'connected' && (
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-600">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                )}
                <span className={`text-sm font-medium ${internetStatus === 'connected' ? 'text-green-600' : 'text-gray-500'}`}>
                  {internetStatus === 'checking' ? 'Checking...' : 'Connected'}
                </span>
              </div>
            </div>

            {/* Internet Speed */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900 min-w-[100px]">Internet Speed:</span>
              <div className="flex items-center gap-2">
                {internetSpeed === 'checking' && (
                  <>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-500">Testing...</span>
                  </>
                )}
                {internetSpeed === 'good' && (
                  <>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">Good ({speedValue})</span>
                  </>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ensure you have a stable internet connection before starting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>If proceed with low internet, you may get issues with the interview.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>This will take maximum 1 minute or based on your internet speed.</span>
                </li>
              </ul>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="ready-checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="ready-checkbox" className="text-sm font-medium text-gray-900">
                I have read the instructions and I am ready to start the interview
              </label>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={handleProceed}
            disabled={!isAgreed || internetStatus !== 'connected'}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
              isAgreed && internetStatus === 'connected'
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}