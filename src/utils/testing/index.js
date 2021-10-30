/* eslint-disable react/forbid-foreign-prop-types */
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { reducers } from '../../app/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { checkParseInt } from '../helpers';

/**
 * Assertion method to test if the props comply with .propTypes of that component
 * @param {object} component - React Component to test prop types of
 * @param {object} expectedProps - Example prop types that are to be expected
 */
export const expectNoPropTypeErrors = (component, expectedProps) => {
  PropTypes.checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
}

/**
 * Creates and returns a new instance of the store
 * @param {object} preloadedState - state the store should be created with instead of initialState
 * @returns a store instance
 */
export const testStore = (preloadedState = null) => {
  if (preloadedState) {
    return configureStore({
      reducer: reducers,
      preloadedState,
    });
  } else if (preloadedState === null) {
    return configureStore({
      reducer: reducers
    });
  }
};

/**
 * Returns the initial state of the store
 * @returns {object} Store's initialState
 */
export const getInitialState = () => ({
  ...testStore().getState()
})

/**
 * Renders a component according to options
 * @param {object} Component - React Component to render
 * @param {object} options - Structure with default states: { expectedProps = {}, preloadedState = null, needsStore = false, needsMemoryRouter = false }
 * @returns {object} - returns an object with the store: { store }
 */
export const renderComponent = ( Component, { expectedProps = {}, preloadedState = null, needsStore = false, needsMemoryRouter = false} = {}) => {
  let wrapper = <Component {...expectedProps} />;
  let store;
  
  if ( needsMemoryRouter ) {
    wrapper = (
      <MemoryRouter>
        { wrapper }
      </MemoryRouter>
    );
  }

  if ( needsStore ) {
    store = testStore(preloadedState);
    wrapper = (
      <Provider store={store}>
        {wrapper}
      </Provider>
    );
  }
  
  const testLib = render(wrapper);
  
  return { store, ...testLib };  
}

export const getMockUsers = ({ amount = 1, id = 1, accessLevel = 'none' } = {}) => {
  if ( amount === 1 ) {
    return {
      id: checkParseInt(id),
      firstName: `test${id}`,
      lastName: `user${id}`,
      emailAddress: `test${id}@user${id}.com`,
      password: `testUser${id}`,
      occupation: `tester${id}`,
      bio: `test bio${id}`,
      mostActiveField: `testing${id}`,
      articles: checkParseInt(id),
      credits: checkParseInt(id),
      followers: [1,2,3,4,5],
      following: [1,2,3,4,5],
      profileImgURL: 'https://img.icons8.com/ios-glyphs/60/FFFFFF/user--v1.png',
      headerImgURL: 'https://placeimg.com/1000/200/tech',
      accessLevel,
      accreditedArticles: [],
      discreditedArticles: [],
      blocked: false,
      createdAt: '1111-11-11',
      updatedAt: '1111-11-11',
    }
  } else if ( amount > 1 ) {
    const users = [];

    for (let i = 1; i <= amount; i++) {
      users.push({
        id: checkParseInt(i),
        firstName: `test${i}`,
        lastName: `user${i}`,
        emailAddress: `test${i}@user${i}.com`,
        password: `testUser${i}`,
        occupation: `tester${i}`,
        bio: `test bio${i}`,
        mostActiveField: `testing${i}`,
        articles: checkParseInt(i),
        credits: 1,
        followers: [1,2,3,4,5],
        following: [1,2,3,4,5],
        profileImgURL: 'https://img.icons8.com/ios-glyphs/60/FFFFFF/user--v1.png',
        headerImgURL: 'https://placeimg.com/1000/200/tech',
        accessLevel: 'none',
        accreditedArticles: [],
        discreditedArticles: [],
        blocked: false,
        createdAt: '1111-11-11',
        updatedAt: '1111-11-11',
      });
    }

    return users;
  }
}

export const getMockArticles = ({ amount = 1, id = 1 } = {}) => {
  if ( amount === 1 ) {
    const article = {
      id: checkParseInt(id),
      userId: checkParseInt(id),
      topicId: checkParseInt(id),
      title: `test title${id}`,
      topic: `test topic${id}`,
      intro: `test intro${id}`,
      body: `test body${id}`,
      tags: ['test tag1','test tag 2','test tag 3'],
      credits: 1,
      published: `${id}${id}${id}${id}-${id}${id}-${id}${id}`,
      blocked: false,
      createdAt: '1111-11-11',
      updatedAt: '1111-11-11',
    }
    article.User = getMockUsers({ id });
    return article;
  } else if ( amount > 1 ) {
    const articles = [];

    for (let i = 1; i <= amount; i++) {
      articles.push({
        id: checkParseInt(i),
        userId: checkParseInt(i),
        topicId: checkParseInt(i),
        title: `test title${i}`,
        topic: `test topic${i}`,
        intro: `test intro${i}`,
        body: `test body${i}`,
        tags: ['test tag1','test tag 2','test tag 3'],
        credits: 1,
        published: `${i}${i}${i}${i}-${i}${i}-${i}${i}`,
        blocked: false,
        createdAt: '1111-11-11',
        updatedAt: '1111-11-11',
      });
    }
    articles.forEach( (article, i) => {
      article.User = getMockUsers({ id: i + 1 });
    })

    return articles;
  }
}

export const getMockTopics = ({ amount = 1, id = 1 } = {}) => {
  if ( amount === 1 ) {
    return {
      id: checkParseInt(id),
      categoryId: checkParseInt(id),
      name: `test topic${id}`,
      createdAt: '1111-11-11',
      updatedAt: '1111-11-11',
    }
  } else if ( amount > 1 ) {
    const topics = [];

    for (let i = 1; i <= amount; i++) {
      topics.push({
        id: checkParseInt(i),
        categoryId: checkParseInt(i),
        name: `test topic${i}`,
        createdAt: '1111-11-11',
        updatedAt: '1111-11-11',
      });
    }

    return topics;
  }
}

export const getMockCategories = ({ amount = 1, id = 1} = {}) => {
  if ( amount === 1 ) {
    return {
      id: checkParseInt(id),
      name: `test category${id}`,
      createdAt: '1111-11-11',
      updatedAt: '1111-11-11',
    }
  } else if ( amount > 1 ) {
    const categories = [];

    for (let i = 1; i <= amount; i++) {
      categories.push({
        id: checkParseInt(i),
        name: `test category${i}`,
        createdAt: '1111-11-11',
        updatedAt: '1111-11-11',
      });
    }

    return categories;
  }
}

export const getMockReports = ({ amount = 1, status = 'open', id = 1 } = {}) => {
  if ( amount === 1 ) {
    return {
      id: checkParseInt(id),
      title: `test title${id}`,
      description: `test description${id}`,
      status,
      userId: checkParseInt(id),
      createdAt: '1111-11-11',
      updatedAt: '1111-11-11',
    }
  } else if ( amount > 1 ) {
    const reports = [];

    for (let i = 1; i <= amount; i++) {
      reports.push({
        id: checkParseInt(i),
        title: `test title${i}`,
        description: `test description${i}`,
        status,
        userId: checkParseInt(i),
        createdAt: '1111-11-11',
        updatedAt: '1111-11-11',
      });
    }

    return reports;
  }
}