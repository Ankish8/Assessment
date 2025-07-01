import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { fn } from '@storybook/test';

import { SelectorComponent, SelectorOption } from '../app/components/selector/selector.component';

// Sample data for stories
const programmingLanguages: SelectorOption[] = [
  {
    id: 'js',
    label: 'JavaScript',
    value: 'javascript',
    description: 'Dynamic programming language for web development',
    badge: 'Popular'
  },
  {
    id: 'ts',
    label: 'TypeScript',
    value: 'typescript',
    description: 'Typed superset of JavaScript',
    badge: 'Growing'
  },
  {
    id: 'py',
    label: 'Python',
    value: 'python',
    description: 'High-level programming language for AI and web development',
    badge: 'AI/ML'
  },
  {
    id: 'java',
    label: 'Java',
    value: 'java',
    description: 'Object-oriented programming language'
  },
  {
    id: 'cpp',
    label: 'C++',
    value: 'cpp',
    description: 'Systems programming language',
    disabled: true
  },
  {
    id: 'rust',
    label: 'Rust',
    value: 'rust',
    description: 'Systems programming language focused on safety',
    badge: 'Fast'
  }
];

const simpleOptions: SelectorOption[] = [
  { id: '1', label: 'Option 1', value: 'option1' },
  { id: '2', label: 'Option 2', value: 'option2' },
  { id: '3', label: 'Option 3', value: 'option3' },
  { id: '4', label: 'Option 4', value: 'option4', disabled: true }
];

const meta: Meta<SelectorComponent> = {
  title: 'Components/Selector',
  component: SelectorComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule]
    })
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible selector component with multiple layout options.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple']
    },
    layout: {
      control: { type: 'select' },
      options: ['dropdown', 'grid', 'list']
    },
    gridColumns: {
      control: { type: 'number', min: 1, max: 4 }
    },
    disabled: {
      control: 'boolean'
    },
    required: {
      control: 'boolean'
    }
  },
  args: {
    selectionChange: fn(),
    options: simpleOptions,
    mode: 'single',
    layout: 'dropdown',
    gridColumns: 2,
    disabled: false,
    required: false
  }
};

export default meta;
type Story = StoryObj<SelectorComponent>;

export const Dropdown: Story = {
  args: {
    label: 'Choose an option',
    placeholder: 'Select an option...',
    layout: 'dropdown'
  }
};

export const GridLayout: Story = {
  args: {
    label: 'Programming Languages',
    options: programmingLanguages,
    layout: 'grid',
    gridColumns: 2
  }
};

export const ListLayout: Story = {
  args: {
    label: 'Programming Languages',
    options: programmingLanguages,
    layout: 'list'
  }
};

export const MultipleSelection: Story = {
  args: {
    label: 'Choose multiple languages',
    options: programmingLanguages,
    mode: 'multiple',
    layout: 'grid',
    gridColumns: 3
  }
};