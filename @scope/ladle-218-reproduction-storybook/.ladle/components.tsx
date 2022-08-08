import type { GlobalProvider } from '@ladle/react';

import { Root } from '@scope/ladle-218-reproduction';

import '@scope/ladle-218-reproduction/dist/ladle-218-reproduction.css';
import '../.storybook/demo.css';

export const Provider: GlobalProvider = ({ children }) => <Root>{children}</Root>;
