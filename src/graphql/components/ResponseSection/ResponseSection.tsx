import React from 'react';

interface ResponseComponentProps {
  response: Response;
}

function ResponseComponent({ response }: ResponseComponentProps) {
  return (
    <div>
      <h3>Response</h3>
      <pre>{response ? JSON.stringify(response, null, 2) : 'No response yet'}</pre>
    </div>
  );
}

export default ResponseComponent;
