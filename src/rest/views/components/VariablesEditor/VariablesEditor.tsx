'use client';

import React, { useId, useState } from 'react';

import { Input } from '@shared/components/ui/input';
import { Button } from '@shared/components/ui/button';
import { VariablesEditorProps } from '@rest/constants';

function VariablesEditor({ variables, setVariables }: VariablesEditorProps) {
  const [hidden, setHidden] = useState(false);

  const blockId = useId();
  const addVariable = () => {
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
    setHidden(!hidden);
  };

  return (
    <div className="mb-2">
      <div className="flex justify-between">
        <h3 className="font-semibold">Variables</h3>
        {variables.length ? (
          <Button variant="default" onClick={() => hiddenVariable()}>
            {hidden ? 'Show' : 'Hide'}
          </Button>
        ) : null}
      </div>
      {!hidden &&
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
