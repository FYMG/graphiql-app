import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyEditor from '@shared/components/PropertyEditor/PropertyEditor';

const headerValue = 'Header value';
const headerKey = 'Header key';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {
      headers: 'Headers',
      'header-key': headerKey,
      'header-value': headerValue,
      add: 'Add header',
      remove: 'Remove',
    };

    return translations[key];
  },
}));

const placeholders = { key: 'header-key', value: 'header-value' };

describe('HeaderEditor', () => {
  it('renders the component with headers', () => {
    const headers = [{ key: 'key1', value: 'value1' }];
    const setHeaders = jest.fn();

    render(
      <PropertyEditor
        items={headers}
        onPropertyChange={setHeaders}
        title="headers"
        placeholders={placeholders}
      />
    );

    expect(screen.getByText('Headers')).toBeInTheDocument();

    expect(screen.getByPlaceholderText(headerKey)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(headerValue)).toBeInTheDocument();
  });

  it('adds a new empty variable on button click', () => {
    const headers = [{ key: 'a', value: 'b' }];
    const setHeaders = jest.fn();

    render(
      <PropertyEditor
        items={headers}
        onPropertyChange={setHeaders}
        title="headers"
        placeholders={placeholders}
      />
    );

    const addButton = screen.getByText('Add header');

    fireEvent.click(addButton);

    expect(setHeaders).toHaveBeenCalledWith([
      { key: 'a', value: 'b' },
      { key: '', value: '' },
    ]);
  });

  it('calls setHeaders when removing a variable', () => {
    const headers = [{ key: 'key1', value: 'value1' }];
    const setHeaders = jest.fn();

    render(
      <PropertyEditor
        items={headers}
        onPropertyChange={setHeaders}
        title="headers"
        placeholders={placeholders}
      />
    );

    const removeButton = screen.getByText('Remove');

    fireEvent.click(removeButton);

    expect(setHeaders).toHaveBeenCalledWith([]);
  });

  it('calls setHeaders when updating a variable value', () => {
    const headers = [{ key: 'key1', value: 'value1' }];
    const setHeaders = jest.fn();

    render(
      <PropertyEditor
        items={headers}
        onPropertyChange={setHeaders}
        title="headers"
        placeholders={placeholders}
      />
    );

    const valueInput = screen.getByPlaceholderText(headerValue);

    fireEvent.change(valueInput, { target: { value: 'newValue' } });

    expect(setHeaders).toHaveBeenCalledWith([{ key: 'key1', value: 'newValue' }]);
  });

  it('calls setHeaders when updating a variable key', () => {
    const headers = [{ key: 'key1', value: 'value1' }];
    const setHeaders = jest.fn();

    render(
      <PropertyEditor
        items={headers}
        onPropertyChange={setHeaders}
        title="headers"
        placeholders={placeholders}
      />
    );

    const keyInput = screen.getByPlaceholderText(headerKey);

    fireEvent.change(keyInput, { target: { value: 'newKey' } });

    expect(setHeaders).toHaveBeenCalledWith([{ key: 'newKey', value: 'value1' }]);
  });
});
