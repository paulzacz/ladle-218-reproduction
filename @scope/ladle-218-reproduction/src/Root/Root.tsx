import { ReactElement, ReactNode, useState } from 'react';
import createBEMHelper from '../bem-helper';

const classes = createBEMHelper({ name: 'root' });

export interface RootProps {
  children: ReactNode;
}
export default function Root({ children }: RootProps): ReactElement {
  return <div>{children}</div>;
}

// TODO: PropTypes
