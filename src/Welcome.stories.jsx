import React from 'react';
import { Button, Card, Input, Selector } from './components';

export default {
  title: 'Welcome',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Welcome to our comprehensive React Component Library! This library provides everything you need to build consistent, accessible question flow applications.',
      },
    },
  },
};

export const ComponentLibrary = {
  render: () => (
    <div style={{ 
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'var(--font-family-base, Inter, sans-serif)'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: '700', 
          color: 'var(--color-text-primary, #101828)',
          margin: '0 0 16px 0'
        }}>
          Component Library
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: 'var(--color-text-secondary, #667085)',
          margin: '0 0 32px 0',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          A comprehensive collection of reusable React components for building consistent and accessible question flow applications.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Button variant="primary" size="large">Get Started</Button>
          <Button variant="outline" size="large">View Components</Button>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px',
        marginBottom: '60px'
      }}>
        <Card variant="elevated" padding="lg">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              backgroundColor: 'var(--color-primary-100, #f4ebff)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              🎨
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
              Consistent Design
            </h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary, #667085)', fontSize: '14px' }}>
              All components follow the same design system with consistent colors, typography, and spacing.
            </p>
          </div>
        </Card>

        <Card variant="elevated" padding="lg">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              backgroundColor: 'var(--color-success-100, #d1fadf)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              ♿
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
              Accessibility First
            </h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary, #667085)', fontSize: '14px' }}>
              Built with ARIA attributes, keyboard navigation, and screen reader support out of the box.
            </p>
          </div>
        </Card>

        <Card variant="elevated" padding="lg">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              backgroundColor: 'var(--color-warning-100, #fef0c7)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              📱
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
              Responsive Design
            </h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary, #667085)', fontSize: '14px' }}>
              Mobile-first responsive components that work perfectly on all screen sizes.
            </p>
          </div>
        </Card>
      </div>

      {/* Component Preview */}
      <Card variant="outlined" padding="lg">
        <h2 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: '600' }}>
          Component Preview
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Buttons */}
          <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Buttons</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </div>

          {/* Inputs */}
          <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Inputs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Input label="Name" placeholder="Enter your name" />
              <Input label="Email" type="email" placeholder="Enter your email" />
            </div>
          </div>

          {/* Selector */}
          <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Selector</h4>
            <Selector
              variant="single"
              options={[
                { value: 'easy', label: 'Easy' },
                { value: 'medium', label: 'Medium' },
                { value: 'hard', label: 'Hard' }
              ]}
              selectedValue="medium"
              onSelectionChange={() => {}}
              layout="inline"
            />
          </div>
        </div>
      </Card>

      {/* Getting Started */}
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '32px', fontWeight: '600' }}>
          Ready to Build?
        </h2>
        <p style={{ 
          margin: '0 0 32px 0', 
          fontSize: '18px', 
          color: 'var(--color-text-secondary, #667085)' 
        }}>
          Explore the component library and start building consistent UIs today.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Button variant="primary" size="large">Browse Components</Button>
          <Button variant="outline" size="large">View Documentation</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An overview of the component library showcasing key features and component examples.',
      },
    },
  },
};