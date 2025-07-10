export default {
  title: 'Design System/Accessibility Test',
  parameters: {
    docs: {
      description: {
        component: 'Accessibility testing for color contrast and readability'
      }
    }
  }
};

const ContrastTest = ({ foreground, background, label }) => {
  // Calculate contrast ratio (simplified version)
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const getContrastRatio = (hex1, hex2) => {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };
  
  const ratio = getContrastRatio(foreground, background);
  const isAACompliant = ratio >= 4.5;
  const isAAACompliant = ratio >= 7;
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      marginBottom: '8px',
      borderRadius: '8px',
      border: '1px solid #ddd6e3'
    }}>
      <div style={{
        background: background,
        color: foreground,
        padding: '16px 24px',
        borderRadius: '6px',
        marginRight: '16px',
        minWidth: '200px',
        fontWeight: 500
      }}>
        {label}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
          Contrast Ratio: {ratio.toFixed(2)}:1
        </div>
        <div style={{ fontSize: '12px', color: '#6b5671' }}>
          <span style={{ 
            color: isAAACompliant ? '#039855' : isAACompliant ? '#dc6803' : '#d92d20',
            fontWeight: 600 
          }}>
            {isAAACompliant ? 'AAA ✓' : isAACompliant ? 'AA ✓' : 'Fail ✗'}
          </span>
          {' '}
          <span>
            {foreground} on {background}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ColorContrastTests = () => {
  const tests = [
    // Primary colors on white
    { foreground: '#611F69', background: '#ffffff', label: 'Primary 600 on White' },
    { foreground: '#5a1f60', background: '#ffffff', label: 'Primary 700 on White' },
    { foreground: '#4d1a54', background: '#ffffff', label: 'Primary 800 on White' },
    
    // White on primary colors
    { foreground: '#ffffff', background: '#611F69', label: 'White on Primary 600' },
    { foreground: '#ffffff', background: '#5a1f60', label: 'White on Primary 700' },
    { foreground: '#ffffff', background: '#4d1a54', label: 'White on Primary 800' },
    
    // Text on backgrounds
    { foreground: '#2a1f35', background: '#ffffff', label: 'Text Primary on White' },
    { foreground: '#6b5671', background: '#ffffff', label: 'Text Secondary on White' },
    { foreground: '#8a7490', background: '#ffffff', label: 'Text Tertiary on White' },
    
    // Text on colored backgrounds
    { foreground: '#2a1f35', background: '#f7edf8', label: 'Text Primary on Primary 50' },
    { foreground: '#6b5671', background: '#f8f6fa', label: 'Text Secondary on Neutral 50' },
    
    // Semantic colors
    { foreground: '#039855', background: '#ffffff', label: 'Success 600 on White' },
    { foreground: '#d92d20', background: '#ffffff', label: 'Error 600 on White' },
    { foreground: '#dc6803', background: '#ffffff', label: 'Warning 600 on White' },
    
    // White on semantic colors
    { foreground: '#ffffff', background: '#039855', label: 'White on Success 600' },
    { foreground: '#ffffff', background: '#d92d20', label: 'White on Error 600' },
    { foreground: '#ffffff', background: '#dc6803', label: 'White on Warning 600' },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: '#611F69' }}>
          Color Contrast Tests
        </h1>
        <p style={{ fontSize: '16px', color: '#6b5671', lineHeight: 1.5, marginBottom: '16px' }}>
          Testing color combinations for WCAG AA (4.5:1) and AAA (7:1) compliance
        </p>
        <div style={{ 
          padding: '16px', 
          background: '#f7edf8', 
          borderRadius: '8px',
          border: '1px solid #d4a3dd',
          fontSize: '14px',
          color: '#524159'
        }}>
          <strong>WCAG Guidelines:</strong> AA (4.5:1) for normal text, AAA (7:1) for enhanced accessibility
        </div>
      </div>

      <div>
        {tests.map((test, index) => (
          <ContrastTest key={index} {...test} />
        ))}
      </div>
    </div>
  );
};

export const ComponentAccessibilityDemo = () => (
  <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif' }}>
    <h2 style={{ marginBottom: '24px', color: '#611F69' }}>Component Accessibility Demo</h2>
    
    <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      {/* Button Examples */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#2a1f35' }}>Buttons</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button style={{
            background: '#611F69',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500
          }}>
            Primary Button
          </button>
          <button style={{
            background: 'transparent',
            color: '#611F69',
            border: '2px solid #611F69',
            padding: '10px 22px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500
          }}>
            Outline Button
          </button>
          <button style={{
            background: '#f7edf8',
            color: '#611F69',
            border: '1px solid #d4a3dd',
            padding: '11px 23px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500
          }}>
            Subtle Button
          </button>
        </div>
      </div>

      {/* Form Examples */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#2a1f35' }}>Form Elements</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '4px', 
              fontSize: '14px', 
              fontWeight: 500,
              color: '#2a1f35'
            }}>
              Text Input
            </label>
            <input 
              type="text" 
              placeholder="Enter text here"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #c4b8cd',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#2a1f35'
              }}
            />
          </div>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '4px', 
              fontSize: '14px', 
              fontWeight: 500,
              color: '#2a1f35'
            }}>
              Focused Input
            </label>
            <input 
              type="text" 
              placeholder="Focused state"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #611F69',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#2a1f35',
                boxShadow: '0 0 0 4px #ebd4ef'
              }}
            />
          </div>
        </div>
      </div>

      {/* Status Examples */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#2a1f35' }}>Status Messages</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            padding: '12px',
            borderRadius: '6px',
            background: '#d1fadf',
            border: '1px solid #6ce9a6',
            color: '#027a48',
            fontSize: '14px'
          }}>
            ✓ Success: Operation completed successfully
          </div>
          <div style={{
            padding: '12px',
            borderRadius: '6px',
            background: '#fee4e2',
            border: '1px solid #fda29b',
            color: '#b42318',
            fontSize: '14px'
          }}>
            ✗ Error: Something went wrong
          </div>
          <div style={{
            padding: '12px',
            borderRadius: '6px',
            background: '#fef0c7',
            border: '1px solid #fed7aa',
            color: '#b54708',
            fontSize: '14px'
          }}>
            ⚠ Warning: Please review your input
          </div>
        </div>
      </div>
    </div>
  </div>
);