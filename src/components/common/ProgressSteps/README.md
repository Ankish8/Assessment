# Progress Steps Components

A comprehensive progress indicator system for multi-step workflows with two variants optimized for different use cases.

## Quick Start

```jsx
import CompactProgressSteps from './CompactProgressSteps';

const steps = [
  { id: 'step-1', label: 'Question Statement' },
  { id: 'step-2', label: 'Media & Resources' },
  { id: 'step-3', label: 'Question Details' },
  { id: 'step-4', label: 'Evaluation Parameters' },
  { id: 'step-5', label: 'Solution Details' },
];

function MyComponent() {
  return (
    <CompactProgressSteps 
      steps={steps} 
      currentStep={2} // 0-based index
    />
  );
}
```

## Component Variants

### 1. CompactProgressSteps (Recommended)
**Use for:** New implementations, mobile-responsive applications, question flow interfaces

**Features:**
- Horizontal layout optimized for all screen sizes
- Unified design system compliance
- Consistent shadows and spacing
- Mobile-first responsive design
- Accessibility compliant

```jsx
<CompactProgressSteps 
  steps={steps} 
  currentStep={2} 
  className="custom-class"
/>
```

### 2. ProgressSteps (Legacy)
**Use for:** Existing implementations that require vertical layout

**Features:**
- Traditional vertical progress steps
- Basic styling without design system alignment
- Suitable for simple step indicators

```jsx
<ProgressSteps 
  steps={steps} 
  currentStep={3} // 1-based index
/>
```

## Props

### CompactProgressSteps Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `steps` | Array | Yes | - | Array of step objects with `id` and `label` |
| `currentStep` | Number | Yes | - | Current active step index (0-based) |
| `className` | String | No | '' | Additional CSS classes |

### ProgressSteps Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `steps` | Array | Yes | - | Array of step objects with `id` and `label` |
| `currentStep` | Number | Yes | - | Current active step number (1-based) |

## Step Object Structure

```javascript
{
  id: 'step-1',        // Optional: Unique identifier
  label: 'Step Name'   // Required: Display label
}
```

## Design System Features

### Visual Design
- **Shadow**: `0 1px 3px rgba(0, 0, 0, 0.08)` for consistent elevation
- **Container**: Max-width aligned with header and footer components
- **Typography**: Design system font sizes and weights
- **Spacing**: 32px desktop, 24px mobile between steps

### Responsive Behavior
- **Desktop**: Full labels and icons visible
- **Mobile**: Optimized touch targets with condensed layout
- **Tablet**: Balanced layout with appropriate spacing

### Accessibility
- **ARIA**: Proper labeling and roles
- **Keyboard**: Full keyboard navigation support
- **Screen Reader**: Descriptive announcements for state changes
- **Focus**: Clear focus indicators and logical tab order
- **Contrast**: WCAG 2.1 AA compliant color contrast

## State Management

### Step States
1. **Completed**: Steps before `currentStep` show checkmark icons
2. **Current**: Step at `currentStep` index highlighted with primary color
3. **Pending**: Steps after `currentStep` show number indicators

### Visual Indicators
- ✅ **Checkmark**: Completed steps
- **Number**: Current and pending steps
- **Primary Color**: Current step highlight
- **Chevron Arrows**: Flow direction indicators

## Common Use Cases

### Assessment Creation Flow
```jsx
const assessmentSteps = [
  { id: 'statement', label: 'Question Statement' },
  { id: 'media', label: 'Media & Resources' },
  { id: 'details', label: 'Question Details' },
  { id: 'evaluation', label: 'Evaluation Parameters' },
  { id: 'solution', label: 'Solution Details' },
];
```

### Coding Question Flow
```jsx
const codingSteps = [
  { id: 'details', label: 'Question Details' },
  { id: 'defaults', label: 'Default Codes' },
  { id: 'testcases', label: 'Test Cases' },
  { id: 'preview', label: 'Question Preview' },
  { id: 'settings', label: 'Settings' },
];
```

## Best Practices

### Do's
- Use `CompactProgressSteps` for new implementations
- Provide meaningful step labels
- Use 0-based indexing for `currentStep`
- Include step IDs for tracking
- Test on multiple screen sizes

### Don'ts
- Don't use more than 7 steps (cognitive overload)
- Don't mix component variants in the same workflow
- Don't skip step validation
- Don't use overly long step labels
- Don't forget accessibility testing

## Migration Guide

### From ProgressSteps to CompactProgressSteps

```jsx
// Before (Legacy)
<ProgressSteps 
  steps={steps} 
  currentStep={3} // 1-based
/>

// After (Recommended)
<CompactProgressSteps 
  steps={steps} 
  currentStep={2} // 0-based (subtract 1)
/>
```

### Breaking Changes
- `currentStep` is now 0-based instead of 1-based
- Layout is horizontal instead of vertical
- Styling follows unified design system

## Testing

### Unit Tests
```jsx
import { render, screen } from '@testing-library/react';
import CompactProgressSteps from './CompactProgressSteps';

test('renders all steps', () => {
  const steps = [
    { id: 'step-1', label: 'First Step' },
    { id: 'step-2', label: 'Second Step' },
  ];
  
  render(<CompactProgressSteps steps={steps} currentStep={0} />);
  
  expect(screen.getByText('First Step')).toBeInTheDocument();
  expect(screen.getByText('Second Step')).toBeInTheDocument();
});
```

### Integration Tests
- Test step progression flow
- Verify accessibility attributes
- Check responsive behavior
- Validate state management

## Troubleshooting

### Common Issues

**Issue**: Steps not rendering correctly
**Solution**: Ensure `steps` array has valid objects with `label` property

**Issue**: Current step not highlighting
**Solution**: Check that `currentStep` is within valid range (0 to steps.length-1)

**Issue**: Mobile layout issues
**Solution**: Verify CSS modules are loaded and responsive styles applied

**Issue**: Accessibility warnings
**Solution**: Ensure all steps have proper labels and IDs

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Chrome Mobile 90+

## Performance

- Lightweight: ~2KB gzipped
- No external dependencies
- Optimized for React 18
- Efficient re-rendering with proper keys

## Related Components

- [Header](../Header/README.md) - Page header with navigation
- [FloatingFooter](../FloatingFooter/README.md) - Fixed bottom actions
- [ResponsiveProgressSteps](../ResponsiveProgressSteps/README.md) - Advanced stepper variant