import { Root, RootProps } from '..';
import { Meta, Story } from '@storybook/react';

const defaultMeta: Meta<RootProps> = {
  component: Root,
  title: 'Components/Root',
};
export default defaultMeta;

export const Standalone: Story<RootProps> = (args) => <Root {...args} />;
