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
The project has a well-organized component library with the following components available in Storybook:

**Core UI Components:**
- **ui/button** - Basic button with variants, sizes, states
- **ui/input** - Input fields with validation, types, states  
- **ui/card** - Card container with headers, footers, variants
- **ui/modal** - Modal dialogs with portal rendering, accessibility
- **ui/form** - Form wrapper with validation, layouts
- **ui/header** - Page header with navigation, responsive design
- **ui/progress-steps** - Step indicator with progress tracking
- **ui/selector** - Multi-selection component with grid/list layouts
- **ui/tab** - Tab navigation with keyboard accessibility
- **ui/responsive-progress-steps** - Advanced stepper with overflow detection
- **ui/floating-footer** - Fixed bottom footer with validation alerts

**Feature Components:**
- **BottomActions** - Common bottom action component
- **QuestionTypeSelector** - Root level question type selector
- **EvaluationParameters** - Page component for evaluation settings
- **CodeEditor** - Code editing component with syntax highlighting
- **LanguageList** - Programming language selection
- **ToggleCard** - Toggle-able card component
- **SkillsInput** - Skills input with tagging
- **FillInTheBlanks** - Fill-in-the-blanks page component
- **MediaResources** - Media resource management page
- **SolutionDetails** - Solution details page component
- **SubmissionQuestionDetails** - Question details page
- **SubmissionQuestions** - Questions listing page
- **TestCases** - Test cases management page

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
- **Progress Navigation**: All pages use `ResponsiveProgressSteps`
- **Bottom Actions**: `FloatingFooter` or `BottomActions` with consistent button patterns
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
1. **General Submission** - Complete flow with all core pages
2. **Fill-in-the-Blanks** - Complete specialized flow with customized pages  
3. **Multiple Choice** - Question creation page implemented
4. **Coding Questions** - Enhanced flow with test cases and default codes

### Missing/Potential Assessment Types:
- **Essay Questions** - Long-form text responses
- **File Upload Questions** - Document/project submissions
- **Audio/Video Questions** - Multimedia response questions
- **Drag-and-Drop Questions** - Interactive sorting/matching
- **Drawing/Diagram Questions** - Visual response questions