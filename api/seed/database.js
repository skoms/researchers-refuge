'use strict';

const bcryptjs = require('bcryptjs');
const Context = require('./context');

class Database {
  constructor(seedData, enableLogging) {
    this.articles = seedData.articles;
    this.users = seedData.users;
    this.topics = seedData.topics;
    this.enableLogging = enableLogging;
    this.context = new Context('ResearchersRefuge.db', enableLogging);
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
          (firstName, lastName, emailAddress, password, occupation, mostActiveField, articles, credits, followers, following, imgURL, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      user.firstName,
      user.lastName,
      user.emailAddress,
      user.password,
      user.occupation,
      user.mostActiveField,
      user.articles,
      user.credits,
      user.followers,
      user.following,
      user.imgURL);
  }

  // Inserts article into database
  createArticle(article) {
    return this.context
      .execute(`
        INSERT INTO Articles
          (userId, topicId, title, topic, intro, body, tags, published, credits, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      article.userId,
      article.topicId,
      article.title,
      article.topic,
      article.intro,
      article.body,
      article.tags,
      article.published,
      article.credits);
  }

  // Inserts topic into database
  createTopic(topic) {
    return this.context
      .execute(`
        INSERT INTO Topics
          (name, relatedTags, articles, createdAt, updatedAt)
        VALUES
          (?, ?, ?, datetime('now'), datetime('now'));
      `,
      topic.name,
      topic.relatedTags,
      topic.articles);
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

  // Inserts all the topics given as argument to the database
  async createTopics(topics) {
    for (const topic of topics) {
      await this.createTopic(topic);
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
        occupation VARCHAR(255) DEFAULT '', 
        mostActiveField VARCHAR(255) DEFAULT '', 
        articles INTEGER DEFAULT 0, 
        credits INTEGER DEFAULT 0, 
        followers ARRAY DEFAULT [], 
        following ARRAY DEFAULT [],
        imgURL VARCHAR(255) DEFAULT 'https://placeimg.com/120/120/people', 
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL
      );
    `);

    this.log('Hashing the user passwords...');

    const users = await this.hashUserPasswords(this.users);

    this.log('Creating the user records...');

    await this.createUsers(users);

    const articleTableExists = await this.tableExists('Articles');

    if (articleTableExists) {
      this.log('Dropping the Articles table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Articles;
      `);
    }

    this.log('Creating the Articles table...');

    await this.context.execute(`
      CREATE TABLE Articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255) NOT NULL DEFAULT '', 
        topic VARCHAR(255) NOT NULL DEFAULT '', 
        intro TEXT NOT NULL DEFAULT '', 
        body TEXT NOT NULL DEFAULT '', 
        tags ARRAY NOT NULL DEFAULT [], 
        published DATE NOT NULL,
        credits INTEGER DEFAULT 0,
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL, 
        userId INTEGER NOT NULL DEFAULT -1 
          REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
        topicId INTEGER NOT NULL DEFAULT -1 
          REFERENCES Topics (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.log('Creating the article records...');

    await this.createArticles(this.articles); 


    const topicTableExists = await this.tableExists('Topics');

    if (topicTableExists) {
      this.log('Dropping the Topics table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Topics;
      `);
    }

    this.log('Creating the Topics table...');

    await this.context.execute(`
      CREATE TABLE Topics (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name VARCHAR(255) NOT NULL DEFAULT '', 
        relatedTags ARRAY NOT NULL DEFAULT [], 
        articles ARRAY NOT NULL DEFAULT [], 
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL
      );
    `);

    this.log('Creating the topic records...');

    await this.createTopics(this.topics);

    this.log('Database successfully initialized!');
  }
}

module.exports = Database;
