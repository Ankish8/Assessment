# Component Library Documentation

A comprehensive, reusable component library built with React and designed for building consistent question flow applications.

## 🚀 Quick Start

### Running Storybook
```bash
npm run storybook
```
Access Storybook at http://localhost:6006

### Importing Components
```javascript
import { Button, Input, Card, Modal, Form, Selector } from './src/components';
```

## 📚 Component Overview

### Foundation Components

#### **Button**
Multi-variant button component with full functionality
- **Variants**: `primary`, `secondary`, `ghost`, `destructive`, `success`, `outline`
- **Sizes**: `small`, `medium`, `large`, `xlarge`
- **Features**: Icons, loading states, full-width, icon-only

```jsx
<Button variant="primary" size="large" loading>
  Save Changes
</Button>
```

#### **Input**
Comprehensive input component with validation support
- **Variants**: `default`, `filled`, `ghost`
- **States**: `default`, `error`, `success`
- **Features**: Labels, help text, icons, validation

```jsx
<Input 
  label="Email" 
  type="email" 
  placeholder="Enter your email"
  startIcon={<EmailIcon />}
  errorMessage="Please enter a valid email"
/>
```

#### **Card**
Flexible card component for content organization
- **Variants**: `elevated`, `outlined`, `filled`, `ghost`
- **Features**: Headers, footers, hover effects, selection states

```jsx
<Card 
  variant="elevated" 
  title="Project Name"
  subtitle="Project description"
  hoverable
>
  Card content here
</Card>
```

#### **Modal**
Full-featured modal/dialog component
- **Sizes**: `sm`, `base`, `lg`, `xl`, `full`
- **Variants**: `default`, `dialog`, `alert`, `confirmation`
- **Features**: Focus management, keyboard navigation, portals

```jsx
<Modal 
  isOpen={isOpen}
  onClose={setIsOpen}
  title="Confirm Action"
  size="sm"
>
  Are you sure you want to continue?
</Modal>
```

### Specialized Components

#### **Selector**
Multi-purpose selection component (replaces DifficultySelector, LanguageSelector)
- **Variants**: `single`, `multiple`
- **Layouts**: `grid`, `list`, `inline`
- **Features**: Select all, icons, descriptions, badges

```jsx
<Selector
  variant="multiple"
  options={languageOptions}
  selectedValues={selected}
  onSelectionChange={setSelected}
  showSelectAll
  label="Programming Languages"
/>
```

#### **Form**
Structured form wrapper with sections and groups
- **Layouts**: `vertical`, `horizontal`
- **Features**: Grouped fields, sections, action areas

```jsx
<Form onSubmit={handleSubmit}>
  <Form.Section title="Personal Info">
    <Form.Group columns={2}>
      <Input label="First Name" />
      <Input label="Last Name" />
    </Form.Group>
  </Form.Section>
  <Form.Actions>
    <Button type="submit">Submit</Button>
  </Form.Actions>
</Form>
```

## 🎨 Design System

### Design Tokens
Located in `src/styles/tokens.css` - provides consistent:
- **Colors**: Primary, secondary, semantic colors with full palettes
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale (4px base)
- **Shadows**: Elevation and focus shadows
- **Animation**: Duration and easing curves
- **Border Radius**: Consistent corner radius values

### Color Palette
```css
/* Primary Colors */
--color-primary-50: #f9f5ff;
--color-primary-600: #7f56d9;
--color-primary-900: #42307d;

/* Semantic Colors */
--color-success-500: #12b76a;
--color-error-500: #f04438;
--color-warning-500: #f79009;
```

### Typography Scale
```css
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
```

## 🛠 Usage Patterns

### Creating New Flows
1. **Use Layout Components**: Start with page templates and form structures
2. **Apply Consistent Spacing**: Use design tokens for margins and padding
3. **Leverage Existing Components**: Customize with props rather than creating new components
4. **Follow Naming Conventions**: Use semantic, descriptive component names

### Component Customization
Most components support extensive customization through props:
```jsx
// Instead of creating a new component
<Button 
  variant="outline" 
  size="large" 
  fullWidth 
  className="custom-styles"
>
  Custom Button
</Button>
```

### Form Building
Use the Form component system for consistent layouts:
```jsx
<Form gap="lg">
  <Form.Section title="Question Details">
    <Selector variant="single" options={difficulties} />
    <Selector variant="multiple" options={languages} showSelectAll />
  </Form.Section>
  <Form.Actions align="right">
    <Button variant="ghost">Cancel</Button>
    <Button>Save Question</Button>
  </Form.Actions>
</Form>
```

## 📱 Responsive Design
All components are mobile-friendly with responsive breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility
Components include proper ARIA attributes, keyboard navigation, and focus management:
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Focus management for modals
- Color contrast compliance

## 🔧 Development Guidelines

### Adding New Components
1. Create component in appropriate `src/components/` folder
2. Include `.jsx`, `.module.css`, `.stories.jsx`, and `index.js` files
3. Use design tokens for styling
4. Add comprehensive stories showing all variants
5. Export from main `index.js`

### Styling Best Practices
- Import design tokens: `@import '../../../styles/tokens.css';`
- Use CSS modules for component-specific styles
- Follow BEM-like naming conventions in CSS
- Leverage CSS custom properties for theming

### Component API Design
- Use descriptive prop names
- Provide sensible defaults
- Support common HTML attributes via `...props`
- Include TypeScript-style prop documentation in comments

## 🎯 Migration Guide

### From Existing Components
Replace existing specialized components with new generic ones:

```javascript
// Before
import DifficultySelector from './components/DifficultySelector';
import LanguageSelector from './components/LanguageSelector';

// After
import { Selector } from './src/components';

// Usage remains similar but more flexible
<Selector variant="single" options={difficulties} />
<Selector variant="multiple" options={languages} showSelectAll />
```

## 📈 Performance
- Components are optimized for bundle size
- CSS modules prevent style conflicts
- Storybook provides isolated component testing
- Design tokens enable consistent caching

## 🎨 Storybook Features
- **Component Documentation**: Auto-generated from comments
- **Controls**: Interactive prop manipulation
- **Design Tokens**: Visual color and spacing references
- **Responsive Testing**: Mobile/tablet/desktop views
- **Accessibility Testing**: Built-in a11y addon

## 🔮 Future Enhancements
- Dark theme support (tokens already prepared)
- Additional component variants
- Animation and micro-interactions
- Enhanced TypeScript support
- Component testing utilities

---

**Built for building consistent, accessible, and maintainable question flow applications.**