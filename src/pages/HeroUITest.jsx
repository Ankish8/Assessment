import React from 'react';
import { Button } from '@heroui/react';
import '../tailwind-test.css';

const HeroUITest = () => {
  const handleButtonClick = () => {
    alert('Hero UI Button Clicked!');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px'
    }}>
      <h1 style={{
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333'
      }}>
        Hero UI Test Page
      </h1>
      
      <button 
        onClick={handleButtonClick}
        style={{
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: '500',
          marginBottom: '20px'
        }}
      >
        Basic HTML Button First
      </button>
      
      <Button 
        color="primary"
        size="lg"
        onPress={() => alert('Hero UI Button Clicked!')}
        className="mx-4"
      >
        Hero UI Button
      </Button>
      
      <div className="mt-4 p-4 bg-blue-500 text-white rounded-lg">
        Tailwind Test: If this has blue background, Tailwind is working
      </div>
    </div>
  );
};

export default HeroUITest;