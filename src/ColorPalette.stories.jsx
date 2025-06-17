export default {
  title: 'Design System/Color Palette',
  parameters: {
    docs: {
      description: {
        component: 'Complete color palette based on primary color #611F69'
      }
    }
  }
};

const ColorSwatch = ({ name, value, description }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    marginBottom: '12px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #ddd6e3',
    background: 'white'
  }}>
    <div 
      style={{ 
        width: '80px', 
        height: '60px', 
        backgroundColor: value,
        flexShrink: 0
      }} 
    />
    <div style={{ padding: '12px', flex: 1 }}>
      <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
        {name}
      </div>
      <div style={{ fontSize: '12px', color: '#6b5671', fontFamily: 'monospace' }}>
        {value}
      </div>
      {description && (
        <div style={{ fontSize: '12px', color: '#8a7490', marginTop: '4px' }}>
          {description}
        </div>
      )}
    </div>
  </div>
);

const ColorSection = ({ title, colors }) => (
  <div style={{ marginBottom: '32px' }}>
    <h3 style={{ 
      fontSize: '18px', 
      fontWeight: 600, 
      marginBottom: '16px',
      color: '#2a1f35'
    }}>
      {title}
    </h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
      {colors.map((color, index) => (
        <ColorSwatch key={index} {...color} />
      ))}
    </div>
  </div>
);

