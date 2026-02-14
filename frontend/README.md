# Frontend

    - React 18 (Vite)
    - React Router Dom v6 (Navigation)
    - Tailwind CSS (Styling)
    - Axios (API Requests)

# Backend

    - Node.js & Express (Server)
    - MongoDB & Mongoose (Database)
    - JSON Web Tokens (JWT) (Security)
    - Cookie Parser (Cookie handling)

# Installation & Setup

    1. Clone the repository:

    ```bash
    git clone https://github.com/mohammeddarsi/user_system.git
    ```

    2. Backend Setup
    - Navigate to the server folder: cd server
    - Install dependencies: npm install
    - Create a .env file and add:
        PORT=7001
        MONGO_URI=your_mongodb_connection_string
        ACCESS_TOKEN_SECRET=your_access_token_secret
        REFRESH_TOKEN_SECRET=your_refresh_token_secret
        Start the server: npm run dev

    3. Frontend Setup
    - Navigate to the client folder: cd client
    - Install dependencies: npm install
    - Start the frontend: npm run dev

# Usage

    - Access the application at http://localhost:5173
    - Register a new user or log in with existing credentials.
    - Explore the user dashboard and test the authentication features.
