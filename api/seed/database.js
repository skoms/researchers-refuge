'use strict';

const bcryptjs = require('bcryptjs');
const Context = require('./context');

class Database {
  constructor(seedData, enableLogging) {
    this.articles = seedData.articles;
    this.users = seedData.users;
    this.enableLogging = enableLogging;
    this.context = new Context('ResearchRefuge.db', enableLogging);
  }

  // Log message if logging is enabled
  log(message) {
    if (this.enableLogging) {
      console.info(message);
    }
  }

  // Checks if table already exists
  tableExists(tableName) {
    this.log(`Checking if the ${tableName} table exists...`);

    return this.context
      .retrieveValue(`
        SELECT EXISTS (
          SELECT 1 
          FROM sqlite_master 
          WHERE type = 'table' AND name = ?
        );
      `, tableName);
  }

  // Inserts users into database
  createUser(user) {
    return this.context
      .execute(`
        INSERT INTO Users
          (firstName, lastName, emailAddress, password, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      user.firstName,
      user.lastName,
      user.emailAddress,
      user.password);
  }

  // Inserts article into database
  createArticle(article) {
    return this.context
      .execute(`
        INSERT INTO Articles
          (userId, title, description, estimatedTime, materialsNeeded, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      article.userId,
      article.title,
      article.description,
      article.estimatedTime,
      article.materialsNeeded);
  }

  // Hashes the passwords in the for the database
  async hashUserPasswords(users) {
    const usersWithHashedPasswords = [];

    for (const user of users) {
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      usersWithHashedPasswords.push({ ...user, password: hashedPassword });
    }

    return usersWithHashedPasswords;
  }

  // Inserts all the users given as argument to the database
  async createUsers(users) {
    for (const user of users) {
      await this.createUser(user);
    }
  }

  // Inserts all the articles given as argument to the database
  async createArticles(articles) {
    for (const article of articles) {
      await this.createArticle(article);
    }
  }

  // Initializes all the databases if not already there, if they are, data gets dropped and filled with new seed data
  async init() {
    const userTableExists = await this.tableExists('Users');

    if (userTableExists) {
      this.log('Dropping the Users table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Users;
      `);
    }

    this.log('Creating the Users table...');

    await this.context.execute(`
      CREATE TABLE Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        firstName VARCHAR(255) NOT NULL DEFAULT '', 
        lastName VARCHAR(255) NOT NULL DEFAULT '', 
        emailAddress VARCHAR(255) NOT NULL DEFAULT '' UNIQUE, 
        password VARCHAR(255) NOT NULL DEFAULT '', 
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL
      );
    `);

    this.log('Hashing the user passwords...');

    const users = await this.hashUserPasswords(this.users);

    this.log('Creating the user records...');

    await this.createUsers(users);

    const courseTableExists = await this.tableExists('Courses');

    if (courseTableExists) {
      this.log('Dropping the Courses table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Courses;
      `);
    }

    this.log('Creating the Courses table...');

    await this.context.execute(`
      CREATE TABLE Courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255) NOT NULL DEFAULT '', 
        description TEXT NOT NULL DEFAULT '', 
        estimatedTime VARCHAR(255), 
        materialsNeeded VARCHAR(255), 
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL, 
        userId INTEGER NOT NULL DEFAULT -1 
          REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.log('Creating the course records...');

    await this.createCourses(this.courses);

    this.log('Database successfully initialized!');
  }
}

module.exports = Database;
