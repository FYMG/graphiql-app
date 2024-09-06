'use client';

import React, { useId, useState } from 'react';

import { Input } from '@shared/shadcn/ui/input';
import { Button } from '@shared/shadcn/ui/button';
import { VariablesEditorProps } from '@rest/constants';
import { DropDownBtn } from '../DropDownBtn';

function VariablesEditor({ variables, setVariables }: VariablesEditorProps) {
  const [isHidden, setIsHidden] = useState(false);

  const blockId = useId();
  const addVariable = () => {
    setIsHidden(false);
    setVariables([...variables, { key: '', value: '' }]);
  };

  const updateVariable = (index: number, key: string, value: string) => {
    const updatedVariables = variables.map((variable, i) =>
      i === index ? { key, value } : variable
    );

    setVariables(updatedVariables);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const hiddenVariable = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="mb-2">
      <div className="flex justify-between">
        <h3 className="font-semibold">Variables</h3>
        {variables.length ? (
          <DropDownBtn isHidden={isHidden} onClick={hiddenVariable} text="variables" />
        ) : null}
      </div>
      {!isHidden &&
        variables.map((variable, index) => (
          <div
            key={blockId}
            className="flex justify-between gap-2 rounded-md border border-gray-300 px-1 py-1"
          >
            <Input
              type="text"
              placeholder="Variable Key"
              value={variable.key}
              onChange={(e) => updateVariable(index, e.target.value, variable.value)}
            />
            <Input
              type="text"
              placeholder="Variable Value"
              value={variable.value}
              onChange={(e) => updateVariable(index, variable.key, e.target.value)}
            />
            <Button variant="default" onClick={() => removeVariable(index)}>
              Remove
            </Button>
          </div>
        ))}
      <Button
        variant="link"
        onClick={addVariable}
        className="m-0 h-auto p-0 text-sm text-blue-400 transition delay-150 hover:text-blue-700 hover:no-underline"
      >
        Add Variables
      </Button>
    </div>
  );
}

export default VariablesEditor;
