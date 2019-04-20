# Server LabTrans

## Dependencies

- [NodeJS >= 10.15.3](https://nodejs.org)
- [MongoDB >= 4.0](https://www.mongodb.com/)

Installing project dependencies:

```bash
npm install
```

Running project:

```bash
npm start
```

This will run the application server. The server will listen on http://localhost:8888 and the APIs will be avaiable on http://localhost:8888/api

## The Project

```
server
├── __config
│   └── index.js // configuration file (server port, db path, etc..)
├── _apis
│   └── index.js // apis endpoints (/users, /bookings, /auth)
├── auth
│   ├── oauth
│   │   ├── model
│   │   │   ├── index.js // the implementation of oauth2.0
│   │   │   └── OAuthModel.js //the mongoose model of OAuthTokens
│   │   └── index.js // express wrapper for oauth
│   ├── router
│   │   ├── auth.read.js
│   │   ├── auth.write.js
│   │   └── index.js // export of both routers
│   └── index.js // auth middlewares
├── booking
│   ├── router
│   │   ├── booking.read.js
│   │   ├── booking.write.js
│   │   └── index.js // export of both routers
│   ├── index.js // the controller of Booking
│   └── model.js // the mongoose model of Booking
├── user
│   ├── router
│   │   ├── user.read.js
│   │   ├── user.write.js
│   │   └── index.js // export of both routers
│   ├── index.js // the controller of User
└── └── model.js // the mongoose model of User
```

The Request Parameters can be found on the `router` file.

```javascript
readRouter.get('/',
    validate({ page: 'numeric?', limit: 'numeric?' }, 'query'),  // this request accepts a optional querystring named 'page' and 'limit' which needs to be numeric. Will throw an exception if is anything else
    ....
```
