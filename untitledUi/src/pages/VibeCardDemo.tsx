import React from 'react';
import { SimpleCard } from '../components/SimpleCard';
import { Flex, Heading, Text } from '@vibe/core';

const VibeCardDemo: React.FC = () => {
  const handleButtonClick = () => {
    alert('Hello from the Vibe card!');
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Flex direction="column" align="center" gap="large" style={{ marginBottom: '40px' }}>
          <Heading type="h1" weight="bold" color="primary">
            Vibe Design System Cards
          </Heading>
          <Text type="text1" color="secondary" align="center">
            Modern card components built with Vibe's design system
          </Text>
        </Flex>
        
        <Flex wrap gap="large" justify="center">
          <SimpleCard
            title="Featured Card"
            description="This is a premium card with enhanced styling, avatars, badges, and multiple action buttons. Perfect for showcasing important content."
            buttonText="Get Started"
            onButtonClick={handleButtonClick}
            type="primary"
            showBadge={true}
            badgeText="Featured"
          />
          
          <SimpleCard
            title="Success Story"
            description="This card demonstrates a success variant with appropriate color theming and badge styling for positive messaging."
            buttonText="View Success"
            onButtonClick={() => console.log('Success card clicked!')}
            type="success"
            showBadge={true}
            badgeText="Success"
          />
          
          <SimpleCard
            title="Warning Notice"
            description="Important information card with warning styling. Great for alerts, notifications, or important announcements."
            buttonText="Acknowledge"
            onButtonClick={() => console.log('Warning card clicked!')}
            type="warning"
            showBadge={true}
            badgeText="Important"
          />
          
          <SimpleCard
            title="Minimal Card"
            description="A clean, minimal card without badges for simpler use cases where you want to focus on content."
            buttonText="Learn More"
            onButtonClick={() => console.log('Minimal card clicked!')}
            type="primary"
            showBadge={false}
          />
        </Flex>
      </div>
    </div>
  );
};

export default VibeCardDemo;