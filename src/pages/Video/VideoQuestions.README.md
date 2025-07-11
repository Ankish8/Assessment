# VideoQuestions Component

A comprehensive unified interface for managing both Management and Professional video assessment questions. This component replaces the previous separate pages with a single, efficient workflow that significantly improves the user experience.

## 🎯 Overview

The VideoQuestions component provides a unified interface for creating, managing, and organizing video assessment questions. It eliminates the need for separate Management and Professional question pages by providing a single, intuitive interface with advanced filtering and organization capabilities.

## ✨ Key Features

### Unified Question Management
- **Single Interface**: Manage both Management and Professional questions in one view
- **Color-Coded Organization**: Indigo for Management questions, Emerald for Professional questions
- **Real-Time Overview**: Live question counts and time totals for each question type

### Advanced Search & Filtering
- **Smart Search**: Search across question titles, descriptions, and skills
- **Type Filtering**: Filter by All, Management, or Professional questions
- **Live Results**: Instant filtering with real-time updates

### Inline Question Creation
- **Expandable Forms**: Add/edit questions without leaving the main interface
- **Smart Skill Selection**: Autocomplete with predefined skill suggestions
- **Visual Time Allocation**: Interactive slider for setting question duration
- **Real-Time Validation**: Form validation with immediate feedback

### Visual Progress Tracking
- **Time Visualization**: Progress bars showing time allocation
- **Comprehensive Statistics**: Footer summary with detailed metrics
- **Question Distribution**: Overview cards showing question type breakdown

## 🏗️ Component Architecture

### State Management

```javascript
// Questions State
const [questions, setQuestions] = useState([
  {
    id: 'unique-id',
    type: 'management' | 'professional',
    title: 'Question Title',
    skills: ['Skill1', 'Skill2'],
    description: 'Detailed question description',
    timeAllocation: 4, // in minutes
    order: 1
  }
]);

// UI State
const [uiState, setUiState] = useState({
  activeFilter: 'all' | 'management' | 'professional',
  searchTerm: '',
  isAddingQuestion: false,
  editingQuestion: null,
  showHelpModal: false
});
```

### Question Types

