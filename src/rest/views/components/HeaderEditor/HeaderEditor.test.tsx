import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import HeaderEditor from './HeaderEditor';

describe('HeaderEditor', () => {
  const contentType = 'Content-Type';
  const bearerToken = 'Bearer token';

  let headers = [
    { key: contentType, value: 'application/json' },
    { key: 'Authorization', value: bearerToken },
  ];

  const setHeaders = jest.fn((newHeaders) => {
    headers = newHeaders;
  });

  beforeEach(() => {
    headers = [
      { key: contentType, value: 'application/json' },
      { key: 'Authorization', value: bearerToken },
    ];
    setHeaders.mockClear();
  });

  test('renders headers correctly', () => {
    render(<HeaderEditor headers={headers} setHeaders={setHeaders} />);

    const inputs = screen.getAllByPlaceholderText(/header/i);

    expect(inputs).toHaveLength(4);
    expect(inputs[0]).toHaveValue(contentType);
    expect(inputs[1]).toHaveValue('application/json');
    expect(inputs[2]).toHaveValue('Authorization');
    expect(inputs[3]).toHaveValue(bearerToken);
  });

  test('adds a new header', () => {
    render(<HeaderEditor headers={headers} setHeaders={setHeaders} />);

    const addButton = screen.getByText('Add Header');

    fireEvent.click(addButton);

    expect(setHeaders).toHaveBeenCalledWith([
      { key: contentType, value: 'application/json' },
      { key: 'Authorization', value: bearerToken },
      { key: '', value: '' },
    ]);
  });

  test('updates a header key', () => {
    render(<HeaderEditor headers={headers} setHeaders={setHeaders} />);

    const keyInput = screen.getAllByPlaceholderText('Header Key')[0];

    fireEvent.change(keyInput, { target: { value: 'Accept' } });

    expect(setHeaders).toHaveBeenCalledWith([
      { key: 'Accept', value: 'application/json' },
      { key: 'Authorization', value: bearerToken },
    ]);
  });

  test('updates a header value', () => {
    render(<HeaderEditor headers={headers} setHeaders={setHeaders} />);

    const valueInput = screen.getAllByPlaceholderText('Header Value')[0];

    fireEvent.change(valueInput, { target: { value: 'text/plain' } });

    expect(setHeaders).toHaveBeenCalledWith([
      { key: contentType, value: 'text/plain' },
      { key: 'Authorization', value: bearerToken },
    ]);
  });

  test('removes a header', () => {
    render(<HeaderEditor headers={headers} setHeaders={setHeaders} />);

    const removeButton = screen.getAllByText('Remove')[0];

    fireEvent.click(removeButton);

    expect(setHeaders).toHaveBeenCalledWith([
      { key: 'Authorization', value: bearerToken },
    ]);
  });
});
