# CollabBoard

**CollabBoard** is a **full-stack collaborative Kanban board application** developed to help individuals and teams organize, manage and monitor their tasks through a clear and visual workflow. The application is designed around the principles of **Kanban task management**, where tasks are represented as cards and organized into different stages based on their current progress. The main stages used in the application are **To Do, Doing, and Done**, allowing users to quickly understand which tasks have not yet been started, which tasks are currently being worked on and which tasks have already been completed.

The project is being developed using a modern full-stack technology stack consisting of **React, Vite, JavaScript, CSS, Node.js, Express, MongoDB and Socket.io**. Each technology has been selected to support a particular part of the application, from creating an interactive frontend interface to managing server-side operations, storing application data and enabling real-time communication. The project is also designed with future scalability in mind, allowing additional features such as user permissions, notifications, drag-and-drop functionality and advanced collaboration to be introduced as development continues.

CollabBoard is being developed as a **collaborative academic project**, giving the development team practical experience in designing, developing, testing, documenting and managing a full-stack web application. The project also provides experience with **component-based development, frontend and backend integration, database management, REST APIs, real-time communication, Git version control and collaborative software development**.

---

## About the Project

**CollabBoard** is a collaborative task management application based on the **Kanban workflow methodology**. The main purpose of the project is to provide users with a centralized workspace where they can create tasks, organize them into different workflow stages, update their information and monitor their progress. By presenting tasks visually on a board, users can easily understand the current state of their work without having to search through large amounts of information.

The application is designed around three main workflow stages: **To Do, Doing, and Done**. The **To Do** column represents tasks that have been created but have not yet been started. The **Doing** column represents tasks that are currently being worked on, while the **Done** column represents tasks that have been completed. This structure provides a simple and understandable workflow while leaving room for additional stages and functionality to be introduced in the future.

CollabBoard follows a **full-stack architecture**, meaning that the application consists of both frontend and backend systems. The frontend is responsible for displaying the user interface and allowing users to interact with boards and tasks. The backend is responsible for handling application logic, processing requests, managing data and communicating with the database. This separation between frontend and backend makes the application easier to develop, maintain, test and expand.

The project also aims to support **multiple users and collaborative task management**. Through the planned integration of Socket.io, users will be able to receive updates when changes are made to shared boards. This can allow multiple users to work together more efficiently while keeping their task information synchronized.

---

## Project Objectives

The main objective of CollabBoard is to develop a **functional and user-friendly collaborative task management system** using modern web development technologies. The project aims to demonstrate how different technologies can be combined to create a complete full-stack application.

The project has several important objectives. The first objective is to create a **clear and intuitive Kanban interface** where users can easily understand their tasks and their current progress. The second objective is to implement a reusable React component structure that allows the frontend to remain organized and maintainable as new features are added.

Another important objective is to develop a backend system capable of handling **user requests, task operations, authentication and database communication**. MongoDB will be used to provide persistent storage so that information created by users can be saved and retrieved when required.

The project also aims to introduce **real-time collaboration** through Socket.io. This will allow changes made by one user to be communicated to other users who are connected to the same board. Through these objectives, CollabBoard provides the development team with practical experience in building and integrating the major components of a modern full-stack application.

---

## Technologies

CollabBoard uses several modern technologies to provide a complete development environment. The technologies have been selected based on their suitability for building interactive web applications, APIs, databases and real-time systems.

### Frontend

The frontend of CollabBoard is developed using **React, Vite, JavaScript, and CSS**. React is used to build the application's interactive user interface through reusable components. Instead of creating the entire interface as one large component, React allows the application to be divided into smaller sections such as the Navbar, Board, Column, TaskCard, Login and Register components.

**Vite** is used as the frontend development and build tool. It provides a fast development environment and makes it easier to run and test the application during development. **JavaScript** is used to implement the application's functionality and user interactions, while **CSS** is used to control the appearance, layout, colors, spacing and responsive behavior of the interface.

The frontend architecture is designed to remain flexible so that additional components and pages can be introduced without significantly changing the existing structure. This component-based approach also allows different team members to work on individual sections of the interface.

### Backend

The backend is developed using **Node.js and Express**. Node.js provides the runtime environment for executing JavaScript on the server, while Express is used to create the backend server and manage API requests.

The backend will act as the communication layer between the frontend and the database. It will process requests received from the React application and perform operations such as creating tasks, updating task information, retrieving boards, managing users and handling authentication.

Express also provides a suitable foundation for creating **RESTful API endpoints**, which will allow the frontend and backend to communicate in a structured and predictable way. As the project develops, additional routes and services can be added to support new application features.

### Database

**MongoDB** is used as the database technology for CollabBoard. MongoDB is a document-oriented NoSQL database that provides a flexible way to store application information.

The database will eventually store information such as **user accounts, boards, tasks, task descriptions, task statuses and other relevant application data**. Using MongoDB will allow the application to move from temporary mock data toward a persistent system where information remains available even after the application is closed or restarted.

The database layer will also allow the project to support multiple users and boards as the application becomes more advanced.

### Real-Time Communication

**Socket.io** is planned to provide real-time communication functionality within CollabBoard. Real-time communication is particularly useful for a collaborative Kanban application because multiple users may be working on the same board at the same time.

For example, if one user creates a new task or moves a task from **To Do** to **Doing**, Socket.io can be used to communicate that change to other connected users. This allows the application to provide a more synchronized and collaborative experience without requiring users to manually refresh their browsers.

### Development Tools

The project uses **Git, GitHub, and npm** as its primary development tools. Git provides version control and allows the team to track changes made to the project. GitHub is used as the central repository where the project's source code is stored and shared among team members.

**npm** is used to install and manage the packages and dependencies required by both the frontend and backend. Together, these tools support the team's development workflow and make it possible for multiple developers to contribute to the same project.

---

## Project Structure

The project is organized into separate directories for the frontend, backend, documentation, and other supporting files. This structure helps maintain a clear separation of responsibilities and makes the application easier to understand and maintain.

```text
collabboard/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── server/
│   └── ...
│
├── docs/
│   └── ...
│
└── README.md