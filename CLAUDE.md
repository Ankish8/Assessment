# Important Reminders

## Design and Component Guidelines
1. **Always check Storybook first** when redesigning anything - there might already be a component for it
2. **Do not update existing Storybook components** unless explicitly asked - create new designs instead
3. **Better UX is the priority** - always think about improved user experience before creating new designs
4. **Use updated tech** - try to use modern/updated versions and leverage context7 mcp
5. **Storybook server is already running** - no need to start it every time

## Typography Standards
**ALWAYS use these consistent font sizes across all pages and components:**

### Font Size Hierarchy
- **Main Section Titles**: `font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold);` (20px, 600)
- **Subsection Headers**: `font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold);` (18px, 600)
- **Card/Option Labels**: `font-size: var(--font-size-base); font-weight: var(--font-weight-semibold);` (16px, 600)
- **Description Text**: `font-size: var(--font-size-sm); color: var(--color-text-secondary);` (14px, 400)
- **Field Labels**: `font-size: var(--font-size-sm); font-weight: var(--font-weight-medium);` (14px, 500)
- **Body Text**: `font-size: var(--font-size-base);` (16px, 400)
- **Small Details/Badges**: `font-size: var(--font-size-xs); font-weight: var(--font-weight-medium);` (12px, 500)

### Mobile Responsive
- **Section titles reduce to**: `var(--font-size-lg)` (18px) on mobile
- **Small elements reduce to**: `var(--font-size-xs)` (12px) on mobile

### Typography CSS Classes to Use
- `.sectionTitle` - Main section headers
- `.sectionDescription` - Description text under titles
- `.optionTitle` - Card/option labels
- `.optionDescription` - Card description text
- `.fieldLabel` - Form field labels
- `.contentTitle` - Content section headers

**Reference**: Analyzed from SubmissionQuestions, MediaResources, SubmissionQuestionDetails, and EvaluationParameters pages.

## Development Workflow
- Check existing components in Storybook before creating new ones
- Focus on UX improvements in all designs
- Create new components rather than modifying existing Storybook components
- **Always follow the typography standards above** for consistency

## Component Library Structure

### Available Components
The project has a well-organized component library with **35+ documented components** available in Storybook:

**Core UI Components:**
- **Button** - Basic button with variants, sizes, states
- **Input** - Input fields with validation, types, states  
- **Card** - Card container with headers, footers, variants
- **Modal** - Modal dialogs with portal rendering, accessibility
- **Form** - Form wrapper with validation, layouts
- **Tab** - Tab navigation with keyboard accessibility
- **Selector** - Multi-selection component with grid/list layouts

**Navigation & Layout Components:**
- **Header** - Standard page header with navigation, responsive design
- **CompactHeader** - Compact unified header component (**PREFERRED for new pages**)
- **ProgressSteps** - Step indicator with progress tracking
- **ResponsiveProgressSteps** - Advanced stepper with overflow detection
- **CompactProgressSteps** - Compact unified progress steps (**PREFERRED for new pages**)
- **FloatingFooter** - Fixed bottom footer with validation alerts
- **CustomFooter** - Custom footer component
- **InfoText** - Information text component

**Specialized Components:**
- **QuestionTypeSelector** - Root level question type selector
- **CodeEditor** - Code editing component with syntax highlighting
- **LanguageList** - Programming language selection
- **ToggleCard** - Toggle-able card component
- **SkillsInput** - Skills input with tagging

**Page Components:**
- **SubmissionQuestions** - Questions listing page with WYSIWYG editor
- **MediaResources** - Media resource management page
- **SubmissionQuestionDetails** - Question details page
- **EvaluationParameters** - Evaluation settings page
- **SolutionDetails** - Solution details page component
- **TestCases** - Test cases management page
- **FillInTheBlanks** - Fill-in-the-blanks page component
- **FillInTheBlanks/EvaluationParameters** - Fill-in-the-blanks evaluation parameters
- **Speaking/SpeakingQuestionStatement** - Speaking question statement page
- **UIFramework/UIFrameworkEvaluationParameters** - UI Framework evaluation parameters