#### Management Questions
- **Focus**: Soft skills assessment
- **Color**: Indigo (#4F46E5)
- **Icon**: Handshake
- **Skills**: Leadership, Communication, Teamwork, Conflict Resolution, etc.
- **Purpose**: Evaluate interpersonal and leadership abilities

#### Professional Questions
- **Focus**: Technical skills assessment
- **Color**: Emerald (#059669)
- **Icon**: Cogs
- **Skills**: Problem Solving, Technical Analysis, System Design, etc.
- **Purpose**: Evaluate job-specific technical competencies

## 🎨 Design System Integration

### Color Palette
- **Management Questions**: `#4F46E5` (Indigo)
- **Professional Questions**: `#059669` (Emerald)
- **Text Colors**: Following design token hierarchy
- **Backgrounds**: Consistent with unified design system

### Typography
- **Section Titles**: `var(--font-size-xl)` with `var(--font-weight-semibold)`
- **Question Titles**: `var(--font-size-base)` with `var(--font-weight-semibold)`
- **Descriptions**: `var(--font-size-sm)` with `var(--color-text-secondary)`
- **Skills Tags**: `var(--font-size-xs)` with `var(--font-weight-medium)`

### Interactive Elements
- **Hover Effects**: Smooth transitions with `transform: translateY(-2px)`
- **Focus States**: Consistent focus rings using design tokens
- **Loading States**: Integrated loading indicators
- **Animations**: Smooth slide-in animations for form elements

## 📱 Responsive Design

### Desktop (1200px+)
- Two-column overview cards
- Full-width question list
- Inline editing forms
- Comprehensive footer statistics

### Tablet (768px - 1199px)
- Single-column overview cards
- Compact question list
- Overlay editing forms
- Condensed footer layout

### Mobile (< 768px)
- Stacked layout
- Simplified question cards
- Full-screen editing forms
- Vertical button stacks

## 🔧 Usage

### Basic Implementation

```jsx
import { VideoQuestions } from '../../pages/Video';

function VideoAssessmentFlow() {
  return (
    <div>
      <VideoQuestions />
    </div>
  );
}
```

### Integration with Router

```jsx
import { Routes, Route } from 'react-router-dom';
import { VideoQuestions } from '../../pages/Video';

function VideoRoutes() {
  return (
    <Routes>
      <Route path="/video/questions" element={<VideoQuestions />} />
    </Routes>
  );
}
```

## 🎯 User Experience Improvements

### Before (Separate Pages)
1. Navigate to Management Questions page
2. Click "Add Sub Part" button
3. Fill modal form
4. Save and close modal
5. Navigate to Professional Questions page
6. Repeat process

**Total Steps**: 6+ steps per question type

### After (Unified Interface)
1. View unified Questions page
2. Click "Add Question" button
3. Fill inline form
4. Save and continue

**Total Steps**: 3 steps per question

**Improvement**: 50% reduction in clicks and navigation

## 📊 State Management

### Question Operations
- **Add Question**: Append to questions array with unique ID
- **Edit Question**: Update existing question in array
- **Delete Question**: Remove from questions array
- **Reorder Questions**: Update order property (future enhancement)

### Search & Filter Logic
```javascript
const filteredQuestions = questions.filter(question => {
  const matchesFilter = activeFilter === 'all' || question.type === activeFilter;
  const matchesSearch = 
    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.skills.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return matchesFilter && matchesSearch;
});
```

## 🎨 Visual Components

### Overview Cards
- **Management Card**: Indigo accent with handshake icon
- **Professional Card**: Emerald accent with cogs icon
- **Statistics**: Question count and total time
- **Quick Actions**: Type-specific add buttons

### Question Cards
- **Color-coded Borders**: Left border matching question type
- **Skill Tags**: Chip-style skill indicators
- **Time Visualization**: Progress bar showing time allocation
- **Action Buttons**: Edit and delete with hover effects

### Inline Forms
- **Expandable Design**: Smooth slide-in animation
- **Smart Validation**: Real-time form validation
- **Skill Autocomplete**: Predefined skill suggestions
- **Time Slider**: Visual time allocation control

## 🔍 Search & Filter Features

### Search Capabilities
- **Multi-field Search**: Title, description, and skills
- **Case-insensitive**: Flexible search matching
- **Real-time Results**: Instant filtering as you type
- **Clear Search**: Easy search term clearing

### Filter Options
- **All Questions**: Show all questions (default)
- **Management Only**: Show only management questions
- **Professional Only**: Show only professional questions
- **Active Indication**: Visual feedback for active filters

## 🛠️ Technical Implementation

### Performance Optimizations
- **Efficient Filtering**: Optimized search algorithms
- **Minimal Re-renders**: Strategic state updates
- **Smooth Animations**: CSS transitions without JavaScript
- **Lazy Loading**: Form components loaded on demand

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels
- **Focus Management**: Logical focus flow
- **High Contrast**: Accessible color ratios

### Error Handling
- **Form Validation**: Real-time validation feedback
- **User Feedback**: Clear error messages
- **Graceful Degradation**: Fallback states
- **Loading States**: Progress indicators

## 📈 Future Enhancements

### Planned Features
1. **Drag & Drop Reordering**: Visual question reordering
2. **Bulk Operations**: Select multiple questions for actions
3. **Question Templates**: Pre-defined question templates
4. **Export/Import**: Question set management
5. **Live Preview**: Candidate view preview
6. **Advanced Analytics**: Question performance metrics

### Technical Improvements
1. **Offline Support**: PWA capabilities
2. **Auto-save**: Automatic form saving
3. **Undo/Redo**: Action history management
4. **Collaborative Editing**: Multi-user support

## 🧪 Testing Strategy

### Unit Tests
- Component rendering
- State management
- Form validation
- Search/filter logic

### Integration Tests
- Navigation flow
- Form submission
- Modal interactions
- Responsive behavior

### E2E Tests
- Complete user workflows
- Cross-browser compatibility
- Performance benchmarks
- Accessibility compliance

## 📚 Dependencies

### Core Dependencies
- React 18+
- React Router DOM
- CSS Modules

### Development Dependencies
- Storybook (for documentation)
- ESLint (for code quality)
- Prettier (for code formatting)

### FontAwesome Icons
- `fa-handshake` (Management)
- `fa-cogs` (Professional)
- `fa-plus` (Add actions)
- `fa-edit` (Edit actions)
- `fa-trash` (Delete actions)
- `fa-clock` (Time indicators)
- `fa-search` (Search functionality)

## 🔧 Customization

### Styling Customization
```css
/* Override question type colors */
.managementQuestion {
  --question-color: #your-color;
}

.professionalQuestion {
  --question-color: #your-color;
}

/* Custom time allocation colors */
.timeBarFill {
  background: linear-gradient(90deg, #start-color, #end-color);
}
```

### Behavior Customization
```javascript
// Custom skill sets
const customSkills = {
  management: ['Custom Skill 1', 'Custom Skill 2'],
  professional: ['Technical Skill 1', 'Technical Skill 2']
};
```

## 🎯 Best Practices

### Question Creation
1. **Clear Titles**: Use descriptive, specific titles
2. **Detailed Descriptions**: Provide comprehensive context
3. **Relevant Skills**: Select skills that align with the question
4. **Appropriate Timing**: Consider complexity when setting time
5. **Balanced Mix**: Maintain balance between question types

### Component Usage
1. **State Management**: Use provided state hooks
2. **Form Validation**: Respect validation requirements
3. **Responsive Design**: Test on multiple screen sizes
4. **Accessibility**: Ensure keyboard navigation works
5. **Performance**: Avoid unnecessary re-renders

## 📋 Migration Guide

### From Separate Pages
1. **Update Routes**: Replace separate routes with unified route
2. **State Migration**: Combine separate state management
3. **Component Imports**: Update import statements
4. **Styling Updates**: Remove redundant styles
5. **Testing Updates**: Update test files

### Breaking Changes
- Previous `VideoManagementQuestions` component removed
- Previous `VideoProfessionalQuestions` component removed
- Combined state structure
- Updated navigation flow

## 🐛 Troubleshooting

### Common Issues

**Form Not Submitting**
- Check form validation requirements
- Ensure all required fields are filled
- Verify skill selection is complete

**Search Not Working**
- Check search term spelling
- Verify filter settings
- Clear search and try again

**Responsive Issues**
- Check viewport meta tag
- Verify CSS media queries
- Test on actual devices

**Performance Issues**
- Check for unnecessary re-renders
- Optimize large question lists
- Use React DevTools for profiling

## 📞 Support

For issues, questions, or feature requests:
1. Check this documentation
2. Review component source code
3. Check Storybook documentation
4. Create detailed issue reports

---

*This component is part of the unified Video Assessment design system, following established patterns and best practices for React component development.*