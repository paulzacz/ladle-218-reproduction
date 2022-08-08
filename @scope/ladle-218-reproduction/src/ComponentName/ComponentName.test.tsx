import { render, screen } from '@testing-library/react';
import { ComponentName } from '..';

describe('ComponentName', () => {
  it('should render', () => {
    render(<ComponentName name="Bob" />);
    expect(screen.getByText("I'm Bob!")).toBeInTheDocument();
  });
});
