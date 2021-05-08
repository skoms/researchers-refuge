# REST API PROJECT

## Technologies
* JavaScript
* Node.js
* Express
* Sequelize
* SQLite
* bcryptjs
* basic-auth

## Introduction
In this project I made a REST API using express. This API provides a way to administer a school database containing information about users and courses. The REST API utilizes authorization and hashing to store and manage sensitive information, so not anyone with a user can just manipulate all the data(such as updating or deleting courses), or access other user's data. To make changes to these one has to login to a user with that level of authorization. Password requirements are also implemented.

## Additions
* User Login - Username is case insensitive
* User Login - Password requirements: 8 - 20 characters, minimum 1 lowercase letter, 1 uppercase letter and a digit ( Commented out to prevent conflicting with project requirements, but feel free to uncomment to see that it works perfectly :^) )
