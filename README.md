
# Node.js Server Documentation

This documentation provides an overview of the functionality and usage of the Node.js server that powers the task management application.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Starting the Server](#starting-the-server)
- [API Endpoints](#api-endpoints)
- [User Authentication](#user-authentication)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Rename the `config.example.js` file to `config.js`.
2. Edit the `config.js` file and provide the necessary configuration settings, such as the database connection URL and secret keys.

## Starting the Server

To start the Node.js server, run the following command:

```bash
npm start
```

The server will be available at http://localhost:3001.

## API Endpoints

### GET /getposts

Get a list of all posts.

### GET /getpostbyid/:id

Get a specific post by its ID.

### PUT /markascompleted/:postId

Mark a post as completed and delete it from the database.

### POST /register

Register a new user. Requires `username`, `email`, and `password` fields in the request body.

### POST /login

Log in with user credentials. Requires `email` and `password` fields in the request body. Upon successful login, a JWT token will be sent in a secure HttpOnly cookie.

### POST /create

Create a new post. Requires `title` and `description` fields in the request body.

## User Authentication

The server uses JSON Web Tokens (JWT) for user authentication. When a user logs in successfully, a JWT token is generated and stored in an HttpOnly cookie for secure authentication.

## Usage

1. Access the provided API endpoints using tools like Axios or Postman.
2. Use proper HTTP methods (GET, POST, PUT) and provide necessary request bodies as required by each endpoint.
3. For endpoints that require authentication (e.g., `/getposts`, `/create`), make sure to include the JWT token in the HttpOnly cookie as received from the `/login` endpoint.

## Contributing

If you wish to contribute to this project:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -am 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to update this documentation with specific details related to your project's functionalities and usage. Providing clear instructions on installation, configuration, API endpoints, and user authentication will help others understand and use your server effectively.
```

Remember to replace the placeholders (`your-username` and `your-repo`) with your actual GitHub username and repository name. This documentation covers installation, configuration, starting the server, API endpoints, user authentication, usage guidelines, contributing, and licensing.
