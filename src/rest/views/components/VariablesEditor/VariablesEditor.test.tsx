import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import VariablesEditor from './VariablesEditor';

describe('VariablesEditor', () => {
  let setVariablesMock: jest.Mock;
  let initialVariables: { key: string; value: string }[];
  const testUrl = 'https://jsonplaceholder.typicode.com/';

  beforeEach(() => {
    setVariablesMock = jest.fn();
    initialVariables = [{ key: 'url', value: testUrl }];
  });

  it('renders correctly with initial variables', () => {
    render(
      <VariablesEditor variables={initialVariables} setVariables={setVariablesMock} />
    );

    expect(screen.getByPlaceholderText('Variable Key')).toHaveValue('url');
    expect(screen.getByPlaceholderText('Variable Value')).toHaveValue(
      'https://jsonplaceholder.typicode.com/'
    );
  });

  it('calls setVariables when adding a variable', () => {
    render(
      <VariablesEditor variables={initialVariables} setVariables={setVariablesMock} />
    );

    fireEvent.click(screen.getByText('Add Variables'));

    expect(setVariablesMock).toHaveBeenCalledWith([
      { key: 'url', value: testUrl },
      { key: '', value: '' },
    ]);
  });

  it('calls setVariables when updating a variable key', () => {
    render(
      <VariablesEditor variables={initialVariables} setVariables={setVariablesMock} />
    );

    fireEvent.change(screen.getByPlaceholderText('Variable Key'), {
      target: { value: 'updatedKey' },
    });

    expect(setVariablesMock).toHaveBeenCalledWith([
      { key: 'updatedKey', value: testUrl },
    ]);
  });

  it('calls setVariables when updating a variable value', () => {
    render(
      <VariablesEditor variables={initialVariables} setVariables={setVariablesMock} />
    );

    fireEvent.change(screen.getByPlaceholderText('Variable Value'), {
      target: { value: 'newUrl' },
    });

    expect(setVariablesMock).toHaveBeenCalledWith([{ key: 'url', value: 'newUrl' }]);
  });

  it('calls setVariables when removing a variable', () => {
    render(
      <VariablesEditor variables={initialVariables} setVariables={setVariablesMock} />
    );

    fireEvent.click(screen.getByText('Remove'));

    expect(setVariablesMock).toHaveBeenCalledWith([]);
  });
});
