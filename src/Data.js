import axios from 'axios'

export default class Data {
  /**
   * More Modular version of the 'fetch' adapted to our use
   * @param {string} path - the path in the api to make the request to
   * @param {string} method - what type of request to make (GET, POST, PUT, DELETE)
   * @param {object} params - extra parameters for the request (like query)
   * @param {object} body - request body object (for POST or PUT requests)
   * @param {boolean} requiresAuth - to specify whether or not the path requires authentication
   * @param {object} credentials - login credentials (only used when 'requiresAuth' is true)
   * @returns returns a promise of the fetch request
   */
  api(
    path,
    method = 'GET',
    params = null,
    body = null,
    requiresAuth = false,
    credentials = null,
  ) {
    const options = {
      method,
      url:
        (process.env.REACT_APP_DEV_API || process.env.REACT_APP_API_URL) + path,
      params,
      auth: requiresAuth
        ? { username: credentials.emailAddress, password: credentials.password }
        : {},
      data: body || {},
    }

    return axios(options)
  }

  /**
   * Handles the validation of the response return
   * @param {object} res - the response object from the fetch
   * @param {boolean} returnData - whether or not to return the data
   * @param {string} name - name of the property if 'returnData'
   * @returns an object with the response
   */
  responseHandler = (cb, returnData = false, name = 'data') => {
    return cb
      .then((res) => {
        if (res.status === 201 || res.status === 200 || res.status === 204) {
          if (returnData) {
            return {
              status: res.status,
              [name]: res.data,
            }
          } else {
            return {
              status: res.status,
            }
          }
        }
      })
      .catch(({ response }) => {
        if (
          response.status === 404 ||
          response.status === 403 ||
          response.status === 500
        ) {
          return { status: response.status }
        } else if (response.status > 299) {
          if (typeof response.data.message === 'string') {
            return {
              status: response.status,
              errors: [response.data.message], // this is done because we want to ensure the return of 'errors' is of type: 'array'
            }
          } else {
            return {
              status: response.status,
              errors: response.data.message,
            }
          }
        }
      })
  }

  //! GET DATA API FUNCTIONS

  /**
   * Gets the user if credentials matches server
   * @param {string} emailAddress - User's Email to log in
   * @param {string} password - User's password to log in
   * @returns a statusCode, and data if succeded, error message if failed
   */
  async getUser(emailAddress, password) {
    return await this.responseHandler(
      this.api('/users/me', 'GET', null, null, true, {
        emailAddress,
        password,
      }),
      true,
      'user',
    )
  }

  /**
   * Checks the authorization of a user
   * @param {object} user - the user to check for authorization
   * @returns an object with bool { isAuthorized: boolean }
   */
  async authorize(user) {
    return await this.responseHandler(
      this.api('/users/authorize', 'GET', null, null, true, user),
      true,
      'isAuthorized',
    )
  }

  /**
   * Gets a specific user and returns it
   * @param {number} id - the ID of the user
   * @returns status code, data on success, errors on failure
   */
  async getUserById(id) {
    return await this.responseHandler(
      this.api('/users', 'GET', { id }),
      true,
      'user',
    )
  }

  /**
   * Gets users matching the query
   * @param {string} query - query string to search for
   * @returns status code, data on success, errors on failure
   */
  async getUsersByQuery(query, page = 1) {
    return await this.responseHandler(
      this.api(`/users/query`, 'GET', { query, page }),
      true,
      'users',
    )
  }

  /**
   * Gets recommended users from looking at previously accredited articles and their topic
   * @param {object} user - logged in user
   * @returns status code, data on success, errors on failure
   */
  async getRecommendedUsers(user) {
    return await this.responseHandler(
      this.api(`/users/recommended`, 'GET', null, null, true, user),
      true,
      'users',
    )
  }

  /**
   * Gets a specific article and returns it
   * @param {number} id - the ID of the article
   * @returns status code, data on success, errors on failure
   */
  async getArticle(id) {
    return await this.responseHandler(
      this.api(`/articles`, 'GET', { id }),
      true,
      'article',
    )
  }

