--------------------------------------------------------

# Back-end Service

## Overview

The back-end is based on [Express](http://http://expressjs.com/), a Node.js web application framework.


## Setup

To setup the server install Node.js in Version 4.4 or newer from the [Node.Js Website](http://nodejs.org/).
Then run the following command in the project root.
This downloads all required dependencies to run the Server.

```bash
npm install
```

## Run the Server

Run the following command in the project root:

```bash
npm start
```


## Technologies/Tools Used

1. Vanilla Javascript (ES6, ES7, ES8)
2. CSS3 with Flex Layout (Responsive Design)
3. Nightmare for Integration Tests
4. Sinon to stub
5. Mocha 
6. WebPack for build
7. Babel for polyfilling
8. ExpressJS for backend (data persistence)

## Supported Browser
  
  Latest Chrome Browser

## To Run the Unit & Integration tests together - (NOTE: Backend Server should be running for this)
```bash
npm start
```
```bash
npm test
```

## To Run the Unit test alone
```bash
npm test -- --grep "unit"
```

## To build the app
```bash
npm run build
```