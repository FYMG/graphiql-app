import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import VariablesEditor from './VariablesEditor';

const variableValue = 'Variable value';
const variableKey = 'Variable key';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {
      variables: 'Variables',
      'variable-key': variableKey,
      'variable-value': variableValue,
      'add-variable': 'Add variable',
      remove: 'Remove',
    };

    return translations[key];
  },
}));

describe('VariablesEditor', () => {
  it('renders the component with variables', () => {
    const variables = [{ key: 'key1', value: 'value1' }];
    const setVariables = jest.fn();

    render(<VariablesEditor variables={variables} setVariables={setVariables} />);

    expect(screen.getByText('Variables')).toBeInTheDocument();

    expect(screen.getByPlaceholderText(variableKey)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(variableValue)).toBeInTheDocument();
  });

  it('adds a new empty variable on button click', () => {
    const variables = [{ key: '', value: '' }];
    const setVariables = jest.fn();

    render(<VariablesEditor variables={variables} setVariables={setVariables} />);

    const addButton = screen.getByText('Add variable');

    fireEvent.click(addButton);

    expect(setVariables).toHaveBeenCalledWith([
      { key: '', value: '' },
      { key: '', value: '' },
    ]);
  });

  it('calls setVariables when removing a variable', () => {
    const variables = [{ key: 'key1', value: 'value1' }];
    const setVariables = jest.fn();

    render(<VariablesEditor variables={variables} setVariables={setVariables} />);

    const removeButton = screen.getByText('Remove');

    fireEvent.click(removeButton);

    expect(setVariables).toHaveBeenCalledWith([]);
  });

  it('calls setVariables when updating a variable value', () => {
    const variables = [{ key: 'key1', value: 'value1' }];
    const setVariables = jest.fn();

    render(<VariablesEditor variables={variables} setVariables={setVariables} />);

    const valueInput = screen.getByPlaceholderText(variableValue);

    fireEvent.change(valueInput, { target: { value: 'newValue' } });

    expect(setVariables).toHaveBeenCalledWith([{ key: 'key1', value: 'newValue' }]);
  });

  it('calls setVariables when updating a variable key', () => {
    const variables = [{ key: 'key1', value: 'value1' }];
    const setVariables = jest.fn();

    render(<VariablesEditor variables={variables} setVariables={setVariables} />);

    const keyInput = screen.getByPlaceholderText(variableKey);

    fireEvent.change(keyInput, { target: { value: 'newKey' } });

    expect(setVariables).toHaveBeenCalledWith([{ key: 'newKey', value: 'value1' }]);
  });
});
