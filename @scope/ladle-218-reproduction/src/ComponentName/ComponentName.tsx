import { ReactElement, useState } from 'react';
import createBEMHelper from '../bem-helper';

const classes = createBEMHelper({ name: 'component-name' });

export interface ComponentNameProps {
  name: string;
}
export default function ComponentName({ name }: ComponentNameProps): ReactElement {
  return <div>foo</div>;
}

// TODO: PropTypes