**System & Documentation Components:**
- **Welcome** - Library overview and getting started
- **Examples** - Real-world component composition examples
- **ColorPalette** - Color palette documentation
- **UnifiedDesignSystem** - Unified design system showcase
- **AccessibilityTest** - Accessibility testing component

**Legacy Template Components (stories/ directory):**
- **Header** (Legacy), **Page** (Legacy), **Badge**, **Card** (Legacy), **Button** (Legacy), **React-Button**, **Template-Button**

### Technical Standards
- **TypeScript**: Full type safety with proper interfaces
- **CSS Modules**: Component styles in separate CSS files
- **Design Tokens**: Consistent use of CSS custom properties
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: Focus management, keyboard navigation, ARIA attributes
- **Testing**: Comprehensive test coverage for all components

## Assessment Page Types Taxonomy

This section defines the standardized page types used across different assessment types. **Before creating new pages, always check if a similar page type already exists and reuse the design patterns.**

### Core Assessment Flow Pages
These pages form the standard assessment creation workflow and should be reused across all assessment types:

#### 1. **Question Statement/Content** 
- **Purpose**: Question content creation with rich text editing
- **Existing Pages**: 
  - `SubmissionQuestions` (General) - Advanced WYSIWYG editor
- **Key Features**: Rich text editor, formatting toolbar, preview, validation
- **Reuse Pattern**: Use same editor component and layout for all question statement pages
- **File Pattern**: `{AssessmentType}Questions` or `{AssessmentType}QuestionContent`

#### 2. **Media & Resources Management**
- **Purpose**: File uploads and submission type configuration
- **Existing Pages**: 
  - `MediaResources` (General) - Full media upload with submission options
  - `FillInTheBlanks/MediaResources` - Simplified for text-based questions
- **Key Features**: Drag-drop upload, submission options, file validation, preview
- **Reuse Pattern**: Use base MediaResources component, customize submission options per assessment type
- **File Pattern**: `{AssessmentType}MediaResources` or `MediaResources`

#### 3. **Question Configuration/Details**
- **Purpose**: Question metadata, difficulty, skills, marks configuration
- **Existing Pages**: 
  - `SubmissionQuestionDetails` (General) - Full metadata form
  - `QuestionDetails` (Coding) - Enhanced with programming language selection
  - `FillInTheBlanks/QuestionDetails` - Customized for fill-in-the-blanks flow
- **Key Features**: Marks input, difficulty cards, skills selection, provider/author info
- **Reuse Pattern**: Use consistent layout with two-column design (config left, metadata right)
- **File Pattern**: `{AssessmentType}QuestionDetails` or `QuestionDetails`

#### 4. **Evaluation Parameters**
- **Purpose**: Evaluation method and criteria configuration
- **Existing Pages**: 
  - `EvaluationParameters` (General) - Automated vs manual evaluation
  - `FillInTheBlanks/EvaluationParameters` - Enhanced with text-matching options
- **Key Features**: Evaluation method toggle, criteria management, weightage validation
- **Reuse Pattern**: Base evaluation component with assessment-specific criteria additions
- **File Pattern**: `{AssessmentType}EvaluationParameters` or `EvaluationParameters`

#### 5. **Solution Details** 
- **Purpose**: Optional solution content provision
- **Existing Pages**: 
  - `SolutionDetails` (General) - Multi-format solution support
  - `FillInTheBlanks/SolutionDetails` - Integrated solution flow
- **Key Features**: Multiple content types, file uploads, optional step
- **Reuse Pattern**: Same solution interface, customize content types per assessment
- **File Pattern**: `{AssessmentType}SolutionDetails` or `SolutionDetails`

### Specialized Assessment Pages
These pages are specific to certain assessment types:

#### 6. **Question Type Creation**
- **Purpose**: The actual question creation interface (varies by type)
- **Existing Pages**: 
  - `MultipleChoiceQuestion` - Dynamic choice management
  - `FillInTheBlanks` - Interactive blank configuration with live preview
