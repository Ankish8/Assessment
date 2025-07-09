import SpeakingQuestionStatement from './SpeakingQuestionStatement';

export default {
  title: 'Pages/Speaking/SpeakingQuestionStatement',
  component: SpeakingQuestionStatement,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The Speaking Assessment Question Statement page where evaluators create speaking prompts for candidates.',
      },
    },
  },
  argTypes: {
    // This is a page component, so no args needed
  },
  tags: ['autodocs'],
};

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'The default Speaking Question Statement page with empty content.',
      },
    },
  },
};

export const WithContent = {
  parameters: {
    docs: {
      description: {
        story: 'Speaking Question Statement page with some sample content pre-filled.',
      },
    },
  },
  render: () => {
    // This would typically be controlled by props or state
    return <SpeakingQuestionStatement />;
  },
};

export const MobileView = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile responsive view of the Speaking Question Statement page.',
      },
    },
  },
};