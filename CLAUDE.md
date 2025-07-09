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

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

---

# 🚀 ANGULAR STORYBOOK MIGRATION PROJECT

## Project Status: **ACTIVE** ✅
**Approved by Stakeholder**: ✅  
**Master Agent**: Active  
**Timeline**: 12 weeks (4 sprints)

---

## 🎯 MISSION CRITICAL REQUIREMENTS

### **100% VISUAL & FUNCTIONAL PARITY**
- Components must look **EXACTLY** the same as React versions
- Components must behave **EXACTLY** the same as React versions  
- User should **NOT** be able to tell the difference
- **Zero tolerance** for visual or functional differences

### **THINKING-ENABLED AGENTS**
All agents MUST use systematic thinking before executing tasks:
- Analyze requirements thoroughly
- Plan approach step-by-step
- Consider edge cases and dependencies
- Validate solutions before implementation

---

## 👥 AGENT TEAM STRUCTURE

### 🎪 **MASTER AGENT (Project Manager)**
**Status**: ACTIVE ✅  
**Agent**: Claude Code  
**Role**: Coordination, planning, stakeholder communication

**Responsibilities**:
- Sprint planning and dependency management
- Progress tracking and stakeholder updates
- Quality gates and approval workflows
- Risk management and issue escalation

**Tools & Capabilities**:
- Sequential thinking for complex problem solving
- Project management and documentation
- Technical decision making and architecture review
- Cross-agent coordination and task assignment

**Current Tasks**:
- [x] Project proposal creation
- [🔄] CLAUDE.md documentation update
- [ ] React Button component analysis
- [ ] Angular project setup
- [ ] Agent task sheet creation

---

### 🎨 **AGENT 1: UI/UX SPECIALIST**
**Status**: STANDBY (Awaiting activation)  
**Agent**: UI Design Expert  
**Role**: Design system architect and component designer

**Responsibilities**:
- React component visual analysis and documentation
- CSS/SCSS conversion with exact value preservation
- Design token creation and management
- Responsive design pattern replication
- Accessibility compliance verification

**Expertise Areas**:
- Angular Material and component libraries
- CSS-in-JS to SCSS migration patterns
- Design system architecture
- Responsive design and mobile-first development
- WCAG accessibility standards

**Thinking Requirements**:
- Analyze existing React styles systematically
- Document exact measurements and specifications
- Plan CSS architecture for maintainability
- Consider cross-browser compatibility
- Validate accessibility requirements

---

### ⚙️ **AGENT 2: ANGULAR DEVELOPER (Core Components)**
**Status**: STANDBY (Awaiting activation)  
**Agent**: Angular Core Developer  
**Role**: Core UI component development

**Responsibilities**:
- Button, Input, Card, Form, Modal component development
- TypeScript interface creation and prop mapping
- Event handling and state management replication
- Core component architecture establishment
- Integration with design system

**Expertise Areas**:
- Angular 19 latest features and patterns
- TypeScript advanced typing and interfaces
- Component lifecycle and state management
- RxJS for reactive programming
- Angular testing utilities

**Thinking Requirements**:
- Map React props to Angular inputs systematically
- Plan component architecture for reusability
- Consider Angular-specific patterns and lifecycle
- Design for testability and maintainability
- Validate functional parity requirements

---

### 🔧 **AGENT 3: ANGULAR DEVELOPER (Complex Components)**
**Status**: STANDBY (Awaiting activation)  
**Agent**: Angular Advanced Developer  
**Role**: Advanced component development

**Responsibilities**:
- ProgressSteps, Selector, Tab, and specialized components
- Complex interaction patterns and animations
- Advanced state management and data flow
- Performance optimization and lazy loading
- Integration testing and component composition

**Expertise Areas**:
- Advanced Angular patterns (directives, pipes, services)
- Angular Animations API
- State management solutions (NgRx, Akita)
- Performance optimization techniques
- Complex component interaction patterns

**Thinking Requirements**:
- Analyze complex React component interactions
- Plan Angular-specific state management approach
- Design for performance and scalability
- Consider animation and transition requirements
- Validate complex user interaction flows

---

### 📊 **AGENT 4: STORYBOOK SPECIALIST**
**Status**: STANDBY (Awaiting activation)  
**Agent**: Documentation Expert  
**Role**: Documentation and story creation

**Responsibilities**:
- Angular Storybook configuration and optimization
- Story creation and documentation writing
- Addon integration and customization
- Developer experience optimization
- Documentation site maintenance