  /**
   * Gets all articles stored in the API
   * @returns status code, data on success, errors on failure
   */
  async getArticlesWithFilter(filter, page = 1) {
    return await this.responseHandler(
      this.api(`/articles/filter`, 'GET', { filter, page }),
      true,
      'data',
    )
  }

  /**
   * Gets all articles by users this user follows
   * @returns status code, data on success, errors on failure
   */
  async getFollowingArticles(user, page = 1) {
    return await this.responseHandler(
      this.api('/articles/following', 'GET', { page }, null, true, user),
      true,
      'data',
    )
  }

  /**
   * Gets a specific article and returns it
   * @param {number} id - the ID of the article
   * @returns status code, data on success, errors on failure
   */
  async getArticlesByOwnerId(id, page = 1) {
    return await this.responseHandler(
      this.api(`/articles/owner`, 'GET', { id, page }),
      true,
      'data',
    )
  }

  /**
   * Gets articles specified by tag
   * @param {string} tag - article tag
   * @returns status code, data on success, errors on failure
   */
  async getArticlesByTag(tag, id, page = 1) {
    return await this.responseHandler(
      this.api(`/articles/tag`, 'GET', { tag, id, page }),
      true,
      'articles',
    )
  }

  /**
   * Gets articles matching the query
   * @param {string} query - query string to search for
   * @returns status code, data on success, errors on failure
   */
  async getArticlesByQuery(query, page = 1) {
    return await this.responseHandler(
      this.api(`/articles/query`, 'GET', { query, page }),
      true,
      'data',
    )
  }

  /**
   * Gets recommended articles from looking at previously accredited articles and their topic
   * @param {object} user - logged in user
   * @returns status code, data on success, errors on failure
   */
  async getRecommendedArticles(user) {
    return await this.responseHandler(
      this.api(`/articles/recommended`, 'GET', null, null, true, user),
      true,
      'articles',
    )
  }

  /**
   * Gets a topic specified by id
   * @param {number} id - topic id
   * @returns status code, data on success, errors on failure
   */
  async getTopicById(id) {
    return await this.responseHandler(
      this.api(`/topics/id`, 'GET', { id }),
      true,
      'topic',
    )
  }

  /**
   * Gets topic specified by name
   * @param {string} name - topic name
   * @returns status code, data on success, errors on failure
   */
  async getTopicByName(name, filter, page) {
    return await this.responseHandler(
      this.api(`/topics/name`, 'GET', { name, filter, page }),
      true,
      'data',
    )
  }

  /**
   * Gets topics
   * @returns status code, data on success, errors on failure
   */
  async getTopics() {
    return await this.responseHandler(
      this.api(`/topics`, 'GET'),
      true,
      'topics',
    )
  }

  /**
   * Gets topics specified by tag
   * @param {string} tag - topic related tag
   * @returns status code, data on success, errors on failure
   */
  async getTopicsByTag(tag) {
    return await this.responseHandler(
      this.api(`/topics/tag`, 'GET', { tag }),
      true,
      'topics',
    )
  }

  /**
   * Gets topics matching the query
   * @param {string} query - query string to search for
   * @returns status code, data on success, errors on failure
   */
  async getTopicsByQuery(query) {
    return await this.responseHandler(
      this.api(`/topics/query`, 'GET', { query }),
      true,
      'topics',
    )
  }

  /**
   * Gets recommended topics from looking at previously accretited articles and their topic
   * @param {object} user - logged in user
   * @returns status code, data on success, errors on failure
   */
  async getRecommendedTopics(user) {
    return await this.responseHandler(
      this.api(`/topics/recommended`, 'GET', null, null, true, user),
      true,
      'topics',
    )
  }

  /**
   * Gets a category specified by id
   * @param {number} id - category id
   * @returns status code, data on success, errors on failure
   */
  async getCategoryById(id) {
    return await this.responseHandler(
      this.api(`/categories`, 'GET', { id }),
      true,
      'category',
    )
  }

  /**
   * Gets all categories
   * @returns status code, data on success, errors on failure
   */
  async getCategories() {
    return await this.responseHandler(
      this.api(`/categories`, 'GET'),
      true,
      'categories',
    )
  }

