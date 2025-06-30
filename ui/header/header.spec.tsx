import React from 'react';
import { Header } from './header';

// Basic component validation tests for Header
export const TestHeaderComponent = () => {
  return (
    <Header title="Test Header" />
  );
};

export const TestHeaderWithoutBack = () => {
  return (
    <Header 
      title="Header Without Back Button" 
      showBackButton={false} 
    />
  );
};

export const TestHeaderCustomBack = () => {
  const handleBack = () => {
    console.log('Custom back handler triggered');
  };

  return (
    <Header 
      title="Custom Back Handler" 
      onBack={handleBack}
    />
  );
};

export const TestHeaderLongTitle = () => {
  return (
    <Header title="This is a very long title that should test how the header handles lengthy text content and responsive behavior" />
  );
};

export const TestHeaderEmpty = () => {
  return (
    <Header />
  );
};

export const TestHeaderWithClassName = () => {
  return (
    <Header 
      title="Header with Custom Class" 
      className="custom-header-class"
    />
  );
};

export const TestHeaderInteraction = () => {
  const [clicked, setClicked] = React.useState(false);
  
  const handleBack = () => {
    setClicked(true);
    console.log('Back button clicked');
  };

  return (
    <div>
      <Header 
        title={clicked ? "Back Button Clicked!" : "Click Back Button"} 
        onBack={handleBack}
      />
      {clicked && (
        <p style={{ color: '#611F69', marginTop: '16px' }}>
          ✓ Back button interaction working
        </p>
      )}
    </div>
  );
};