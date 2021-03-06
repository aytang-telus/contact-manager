# CMPT 470: Exercise 8 Contact Manager

Contact Manager built using the MEAN stack. (MongoDB, Express.js, Angular, Node.js)

Supported Operations:

- Add new contact
- Display existing contacts
- Delete contact

Access the application at localhost:8080.

**Static files are served at `/static` in the nginx container.**

<p align = 'center'>
  <img src = '/sample.png'>
</p>

## Launch via Docker

1. Clone repository

   ```
   git clone git@csil-git1.cs.surrey.sfu.ca:aytang/contact-manager.git
   ```
2. Build the Docker image and run the container.

   ```
   docker compose build && docker compose up
   ```
3. Access the web application via localhost:8080.

## Launch via npm

1. Clone repository and install necessary npm packages.

   ```
   git clone git@csil-git1.cs.surrey.sfu.ca:aytang/contact-manager.git
   cd contact-manager 
   npm i 
   ```
2. Install and set up [MongoDB Server](https://www.mongodb.com/try/download/compass) and Check that it is running on port 27017.

   ```
   cd C:\
   md "\data\db"
   mongod --dbpath="c:\data\db"
   ```
3. Build and compile Angular/Typescript files.

   ```
   npm run launch
   ```
4. Access application at localhost:8080.
