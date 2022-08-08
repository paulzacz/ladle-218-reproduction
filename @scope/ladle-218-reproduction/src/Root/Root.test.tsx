import { render, screen } from '@testing-library/react';
import { Root } from '..';

describe('Root', () => {
  it('should render', () => {
    render(<Root>foo</Root>);
    expect(screen.getByText('foo')).toBeInTheDocument();
  });
});
