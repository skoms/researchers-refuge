export default class Data {
  /**
   * More Modular version of the 'fetch' adapted to our use
   * @param {string} path - the path in the api to make the request to
   * @param {string} method - what type of repuest to make (GET, POST, PUT, DELETE)
   * @param {object} body - request body object (for POST or PUT requests)
   * @param {boolean} requiresAuth - to specify whether or not the path requires authentification
   * @param {object} credentials - login credentials (only used when 'requiresAuth' is true)
   * @returns returns a promise of the fetch request
   */
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const URL = 'http://localhost:5000/api' + path;
    const options = {
      method,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(URL, options);
  }

  /**
   * Capitalizes the first word or all words in a string
   * @param {string} string - the string to capitalize
   * @param {bool} firstOnly - true or false, whether to only capitalize first or all
   * @returns the altered string
   */
  capitalize = (string, firstOnly = false) => {
    let strArray = string.split(' ');
    if (strArray.length <= 1 || firstOnly) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      strArray = strArray.map( str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      });
      return strArray.join(' ');
    }
  }

  /**
   * Convert a follow-data string from the api to an array if it is a string, or just return the value if not
   * @param {string} string - the following/followers string to turn into array
   * @returns array that was converted from the string
   */
  isStringAndStringToArray = (value) => {
    if (typeof value !== 'object') {
      if (value.length === 1 || typeof value === 'number') {
        return [value.toString()];
      } else if (value === '') {
        return [];
      } else {
        return value.split(',').filter(entry => entry !== ' ' && entry !== '');
      }
    } else {
      return value;
    }
  }

  /**
   * Converts date string from API to EU format (DD-MM-YYYY)
   * @param {string} string - date 'YYYY-MM-DD' format string received from API
   * @returns a 'DD-MM-YYYY' formatted date string
   */
  formatDate = (string) => {
    const match = string.match(/^(\d+)-(\d+)-(\d+)$/);
    return `${match[3]}-${match[2]}-${match[1]}`;
  }

  /**
   * Handles the validation of the response return
   * @param {object} res - the response object from the fetch
   * @param {boolean} returnData - whether or not to return the data
   * @param {string} name - name of the propterty if 'returnData'
   * @returns an object with the response
   */
  responseReturnHandler = (res, returnData = false, name = 'data') => {
    if ( res.status === 201 || res.status ===  200 || res.status ===  204 ) {
      if ( returnData ) {
        return res.json()
        .then( data => {
          return {
            status: res.status,
            [name]: data
          };
        });
      } else {
        return {
          status: res.status,
        };
      }
    } else if ( res.status === 404 || res.status === 403 ||  res.status === 500 ) {
      return { status: res.status };
    } else if ( res.status > 299 ) {
      return res.json()
        .then( data => {
          if ( typeof data.message === 'string' ) {
            return {
              status: res.status,
              errors: [data.message] // this is done because we want to ensure the return of 'errors' is of type: 'array'
            };
          } else {
            return {
              status: res.status,
              errors: data.message
            };
          }
        });
    }
  }





  //! GET DATA API FUNCTIONS

  /**
   * Gets the user if credentials matches server
   * @param {string} emailAddress - User's Email to log in
   * @param {string} password - User's password to log in
   * @returns a statusCode, and data if succeded, error message if failed
   */
  async getUser(emailAddress, password) {
    const res = await this.api('/users', 'GET', null, true, {emailAddress, password});
    return this.responseReturnHandler(res, true, 'user');
  }

  /**
   * Gets a specific user and returns it
   * @param {integer} id - the ID of the user
   * @returns status code, data on success, errors on failure
   */
  async getUserById(id) {
    const res = await this.api(`/users/${id}`, 'GET');
    return this.responseReturnHandler(res, true, 'user');
  }

  /**
   * Gets users matching the query
   * @param {string} query - query string to search for
   * @returns status code, data on success, errors on failure
   */
  async getUsersByQuery(query) {
    const res = await this.api(`/users/query/${query}`, 'GET');
    return this.responseReturnHandler(res, true, 'users');
  }

  /**
   * Gets recommended users from looking at previously accretited articles and their topic
   * @param {object} user - logged in user
   * @returns status code, data on success, errors on failure
   */
  async getRecommendedUsers(user) {
    const res = await this.api(`/users/recommend`, 'GET', null, true, user);
    return this.responseReturnHandler(res, true, 'users');
  }

  /**
   * Gets a specific article and returns it
   * @param {integer} id - the ID of the article
   * @returns status code, data on success, errors on failure
   */
  async getArticle(id) {
    const res = await this.api(`/articles/${id}`, 'GET');
    return this.responseReturnHandler(res, true, 'article');
  }

  /**
   * Gets all articles stored in the API
   * @returns status code, data on success, errors on failure
   */
  async getArticlesWithFilter(filter) {
    const res = await this.api(`/articles/filter/${filter}`, 'GET');
    return this.responseReturnHandler(res, true, 'articles');
  }

  /**
   * Gets all articles by users this user follows
   * @returns status code, data on success, errors on failure
   */
  async getFollowingArticles(user) {
    const res = await this.api('/articles/following', 'GET', null, true, user);
    return this.responseReturnHandler(res, true, 'articles');
  }

  /**
   * Gets a specific article and returns it
   * @param {integer} id - the ID of the article
   * @returns status code, data on success, errors on failure
   */
   async getArticlesByOwnerId(id) {
    const res = await this.api(`/articles/owner/${id}`, 'GET');
    return this.responseReturnHandler(res, true, 'articles');
  }

  /**
   * Gets articles specified by tag
   * @param {string} tag - article tag
   * @returns status code, data on success, errors on failure
   */
   async getArticlesByTag(tag) {
    const res = await this.api(`/articles/tag/${tag}`, 'GET');
    return this.responseReturnHandler(res, true, 'articles');
  }

  /**
   * Gets articles matching the query
   * @param {string} query - query string to search for
   * @returns status code, data on success, errors on failure
   */
  async getArticlesByQuery(query) {
    const res = await this.api(`/articles/query/${query}`, 'GET');
    return this.responseReturnHandler(res, true, 'articles');
  }

  /**
   * Gets recommended articles from looking at previously accretited articles and their topic
   * @param {object} user - logged in user
   * @returns status code, data on success, errors on failure
   */
  async getRecommendedArticles(user) {
    const res = await this.api(`/articles/recommend`, 'GET', null, true, user);
    return this.responseReturnHandler(res, true, 'articles');
  }

  /**
   * Gets a topic specified by id
   * @param {integer} id - topic id
   * @returns status code, data on success, errors on failure
   */
  async getTopicById(id) {
    const res = await this.api(`/topics/id/${id}`, 'GET');
    return this.responseReturnHandler(res, true, 'topic');
  }

  /**
   * Gets topic specified by name
   * @param {string} name - topic name
   * @returns status code, data on success, errors on failure
   */
  async getTopicByName(name) {
    const res = await this.api(`/topics/name/${name}`, 'GET');
    return this.responseReturnHandler(res, true, 'topic');
  }

  /**
   * Gets topics
   * @returns status code, data on success, errors on failure
   */
  async getTopics() {
    const res = await this.api(`/topics`, 'GET');
    return this.responseReturnHandler(res, true, 'topics');
  }

  /**
   * Gets topics specified by tag
   * @param {string} tag - topic related tag
   * @returns status code, data on success, errors on failure
   */
  async getTopicsByTag(tag) {
    const res = await this.api(`/topics/tag/${tag}`, 'GET');
    return this.responseReturnHandler(res, true, 'topics');
  }

  /**
   * Gets topics matching the query
   * @param {string} query - query string to search for
   * @returns status code, data on success, errors on failure
   */
  async getTopicsByQuery(query) {
    const res = await this.api(`/topics/query/${query}`, 'GET');
    return this.responseReturnHandler(res, true, 'topics');
  }

  /**
   * Gets recommended topics from looking at previously accretited articles and their topic
   * @param {object} user - logged in user
   * @returns status code, data on success, errors on failure
   */
   async getRecommendedTopics(user) {
    const res = await this.api(`/topics/recommend`, 'GET', null, true, user);
    return this.responseReturnHandler(res, true, 'topics');
  }

  /**
   * Gets a category specified by id
   * @param {integer} id - category id
   * @returns status code, data on success, errors on failure
   */
  async getCategoryById(id) {
    const res = await this.api(`/categories/${id}`, 'GET');
    return this.responseReturnHandler(res, true, 'category');
  }

  /**
   * Gets all categories
   * @returns status code, data on success, errors on failure
   */
  async getCategories() {
    const res = await this.api(`/categories`, 'GET');
    return this.responseReturnHandler(res, true, 'categories');
  }

  /**
   * Gets categories matching the query
   * @param {string} query - query string to search for
   * @returns status code, data on success, errors on failure
   */
  async getCategoriesByQuery(query) {
    const res = await this.api(`/categories/query/${query}`, 'GET');
    return this.responseReturnHandler(res, true, 'categories');
  }


  


  //! POST DATA API FUNCTIONS

  /**
   * Creates and saves a user to the API
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async createUser(user) {
    const res = await this.api('/users', 'POST', user);
    return this.responseReturnHandler(res);
  }

  /**
   * Creates and saves an article to the API
   * @param {object} article - the article object with properties: title, topic, intro, body, tags
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async createArticle(article, user) {
    const res = await this.api('/articles', 'POST', article, true, user);
    return this.responseReturnHandler(res, true, 'article');
  }





  //! PUT DATA API FUNCTIONS

  /**
   * Updates the data on the user who wants to follow/unfollow and the target
   * @param {integer} id - The ID of the article one wants to update
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async followUnfollow({ id, user }) {
    const res = await this.api(`/users/${id}/follow`, 'PUT', null, true, user);
    return this.responseReturnHandler(res, true, 'users');
  }

  /**
   * Updates and saves an article to the API
   * @param {object} article - the article object with properties: title, topic, intro, body, tags
   * @param {integer} id - The ID of the article one wants to update
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async updateArticle(article, id, user) {
    const res = await this.api(`/articles/${id}`, 'PUT', article, true, user);
    return this.responseReturnHandler(res);
  }

  /**
   * Accredits/Discredits an article
   * @param {integer} id - The ID of the article one wants to accredit/discredit
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async accreditDiscredit(id, user, credit) {
    const res = await this.api(`/articles/credit/${id}`, 'PUT', credit, true, user);
    return this.responseReturnHandler(res, true, 'data');
  }





  //! DELETE DATA API FUNCTIONS

  /**
   * Deletes an article to the API
   * @param {integer} id - The ID of the article one wants to update
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code 204 on success, errors on failure
   */
  async deleteArticle(id, user) {
    const res = await this.api(`/articles/${id}`, 'DELETE', null, true, user);
    return this.responseReturnHandler(res);
  }
}