import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>('');

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const testCode = async () => {
    const response = await fetch('http://localhost:8000/api/test-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="python"
        defaultValue="# Write your Python code here"
        onChange={handleEditorChange}
      />
      <button onClick={testCode}>Test Code</button>
    </div>
  );
};

export default CodeEditor;
