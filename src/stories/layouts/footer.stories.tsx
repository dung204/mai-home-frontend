import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Footer } from '@/base/components/layout/footer';

type StoryProps = ComponentProps<typeof Footer>;

const meta: Meta<StoryProps> = {
  component: Footer,
  title: 'Components/Layouts/Footer',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
  name: 'Footer',
};
