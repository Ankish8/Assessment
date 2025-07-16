import React, { useState } from 'react';
import { SystemCheckModal } from './SystemCheckModal';
import { ImportantNoteModal } from './ImportantNoteModal';

export function SystemCheckDemo() {
  const [isSystemCheckOpen, setIsSystemCheckOpen] = useState(false);
  const [isImportantNoteOpen, setIsImportantNoteOpen] = useState(false);

  const handleSystemCheckNext = () => {
    setIsSystemCheckOpen(false);
    setIsImportantNoteOpen(true);
  };

  const handleImportantNoteProceed = () => {
    console.log('Proceeding to assessment');
    setIsImportantNoteOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Assessment Modal Flow Demo
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={() => setIsSystemCheckOpen(true)}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm block mx-auto"
          >
            Open System Check
          </button>
          
          <button
            onClick={() => setIsImportantNoteOpen(true)}
            className="px-8 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors shadow-sm block mx-auto"
          >
            Open Important Note
          </button>
        </div>
      </div>

      <SystemCheckModal
        isOpen={isSystemCheckOpen}
        onClose={() => setIsSystemCheckOpen(false)}
        onNext={handleSystemCheckNext}
      />

      <ImportantNoteModal
        isOpen={isImportantNoteOpen}
        onClose={() => setIsImportantNoteOpen(false)}
        onProceed={handleImportantNoteProceed}
      />
    </div>
  );
}