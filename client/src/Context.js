import React, { Component } from "react"
import Cookies from "js-cookie";
import Data from './Data.js';

// Creates Context
export const Context = React.createContext(); 

// Declares the provider
export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data(); // Imports functions made for managing api calls, check '/src/Data.js'
    this.state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null, // Sets the 'authenticatedUser' if theres a cookie, or 'null' if not
    };
  }

  render() {
    const { authenticatedUser } = this.state;

    // Set value to be provided down to consumers
    const value = {
      authenticatedUser,
      data: this.data,
      actions: { 
        signIn: this.signIn,
        signOut: this.signOut,
        signUp: this.signUp,
        capitalize: this.capitalize,
      },
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
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
   * Signs up (and if successful, signs in) the user, and sets cookie and global variable for authenticated user
   * @param {object} user - the user object with properties: firstName, lastName, emailAddress and password
   * @returns the status code and the user object if successful, if not, throws an error
   */
  signUp = async (user) => {
    const createRes = await this.data.createUser(user);
    if (createRes.status === 201) {
      const getRes = await this.data.getUser(user.emailAddress, user.password);
      if (getRes.status === 200) {
        this.setState({ authenticatedUser: {
          id: getRes.user.id,
          ...user
        }});
        Cookies.set('authenticatedUser', JSON.stringify({
          id: getRes.user.id,
          ...user
        }));
        return {
          status: createRes.status,
          user: getRes.user
        };
      } else {
        throw new Error();
      }
    } else if (createRes.status === 400) {
      return createRes;
    } else {
      throw new Error();
    }
  }
  
  /**
   * Signs in the user, and sets cookie and global variable for authenticated user
   * @param {string} emailAddress - the login email for the user
   * @param {string} password - login password
   * @returns the user object
   */
  signIn = async (emailAddress, password) => {
    const response = await this.data.getUser(emailAddress, password);
    if (response.status === 200) {
      const { user } = response;
      user.password = password;
      this.setState({ authenticatedUser: user });
      Cookies.set('authenticatedUser', JSON.stringify(user));
    } 
    return response;
  }

  /**
   * Signs out the user, and removes cookie and set global variable to 'null' for authenticated user
   */
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}