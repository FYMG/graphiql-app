import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ResponseField from './ResponseField';

jest.mock('@monaco-editor/react', () => {
  return function MonacoEditorMock({
    'data-testid': testId,
    loading,
    value,
  }: {
    'data-testid': string;
    loading: boolean;
    value: string;
  }) {
    return (
      <textarea
        data-testid={testId}
        value={loading ? 'Loading response...' : value}
        readOnly
      />
    );
  };
});

const testId = 'response-editor';

describe('ResponseField', () => {
  it('renders with null response and status', () => {
    render(<ResponseField response={null} status={null} loading={false} />);

    expect(screen.getByRole('heading', { name: /Response/i })).toBeInTheDocument();
    expect(screen.queryByText(/Status/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
  });

  it('renders with valid status and response', () => {
    const response = { message: 'Success' };
    const status = 200;

    render(<ResponseField response={response} status={status} loading={false} />);

    expect(screen.getByRole('heading', { name: /Response/i })).toBeInTheDocument();
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/200/)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveValue(JSON.stringify(response, null, 2));
  });

  it('renders with invalid status and response', () => {
    const response = { message: 'Error' };
    const status = 404;

    render(<ResponseField response={response} status={status} loading={false} />);

    expect(screen.getByRole('heading', { name: /Response/i })).toBeInTheDocument();
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(screen.getByText(/404/)).toHaveClass('text-orange-500');
    expect(screen.getByTestId(testId)).toHaveValue(JSON.stringify(response, null, 2));
  });
});
