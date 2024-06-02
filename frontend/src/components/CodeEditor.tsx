import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

// Define the CodeEditor component as a functional component
const CodeEditor: React.FC = () => {
    // State hooks to manage the code, output, and error messages
    const [code, setCode] = useState<string>('');  // State for the code written by the user
    const [output, setOutput] = useState<string | null>(null);  // State for the output of the code execution
    const [error, setError] = useState<string | null>(null);  // State for any errors encountered during code execution

    // Function to handle changes in the code editor
    const handleEditorChange = (value: string | undefined) => {
        setCode(value || '');  // Update the code state with the new value from the editor
    };

    // Function to test the code by sending it to the backend
    const testCode = async () => {
        setOutput(null); // Clear previous output
        setError(null);  // Clear previous error
        try {
            // Send a POST request to the backend to test the code
            const response = await fetch('http://localhost:8000/api/test-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),  // Send the code as a JSON object
            });
            // If the response is not OK, throw an error
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail);
            }
            // Parse the response and update the output state
            const result = await response.json();
            setOutput(result.output);
        } catch (error) {
            // Handle any errors that occur during the request
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    // Function to submit the code by sending it to the backend
    const submitCode = async () => {
        // If there's an error, show an alert and return
        if (error) {
            alert('Code generating errors cannot be submitted.');
            return;
        }

        try {
            // Send a POST request to the backend to submit the code
            const response = await fetch('http://localhost:8000/api/submit-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),  // Send the code as a JSON object
            });
            // If the response is not OK, throw an error
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail);
            }
            // Parse the response and update the output state
            const result = await response.json();
            setOutput(result.output);
            // Show a success message
            alert('Code submitted successfully!');
        } catch (error) {
            // Handle any errors that occur during the request and show an alert
            if (error instanceof Error) {
                setError(error.message);
                alert('An error occurred while submitting the code: ' + error.message);
            } else {
                setError('An unknown error occurred');
                alert('An unknown error occurred while submitting the code.');
            }
        }
    };

    return (
        <div className="flex flex-grow h-full">
            <div className="flex-grow w-1/2 h-full p-4 flex flex-col">
                <div className="flex-grow">
                    <Editor
                        height="100%"  // Set the height of the editor to fill its container
                        width="100%"  // Set the width of the editor to fill its container
                        defaultLanguage="python"  // Set the default language of the editor to Python
                        defaultValue="# Write your Python code here"  // Set the default value of the editor
                        onChange={handleEditorChange}  // Set the function to handle changes in the editor
                    />
                </div>
                <button
                    onClick={testCode}  // Set the function to handle the button click
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded self-start"
                >
                    Test Code
                </button>
                <button
                    onClick={submitCode}  // Set the function to handle the button click
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded self-start"
                >
                    Submit Code
                </button>
            </div>
            <div className="w-1/2 h-full p-4 overflow-auto">
                {output && (
                    <div className="p-4 bg-gray-100 border rounded w-full text-black">
                        <h2 className="font-bold">Output:</h2>
                        <pre className="whitespace-pre-wrap">{output}</pre>
                    </div>
                )}
                {error && (
                    <div className="p-4 bg-red-100 border border-red-500 rounded w-full text-black">
                        <h2 className="font-bold">Error:</h2>
                        <pre className="whitespace-pre-wrap">{error}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeEditor;
