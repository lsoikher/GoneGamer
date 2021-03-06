# Welcome to Gone Gamer!

## Set Up

This will be the new repository used by the website v2.0!

This project uses the Node Project's [Express framework](http://expressjs.com/) which will require you to have [Node](https://nodejs.org/en/) installed on your machine.

Additionally, this project will use both MySQL and MongoDB - for local development it's required to have both of these either running on your machine or configured in your config.js so the app has read/write access.

Once you've cloned down the repo running the following ought to complete the current set up for the project. (If you add anything that requires set up - please document the steps necessary below).

```
# Install the Node Module Dependencies
npm i 

# Build the project's public resources (JS, CSS, etc.)
grunt build

# Run the project
DEBUG=goneGamer:* NODE_ENV=local nodemon start  # if you've globally installed nodemon
    # OR
NODE_ENV=local npm start

# Test a Page
http://localhost:8080/
```

At this point you should be ready to begin contributing.

## Running the Project Locally

From the repo directory in your command line, you should only need to run some variation of `NODE_ENV=local npm start`, I recommend using `DEBUG=goneGamer:* NODE_ENV=local nodemon start` if you have nodemon installed globally on your machine. The `DEBUG` will allow route/lib console logging to be more relevant, setting the `NODE_ENV` will let the app know which environment to use (mostly for database switching), and [nodemon](https://www.npmjs.com/package/nodemon) watches for updates to several key files and restarts the service for you - reducing the need to stop and start the service when updating route, lib, etc files. 

## Pages
- Root Url
    + http://localhost:8080
- Pages
    + Index
        * http://localhost:8080 - Currently a test home page
    + Auth
        * HTTP POSTS
            - /auth/checkUserID
            - /auth/register
            - /auth/login


## Developer Info

Databases:
- MySQL
- MongoDB
- Firebase.

The project uses [Express-Session](https://www.npmjs.com/package/express-session) and [Connect-Mongo-Session](https://www.npmjs.com/package/connect-mongodb-session) for managing session info. 

May introduce [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken) later.

## Deployment

Gone Gamer is currently hosted by [openShift](https://openshift.redhat.com). The site is automatically updated with current content on pushed to a specific repo.

### Set up

From the directory

```
# Of course you can call it whatever you want instead of 'deploy'
git remote add deploy ssh://5738bc012d5271561300009d@first-gonegamer.rhcloud.com/~/git/first.git/

```

## Deploying

From the directory, after all updates are commited (git)

```
git push deploy
```

### After deployment

Currently, the config.js is completely removed on deployment. Until an automatic method is found, you'll either need to set up `rch scp` (openShift's Command Line Interface), set up a SFTP service like Filezilla, or let Ross know so he can put the file back. 
