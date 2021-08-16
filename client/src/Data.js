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
   * Gets the user if credentials matches server
   * @param {string} emailAddress - User's Email to log in
   * @param {string} password - User's password to log in
   * @returns a statusCode, and data if succeded, error message if failed
   */
  async getUser(emailAddress, password) {
    const res = await this.api('/users', 'GET', null, true, {emailAddress, password});
    if ( res.status === 200 ) {
      return res.json()
        .then( data => {
          return {
            status: res.status,
            user: data
          };
        });
    } else if ( res.status === 500 ) {
      return { status: res.status };
    } else if ( res.status > 299 ) {
      return res.json()
        .then( data => {
          return {
            status: res.status,
            errors: data.message
          };
        });
    }
  }

  /**
   * Gets a specific article and returns it
   * @param {integer} id - the ID of the article
   * @returns status code, data on success, errors on failure
   */
  async getArticle(id) {
    const res = await this.api(`/articles/${id}`, 'GET');
    if ( res.status === 200 ) {
      return res.json()
        .then( data => {
          return {
            status: res.status,
            article: data
          };
        });
    } else if ( res.status === 404  || res.status === 500 ) {
      return { status: res.status };
    } else if ( res.status > 299 ) {
      return res.json()
        .then(data => {
          return {
            status: res.status,
            errors: res.message
          };
        });
    }
  }

  /**
   * Gets all articles stored in the API
   * @returns status code, data on success, errors on failure
   */
  async getArticles() {
    const res = await this.api('/articles', 'GET');
    if ( res.status === 200 ) {
      return res.json()
        .then( data => {
          return {
            status: res.status,
            articles: data
          };
        });
    } else if ( res.status === 500 ) {
      return { status: res.status };
    } else if ( res.status > 299 ) {
      return res.json()
        .then( data => {
          return {
            status: res.status,
            errors: data.message
          };
        });
    }
  }

  /**
   * Creates and saves a user to the API
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async createUser(user) {
    const res = await this.api('/users', 'POST', user);
    if ( res.status === 201 ) {
      console.log('CREATE USER WORKED');
      return {
        status: res.status,
      };
    } else if ( res.status === 500 ) {
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

  /**
   * Creates and saves an article to the API
   * @param {object} article - the article object with properties: title, topic, intro, body, tags
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async createArticle(article, user) {
    const res = await this.api('/articles', 'POST', article, true, user);
    if ( res.status === 201 ) {
      return res.json()
        .then( data => {
          return {
            status: res.status,
            article: data
          }
        })
    } else if ( res.status === 500 ) {
      return { status: res.status };
    } else if ( res.status > 299 ) {
      return res.json()
        .then( data => {
          return {
            status: res.status,
            errors: data.message
          }
        })
    }
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
    if ( res.status === 204 ) {
      return res.json()
        .then( data => {
          return {
            status: res.status,
            article: data
          }
        })
    } else if (res.status === 403 || res.status === 500 ) {
      return { status: res.status };
    } else if ( res.status > 299 ) {
      return res.json()
        .then( data => {
          return {
            status: res.status,
            errors: data.message
          }
        })
    }
  }

  /**
   * Deletes an article to the API
   * @param {integer} id - The ID of the article one wants to update
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code 204 on success, errors on failure
   */
  async deleteArticle(id, user) {
    const res = await this.api(`/articles/${id}`, 'DELETE', null, true, user);
    if ( res.status === 204 ) {
      return { status: res.status };
    } else if (res.status === 403 || res.status === 500 ) {
      return { status: res.status };
    } else if ( res.status > 299 ) {
      return res.json()
        .then( data => {
          return {
            status: res.status,
            errors: data.message
          }
        })
    }
  }
}