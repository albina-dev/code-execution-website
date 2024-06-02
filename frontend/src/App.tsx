import React from 'react';
import CodeEditor from './components/CodeEditor';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Code Execution Website</h1>
      </header>
      <main>
        <CodeEditor />
      </main>
    </div>
  );
};

export default App;
