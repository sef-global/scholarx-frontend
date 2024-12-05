# Scholarx-frontend
Frontend dashboard of the scholarX platform

## Setup Development Environment

### **Project setup walkthrough :- https://youtu.be/1STopJMM2nM**

1. Clone your forked repository
    ```
    git clone https://github.com/USERNAME/scholarx-frontend
    cd scholarx-frontend
    ```
2. Install all the dependencies
    ```
    npm install
    ```

- Start the server with
    ```
    npm run dev
    ```

- Visit your app at http://localhost:5173

## Connecting to the Backend API

The URL for the backend API is stored in an environment variable. To set this up:

- Copy the .env file:

    ```
    cp example.env .env
    ```

Replace the environment variables in the newly created .env file with your configuration.


Please note that you should not commit this change to the repository. It's recommended to use environment variables for different environments.
