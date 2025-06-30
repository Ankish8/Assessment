import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import FillInTheBlanks from './FillInTheBlanks';

export default {
  title: 'Pages/FillInTheBlanks',
  component: FillInTheBlanks,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Fill in the blanks question creation interface with rich text editor and blank configuration.'
      }
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
};

export const Default = {
  name: 'Default State',
  args: {}
};

export const WithSampleText = {
  name: 'With Sample Blanks',
  parameters: {
    docs: {
      description: {
        story: 'Shows the interface with some sample blanks that demonstrate the new cursor-based insertion workflow.'
      }
    }
  },
  render: () => (
    <BrowserRouter>
      <FillInTheBlanks />
    </BrowserRouter>
  )
};