import React from 'react';
import { Button } from '@heroui/react';

const FreshHeroUITest = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8">Fresh Hero UI Test</h1>
        
        <div className="space-y-4">
          {/* Basic Hero UI Button */}
          <Button color="primary" size="lg">
            Primary Button
          </Button>
          
          {/* Different variants */}
          <Button color="secondary" variant="bordered">
            Secondary Bordered
          </Button>
          
          <Button color="success" radius="full">
            Success Rounded
          </Button>
          
          {/* Test basic Tailwind */}
          <div className="bg-blue-500 text-white p-4 rounded-lg mt-4">
            Tailwind Test: This should be blue
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreshHeroUITest;