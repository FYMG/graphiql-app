import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ResponseField from './ResponseField';

const testId = 'response-editor';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {
      response: 'Response',
      status: 'Status',
    };

    return translations[key];
  },
}));

describe('ResponseField', () => {
  it('renders with null response and status', () => {
    render(<ResponseField response={null} status={null} loading={false} />);

    expect(screen.getByRole('heading', { name: /Response/i })).toBeInTheDocument();
    expect(screen.queryByText(/Status/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
  });

  it('matches snapshot when response is null, loading is false, and status is 200', () => {
    const { asFragment } = render(
      <ResponseField loading={false} response={null} status={200} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
