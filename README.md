# Fullstack Web Chat Application

This project is a fullstack web chat application utilizing a combination of modern technologies including Node.js with Express for the server-side, PostgreSQL as the database, and Preact with TypeScript for the client-side. This application offers real-time chat functionalities in a clean and responsive user interface.

## Server (Node.js, Express, PostgreSQL)

### Features
- **Real-Time Communication**: Utilizes WebSocket for real-time bi-directional communication between clients and the server.
- **User Authentication**: Robust user authentication system using JWT (JSON Web Tokens) to manage user sessions.
- **Database Integration**: PostgreSQL database to store user data, chat messages, and other relevant information.
- **Scalability**: Designed to be scalable and efficient, handling multiple simultaneous chat sessions seamlessly.

### Technologies
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **PostgreSQL**: A powerful, open-source object-relational database system that uses and extends the SQL language.

### Setup and Installation
- Clone the repository to your local machine.
- Ensure that Node.js, npm (Node Package Manager), and PostgreSQL are installed.
- Configure the `.env` file with the necessary environment variables including database credentials.
- Run `npm install` to install dependencies.
- Use `npm start` to start the server.

## Client (Preact, TypeScript)

### Features
- **Modern Interface**: A clean and intuitive user interface for an engaging chat experience.
- **Type Safety**: Leveraging TypeScript for type safety, ensuring more reliable and maintainable code.
- **State Management**: Utilizing React-redux for efficient state management across the application.
- **Responsive Design**: Fully responsive design, ensuring a seamless experience on both desktop and mobile devices.

### Technologies
- **Preact**: A fast 3kB alternative to React with the same modern API, providing the power of React with smaller footprint.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, allowing for writing safer and more understandable code.
- **React Redux**: A predictable state container for JavaScript applications, used alongside Preact for state management.

### Setup and Installation
- Clone the repository to your local machine.
- Ensure Node.js and npm are installed.
- Navigate to the client directory.
- Run `npm install` to install dependencies.
- Use `npm start` to start the development server. The client will be available on `localhost:3000` (or a port specified in the environment variables).

---

## Contributing
Contributions to the Fullstack Web Chat application are welcome. Please ensure to follow the provided coding standards and guidelines. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
