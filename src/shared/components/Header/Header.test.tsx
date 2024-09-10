import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import { Header } from '@shared/components/Header';

test('renders header component with h1 element', () => {
  render(<Header />);
  const footerElement = screen.getByText('Footer');

  expect(footerElement).toBeInTheDocument();
});
