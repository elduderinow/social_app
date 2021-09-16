# Social App
Developing A CRUD social app in the MEAN stack with authentication, with a chat function.

##Functionalities:
- User can login or create new account.
- User can edit personal information.
  - able to upload image as profile picture.
  - able to change or retrieve password.
- User can add or delete friend.
- User can start a chat with a friend.
- Saved chat history
- chat can use gifs
- chat can send images

#Extra
- user can post content on own private page which is only viewable by added friends.

## Deploy on Heroku w Server.
Test Link: 

## Phase 1:
- Creating a CRUD system to add, edit and delete users.
- Setting up a MongoDB database with a "persons" collection

## Phase 2:
- Create A authentication using auth0.
- Link Auth0 to own MongoDB
- Link Auth0 Mongodb collection to own user collection.
- Set user as logged-in user.
- Only able to edit or delete selected user.

## Phase 2b:
- Refactoring previous code to clean code. [CURRENT]

## Phase 3:
- Implement socket.io as chat functionality
- Create a "chat" collection to store chat pairs between users.