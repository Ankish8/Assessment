import React, { useState } from 'react';
import SystemCheckFlow from '../components/common/SystemCheckFlow/SystemCheckFlow';

const SystemCheckDemo = () => {
  console.log('SystemCheckDemo component loaded');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completionData, setCompletionData] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message }]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCompletionData(null);
    addLog('Unified System Check Flow started');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    addLog('System Check Flow closed');
  };

  const handleComplete = (data) => {
    setCompletionData(data);
    setIsModalOpen(false);
    addLog('All system checks completed successfully!');
  };

  const clearLogs = () => {
    setLogs([]);
  };

  console.log('SystemCheckDemo render');
  
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
      {isModalOpen && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p>System Check Modal (Test)</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
      
      <SystemCheckFlow
        isOpen={false}
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