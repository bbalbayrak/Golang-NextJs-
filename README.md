# User Management Backend

This is a simple backend service built in Go using Gorilla Mux and SQLite. It provides a RESTful API for managing users, including functionalities to create, read, update, and delete users.

---

## Features

- **CRUD Operations**: Create, Read, Update, and Delete users.
- **SQLite Database**: Lightweight, file-based database.
- **CORS Support**: Configured to allow requests from `http://localhost:3000`.
- **RESTful API**: Well-structured endpoints for easy integration.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Go](https://golang.org/dl/) (v1.18 or higher recommended)
- SQLite (optional, included with the code)

### Installation

## API Endpoints
Base URL: http://localhost:8080
Endpoints

1. Get All Users
Endpoint: /users
Method: GET
Response:
json
Copy code
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
]

2. Get User by ID
Endpoint: /users/{id}
Method: GET
Parameters:
id (path): The ID of the user.
Response:
json
Copy code
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}

3. Create a New User
Endpoint: /users
Method: POST
Request Body:
json
Copy code
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
Response:
json
Copy code
{
  "id": 2,
  "name": "Jane Doe",
  "email": "jane@example.com"
}

4. Update User by ID
Endpoint: /users/{id}
Method: PUT
Parameters:
id (path): The ID of the user.
Request Body:
json
Copy code
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}
Response:
json
Copy code
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}

5. Delete User by ID
Endpoint: /users/{id}
Method: DELETE
Parameters:
id (path): The ID of the user.
Response:
HTTP Status 204 No Content
CORS Configuration
This server is configured to allow cross-origin requests from the frontend running on http://localhost:3000. You can adjust this in the corsHandler setup in the main() function.

Logs
The server logs information about user operations (e.g., users fetched, created, or updated).
Errors are logged to the console for debugging.
Notes
The database file (users.db) is created in the root directory.
The email field must be unique for each user.
Ensure the database file is writable by the server process.
Future Improvements
Add user authentication and authorization.
Implement pagination for the GET /users endpoint.
Enhance validation for input data.
This server is designed to integrate seamlessly with the Next.js frontend provided in the same project.

Feel free to contribute or open issues for improvements. 🚀
