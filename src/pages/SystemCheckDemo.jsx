import React, { useState } from 'react';
import SystemCheckFlow from '../components/common/SystemCheckFlow/SystemCheckFlow';

const SystemCheckDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completionData, setCompletionData] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCompletionData(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleComplete = (data) => {
    setCompletionData(data);
    setIsModalOpen(false);
  };
  
  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <button
        onClick={handleOpenModal}
        disabled={isModalOpen}
        style={{
          backgroundColor: isModalOpen ? '#e2e8f0' : '#611F69',
          color: isModalOpen ? '#9ca3af' : 'white',
          border: 'none',
          padding: '1.25rem 2.5rem',
          borderRadius: '12px',
          fontSize: '1.125rem',
          fontWeight: '700',
          cursor: isModalOpen ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isModalOpen ? 'none' : '0 6px 20px rgba(97, 31, 105, 0.3)',
          transform: isModalOpen ? 'none' : 'translateY(0)',
          minWidth: '200px'
        }}
        onMouseOver={(e) => {
          if (!isModalOpen) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(97, 31, 105, 0.4)';
            e.target.style.backgroundColor = '#7C3F86';
          }
        }}
        onMouseOut={(e) => {
          if (!isModalOpen) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 6px 20px rgba(97, 31, 105, 0.3)';
            e.target.style.backgroundColor = '#611F69';
          }
        }}
      >
        {isModalOpen ? '🔄 System Check Running...' : '🚀 Start System Check'}
      </button>

      {/* System Check Modal */}
      <SystemCheckFlow
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onComplete={handleComplete}
        config={{
          allowErrors: false,
          enableRetry: true,
          autoStart: true
        }}
      />
    </div>
  );
};

export default SystemCheckDemo;