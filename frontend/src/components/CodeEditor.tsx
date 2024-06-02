import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

// Define the CodeEditor component using React functional component syntax
const CodeEditor: React.FC = () => {
    // useState hooks to manage the state of code, output, and error
    const [code, setCode] = useState<string>(''); // State to store the code written in the editor
    const [output, setOutput] = useState<string | null>(null); // State to store the output of the code execution
    const [error, setError] = useState<string | null>(null); // State to store any errors from the code execution

    // Handler function to update the code state when the content of the editor changes
    const handleEditorChange = (value: string | undefined) => {
        setCode(value || ''); // Update the code state with the new value or an empty string if undefined
    };

    // Function to send the code to the backend for execution and handle the response
    const testCode = async () => {
        setOutput(null); // Clear the previous output
        setError(null);  // Clear the previous error
        try {
            // Make a POST request to the backend API to execute the code
            const response = await fetch('http://localhost:8000/api/test-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
                body: JSON.stringify({ code }), // Send the code as a JSON string in the request body
            });
            if (!response.ok) { // Check if the response is not OK (status code outside the range 200-299)
                const errorData = await response.json(); // Parse the error response as JSON
                throw new Error(errorData.detail); // Throw an error with the detail message from the response
            }
            const result = await response.json(); // Parse the successful response as JSON
            setOutput(result.output); // Update the output state with the result
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message); // Update the error state with the error message if it's an instance of Error
            } else {
                setError('An unknown error occurred'); // Set a generic error message for unknown errors
            }
        }
    };

    // JSX to render the component
    return (
        <div className="flex flex-grow h-full">
            {/* Left column for the code editor */}
            <div className="flex-grow w-1/2 h-full p-4 flex flex-col">
                <div className="flex-grow">
                    <Editor
                        height="100%" // Set the height of the editor to fill the container
                        width="100%" // Set the width of the editor to fill the container
                        defaultLanguage="python" // Set the default language of the editor to Python
                        defaultValue="# Write your Python code here" // Set the default value of the editor
                        onChange={handleEditorChange} // Set the change handler to update the code state
                    />
                </div>
                <button
                    onClick={testCode} // Set the click handler to execute the testCode function
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded self-start"
                >
                    Test Code
                </button>
            </div>
            {/* Right column for displaying the output or error */}
            <div className="w-1/2 h-full p-4 overflow-auto">
                {output && ( // Conditionally render the output section if there is output
                    <div className="p-4 bg-gray-100 border rounded w-full text-black">
                        <h2 className="font-bold">Output:</h2>
                        <pre className="whitespace-pre-wrap">{output}</pre>
                    </div>
                )}
                {error && ( // Conditionally render the error section if there is an error
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
