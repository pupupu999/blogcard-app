import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'デフォルトボタン',
  },
};

export const Disabled: Story = {
  args: {
    children: '無効ボタン',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    children: '小さめ',
    className: 'text-sm px-3 py-1',
  },
};