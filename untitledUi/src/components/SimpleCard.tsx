import React, { useState } from 'react';
import { Box, Button, Heading, Text, Flex, Avatar, Label } from '@vibe/core';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '@vibe/core/next';

interface SimpleCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  type?: 'primary' | 'success' | 'warning' | 'danger';
  showBadge?: boolean;
  badgeText?: string;
}

export const SimpleCard: React.FC<SimpleCardProps> = ({
  title = "Welcome to Vibe",
  description = "This is a modern card component built with the Vibe design system. It demonstrates proper use of Flex, Box, Typography, and interactive elements with contemporary styling.",
  buttonText = "Get Started",
  onButtonClick = () => console.log("Button clicked!"),
  type = "primary",
  showBadge = true,
  badgeText = "New"
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePrimaryAction = () => {
    onButtonClick();
    setIsModalOpen(false);
  };

  return (
    <>
      <Box
        border
        rounded="medium"
        shadow="large"
        padding="large"
        backgroundColor="primaryBackgroundColor"
        style={{ 
          maxWidth: '400px', 
          margin: '20px auto',
          transition: 'all 0.2s ease-in-out',
          cursor: 'pointer'
        }}
        className="hover:shadow-xl"
      >
        <div onClick={handleCardClick} style={{ width: '100%', height: '100%' }}>
          {/* Header with Badge */}
          <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
            <Flex align="center" gap="small">
              <Avatar 
                size="small" 
                backgroundColor="primary"
                text="V"
              />
              <Heading type="h3" weight="medium" color="primary">
                {title}
              </Heading>
            </Flex>
            {showBadge && (
              <Label
                text={badgeText}
                color={type === 'primary' ? 'positive' : type === 'success' ? 'positive' : type === 'warning' ? 'working_orange' : 'negative'}
                size="small"
                kind="fill"
              />
            )}
          </Flex>
          
          {/* Content */}
          <Text 
            type="text2" 
            color="secondary" 
            style={{ marginBottom: '24px', lineHeight: '1.5' }}
          >
            {description}
          </Text>
          
          {/* Action Hint */}
          <Flex justify="center">
            <Text type="text3" color="secondary" style={{ fontStyle: 'italic' }}>
              Click to view details
            </Text>
          </Flex>
        </div>
      </Box>

      {/* Modal */}
      <Modal
        id={`modal-${title.replace(/\s+/g, '-').toLowerCase()}`}
        show={isModalOpen}
        size="medium"
        onClose={handleModalClose}
      >
        <ModalHeader
          title={title}
          description={`Learn more about ${title.toLowerCase()} and explore all available options.`}
        />
        
        <ModalContent>
          <Flex direction="column" gap="medium">
            <Text type="text2" style={{ lineHeight: '1.6' }}>
              {description}
            </Text>
            
            <Box padding="medium" backgroundColor="secondaryBackgroundColor" rounded="small">
              <Heading type="h3" weight="medium" color="primary" style={{ marginBottom: '8px' }}>
                Features
              </Heading>
              <Text type="text2" color="secondary">
                • Modern design with Vibe components<br/>
                • Responsive layout and animations<br/>
                • Accessibility-first approach<br/>
                • Customizable themes and variants
              </Text>
            </Box>
            
            <Flex align="center" gap="small">
              <Avatar 
                size="medium" 
                backgroundColor="primary"
                text="V"
              />
              <div>
                <Text type="text2" weight="medium">Vibe Design System</Text>
                <Text type="text3" color="secondary">Professional UI Components</Text>
              </div>
            </Flex>
          </Flex>
        </ModalContent>
        
        <ModalFooter
          primaryButton={{
            text: buttonText,
            onClick: handlePrimaryAction
          }}
          secondaryButton={{
            text: 'Cancel',
            onClick: handleModalClose
          }}
        />
      </Modal>
    </>
  );
};

export default SimpleCard;