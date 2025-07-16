import React, { useState, useEffect } from 'react';

export interface SystemCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

interface SystemCheckItem {
  id: string;
  label: string;
  status: 'checking' | 'supported' | 'found' | 'error';
  description?: string;
  hasAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export function SystemCheckModal({ isOpen, onClose, onNext }: SystemCheckModalProps) {
  const [items, setItems] = useState<SystemCheckItem[]>([
    {
      id: 'browser',
      label: 'Browser',
      status: 'checking',
      description: 'Chrome 138, Required'
    },
    {
      id: 'camera',
      label: 'Camera',
      status: 'checking',
      description: 'Required'
    },
    {
      id: 'microphone',
      label: 'Microphone',
      status: 'checking',
      description: 'Required'
    },
    {
      id: 'speakers',
      label: 'Speakers',
      status: 'checking',
      description: 'Required',
      hasAction: true,
      actionLabel: 'Play and check your speaker',
      onAction: () => console.log('Test speakers')
    }
  ]);

  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Simulate system checks
    const timer = setTimeout(() => {
      setItems(prev => prev.map(item => ({
        ...item,
        status: item.id === 'browser' ? 'supported' : 'found'
      })));
      setAllChecked(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handlePlaySound = () => {
    // Create and play a test sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 440; // A4 note
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div 
        className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">System Check</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - System Checks */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Check Your System</h3>
              
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="flex-shrink-0 mt-0.5">
                    {item.status === 'checking' && (
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"/>
                    )}
                    {item.status === 'supported' && (
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      </div>
                    )}
                    {item.status === 'found' && (
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      </div>
                    )}
                    {item.status === 'error' && (
                      <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-600">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                      {item.status === 'supported' && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Browser supported
                        </span>
                      )}
                      {item.status === 'found' && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Device Found
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    )}
                    {item.hasAction && item.status === 'found' && (
                      <button
                        onClick={handlePlaySound}
                        className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="5,3 19,12 5,21"/>
                        </svg>
                        {item.actionLabel}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Preview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 mx-auto mb-2">
                    <path d="M23 7l-7 5 7 5V7z"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                  <p className="text-sm text-gray-400">Camera preview</p>
                </div>
              </div>
              
              {/* Preview info */}
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Camera Status</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Active</span>
                </div>
              </div>
              
              {/* Having Issues Section - Right below camera */}
              <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-600">
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <path d="M12 17h.01"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-orange-900 mb-1">Having Issues?</h4>
                    <p className="text-xs text-orange-700 leading-relaxed mb-2">
                      If you're experiencing technical difficulties, we're here to help.
                    </p>
                    <a href="mailto:support@assessment.com" className="flex items-center gap-2 text-xs text-orange-600 hover:text-orange-800 font-medium">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      support@assessment.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            {allChecked && (
              <>
                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-600">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span className="text-sm text-green-700 font-medium">You are good to go.</span>
              </>
            )}
          </div>
          <button
            onClick={onNext}
            disabled={!allChecked}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
              allChecked 
                ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}