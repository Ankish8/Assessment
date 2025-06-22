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