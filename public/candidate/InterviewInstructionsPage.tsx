import React from 'react';

export interface InterviewInstructionsPageProps {
  onStartInterview: () => void;
}

export function InterviewInstructionsPage({ onStartInterview }: InterviewInstructionsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header - Keep as is */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-slate-900">AI Interview</h1>
            
            {/* Progress dots - Keep as is */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">←</span>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">1</span>
              </div>
              <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Info - Keep as is */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-slate-900 font-medium">Full Stack Developer</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Question No. 1 of 1</span>
              <button
                onClick={onStartInterview}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm"
              >
                Start Interview
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Redesigned */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-slate-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Pre-Interview Instructions</h2>
              <p className="text-slate-600">Please review these important guidelines before starting your interview</p>
            </div>
          </div>

          {/* Instructions Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Internet Speed */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Internet Speed</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Ensure your internet speed is above <span className="font-semibold text-slate-900">5 Mbps</span> to maintain a stable connection throughout the interview process.
                </p>
              </div>

              {/* Devices */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Devices</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Use a desktop or laptop computer for the interview
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Avoid using mobile devices or tablets
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Ensure your device is charged or connected to power
                  </div>
                </div>
              </div>

              {/* Language Requirement */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Language Requirement</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Please communicate in <span className="font-semibold text-slate-900">English only</span>. The interview will be conducted entirely in English.
                </p>
              </div>

              {/* Time Management */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Time Management</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Manage your time efficiently to answer all questions within the allotted timeframe. Failure to do so may impact your overall assessment.
                </p>
              </div>

            </div>

            {/* Full-width cards */}
            <div className="mt-6 space-y-4">
              
              {/* Proctored Interview */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Proctored Interview</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      You are being proctored during the interview to ensure fairness and integrity. Any attempt to cheat or use unauthorized resources will result in disqualification.
                    </p>
                  </div>
                </div>
              </div>

              {/* Complete in One Go */}
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Complete in One Go</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      It is preferred to complete the interview in one session without interruptions. If unable to do so, the result may have some inaccuracy.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-slate-50 px-8 py-6 border-t border-slate-200">
            <div className="text-center">
              <p className="text-slate-600 text-sm mb-4">
                By starting the interview, you acknowledge that you have read and understood all the above instructions.
              </p>
              <button
                onClick={onStartInterview}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}