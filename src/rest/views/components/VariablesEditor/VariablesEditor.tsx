import React, { useId } from 'react';

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
    <div>
      <h3 className="mb-2 font-semibold">Variables</h3>
      {variables.map((variable, index) => (
        <div
          key={blockId}
          className="flex justify-between rounded-md border border-gray-300 py-2"
        >
          <input
            type="text"
            placeholder="Variable Key"
            value={variable.key}
            onChange={(e) => updateVariable(index, e.target.value, variable.value)}
            className="border-r border-gray-300 px-2 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Variable Value"
            value={variable.value}
            onChange={(e) => updateVariable(index, variable.key, e.target.value)}
            className="w-full px-2 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => removeVariable(index)}
            className="linear h-full rounded-sm bg-accent px-3 text-accent-foreground transition delay-150 hover:bg-foreground hover:text-accent"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addVariable}
        className="mb-2 text-sm text-blue-500 transition delay-150 hover:text-blue-900"
      >
        Add Variables
      </button>
    </div>
  );
}

export default VariablesEditor;
