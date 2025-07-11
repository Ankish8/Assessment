# Video Assessment: Unified Questions Experience - UX Redesign Plan

## Current State Analysis

### Issues with Current Approach:
1. **Redundant Navigation**: Two separate pages (Management + Professional) with identical structure
2. **Modal Overload**: Add Sub Part modal creates unnecessary clicks and context switching
3. **Poor Visual Hierarchy**: Simple list view doesn't show relationship between questions
4. **Time Management Complexity**: No visual indication of total time allocation
5. **Inefficient Workflow**: Users must navigate between pages to see full picture
6. **Limited Organization**: No way to filter, search, or reorder questions easily

## Proposed Solution: Unified Questions Builder

### 🎯 Core UX Principles
- **Progressive Disclosure**: Show information when needed, hide complexity
- **Reduced Cognitive Load**: Single interface for all question management
- **Visual Clarity**: Clear distinction between Management vs Professional questions
- **Efficient Actions**: Minimize clicks, maximize productivity
- **Contextual Help**: Inline guidance without interrupting workflow

## 🏗️ Detailed Layout Design

### 1. Page Header
```
📹 Video Assessment - Questions
[Progress: 2/5] [Help ?]
```

### 2. Question Type Overview Cards
```
┌─────────────────────┐  ┌─────────────────────┐
│ 🤝 Management Qs    │  │ 🔧 Professional Qs  │
│ Soft Skills Focus   │  │ Technical Expertise │
│ • 3 Sub Parts       │  │ • 2 Sub Parts       │
│ • 8 min total       │  │ • 12 min total      │
│ [+ Add Management]  │  │ [+ Add Professional]│
└─────────────────────┘  └─────────────────────┘
```

### 3. Unified Questions List
```
🔍 Search questions...                    [All ▼] [+ Add Question]

┌─────────────────────────────────────────────────────────────┐
│ 🤝 MANAGEMENT • Leadership Scenario                         │
│ Skills: Leadership, Communication, Conflict Resolution      │
│ Time: ████████░░ 4 min                          [⋮] [✏️] [🗑️] │
│ "Describe a time when you had to lead a team through..."    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🔧 PROFESSIONAL • Technical Problem Solving                │
│ Skills: Problem Solving, Technical Analysis, Java          │
│ Time: ██████████ 6 min                          [⋮] [✏️] [🗑️] │
│ "Explain how you would optimize a slow-running query..."    │
└─────────────────────────────────────────────────────────────┘
```

### 4. Inline Add/Edit Question Form
```
┌─────────────────────────────────────────────────────────────┐
│ ✨ Add New Question                                          │
│                                                             │
│ Question Type: ◉ Management  ○ Professional                │
│                                                             │
│ Title: [_____________________________]                     │
│                                                             │
│ Select Skills: [Leadership ×] [Communication ×] [+ Add]     │
│                                                             │
│ Description: [Rich Text Editor with toolbar]               │
│                                                             │
│ Time Allocation: [████████░░] 4 min [slider] [4] min       │
│                                                             │
│ [Cancel] [Save Question]                                    │
└─────────────────────────────────────────────────────────────┘
```

### 5. Footer Summary
```
Total Time: 20 min (8 min Management + 12 min Professional)
Questions: 5 total (3 Management, 2 Professional)

[Previous] ────────────────────────────────── [Save & Continue]
```

## 🎨 Visual Design Enhancements

### Color Coding System
- **Management Questions**: `#4F46E5` (Indigo) - represents people/soft skills
- **Professional Questions**: `#059669` (Emerald) - represents technical/hard skills
- **Neutral Elements**: Existing design tokens

### Typography Hierarchy
- **Page Title**: `var(--font-size-xl)` + `var(--font-weight-semibold)`
- **Question Titles**: `var(--font-size-base)` + `var(--font-weight-semibold)`
- **Descriptions**: `var(--font-size-sm)` + `var(--color-text-secondary)`
- **Skills Tags**: `var(--font-size-xs)` + `var(--font-weight-medium)`

### Icon Strategy (FontAwesome)
- **Management**: `fa-handshake`, `fa-users`, `fa-comments`
- **Professional**: `fa-cogs`, `fa-code`, `fa-tools`
- **Actions**: `fa-edit`, `fa-trash`, `fa-grip-vertical`, `fa-plus`
- **Time**: `fa-clock`, `fa-stopwatch`

## 🔧 Component Architecture

### New Components to Create
1. **QuestionsBuilder** - Main container component
2. **QuestionTypeCard** - Overview cards for Management/Professional
3. **QuestionItem** - Individual question card in list
4. **InlineQuestionForm** - Expandable form for adding/editing
5. **SkillsSelector** - Tag-based skill selection
6. **TimeAllocationSlider** - Visual time allocation control
7. **QuestionsFooter** - Summary and navigation

