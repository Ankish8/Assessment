import React from 'react';
import CompactHeader from './components/common/CompactHeader/CompactHeader';
import CompactProgressSteps from './components/common/CompactProgressSteps/CompactProgressSteps';
import InfoText from './components/common/InfoText/InfoText';
import CustomFooter from './components/common/CustomFooter/CustomFooter';
import Button from './components/common/Button/Button';
import Card from './components/common/Card/Card';

const sampleSteps = [
  { id: 'step-1', label: 'Question Statement' },
  { id: 'step-2', label: 'Media & Resources' },
  { id: 'step-3', label: 'Question Details' },
  { id: 'step-4', label: 'Evaluation Parameters' },
  { id: 'step-5', label: 'Solution Details' },
];

export default {
  title: 'Design System/Unified Design System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Unified Design System

A comprehensive design system implementation with consistent shadows, spacing, and visual hierarchy across all components.

## Key Features

### **🎯 Unified Shadow System**
All components use the same shadow: \`0 1px 3px rgba(0, 0, 0, 0.08)\`

### **📏 Container Alignment**
All components share the same max-width and padding alignment:
- **Max-width**: \`var(--container-max-width)\`
- **Padding**: \`var(--spacing-6)\` desktop, \`var(--spacing-4)\` mobile

### **🎨 Consistent Visual Hierarchy**
- **Border Radius**: \`var(--radius-lg)\` for cohesive appearance
- **Spacing**: Design token-based spacing throughout
- **Colors**: Semantic color system with primary brand colors
- **Typography**: Consistent font sizes and weights

### **📱 Responsive Design**
- Mobile-first approach with proper breakpoints
- Optimized spacing and interactions for all screen sizes
- Progressive enhancement for larger screens

## Components

### **CompactHeader**
Unified header with consistent shadow and container alignment.

### **CompactProgressSteps**
Horizontal progress stepper with improved spacing and visual states.

### **InfoText**
Flexible information component with multiple variants and icon support.

### **CustomFooter**
Container-aligned footer with validation alerts and action buttons.

## Implementation Notes

This design system was created to solve visual inconsistencies across the application. All components now share:

1. **Shadow consistency** - Same shadow across all elevated elements
2. **Container alignment** - Consistent max-width and padding
3. **Visual hierarchy** - Proper spacing and typography scales
4. **Responsive behavior** - Mobile-optimized interactions

## Usage

These components work together to create cohesive page layouts. Use them in combination for assessment pages, forms, and other content areas.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export const FullPageLayout = {
  render: () => (
    <div style={{ minHeight: '100vh', background: 'var(--color-background-secondary)' }}>
      <CompactHeader 
        title="Speaking Assessment" 
        icon="fas fa-microphone"
        actions={<Button variant="primary" size="sm">Save</Button>}
      />
      
      <CompactProgressSteps 
        steps={sampleSteps}
        currentStep={0}
      />
      
      <div style={{ 
        maxWidth: 'var(--container-max-width)', 
        margin: '0 auto', 
        padding: 'var(--container-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <Card variant="elevated" padding="lg">
          <div style={{ 
            borderBottom: '1px solid var(--color-border-primary)',
            paddingBottom: 'var(--spacing-4)',
            marginBottom: 'var(--spacing-6)'
          }}>
            <div style={{ marginBottom: 'var(--spacing-4)' }}>
              <h2 style={{ 
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                margin: 0
              }}>
                Add Speaking Prompt
              </h2>
            </div>
            <InfoText variant="default" icon="fas fa-info-circle">
              <p>
                Enter the text that candidates will read aloud for speaking assessment. 
                This content will be displayed to candidates during the assessment.
              </p>
            </InfoText>
          </div>
          
          <div style={{ 
            border: '1px solid var(--color-border-primary)',
            borderRadius: 'var(--radius-lg)',
            minHeight: '200px',
            padding: 'var(--spacing-4)',
            background: 'var(--color-background-primary)'
          }}>
            <p style={{ 
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--font-size-sm)',
              margin: 0
            }}>
              Content editor would go here...
            </p>
          </div>
        </Card>
        
        <CustomFooter 
          showValidationAlert={true}
          validationMessage="Please enter speaking content to continue"
        >
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary" disabled>Save & Continue</Button>
        </CustomFooter>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Full Page Layout

This story demonstrates how all unified design system components work together to create a cohesive page layout:

- **Header**: Unified shadow and container alignment
- **Progress Steps**: Consistent spacing and visual hierarchy
- **Content Card**: Proper shadow and border radius
- **Info Text**: Purple background with primary color icon
- **Footer**: Container-aligned with validation alerts

Notice how all components share the same shadow, container width, and visual styling.
        `,
      },
    },
  },
};

