import React, { useId } from 'react';

import { Input } from '@shared/components/ui/input';
import { Button } from '@shared/components/ui/button';

interface Variable {
  key: string;
  value: string;
}

interface VariablesEditorProps {
  setVariables: (variables: Variable[]) => void;
  variables: Variable[];
}

function VariablesEditor({ variables, setVariables }: VariablesEditorProps) {
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

  return (
    <div className="mb-2">
      <h3 className="font-semibold">Variables</h3>
      {variables.map((variable, index) => (
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