  /**
   * Gets categories matching the query
   * @param {string} query - query string to search for
   * @returns status code, data on success, errors on failure
   */
  async getCategoriesByQuery(query) {
    return await this.responseHandler(
      this.api(`/categories/query`, 'GET', { query }),
      true,
      'categories',
    )
  }

  /**
   * Gets admin stats for all the data
   * @param {object} user - logged in user
   * @returns status code, data on success, errors on failure
   */
  async getStatsAdmin(user) {
    return await this.responseHandler(
      this.api(`/admin/stats`, 'GET', null, null, true, user),
      true,
      'data',
    )
  }

  /**
   * Gets users for admin
   * @param {object} user - logged in user
   * @param {number} limit - how many entries per page
   * @param {number} page - which page one wants
   * @param {string} sortColumn - what column to sort by
   * @param {string} sortOrder - ascending or descending order
   * @returns {object} - { status, data: { users, hasMore, lastPage } }
   */
  async getUsersAdmin(user, limit, page, sortColumn, sortOrder) {
    return await this.responseHandler(
      this.api(
        `/admin/users`,
        'GET',
        { limit, page, sortColumn, sortOrder },
        null,
        true,
        user,
      ),
      true,
      'data',
    )
  }

  /**
   * Gets users for admin by query
   * @param {object} user - logged in user
   * @param {string} query - query to search by
   * @param {number} limit - how many entries per page
   * @param {number} page - which page one wants
   * @param {string} sortColumn - what column to sort by
   * @param {string} sortOrder - ascending or descending order
   * @returns {object} - { status, data: { users, hasMore, lastPage } }
   */
  async getUsersByQueryAdmin(user, query, limit, page, sortColumn, sortOrder) {
    return await this.responseHandler(
      this.api(
        `/admin/users/search`,
        'GET',
        { query, limit, page, sortColumn, sortOrder },
        null,
        true,
        user,
      ),
      true,
      'data',
    )
  }

  /**
   * Gets articles for admin
   * @param {object} user - logged in user
   * @param {number} limit - how many entries per page
   * @param {number} page - which page one wants
   * @param {string} sortColumn - what column to sort by
   * @param {string} sortOrder - ascending or descending order
   * @returns {object} - { status, data: { articles, hasMore, lastPage } }
   */
  async getArticlesAdmin(user, limit, page, sortColumn, sortOrder) {
    return await this.responseHandler(
      this.api(
        `/admin/articles`,
        'GET',
        { limit, page, sortColumn, sortOrder },
        null,
        true,
        user,
      ),
      true,
      'data',
    )
  }

  /**
   * Gets articles for admin by query
   * @param {object} user - logged in user
   * @param {string} query - query to search by
   * @param {number} limit - how many entries per page
   * @param {number} page - which page one wants
   * @param {string} sortColumn - what column to sort by
   * @param {string} sortOrder - ascending or descending order
   * @returns {object} - { status, data: { articles, hasMore, lastPage } }
   */
  async getArticlesByQueryAdmin(
    user,
    query,
    limit,
    page,
    sortColumn,
    sortOrder,
  ) {
    return await this.responseHandler(
      this.api(
        `/admin/articles/search`,
        'GET',
        { query, limit, page, sortColumn, sortOrder },
        null,
        true,
        user,
      ),
      true,
      'data',
    )
  }

  /**
   * Gets topics for admin
   * @param {object} user - logged in user
   * @param {number} limit - how many entries per page
   * @param {number} page - which page one wants
   * @param {string} sortColumn - what column to sort by
   * @param {string} sortOrder - ascending or descending order
   * @returns {object} - { status, data: { topics, hasMore, lastPage } }
   */
  async getTopicsAdmin(user, limit, page, sortColumn, sortOrder) {
    return await this.responseHandler(
      this.api(
        `/admin/topics`,
        'GET',
        { limit, page, sortColumn, sortOrder },
        null,
        true,
        user,
      ),
      true,
      'data',
    )
  }