export const ShadowSystem = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px',
      padding: '24px',
      background: 'var(--color-background-secondary)',
      minHeight: '100vh'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2>Unified Shadow System</h2>
        <p>All components use: <code>0 1px 3px rgba(0, 0, 0, 0.08)</code></p>
      </div>
      
      <div style={{ 
        background: 'white',
        padding: '16px 24px',
        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        border: '1px solid var(--color-border-primary)',
        borderBottom: '1px solid var(--color-border-primary)'
      }}>
        <strong>Header Component</strong> - Unified shadow with top corners
      </div>
      
      <div style={{ 
        background: 'white',
        padding: '12px 24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        border: '1px solid var(--color-border-primary)',
        borderBottom: '1px solid var(--color-border-primary)'
      }}>
        <strong>Progress Steps Component</strong> - Consistent shadow
      </div>
      
      <div style={{ 
        background: 'white',
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        border: '1px solid var(--color-border-primary)'
      }}>
        <strong>Content Card Component</strong> - All corners rounded
      </div>
      
      <div style={{ 
        background: 'white',
        padding: '16px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        border: '1px solid var(--color-border-primary)',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <strong>Footer Component</strong> - Unified shadow with actions
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ padding: '4px 8px', fontSize: '12px' }}>Cancel</button>
          <button style={{ padding: '4px 8px', fontSize: '12px', background: 'var(--color-primary-600)', color: 'white', border: 'none', borderRadius: '4px' }}>Save</button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Shadow System Consistency

This story shows how all components use the same shadow value for visual consistency:

- **Same Shadow**: \`0 1px 3px rgba(0, 0, 0, 0.08)\`
- **Consistent Elevation**: All elevated elements feel cohesive
- **Subtle Depth**: Provides depth without being distracting
- **Professional Appearance**: Creates a polished, unified look

The shadow is subtle enough to not interfere with content but visible enough to create proper visual hierarchy.
        `,
      },
    },
  },
};

export const ContainerAlignment = {
  render: () => (
    <div style={{ background: 'var(--color-background-secondary)', minHeight: '100vh' }}>
      <div style={{ 
        background: 'white',
        padding: '16px var(--spacing-6)',
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        borderBottom: '1px solid var(--color-border-primary)'
      }}>
        <strong>Header</strong> - Container aligned with padding: var(--spacing-6)
      </div>
      
      <div style={{ 
        background: 'white',
        padding: '12px var(--spacing-6)',
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        borderBottom: '1px solid var(--color-border-primary)'
      }}>
        <strong>Progress Steps</strong> - Same container alignment
      </div>
      
      <div style={{ 
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        padding: 'var(--container-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ 
          background: 'white',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border-primary)'
        }}>
          <strong>Content Card</strong> - Within container padding
        </div>
        
        <div style={{ 
          background: 'white',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border-primary)'
        }}>
          <strong>Footer</strong> - Same container alignment
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Container Alignment

This story demonstrates perfect container alignment across all components:

- **Same Max-Width**: \`var(--container-max-width)\`
- **Consistent Padding**: \`var(--spacing-6)\` for header/steps, \`var(--container-padding)\` for content
- **Perfect Alignment**: All elements line up vertically
- **Unified Layout**: Creates a cohesive page structure

The alignment creates a professional, grid-based layout that feels intentional and polished.
        `,
      },
    },
  },
};

export const ResponsiveDesign = {
  render: () => (
    <div style={{ minHeight: '100vh', background: 'var(--color-background-secondary)' }}>
      <CompactHeader 
        title="Responsive Design" 
        icon="fas fa-mobile-alt"
      />
      
      <CompactProgressSteps 
        steps={sampleSteps}
        currentStep={1}
      />
      
      <div style={{ 
        maxWidth: 'var(--container-max-width)', 
        margin: '0 auto', 
        padding: 'var(--container-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <Card variant="elevated" padding="lg">
          <InfoText variant="info" icon="fas fa-info-circle">
            <p>
              This design system is fully responsive. On mobile devices, text labels hide, 
              buttons stack vertically, and padding adjusts for optimal touch interactions.
            </p>
          </InfoText>
        </Card>
        
        <CustomFooter>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Continue</Button>
        </CustomFooter>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: `
## Responsive Design

This story shows the responsive behavior of all unified design system components:

- **Header**: Text labels hide on mobile, icon remains visible
- **Progress Steps**: Step labels hide, only indicators shown
- **Content**: Padding adjusts for mobile screens
- **Footer**: Buttons stack vertically on mobile

The responsive design maintains usability across all screen sizes while preserving the unified visual system.
        `,
      },
    },
  },
};