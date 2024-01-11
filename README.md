# Scholarx-frontend
Frontend dashboard of the scholarX platform

## Setup Development Environment

- Clone your forked repository
    ```
    git clone https://github.com/USERNAME/scholarx-frontend
    cd scholarx-frontend
    ```
- Install all the dependencies
    ```
    npm install
    ```
- Start the server with
    ```
    npm run dev
    ```

- Visit your app at http://localhost:5173


## Backend Server Setup

In order to run the application locally and connect the backend API, you need to set up the backend server URL. 

1. Open the `constants.ts` file.
2. You will see a line of code that looks like this: `export const API_URL = 'http://localhost:4000/api';`
3. Replace `'http://localhost:4000/api'` with the URL of your backend server.

Please note that you should not commit this change to the repository. It's recommended to use environment variables for different environments.
