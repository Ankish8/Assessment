import React, { useState } from 'react';
// import SystemCheckFlow from '../components/common/SystemCheckFlow/SystemCheckFlow';

const SystemCheckDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
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
            padding: 0,
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            width: '90%',
            maxWidth: '42rem',
            maxHeight: '80vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              borderBottom: '1px solid #f0f0f0',
              height: '58px'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937'
              }}>
                System Check
              </h2>
              <button 
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>
            
            {/* Modal Content */}
            <div style={{
              padding: '1rem 1.5rem',
              flex: 1,
              overflowY: 'auto'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                {[1,2,3,4,5].map((step, index) => (
                  <div
                    key={step}
                    style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      borderRadius: '50%',
                      backgroundColor: index === 0 ? '#611F69' : '#e5e7eb',
                      margin: '0 0.25rem',
                      transform: index === 0 ? 'scale(1.4)' : 'scale(1)'
                    }}
                  />
                ))}
              </div>
              
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Check Your System
              </h3>
              
              <div style={{
                display: 'grid',
                gap: '0.75rem'
              }}>
                {[
                  { name: 'Browser', status: 'success', desc: 'Chrome 138, Required', badge: 'Browser supported' },
                  { name: 'Camera', status: 'success', desc: 'Required', badge: 'Device Found' },
                  { name: 'Microphone', status: 'success', desc: 'Required', badge: 'Device Found' },
                  { name: 'Speakers', status: 'success', desc: 'Required', badge: 'Device Found' }
                ].map((item, index) => (
                  <div key={item.name} style={{
                    display: 'flex',
                    gap: '0.875rem',
                    padding: '0.75rem',
                    backgroundColor: '#fafbfc',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      backgroundColor: '#ecfdf5',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10b981',
                      fontSize: '0.75rem',
                      marginTop: '0.125rem'
                    }}>
                      ✓
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.25rem'
                      }}>
                        <span style={{
                          fontSize: '0.95rem',
                          fontWeight: '500',
                          color: '#1f2937'
                        }}>
                          {item.name}
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          backgroundColor: '#ecfdf5',
                          color: '#10b981',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          fontWeight: '500'
                        }}>
                          {item.badge}
                        </span>
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#6b7280',
                        lineHeight: '1.3'
                      }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px 1.5rem 1rem 1.5rem',
              borderTop: 'none'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '0.875rem',
                  height: '0.875rem',
                  backgroundColor: '#ecfdf5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981',
                  fontSize: '0.625rem'
                }}>
                  ✓
                </div>
                <span style={{
                  fontSize: '0.875rem',
                  color: '#10b981',
                  fontWeight: '500'
                }}>
                  You are good to go.
                </span>
              </div>
              
              <button
                onClick={handleCloseModal}
                style={{
                  backgroundColor: '#611F69',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#7C3F86'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#611F69'}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* <SystemCheckFlow
        isOpen={false}
        onClose={handleCloseModal}
        onComplete={handleComplete}
        config={{
          allowErrors: false,
          enableRetry: true,
          autoStart: true
        }}
      /> */}
    </div>
  );
};

export default SystemCheckDemo;