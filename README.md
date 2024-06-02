# code-execution-website


## Setup Instructions

### Backend Setup

1. **Navigate to the Backend Directory**:
    ```sh
    cd backend
    ```

2. **Create and Activate a Virtual Environment**:
    ```sh
    python -m venv venv
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
    npm start
    ```