export const CompleteColorPalette = () => {
  const primaryColors = [
    { name: 'Primary 950', value: '#2d0e33', description: 'Darkest primary - Headers, emphasized text' },
    { name: 'Primary 900', value: '#3f1447', description: 'Very dark primary - Dark backgrounds' },
    { name: 'Primary 800', value: '#4d1a54', description: 'Dark primary - Pressed states' },
    { name: 'Primary 700', value: '#5a1f60', description: 'Medium dark - Hover states' },
    { name: 'Primary 600', value: '#611F69', description: 'Base primary - Buttons, links, borders' },
    { name: 'Primary 500', value: '#7a3a83', description: 'Medium primary - Secondary elements' },
    { name: 'Primary 400', value: '#9555a0', description: 'Light primary - Disabled states' },
    { name: 'Primary 300', value: '#b575c2', description: 'Lighter primary - Subtle elements' },
    { name: 'Primary 200', value: '#d4a3dd', description: 'Very light primary - Backgrounds' },
    { name: 'Primary 100', value: '#ebd4ef', description: 'Lightest primary - Focus rings' },
    { name: 'Primary 50', value: '#f7edf8', description: 'Ultra light - Page backgrounds' },
    { name: 'Primary 25', value: '#fdf9fe', description: 'Near white - Card backgrounds' },
  ];

  const neutralColors = [
    { name: 'Neutral 950', value: '#1a1625', description: 'Darkest neutral - High contrast text' },
    { name: 'Neutral 900', value: '#2a1f35', description: 'Very dark - Main text' },
    { name: 'Neutral 800', value: '#3d2d47', description: 'Dark neutral - Headings' },
    { name: 'Neutral 700', value: '#524159', description: 'Medium dark - Body text' },
    { name: 'Neutral 600', value: '#6b5671', description: 'Medium neutral - Secondary text' },
    { name: 'Neutral 500', value: '#8a7490', description: 'Mid neutral - Placeholders' },
    { name: 'Neutral 400', value: '#a695b0', description: 'Light neutral - Disabled text' },
    { name: 'Neutral 300', value: '#c4b8cd', description: 'Lighter neutral - Borders' },
    { name: 'Neutral 200', value: '#ddd6e3', description: 'Very light - Dividers' },
    { name: 'Neutral 100', value: '#efebf2', description: 'Ultra light - Backgrounds' },
    { name: 'Neutral 50', value: '#f8f6fa', description: 'Near white - Page backgrounds' },
    { name: 'Neutral 25', value: '#fcfbfd', description: 'Almost white - Card backgrounds' },
  ];

  const accentColors = [
    { name: 'Teal 600', value: '#0f766e', description: 'Dark teal - Success actions' },
    { name: 'Teal 500', value: '#14b8a6', description: 'Base teal - Info elements' },
    { name: 'Teal 400', value: '#2dd4bf', description: 'Light teal - Highlights' },
    { name: 'Teal 100', value: '#cffafe', description: 'Very light teal - Backgrounds' },
    { name: 'Orange 600', value: '#ea580c', description: 'Dark orange - Warning actions' },
    { name: 'Orange 500', value: '#f97316', description: 'Base orange - Accent elements' },
    { name: 'Orange 400', value: '#fb923c', description: 'Light orange - Highlights' },
    { name: 'Orange 100', value: '#ffedd5', description: 'Very light orange - Backgrounds' },
  ];

  const semanticColors = [
    { name: 'Success 700', value: '#027a48', description: 'Dark success - Text, icons' },
    { name: 'Success 600', value: '#039855', description: 'Base success - Buttons' },
    { name: 'Success 500', value: '#12b76a', description: 'Medium success - Highlights' },
    { name: 'Success 100', value: '#d1fadf', description: 'Light success - Backgrounds' },
    { name: 'Error 700', value: '#b42318', description: 'Dark error - Text, icons' },
    { name: 'Error 600', value: '#d92d20', description: 'Base error - Buttons' },
    { name: 'Error 500', value: '#f04438', description: 'Medium error - Highlights' },
    { name: 'Error 100', value: '#fee4e2', description: 'Light error - Backgrounds' },
    { name: 'Warning 700', value: '#b54708', description: 'Dark warning - Text, icons' },
    { name: 'Warning 600', value: '#dc6803', description: 'Base warning - Buttons' },
    { name: 'Warning 500', value: '#f79009', description: 'Medium warning - Highlights' },
    { name: 'Warning 100', value: '#fef0c7', description: 'Light warning - Backgrounds' },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: '#611F69' }}>
          Color Palette
        </h1>
        <p style={{ fontSize: '16px', color: '#6b5671', lineHeight: 1.5 }}>
          Complete color system based on primary color #611F69 with proper visual hierarchy and accessibility considerations.
        </p>
      </div>

      <ColorSection title="Primary Colors" colors={primaryColors} />
      <ColorSection title="Neutral Colors" colors={neutralColors} />
      <ColorSection title="Accent Colors" colors={accentColors} />
      <ColorSection title="Semantic Colors" colors={semanticColors} />

      <div style={{ 
        marginTop: '48px', 
        padding: '24px', 
        background: '#f7edf8',
        borderRadius: '12px',
        border: '1px solid #d4a3dd'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#611F69' }}>
          Usage Guidelines
        </h3>
        <ul style={{ color: '#524159', lineHeight: 1.6, paddingLeft: '20px' }}>
          <li><strong>Primary 600</strong> is the main brand color for buttons, links, and key interactive elements</li>
          <li><strong>Neutral colors</strong> create a warm gray palette that complements the purple primary</li>
          <li><strong>Accent colors</strong> (teal & orange) provide complementary highlights and variety</li>
          <li><strong>Semantic colors</strong> maintain accessibility standards for success, error, and warning states</li>
          <li>All colors meet WCAG AA contrast requirements when used appropriately</li>
        </ul>
      </div>
    </div>
  );
};

export const ButtonColorExamples = () => (
  <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif' }}>
    <h2 style={{ marginBottom: '24px', color: '#611F69' }}>Button Color Applications</h2>
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
        border: '1px solid #611F69',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 500
      }}>
        Outline Button
      </button>
      <button style={{
        background: '#039855',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 500
      }}>
        Success Button
      </button>
      <button style={{
        background: '#d92d20',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 500
      }}>
        Error Button
      </button>
    </div>
  </div>
);