import React from 'react';

interface MethodSelectorProps {
  method: string;
  setMethod: (method: string) => void;
}

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

function MethodSelector({ method, setMethod }: MethodSelectorProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setMethod(e.target.value);
  }

  return (
    <select
      value={method}
      onChange={handleChange}
      className="border-r focus:outline-none"
    >
      {methods.map((methodItem) => (
        <option key={methodItem} value={methodItem}>
          {methodItem}
        </option>
      ))}
    </select>
  );
}

export default MethodSelector;