**Expertise Areas**:
- Storybook for Angular configuration
- MDX documentation authoring
- Addon development and integration
- Design documentation best practices
- Developer onboarding optimization

**Thinking Requirements**:
- Plan Storybook architecture for scalability
- Design story organization and navigation
- Consider developer workflow optimization
- Plan documentation structure and content
- Validate documentation completeness and accuracy

---

### 🧪 **AGENT 5: QA/TESTING ENGINEER**
**Status**: STANDBY (Awaiting activation)  
**Agent**: Quality Assurance Expert  
**Role**: Quality assurance and testing

**Responsibilities**:
- Test framework setup and configuration
- Component unit and integration testing
- Visual regression testing implementation
- Accessibility testing and compliance
- Cross-browser compatibility validation

**Expertise Areas**:
- Jest and Angular Testing Library
- Cypress for end-to-end testing
- Visual regression testing tools
- Accessibility testing automation
- Cross-browser testing strategies

**Thinking Requirements**:
- Plan comprehensive testing strategy
- Design test cases for component parity
- Consider edge cases and error scenarios
- Plan automated testing pipeline
- Validate quality gates and criteria

---

## 📅 PROJECT TIMELINE & MILESTONES

### **SPRINT 1: PROOF OF CONCEPT** (Week 1-2)
**Milestone**: Button Component + Storybook Setup  
**Stakeholder Review**: Demo session for approval

**Deliverables**:
- [ ] Angular 19 project structure
- [ ] Storybook configuration for Angular
- [ ] Button component (all variants and states)
- [ ] Initial design token system
- [ ] Side-by-side comparison demo

**Success Criteria**:
- Button component visually identical to React version
- All button variants functional and styled correctly
- Storybook displaying component documentation
- Stakeholder approval for approach and quality

---

### **SPRINT 2: FOUNDATION** (Week 3-5)
**Milestone**: Core UI Components  
**Stakeholder Review**: Progress demo and quality assessment

**Deliverables**:
- [ ] Input component with all variants
- [ ] Card component with headers/footers
- [ ] Form component with validation
- [ ] Modal component with accessibility
- [ ] Design system documentation

**Success Criteria**:
- All core components achieve visual parity
- Functional testing passes for all components
- Documentation complete and accessible
- Performance benchmarks met

---

### **SPRINT 3: ADVANCED COMPONENTS** (Week 6-9)
**Milestone**: Complex Components  
**Stakeholder Review**: Feature completeness review

**Deliverables**:
- [ ] ProgressSteps with responsive behavior
- [ ] Selector with grid/list layouts
- [ ] Tab navigation with keyboard support
- [ ] Interactive component testing
- [ ] Integration testing suite

**Success Criteria**:
- Complex interactions replicated accurately
- Accessibility standards maintained
- Cross-component integration working
- Performance optimization complete

---

### **SPRINT 4: COMPLETION** (Week 10-12)
**Milestone**: Full Library Delivery  
**Stakeholder Review**: Final delivery and handover

**Deliverables**:
- [ ] All remaining components migrated
- [ ] Complete Storybook documentation
- [ ] Deployment pipeline setup
- [ ] Handover documentation and training

**Success Criteria**:
- 100% component migration complete
- All quality gates passed
- Documentation complete and published
- Team trained on maintenance procedures

---

## 📊 DEPENDENCY CHART

```
Master Agent (Coordination)
├── UI/UX Specialist (Design Analysis)
│   ├── Angular Dev 1 (Core Components)
│   └── Angular Dev 2 (Complex Components)
├── Storybook Specialist (Documentation)
│   ├── Angular Dev 1 (Story Integration)
│   └── Angular Dev 2 (Story Integration)
└── QA/Testing (Quality Validation)
    ├── All Development Agents
    └── Stakeholder Reviews
```

**Critical Path Dependencies**:
1. UI/UX analysis must complete before development starts
2. Core components must be ready before complex components
3. Component development must complete before story creation
4. QA validation required before stakeholder reviews

---

## 🎯 SUCCESS METRICS & QUALITY GATES

### **Technical KPIs**
- **Visual Parity**: 100% pixel-perfect match (0 tolerance for differences)
- **Functional Parity**: 100% behavior match (all interactions identical)
- **Performance**: Load time ≤ 3 seconds, bundle size optimized
- **Accessibility**: WCAG 2.1 AA compliance (100% coverage)
- **Test Coverage**: ≥ 90% unit test coverage
- **Cross-browser**: 100% compatibility (Chrome, Firefox, Safari, Edge)

