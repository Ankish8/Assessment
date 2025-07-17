import React, { useState } from 'react';
import SystemCheckFlow from './SystemCheckFlow';

export default {
  title: 'Components/SystemCheckFlow',
  component: SystemCheckFlow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# SystemCheckFlow Component

A comprehensive system check modal that guides users through validating their system requirements before starting an interview or assessment.

## Features

- **Multi-step flow**: 5 progressive steps for complete system validation
- **Real-time checks**: Browser, camera, microphone, and speaker detection
- **Camera preview**: Live video feed for setup verification
- **Audio recording test**: Voice recording with transcript verification
- **Internet speed check**: Connection quality assessment
- **Guidelines and consent**: Camera setup instructions and terms acceptance
- **Error handling**: Graceful error states with retry mechanisms
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive design**: Mobile-optimized layout
- **Modern UI**: Consistent with design system standards

## Use Cases

- Pre-interview system validation
- Assessment platform readiness check
- Video conferencing setup
- Online proctoring preparation
- Webinar technical verification

## Step Breakdown

1. **System Check**: Validates browser compatibility, camera, microphone, and speakers
2. **Camera Guidelines**: Shows setup instructions and collects consent
3. **Internet Speed Check**: Tests connection quality and provides recommendations
4. **Audio Check**: Records test phrase for audio verification
5. **Final Confirmation**: Summary and final readiness confirmation
        `
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is visible'
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when modal is closed'
    },
    onComplete: {
      action: 'onComplete',
      description: 'Callback when all checks are completed'
    },
    config: {
      control: 'object',
      description: 'Configuration options for the component'
    }
  }
};

// Default story
export const Default = {
  args: {
    isOpen: true,
    config: {
      allowErrors: false,
      skipSteps: [],
      customValidation: {}
    }
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    
    const handleClose = () => {
      setIsOpen(false);
      args.onClose?.();
    };
    
    const handleComplete = () => {
      console.log('System check completed successfully!');
      args.onComplete?.();
      setIsOpen(false);
    };
    
    const handleOpenModal = () => {
      setIsOpen(true);
    };
    
    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          padding: '2rem',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>
            System Check Flow Demo
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
            Click the button below to start the system validation process
          </p>
          <button
            onClick={handleOpenModal}
            style={{
              backgroundColor: '#611F69',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#7C3F86'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#611F69'}
          >
            Start System Check
          </button>
        </div>
        
        <SystemCheckFlow
          {...args}
          isOpen={isOpen}
          onClose={handleClose}
          onComplete={handleComplete}
        />
      </div>
    );
  }
};

// Story with error simulation
export const WithErrors = {
  args: {
    ...Default.args,
    config: {
      allowErrors: true,
      simulateErrors: {
        camera: true,
        microphone: false,
        browser: false
      }
    }
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the component behavior when some system checks fail. Users can still proceed with warnings.'
      }
    }
  }
};

// Story starting from specific step
export const AudioCheckStep = {
  args: {
    ...Default.args,
    config: {
      startStep: 3, // Start from audio check
      allowErrors: false
    }
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Shows the audio check step directly for testing recording functionality.'
      }
    }
  }
};

// Story with custom configuration
export const CustomConfiguration = {
  args: {
    ...Default.args,
    config: {
      allowErrors: false,
      skipSteps: ['internet-check'],
      customMessages: {
        browserError: 'Please upgrade to a supported browser',
        cameraError: 'Camera access is required for this assessment'
      },
      audioTestPhrase: 'This is a custom test phrase for recording',
      minInternetSpeed: 3.0
    }
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Example of customizing the component with specific configuration options.'
      }
    }
  }
};

// Interactive playground
export const InteractiveDemo = {
  args: {
    isOpen: false
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState({
      allowErrors: false,
      skipSteps: [],
      startStep: 0
    });
    
    const [logs, setLogs] = useState([]);
    
    const addLog = (message) => {
      setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };
    
    const handleClose = () => {
      setIsOpen(false);
      addLog('Modal closed');
    };
    
    const handleComplete = () => {
      addLog('System check completed successfully!');
      setIsOpen(false);
    };
    
    const handleConfigChange = (key, value) => {
      setConfig(prev => ({ ...prev, [key]: value }));
    };
    
    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Control Panel */}
          <div style={{ 
            padding: '1.5rem',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Controls</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <button
                onClick={() => setIsOpen(true)}
                disabled={isOpen}
                style={{
                  backgroundColor: isOpen ? '#e5e7eb' : '#611F69',
                  color: isOpen ? '#9ca3af' : 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: isOpen ? 'not-allowed' : 'pointer',
                  width: '100%'
                }}
              >
                {isOpen ? 'Modal Open' : 'Start System Check'}
              </button>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Configuration:
              </label>
              
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={config.allowErrors}
                    onChange={(e) => handleConfigChange('allowErrors', e.target.checked)}
                  />
                  <span style={{ fontSize: '0.75rem' }}>Allow proceeding with errors</span>
                </label>
              </div>
              
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.75rem',
                  marginBottom: '0.25rem',
                  color: '#6b7280'
                }}>
                  Start from step:
                </label>
                <select
                  value={config.startStep}
                  onChange={(e) => handleConfigChange('startStep', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem'
                  }}
                >
                  <option value={0}>1. System Check</option>
                  <option value={1}>2. Camera Guidelines</option>
                  <option value={2}>3. Internet Check</option>
                  <option value={3}>4. Audio Check</option>
                  <option value={4}>5. Final Confirmation</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={() => setLogs([])}
              style={{
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Clear Logs
            </button>
          </div>
          
          {/* Event Logs */}
          <div style={{ 
            padding: '1.5rem',
            backgroundColor: '#1f2937',
            borderRadius: '8px',
            color: '#f9fafb'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#f9fafb' }}>Event Logs</h3>
            <div style={{
              backgroundColor: '#111827',
              padding: '1rem',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              height: '200px',
              overflowY: 'auto'
            }}>
              {logs.length === 0 ? (
                <div style={{ color: '#6b7280', fontStyle: 'italic' }}>
                  No events yet...
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} style={{ marginBottom: '0.25rem' }}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <SystemCheckFlow
          isOpen={isOpen}
          onClose={handleClose}
          onComplete={handleComplete}
          config={config}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with controls and event logging for testing different configurations and behaviors.'
      }
    }
  }
};

// Accessibility testing story
export const AccessibilityTest = {
  args: {
    ...Default.args
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Use this story to test keyboard navigation, screen reader compatibility, and other accessibility features.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    // This could include automated accessibility tests
    // For now, it serves as a marker for manual testing
  }
};