- **Key Features**: Assessment-specific creation interface, real-time preview, validation
- **Reuse Pattern**: Each question type needs its own creation interface
- **File Pattern**: `{AssessmentType}Question` or `{AssessmentType}`

#### 7. **Test Cases** (Coding-Specific)
- **Purpose**: Test case creation and validation for coding questions
- **Existing Pages**: 
  - `TestCases` (Coding) - Manual and bulk test case creation
- **Key Features**: Test case forms, file upload, code verification, weightage
- **Reuse Pattern**: Use for all coding-based assessments
- **File Pattern**: `{AssessmentType}TestCases` or `TestCases`

#### 8. **Default Codes** (Coding-Specific)
- **Purpose**: Starter code templates for programming languages
- **Existing Pages**: 
  - `DefaultCodes` (Coding) - Multi-language code templates
- **Key Features**: Language selection, code editor, advanced configuration
- **Reuse Pattern**: Use for all coding-based assessments
- **File Pattern**: `{AssessmentType}DefaultCodes` or `DefaultCodes`

### Reusable Design Patterns

#### Layout Patterns
1. **Two-Column Layout** (Most Common)
   ```
   [Left: Configuration/Forms] [Right: Preview/Metadata]
   ```
   Used in: QuestionDetails, EvaluationParameters, SolutionDetails

2. **Single Column Layout**
   ```
   [Full Width Content with Cards]
   ```
   Used in: MediaResources, TestCases, Question content pages

3. **Split Pane Layout**
   ```
   [Editor Pane] [Preview Pane]
   ```
   Used in: FillInTheBlanks, DefaultCodes

#### Component Patterns
- **Progress Navigation**: All pages use `CompactProgressSteps` or `ResponsiveProgressSteps` (**PREFER CompactProgressSteps for new pages**)
- **Page Headers**: Use `CompactHeader` for consistent navigation and branding (**PREFERRED for new pages**)
- **Bottom Actions**: `FloatingFooter` or `CustomFooter` with consistent button patterns
- **Form Validation**: Real-time validation with error states
- **File Management**: Consistent drag-drop upload interface
- **Card-based Selection**: Difficulty, evaluation methods, submission options

### Page Creation Guidelines

#### When Creating New Assessment Types:
1. **Check Existing Pages**: Always verify if a similar page type exists
2. **Reuse Base Components**: Use existing page structures and modify only what's necessary
3. **Follow Naming Convention**: `{AssessmentType}{PageType}` (e.g., `CodingQuestionDetails`)
4. **Maintain Design Consistency**: Use established layout patterns and component styles
5. **Progress Flow Integration**: Ensure pages integrate with the progress step system
6. **Validation Patterns**: Follow established validation and error handling patterns

#### Assessment Type Checklist:
For each new assessment type, you typically need:
- [ ] Question content/statement page
- [ ] Media & resources page (if applicable)
- [ ] Question details/configuration page
- [ ] Question type creation page (the main creation interface)
- [ ] Evaluation parameters page
- [ ] Solution details page (optional)
- [ ] Any specialized pages (like test cases for coding)

#### Routing Pattern:
- Base assessment type: `/{assessment-type}`
- Specific pages: `/{assessment-type}/{page-name}`
- Example: `/fill-in-the-blanks/question-details`

### Currently Implemented Assessment Types:
1. **General Submission** - Complete flow with all core pages (SubmissionQuestions, MediaResources, SubmissionQuestionDetails, EvaluationParameters, SolutionDetails)
2. **Fill-in-the-Blanks** - Complete specialized flow with customized pages (FillInTheBlanks, FillInTheBlanks/EvaluationParameters)
3. **Speaking Assessment** - Question statement page (Speaking/SpeakingQuestionStatement)
4. **UI Framework** - Evaluation parameters page (UIFramework/UIFrameworkEvaluationParameters)
5. **Coding Questions** - Enhanced flow with test cases and default codes (TestCases, CodeEditor, LanguageList)

