import React from 'react';
import { render, screen } from '@testing-library/react';
import { LocationApp } from 'components/LocationApp';

test('renders learn react link', () => {
  render(<LocationApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
