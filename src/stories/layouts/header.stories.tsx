import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Header } from '@/base/components/layout/header';

type StoryProps = ComponentProps<typeof Header>;

const meta: Meta<StoryProps> = {
  component: Header,
  title: 'Components/Layouts/Header',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
  name: 'Header',
};