### Missing/Potential Assessment Types:
- **Essay Questions** - Long-form text responses
- **File Upload Questions** - Document/project submissions
- **Audio/Video Questions** - Multimedia response questions
- **Drag-and-Drop Questions** - Interactive sorting/matching
- **Drawing/Diagram Questions** - Visual response questions

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

---

# 🚀 REACT STORYBOOK PROJECT

## Project Status: **ACTIVE** ✅
**React Component Library**: Complete
**Storybook Documentation**: Enhanced  

---

## 🎯 PROJECT OVERVIEW

### **REACT COMPONENT LIBRARY**
A comprehensive collection of reusable React components with complete Storybook documentation for building consistent and accessible question flow applications.

### **KEY FEATURES**
- Complete React component library with unified design system
- Comprehensive Storybook documentation with interactive examples
- Accessibility compliant (WCAG 2.1 AA)
- Mobile-first responsive design
- TypeScript support with proper prop types
- Extensive documentation with usage examples

---

## 📚 COMPONENT LIBRARY STATUS

### **✅ COMPLETED COMPONENTS** (35+ Total)
**Core UI Components:**
- **Button** - All variants and states
- **Input** - Form input with validation
- **Card** - Container with headers/footers
- **Modal** - Accessible modal dialogs
- **Form** - Form wrapper with validation
- **Tab** - Tab navigation with keyboard support
- **Selector** - Multi-selection component

**Navigation & Layout Components:**
- **Header** - Standard page header with navigation
- **CompactHeader** - Compact unified header component (**PREFERRED**)
- **ProgressSteps** - Enhanced with comprehensive documentation
- **ResponsiveProgressSteps** - Advanced stepper with overflow detection
- **CompactProgressSteps** - Unified design system variant (**PREFERRED**)
- **FloatingFooter** - Fixed bottom actions
- **CustomFooter** - Custom footer component
- **InfoText** - Information text component

**Specialized Components:**
- **QuestionTypeSelector** - Root level question type selector
- **CodeEditor** - Code editing component with syntax highlighting
- **LanguageList** - Programming language selection
- **ToggleCard** - Toggle-able card component
- **SkillsInput** - Skills input with tagging

**Page Components:**
- **SubmissionQuestions** - Questions listing page
- **MediaResources** - Media resource management
- **SubmissionQuestionDetails** - Question details page
- **EvaluationParameters** - Evaluation settings
- **SolutionDetails** - Solution details page
- **TestCases** - Test cases management
- **FillInTheBlanks** - Fill-in-the-blanks page
- **Speaking/SpeakingQuestionStatement** - Speaking question page
- **UIFramework/UIFrameworkEvaluationParameters** - UI Framework evaluation

### **📖 ENHANCED DOCUMENTATION**
- **Interactive Controls** - Live component testing
- **Usage Examples** - Copy-paste code examples
- **Props Documentation** - Detailed prop specifications
- **Best Practices** - Implementation guidelines
- **Migration Guides** - Component upgrade paths
- **README Files** - Comprehensive component docs

---

## 🎯 RECENT ENHANCEMENTS

### **ProgressSteps Component** ✅
- **Comprehensive Documentation** - Complete Storybook stories with interactive controls
- **README.md** - Detailed usage guide with examples
- **JSDoc Comments** - Inline code documentation
- **Interactive Examples** - All step states with live controls
- **Migration Guide** - Legacy to new component upgrade path
- **Best Practices** - Do's and don'ts for implementation

### **Design System Integration**
- **Unified Design System** - Consistent shadows, spacing, typography
- **Responsive Design** - Mobile-first with optimized breakpoints
- **Accessibility** - WCAG 2.1 AA compliant with screen reader support
- **TypeScript** - Full type safety with comprehensive prop types

---

## 🛠️ DEVELOPMENT WORKFLOW

### **Component Development**
- Check existing components in Storybook before creating new ones
- Focus on UX improvements in all designs
- Create new components rather than modifying existing ones
- **Always follow the typography standards** for consistency

### **Documentation Standards**
- Interactive Storybook stories for all components
- Comprehensive README files with examples
- JSDoc comments for all components
- Usage examples and best practices
- Migration guides for component updates