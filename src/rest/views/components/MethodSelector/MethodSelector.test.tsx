import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import { Methods } from '@rest/constants';
import MethodSelector from './MethodSelector';

it('renders MethodSelector component with select element', () => {
  const mockSetMethod = jest.fn();

  render(<MethodSelector method={Methods.GET} setMethod={mockSetMethod} />);
  const selectorElement = screen.getByRole('combobox');

  expect(selectorElement).toBeInTheDocument();
});
