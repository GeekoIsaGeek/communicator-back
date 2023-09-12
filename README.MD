# Communicator - back

Backend app for a real-time one-to-one messaging application.

### Table of Contents

-  [Prerequisites](#prerequisites)
-  [Tech Stack](#tech-stack)
-  [Getting Started](#getting-started)
-  [Development](#development)
-  [Project Structure](#project-structure)
-  [API Endpoints](#api-endpoints)

### Prerequisites

-  <img src="readme/assets/node.svg" height="20" style="position: relative;  top: 4px;" /> Node.js@18 and up
-  <img src="readme/assets/npm.svg" height="24" style="position: relative; top:8px; " /> npm@9.5 and up

### Tech Stack

-  <img src="readme/assets/ts.svg" height="16" style="position: relative; top: 2px;" /> [Typescript](https://www.typescriptlang.org/) - strongly typed programming language
-  <img src="readme/assets/node.svg" height="19" style="position: relative; top: 4px;" /> [Node.js](https://nodejs.org/en) - JS runtime enviroment
-  <img src="readme/assets/express.svg" height="19" style="position: relative; top: 4px; " /> [Express.js](https://expressjs.com/) - Node.js web application framework
-  <img src="readme/assets/mongo.svg" height="19" style="position: relative; top: 4px;" /> [Mongo](https://www.mongodb.com/) - cross-platform document-oriented database
-  <img src="readme/assets/mongoose.png" height="19" style="position: relative; top: 4px;" /> [Mongoose](https://mongoosejs.com/) - schema-based ODM to model application data
-  <img src="readme/assets/socketio.svg" height="20" style="position: relative; top: 4px;" /> [Socket.io](https://socket.io/) - event-driven library for real-time web applications

### Getting Started

1\. First of all you need to clone the repository from github:

```sh
https://github.com/GeekoIsaGeek/communicator-back
```

2\. Next step requires you to run _npm install_ in order to install all dependencies.

```sh
npm install
```

3\. Now we need to set our env file. Go to the root of your project and execute this command.

```sh
cp .env.example .env
```

And now you should provide **.env** file all the necessary environment variables:

> PORT=

> DB_URI=

> TOKEN_SECRET=

> CLIENT_APP_URL=

### Development

You can run development server by executing:

```sh
  npm run serve
```

### Project Structure

```bash

├─── readme
├─── src
│   ├─── config
│   ├─── controllers
│   ├─── middleware
│   ├─── models
│   ├─── routes
│   ├─── socket-handlers
│   ├─── types
│   - server.ts
├─── storage
- .env
- package.json
- README.md
- tsconfig.js
```

### API Endpoints

Every listed endpoint is protected from unauthorized access (except ones for authentication). In the context of this application, "connections" are users with whom an authorized user has ever had a chat.

#### GET

`Authenticated user` /user
`Registered Users` /users
`Chat messages` /messages `requires query params: sender, receiver`
`Connected users` /connections

#### POST

`Login` /login
`Registration` /register
`Remove user from connections` /connections/remove `requires connectionId`

#### DELETE

`Remove all messages from chat` /messages/remove `requires query params: sender, receiver`