### **Quality Gates (Each Sprint)**
- [ ] **Visual Review**: Side-by-side comparison approved
- [ ] **Functional Review**: All interactions tested and approved
- [ ] **Accessibility Audit**: WCAG compliance verified
- [ ] **Performance Review**: Benchmarks met or exceeded
- [ ] **Stakeholder Approval**: Demo approved for next phase

### **Escalation Criteria**
- Any component fails visual parity check
- Performance degrades below benchmarks
- Accessibility compliance issues detected
- Timeline delays exceed 1 week
- Quality gates not met within sprint timeframe

---

## 📋 CURRENT SPRINT 1 TASKS

### **ACTIVE TASKS** (Master Agent)
1. **[🔄 IN PROGRESS]** Complete CLAUDE.md documentation
2. **[⏳ NEXT]** Analyze React Button component specifications
3. **[⏳ PENDING]** Setup Angular 19 project structure
4. **[⏳ PENDING]** Configure Storybook for Angular
5. **[⏳ PENDING]** Create detailed agent task sheets

### **UPCOMING TASKS** (Sprint 1)
- **UI/UX Agent**: React Button analysis and specification documentation
- **Angular Dev 1**: Button component implementation with exact styling
- **Storybook Agent**: Button stories and documentation creation
- **QA Agent**: Button testing and validation setup
- **Master Agent**: Progress coordination and stakeholder communication

---

## 🚨 RISK MANAGEMENT

### **HIGH PRIORITY RISKS**
1. **Visual Parity Failure**: Mitigation: Detailed spec documentation, pixel-perfect validation
2. **Angular 19 Compatibility**: Mitigation: Early testing, fallback planning
3. **Timeline Pressure**: Mitigation: Parallel workflows, priority management

### **MEDIUM PRIORITY RISKS**
1. **Resource Conflicts**: Mitigation: Clear role definitions, communication protocols
2. **Complex Component Migration**: Mitigation: Phased approach, early prototyping
3. **Stakeholder Expectations**: Mitigation: Regular demos, transparent communication

---

## 📞 STAKEHOLDER COMMUNICATION PLAN

### **Regular Updates**
- **Weekly Progress Reports**: Every Friday with metrics and blockers
- **Sprint Reviews**: End of each sprint with demos and approvals
- **Daily Standups**: Agent coordination and issue resolution

### **Emergency Protocols**
- **Blocker Escalation**: Immediate notification for timeline-critical issues
- **Quality Issues**: Same-day communication for parity failures
- **Scope Changes**: Formal approval process for requirement modifications

---

## 📝 AGENT ACTIVATION SEQUENCE

### **Phase 1: Analysis & Setup** (Week 1)
1. **Master Agent**: Complete documentation and React analysis
2. **UI/UX Agent**: ACTIVATE for design specification
3. **Storybook Agent**: ACTIVATE for setup configuration

### **Phase 2: Development** (Week 1-2)
1. **Angular Dev 1**: ACTIVATE for Button component development
2. **QA Agent**: ACTIVATE for testing framework setup

### **Phase 3: Validation** (Week 2)
1. **All Agents**: Integration testing and validation
2. **Master Agent**: Stakeholder demo preparation

---

**STATUS**: Sprint 1 COMPLETED ✅ - Button component approved by stakeholder  
**CURRENT**: Sprint 2 ACTIVE ⚡ - 5-agent team deployed  
**NEXT ACTION**: Input component analysis and parallel development in progress

---

## 🎯 SPRINT 2 STATUS (WEEK 3-5)

### **ACTIVE SPRINT METRICS**
- **Sprint**: 2 of 4  
- **Timeline**: 3 weeks (21 days)
- **Target Components**: Input, Card, Form, Modal
- **Team Status**: 5 agents ACTIVE ⚡
- **Quality Standard**: 100% parity maintained

### **CURRENT PRIORITIES**
1. **[🔄 ACTIVE]** Agent team coordination and task management
2. **[⏳ NEXT]** React Input component analysis (Agent 1)
3. **[⏳ NEXT]** Angular Input component implementation (Agent 2)
4. **[⏳ PENDING]** Storybook configuration resolution (Agent 4)

### **SUCCESS CRITERIA SPRINT 2**
- [ ] 4 components with pixel-perfect parity
- [ ] Complete Storybook documentation
- [ ] 90%+ test coverage
- [ ] Stakeholder demo ready (Day 21)

**AGENT TASK ASSIGNMENTS**: See `/SPRINT_2_AGENT_TASKS.md` for detailed responsibilities