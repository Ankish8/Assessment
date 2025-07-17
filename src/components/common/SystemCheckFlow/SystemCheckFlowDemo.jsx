import React, { useState } from 'react';
import SystemCheckFlow from './SystemCheckFlow';

const SystemCheckFlowDemo = () => {
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
    addLog('System check flow started');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    addLog('System check flow closed');
  };

  const handleComplete = (data) => {
    setCompletionData(data);
    setIsModalOpen(false);
    addLog('System check flow completed successfully');
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '3rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #611F69 0%, #7C3F86 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          margin: '0 0 1rem 0' 
        }}>
          System Check Flow Demo
        </h1>
        <p style={{ 
          fontSize: '1.125rem', 
          margin: '0 0 2rem 0',
          opacity: 0.9
        }}>
          A comprehensive system validation flow for interview and assessment platforms
        </p>
        <button
          onClick={handleOpenModal}
          disabled={isModalOpen}
          style={{
            backgroundColor: isModalOpen ? 'rgba(255,255,255,0.3)' : 'white',
            color: isModalOpen ? 'rgba(255,255,255,0.7)' : '#611F69',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isModalOpen ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: isModalOpen ? 'none' : '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          {isModalOpen ? 'System Check In Progress...' : 'Start System Check'}
        </button>
      </div>

      {/* Features Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{ 
          padding: '1.5rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            color: '#1e293b'
          }}>
            🔍 System Validation
          </h3>
          <p style={{ 
            color: '#64748b', 
            lineHeight: 1.6,
            margin: 0
          }}>
            Comprehensive checks for browser compatibility, camera, microphone, and speakers with real-time status updates.
          </p>
        </div>

        <div style={{ 
          padding: '1.5rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            color: '#1e293b'
          }}>
            📹 Camera Setup
          </h3>
          <p style={{ 
            color: '#64748b', 
            lineHeight: 1.6,
            margin: 0
          }}>
            Live camera preview with setup guidelines and terms acceptance for optimal interview conditions.
          </p>
        </div>

        <div style={{ 
          padding: '1.5rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            color: '#1e293b'
          }}>
            🎤 Audio Testing
          </h3>
          <p style={{ 
            color: '#64748b', 
            lineHeight: 1.6,
            margin: 0
          }}>
            Voice recording test with live transcript and verification to ensure audio quality and clarity.
          </p>
        </div>

        <div style={{ 
          padding: '1.5rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            color: '#1e293b'
          }}>
            🌐 Connection Check
          </h3>
          <p style={{ 
            color: '#64748b', 
            lineHeight: 1.6,
            margin: 0
          }}>
            Internet speed testing with quality assessment to ensure stable connection for the interview.
          </p>
        </div>

        <div style={{ 
          padding: '1.5rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            color: '#1e293b'
          }}>
            ♿ Accessible Design
          </h3>
          <p style={{ 
            color: '#64748b', 
            lineHeight: 1.6,
            margin: 0
          }}>
            Full keyboard navigation, screen reader support, and WCAG 2.1 AA compliance for inclusive experiences.
          </p>
        </div>

        <div style={{ 
          padding: '1.5rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            color: '#1e293b'
          }}>
          📱 Responsive
          </h3>
          <p style={{ 
            color: '#64748b', 
            lineHeight: 1.6,
            margin: 0
          }}>
            Mobile-first design that works seamlessly across all devices and screen sizes.
          </p>
        </div>
      </div>

      {/* Status and Logs */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Completion Status */}
        <div style={{ 
          padding: '1.5rem',
          backgroundColor: completionData ? '#ecfdf5' : '#f9fafb',
          borderRadius: '8px',
          border: `1px solid ${completionData ? '#bbf7d0' : '#e5e7eb'}`
        }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            color: completionData ? '#065f46' : '#374151'
          }}>
            {completionData ? '✅ Completion Status' : '⏳ Waiting for Completion'}
          </h3>
          
          {completionData ? (
            <div style={{ color: '#065f46' }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>
                System check completed successfully!
              </p>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                <p style={{ margin: '0.25rem 0' }}>✓ All system requirements verified</p>
                <p style={{ margin: '0.25rem 0' }}>✓ Audio and video ready</p>
                <p style={{ margin: '0.25rem 0' }}>✓ Internet connection stable</p>
                <p style={{ margin: '0.25rem 0' }}>✓ User consent obtained</p>
              </div>
            </div>
          ) : (
            <p style={{ color: '#6b7280', margin: 0 }}>
              Complete the system check flow to see the results here.
            </p>
          )}
        </div>

        {/* Activity Logs */}
        <div style={{ 
          padding: '1.5rem',
          backgroundColor: '#1f2937',
          borderRadius: '8px',
          color: '#f9fafb'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              margin: 0,
              color: '#f9fafb'
            }}>
              📊 Activity Logs
            </h3>
            <button
              onClick={clearLogs}
              style={{
                backgroundColor: '#374151',
                color: '#d1d5db',
                border: 'none',
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#374151'}
            >
              Clear
            </button>
          </div>
          
          <div style={{
            backgroundColor: '#111827',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontSize: '0.8rem',
            fontFamily: 'ui-monospace, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
            height: '180px',
            overflowY: 'auto',
            border: '1px solid #374151'
          }}>
            {logs.length === 0 ? (
              <div style={{ 
                color: '#6b7280', 
                fontStyle: 'italic',
                textAlign: 'center',
                paddingTop: '2rem'
              }}>
                No activity yet...
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} style={{ 
                  marginBottom: '0.5rem',
                  paddingBottom: '0.5rem',
                  borderBottom: index < logs.length - 1 ? '1px solid #374151' : 'none'
                }}>
                  <span style={{ color: '#9ca3af' }}>[{log.timestamp}]</span>{' '}
                  <span style={{ color: '#d1d5db' }}>{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#374151'
        }}>
          🛠 Technical Implementation
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem'
        }}>
          <div>
            <h4 style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Component Architecture
            </h4>
            <ul style={{ 
              fontSize: '0.8rem', 
              color: '#6b7280', 
              paddingLeft: '1rem',
              margin: 0
            }}>
              <li>React functional component with hooks</li>
              <li>CSS modules for scoped styling</li>
              <li>Portal-based modal rendering</li>
              <li>Step-based state management</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Browser APIs Used
            </h4>
            <ul style={{ 
              fontSize: '0.8rem', 
              color: '#6b7280', 
              paddingLeft: '1rem',
              margin: 0
            }}>
              <li>MediaDevices.getUserMedia()</li>
              <li>MediaRecorder API</li>
              <li>Web Audio API</li>
              <li>Navigator.userAgent detection</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Accessibility Features
            </h4>
            <ul style={{ 
              fontSize: '0.8rem', 
              color: '#6b7280', 
              paddingLeft: '1rem',
              margin: 0
            }}>
              <li>ARIA labels and descriptions</li>
              <li>Keyboard navigation support</li>
              <li>Focus management</li>
              <li>Screen reader compatibility</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Error Handling
            </h4>
            <ul style={{ 
              fontSize: '0.8rem', 
              color: '#6b7280', 
              paddingLeft: '1rem',
              margin: 0
            }}>
              <li>Graceful permission failures</li>
              <li>Retry mechanisms</li>
              <li>Fallback UI states</li>
              <li>User-friendly error messages</li>
            </ul>
          </div>
        </div>
      </div>

      {/* System Check Modal */}
      <SystemCheckFlow
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onComplete={handleComplete}
        config={{
          allowErrors: false,
          enableBrowserCheck: true,
          enableCameraCheck: true,
          enableMicrophoneCheck: true,
          enableSpeakerCheck: true,
          enableInternetCheck: true,
          enableAudioCheck: true
        }}
      />
    </div>
  );
};

export default SystemCheckFlowDemo;