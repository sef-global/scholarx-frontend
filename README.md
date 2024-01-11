# Scholarx-frontend
Frontend dashboard of the scholarX platform

## Setup Development Environment

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

1. Create a `.env` file in the root of your project.
2. Add the following line to the `.env` file, replacing `your-api-url` with the actual URL of your backend API:

```env
VITE_API_URL=your-api-url
```

3. Save the `.env` file. The application will now use this URL to make requests to the backend API.

Note: The VITE_ prefix is required for Vite to load the variable into import.meta.env. For more information, see the [Vite documentation](https://vitejs.dev/guide/env-and-mode.html).

Please note that you should not commit this change to the repository. It's recommended to use environment variables for different environments.
