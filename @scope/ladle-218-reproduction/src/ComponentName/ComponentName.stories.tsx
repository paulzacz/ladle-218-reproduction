import { ComponentName, ComponentNameProps } from '..';
import { Meta, Story } from '@storybook/react';

const defaultMeta: Meta<ComponentNameProps> = {
  component: ComponentName,
  title: 'Components/ComponentName',
};
export default defaultMeta;

export const Standalone: Story<ComponentNameProps> = (args) => <ComponentName {...args} />;
