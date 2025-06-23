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

## Bit.dev Component Migration Progress

### Project Goal
Migrating all Storybook components to Bit.dev for reuse across a huge project. Components need to be self-contained with inline styles (no CSS imports) to avoid dependency issues.

### Migration Pattern
Each component follows this structure:
1. **Main component file** (TypeScript with inline styles using exact design token values)
2. **Comprehensive .composition.tsx** (10+ examples showing all variants)
3. **Extensive .spec.tsx** (validation tests with multiple scenarios)
4. **index.ts exports** (proper TypeScript exports)
5. **Update .bitmap** (Bit workspace configuration)

### ✅ Completed High-Priority Components (10 total)
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

### 📋 Next Batch Ready (12 components)
**High Priority:**
- **BottomActions** - Common bottom action component
- **QuestionTypeSelector** - Root level question type selector
- **EvaluationParameters** - Page component for evaluation settings
- **CodeEditor** - Code editing component with syntax highlighting

**Medium Priority:**
- **LanguageList** - Programming language selection
- **ToggleCard** - Toggle-able card component
- **SkillsInput** - Skills input with tagging
- **FillInTheBlanks** - Fill-in-the-blanks page component
- **MediaResources** - Media resource management page
- **SolutionDetails** - Solution details page component
- **SubmissionQuestionDetails** - Question details page
- **SubmissionQuestions** - Questions listing page
- **TestCases** - Test cases management page

### Technical Details
- **CSS-in-JS**: All styles converted to inline React.CSSProperties
- **Design Tokens**: Hardcoded values from CSS variables (e.g., `#611F69`, `16px`, `6px`)
- **Responsive**: Media queries handled via window.innerWidth checks
- **TypeScript**: Full type safety with proper interfaces
- **Accessibility**: Focus management, keyboard navigation, ARIA attributes
- **Portal Support**: Modal components handle document.body availability

### Current Status
- **Total Progress**: 10/22 components migrated (45% complete)
- **Next Session**: Continue with BottomActions component migration
- **Workspace**: All components configured in `.bitmap` for Bit.dev
- **Testing**: Each component has comprehensive test coverage