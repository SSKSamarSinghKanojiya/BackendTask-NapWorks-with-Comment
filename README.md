- Node.js API with MongoDB, JWT Authentication, and Logging

- Project Overview

- This project is a RESTful API built using Node.js (Express.js) with MongoDB (Mongoose) as the database. 
  It includes authentication using JWT (JSON Web Token), request validation with Joi Express-validator, and logging with Winston/Morgan.

- Features

- User Authentication: Signup and login with secure password hashing.

- Content Posting: Users can create posts with images and tags.

- Post Retrieval with Filters: Users can fetch posts based on text search, date range, and tags.

- Security: JWT authentication, Helmet for secure headers, rate-limiting to prevent abuse.

- Logging: Winston/Morgan for request and error logging.

- Error Handling: Centralized error middleware for consistent responses.

- Environment Variables: .env file for configuration management.

- Production Readiness: PM2 process management and CORS settings.

- Installation

- Prerequisites

- Ensure you have the following installed:

- Node.js (v14+ recommended)

- MongoDB (running locally or a cloud instance)

- Steps

- Clone the repository:

- git clone https://github.com/yourusername/your-repo.git cd your-repo

- Install dependencies:

- npm install

- Create a .env file in the root directory and add the following:

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret

- Start the server:

npm start

API Endpoints

1. User Signup

Endpoint: POST /api/signup

Request Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response:

{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}

2. User Login

- Endpoint: POST /api/login

```
Request Body:

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:

{
  "message": "Login successful",
  "token": "jwt_token_here"
}

```

3. Create a Post

- Endpoint: POST /api/posts

- Headers:

- Authorization: Bearer <JWT_TOKEN>

- Request Body:
```
{
  "userId": "user_id_here",
  "postName": "My First Post",
  "description": "This is a description",
  "tags": ["tech", "nodejs"],
  "imageUrl": "http://example.com/image.jpg"
}

Response:

{
  "message": "Post created successfully",
  "post": { "id": "post_id_here", "postName": "My First Post" }
}
```

4. Fetch Posts with Filters

- Endpoint: GET /api/posts

- Query Parameters:

-searchText (optional) - Search within post name and description.

- startDate & endDate (optional) - Filter posts by upload time.

- tags (optional) - Filter by tags.

- page & limit (optional) - Pagination settings.

- Example Request:

- GET /api/posts?searchText=tech&startDate=2024-01-01&endDate=2024-12-31

```
Response:

{
  "total": 1,
  "posts": [
    {
      "id": "post_id_here",
      "postName": "My First Post",
      "description": "This is a description",
      "tags": ["tech", "nodejs"],
      "uploadTime": "2024-03-01T10:00:00Z"
    }
  ]
}
```

- Technologies Used

```
Node.js

Backend runtime

Express.js

API framework

MongoDB

NoSQL database

Mongoose

ORM for MongoDB

JWT

Authentication

Bcrypt

Password hashing

Winston / Morgan

Logging

Joi / Express-validator

Input validation

Helmet

Secure HTTP headers

Rate-limiter

Prevent API abuse

PM2

Process management in production

Security Measures

JWT Authentication: Secure user authentication.

Password Hashing: User passwords are stored securely with bcrypt.

Helmet: Helps secure the app by setting HTTP headers.

Rate Limiting: Prevents excessive requests from the same client.

CORS Configuration: Allows access only from trusted sources.

Logging and Error Handling

Logging: Winston logs all API requests and errors to logs/combined.log.

Error Handling Middleware: Catches and returns consistent error responses.

Failed Login Attempts: Logged for security auditing.

Running in Production

Use PM2 for process management:

pm2 start server.js --name my-api

Set up environment variables correctly.

Ensure MongoDB is configured for production.

Use Nginx or another reverse proxy for HTTPS support.

Contribution

Feel free to fork this repository and submit pull requests for improvements.

License

This project is licensed under the MIT License.

Author

Your Name - Samar Singh Kanojiya

```
