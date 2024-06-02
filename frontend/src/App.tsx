import React from 'react';
import CodeEditor from './components/CodeEditor';

const App: React.FC = () => {
  return (
    <div className="App h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 w-full py-4 text-white text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Albina's Online Development Platform
        </h1>
        <p className="mt-2 text-lg">Write, test, and submit your code seamlessly</p>
      </header>
      <main className="flex-grow flex w-full">
        <CodeEditor />
      </main>
    </div>
  );
};

export default App;
