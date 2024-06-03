# Albina's Online Development Platform

## Introduction

Albina's Online Development Platform is a web-based application designed to allow users to write, test, and submit Python code in a convenient online environment. The platform provides a rich text editor for writing code, a backend server for executing the code, and a database for storing code submissions and their outputs. 

## Architecture

The platform consists of three main components:
1. **Frontend**: Built using React, it provides a user-friendly interface for writing and testing code.
2. **Backend**: Built using FastAPI, it handles code execution and manages database interactions.
3. **Database**: Uses SQLite for storing code submissions and their outputs.

### Frontend

The frontend is a React application that provides the user interface for the platform. Key components include:

- **CodeEditor.tsx**: A component that uses the Monaco Editor to provide a rich text editing experience for writing Python code.
- **App.tsx**: The main application component that integrates the CodeEditor component.

#### Key Features:
- **Monaco Editor**: A powerful code editor component with syntax highlighting and other advanced features.
- **HTTP Requests**: Sends requests to the backend to test and submit code.

### Backend

The backend is a FastAPI application that handles code execution and database operations. Key files include:

- **main.py**: The main entry point of the backend application. It defines the API endpoints and handles code execution.
- **models.py**: Defines the SQLAlchemy models for the database.

#### Key Features:
- **Code Execution**: Uses Python's `subprocess` module to execute user-submitted code safely within a controlled environment.
- **Database Integration**: Uses SQLAlchemy to interact with an SQLite database for storing code submissions and outputs.
- **CORS Middleware**: Ensures that the frontend can communicate with the backend without cross-origin issues.

### Database

The platform uses SQLite for database management. It stores user-submitted code and their execution outputs in a persistent manner.

#### Key Features:
- **SQLAlchemy ORM**: Simplifies database interactions by mapping database tables to Python objects.
- **Automatic Database Creation**: The database and necessary tables are created automatically when the backend application starts.
- 

## Setup Instructions

### Backend Setup

1. **Navigate to the Backend Directory**:
    ```sh
    cd backend
    ```

2. **Create and Activate a Virtual Environment**:
    ```sh
    python -m venv venv       # or python3 -m venv venv
    source venv/bin/activate  # macOS/Linux
    .\venv\Scripts\activate   # Windows
    ```

3. **Install Dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

### Frontend Setup

1. **Navigate to the Frontend Directory**:
    ```sh
    cd ../frontend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

## Running the Application

### Running the Backend

1. **Navigate to the Backend Directory**:
    ```sh
    cd backend
    ```

2. **Activate the Virtual Environment**:
    ```sh
    source venv/bin/activate  # macOS/Linux
    .\venv\Scripts\activate   # Windows
    ```

3. **Run the FastAPI Application**:
    ```sh
    uvicorn main:app --reload
    ```

### Running the Frontend

1. **Navigate to the Frontend Directory**:
    ```sh
    cd ../frontend
    ```

2. **Start the Development Server**:
    ```sh
    npm run dev
    ```
3. **Navigate to http://localhost:5173/**

## Database Setup
The SQLite database will be created automatically when the backend runs for the first time. The database file test.db will be located in the backend directory.

If you need to inspect the database, you can use SQLite tools such as sqlite3 or DB Browser for SQLite.

