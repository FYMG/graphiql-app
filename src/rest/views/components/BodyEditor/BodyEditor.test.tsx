import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import BodyEditor from './BodyEditor';

jest.mock('@monaco-editor/react', () => {
  return function MonacoEditorMock({
    'data-testid': testId,
    value,
    onChange,
  }: {
    'data-testid': string;
    onChange: (value: string) => void;
    value: string;
  }) {
    return (
      <textarea
        data-testid={testId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };
});

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {
      body: 'Body',
      prettify: 'Prettify',
      'plain-text': 'Plain Text',
    };

    return translations[key];
  },
}));

describe('BodyEditor', () => {
  it('renders without data', () => {
    const mockSetBody = jest.fn();

    render(<BodyEditor body="" setBody={mockSetBody} />);
    expect(screen.getByText(/Body/i)).toBeInTheDocument();
  });

  it('displays the initial body prop in the editor', async () => {
    const mockSetBody = jest.fn();
    const bodyContent = '{"key": "value"}';

    render(<BodyEditor body={bodyContent} setBody={mockSetBody} />);
    const editor = await waitFor(() => screen.getByTestId('body-editor'));

    expect(editor).toBeInTheDocument();
  });

  it('calls setBody with the correct value when editor content changes', async () => {
    const mockSetBody = jest.fn();
    const initialBody = '{"key": "value"}';
    const updatedBody = '{"key": "newValue"}';

    render(<BodyEditor body={initialBody} setBody={mockSetBody} />);

    const editor = await waitFor(() => screen.getByTestId('body-editor'));

    fireEvent.change(editor, { target: { value: updatedBody } });

    expect(mockSetBody).toHaveBeenCalledWith(updatedBody);
  });

  it('renders the Prettify button', () => {
    const mockSetBody = jest.fn();

    render(<BodyEditor body="" setBody={mockSetBody} />);

    const prettifyButton = screen.getByText(/Prettify/i);

    expect(prettifyButton).toBeInTheDocument();
  });

  it('calls prettifyContent when the Prettify button is clicked', () => {
    const mockSetBody = jest.fn();

    render(<BodyEditor body='{"key": "value"}' setBody={mockSetBody} />);

    const prettifyButton = screen.getByText(/Prettify/i);

    fireEvent.click(prettifyButton);

    expect(prettifyButton).toBeInTheDocument();
  });
});