### Enhanced Existing Components
- **Card** - Add new variants for question items
- **Button** - New sizes and states for question actions
- **Input** - Enhanced for skill search/autocomplete
- **Modal** - Keep for help content only

## 🚀 Interactive Features

### 1. Drag & Drop Reordering
- Visual drag handles on question cards
- Smooth reordering animations
- Persist order in state

### 2. Smart Skill Selection
- Autocomplete from predefined skill list
- Different skill suggestions based on question type
- Visual skill tags with remove functionality

### 3. Time Allocation Visualization
- Horizontal bar showing time distribution
- Color-coded by question type
- Total time warnings if exceeding limits

### 4. Bulk Actions
- Select multiple questions for deletion
- Duplicate questions with modifications
- Export/import question sets

### 5. Live Preview
- Toggle to see how questions appear to candidates
- Mobile preview mode
- Accessibility preview

## 📱 Responsive Design

### Desktop (1200px+)
- Two-column layout for question type cards
- Full-width question list
- Inline editing forms

### Tablet (768px - 1199px)
- Single-column question type cards
- Compact question list
- Overlay editing forms

### Mobile (< 768px)
- Stacked layout
- Simplified question cards
- Full-screen editing forms

## 🎯 User Flow Optimization

### Current Flow (Problematic)
1. Click Management Questions → 2. Click Add Sub Part → 3. Fill Modal → 4. Save → 5. Navigate to Professional Questions → 6. Repeat

### New Flow (Optimized)
1. View unified Questions page → 2. Click Add Question → 3. Fill inline form → 4. Save → 5. Continue adding in same view

**Reduction**: 6 steps → 3 steps per question

## 🔍 Help & Guidance

### Contextual Help
- Inline tooltips for form fields
- Question type descriptions in overview cards
- Progressive disclosure of advanced options

### Help Modal Content
```
Management Questions 🤝
These focus on assessing soft skills like communication, teamwork, 
leadership, and conflict resolution. They help gauge how candidates 
handle relationships, collaborate in teams, and manage workplace 
dynamics effectively.

Professional Questions 🔧
These are designed to evaluate a candidate's technical expertise, 
problem-solving abilities, and job-specific knowledge. They focus 
on assessing the candidate's ability to perform tasks and apply 
skills relevant to the role.
```

## 🎨 Animation & Micro-interactions

### Smooth Transitions
- Question cards fade in/out when filtering
- Smooth expand/collapse for inline forms
- Hover effects on interactive elements

### Feedback Animations
- Success state after saving questions
- Loading states during form submissions
- Error states with helpful messages

## 📊 State Management

### Question State Structure
```javascript
{
  questions: [
    {
      id: 'q1',
      type: 'management' | 'professional',
      title: 'Leadership Scenario',
      skills: ['Leadership', 'Communication'],
      description: 'Rich text content...',
      timeAllocation: 4,
      order: 1
    }
  ],
  ui: {
    activeFilter: 'all' | 'management' | 'professional',
    editingQuestion: null,
    searchTerm: '',
    isAddingQuestion: false
  }
}
```

## 🔄 Implementation Strategy

### Phase 1: Core Structure
1. Create main QuestionsBuilder component
2. Implement question type overview cards
3. Build unified questions list
4. Add basic filtering

### Phase 2: Interactive Features
1. Implement inline add/edit forms
2. Add drag & drop reordering
3. Build skill selection component
4. Create time allocation visualization

### Phase 3: Polish & Optimization
1. Add animations and micro-interactions
2. Implement responsive design
3. Add accessibility features
4. Performance optimization

## 🎯 Success Metrics

### UX Improvements
- **Reduced Clicks**: 50% reduction in clicks to add questions
- **Time Savings**: 30% faster question creation workflow
- **User Satisfaction**: Improved task completion rates
- **Error Reduction**: Fewer form validation errors

### Technical Goals
- **Performance**: < 100ms for all interactions
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsiveness**: Works on all device sizes
- **Maintainability**: Modular component architecture

## 📋 Implementation Checklist

### Components
- [ ] QuestionsBuilder main component
- [ ] QuestionTypeCard overview cards
- [ ] QuestionItem individual cards
- [ ] InlineQuestionForm expandable form
- [ ] SkillsSelector tag-based selection
- [ ] TimeAllocationSlider visual control
- [ ] QuestionsFooter summary

### Features
- [ ] Unified question management
- [ ] Inline adding/editing
- [ ] Drag & drop reordering
- [ ] Smart skill selection
- [ ] Time allocation visualization
- [ ] Filtering and search
- [ ] Responsive design
- [ ] Accessibility compliance

### Integration
- [ ] Update routing for combined step
- [ ] Integrate with existing Video flow
- [ ] Update progress stepper
- [ ] Add form validation
- [ ] Implement state persistence

---

This plan transforms the current fragmented experience into a unified, efficient, and delightful question building interface that maintains all existing functionality while significantly improving the user experience.