  /**
   * Gets topics for admin by query
   * @param {object} user - logged in user
   * @param {string} query - query to search by
   * @param {number} limit - how many entries per page
   * @param {number} page - which page one wants
   * @param {string} sortColumn - what column to sort by
   * @param {string} sortOrder - ascending or descending order
   * @returns {object} - { status, data: { topics, hasMore, lastPage } }
   */
  async getTopicsByQueryAdmin(user, query, limit, page, sortColumn, sortOrder) {
    return await this.responseHandler(
      this.api(
        `/admin/topics/search`,
        'GET',
        { query, limit, page, sortColumn, sortOrder },
        null,
        true,
        user,
      ),
      true,
      'data',
    )
  }

  /**
   * Gets categories for admin
   * @param {object} user - logged in user
   * @param {number} limit - how many entries per page
   * @param {number} page - which page one wants
   * @param {string} sortColumn - what column to sort by
   * @param {string} sortOrder - ascending or descending order
   * @returns {object} - { status, data: { categories, hasMore, lastPage } }
   */
  async getCategoriesAdmin(user, limit, page, sortColumn, sortOrder) {
    return await this.responseHandler(
      this.api(
        `/admin/categories`,
        'GET',
        { limit, page, sortColumn, sortOrder },
        null,
        true,
        user,
      ),
      true,
      'data',
    )
  }

  /**
   * Gets categories for admin by query
   * @param {object} user - logged in user
   * @param {string} query - query to search by
   * @param {number} limit - how many entries per page
   * @param {number} page - which page one wants
   * @param {string} sortColumn - what column to sort by
   * @param {string} sortOrder - ascending or descending order
   * @returns {object} - { status, data: { categories, hasMore, lastPage } }
   */
  async getCategoriesByQueryAdmin(
    user,
    query,
    limit,
    page,
    sortColumn,
    sortOrder,
  ) {
    return await this.responseHandler(
      this.api(
        `/admin/categories/search`,
        'GET',
        { query, limit, page, sortColumn, sortOrder },
        null,
        true,
        user,
      ),
      true,
      'data',
    )
  }

  /**
   * Gets reports for admin
   * @param {object} user - logged in user
   * @param {string} status - report status (open, resolved, rejected)
   * @param {number} limit - how many entries per page
   * @param {number} page - which page one wants
   * @param {string} sortColumn - what column to sort by
   * @param {string} sortOrder - ascending or descending order
   * @returns {object} - { status, data: { reports, hasMore, lastPage } }
   */
  async getReportsAdmin(user, status, limit, page, sortColumn, sortOrder) {
    return await this.responseHandler(
      this.api(
        `/admin/reports`,
        'GET',
        { status, limit, page, sortColumn, sortOrder },
        null,
        true,
        user,
      ),
      true,
      'data',
    )
  }

  /**
   * Gets reports for admin by query
   * @param {object} user - logged in user
   * @param {string} status - report status (open, resolved, rejected)
   * @param {string} query - query to search by
   * @param {number} limit - how many entries per page
   * @param {number} page - which page one wants
   * @param {string} sortColumn - what column to sort by
   * @param {string} sortOrder - ascending or descending order
   * @returns {object} - { status, data: { reports, hasMore, lastPage } }
   */
  async getReportsByQueryAdmin(
    user,
    status,
    query,
    limit,
    page,
    sortColumn,
    sortOrder,
  ) {
    return await this.responseHandler(
      this.api(
        `/admin/reports/search`,
        'GET',
        { status, query, limit, page, sortColumn, sortOrder },
        null,
        true,
        user,
      ),
      true,
      'data',
    )
  }

  //! POST DATA API FUNCTIONS

  /**
   * Creates and saves a user to the API
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async createUser(user) {
    return await this.responseHandler(
      this.api('/users', 'POST', null, user),
      true,
      'user',
    )
  }

  /**
   * Creates and saves an article to the API
   * @param {object} article - the article object with properties: title, topic, intro, body, tags
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async createArticle(article, user) {
    return await this.responseHandler(
      this.api('/articles', 'POST', null, article, true, user),
      true,
      'article',
    )
  }

  /**
   * creates a report and posts to the API
   * @param {object} report - the report object with properties: title, description
   * @param {object} user - the logged in user
   * @returns status code, errors on failure
   */
  async createReport(report, user) {
    return await this.responseHandler(
      this.api('/reports', 'POST', null, report, true, user),
    )
  }

