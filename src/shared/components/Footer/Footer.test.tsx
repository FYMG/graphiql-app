import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders Footer component with h1 element', () => {
  render(<Footer />);
  const footerElement = screen.getByText('Footer');

  expect(footerElement).toBeInTheDocument();
});