  /**
   * creates an entry
   * @param {object} user - logged in user
   * @param {string} type - type of entry
   * @param {object} body - create body
   * @returns {object} - { status }
   */
  async createEntryAdmin(user, type, body) {
    return await this.responseHandler(
      this.api(`/admin/${type}`, 'POST', null, body, true, user),
      true,
      'data',
    )
  }

  //! PUT DATA API FUNCTIONS

  /**
   * Updates the data on the user who wants to follow/unfollow and the target
   * @param {number} id - The ID of the article one wants to update
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async followUnfollow({ id, user }) {
    return await this.responseHandler(
      this.api(`/users/follow`, 'PUT', { id }, null, true, user),
      true,
      'users',
    )
  }

  /**
   * Updates and saves an user to the API
   * @param {number} id - The ID of the user one wants to update
   * @param {object} updatedData - the object with updated data
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password ( for authentification )
   * @returns status code, data on success, errors on failure
   */
  async updateUser(source, id, updatedData, user) {
    return await this.responseHandler(
      this.api(`/users`, 'PUT', { source, id }, updatedData, true, user),
      true,
      'user',
    )
  }

  /**
   * Updates and saves an article to the API
   * @param {object} article - the article object with properties: title, topic, intro, body, tags
   * @param {number} id - The ID of the article one wants to update
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async updateArticle(article, id, user) {
    return await this.responseHandler(
      this.api(`/articles`, 'PUT', { id }, article, true, user),
      true,
      'article',
    )
  }

  /**
   * Accredits/Discredits an article
   * @param {number} id - The ID of the article one wants to accredit/discredit
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code, data on success, errors on failure
   */
  async accreditDiscredit(id, user, credit) {
    return await this.responseHandler(
      this.api(`/articles/credit`, 'PUT', { id }, credit, true, user),
      true,
      'data',
    )
  }

  /**
   * updates an entry
   * @param {object} user - logged in user
   * @param {string} type - type of entry
   * @param {number} id - id of target entry
   * @param {object} body - Update body
   * @returns {object} - { status }
   */
  async updateEntryAdmin(user, type, id, body) {
    return await this.responseHandler(
      this.api(`/admin/${type}`, 'PUT', { id }, body, true, user),
      true,
      'data',
    )
  }

  /**
   * Blocks a user/article
   * @param {object} user - logged in user
   * @param {string} type - type of entry
   * @param {number} id - id of target user/article
   * @returns {object} - { status }
   */
  async blockEntryAdmin(user, type, id) {
    return await this.responseHandler(
      this.api(`/admin/${type}/block`, 'PUT', { id }, null, true, user),
      true,
      'data',
    )
  }

  /**
   * updates the status of the report
   * @param {object} user - logged in user
   * @param {string} status - status to be marked as
   * @param {number} id - id of target report
   * @returns {object} - { status }
   */
  async markReportAsAdmin(user, status, id) {
    return await this.responseHandler(
      this.api(`/admin/reports/mark`, 'PUT', { status, id }, null, true, user),
      true,
      'data',
    )
  }

  //! DELETE DATA API FUNCTIONS

  /**
   * Deletes an article to the API
   * @param {number} id - The ID of the article one wants to update
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns status code 204 on success, errors on failure
   */
  async deleteArticle(id, user) {
    return await this.responseHandler(
      this.api(`/articles`, 'DELETE', { id }, null, true, user),
    )
  }

  /**
   * deletes a user/article
   * @param {object} user - logged in user
   * @param {string} type - type of entry
   * @param {number} id - id of target user/article
   * @returns {object} - { status }
   */
  async deleteEntryAdmin(user, type, id) {
    return await this.responseHandler(
      this.api(`/admin/${type}`, 'DELETE', { id }, null, true, user),
    )
  }
}
