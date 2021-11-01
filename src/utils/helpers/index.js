/**
 * Capitalizes the first word or all words in a string
 * @param {string} string - the string to capitalize
 * @param {bool} firstOnly - true or false, whether to only capitalize first or all
 * @returns the altered string
 */
export const capitalize = (string, firstOnly = false) => {
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
 * Convert a string from the api to an array if it is a string, or just return the value if not
 * @param {string} string - the following/followers string to turn into array
 * @returns array that was converted from the string
 */
export const isStringAndStringToArray = (value) => {
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
export const formatDate = (string) => {
  const match = string.match(/^(\d+)-(\d+)-(\d+)/);
  return `${match[3]}-${match[2]}-${match[1]}`;
}

/**
 * Validates a field according to type and returns bool
 * @param {string} type - type of field (name, occupation, email, password)
 * @param {string} data - new data to test for the field
 * @param {object} target - target DOM element
 * @returns validation boolean, true of false
 */
export const validateField = (type, data, target) => {
  let regex;
  if (type === 'name' || type === 'occupation') {
    regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$/;
  } else if (type === 'email') {
    regex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
  } else if (type === 'password') {
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;
  }

  const isValid = regex.test(data);
  
  if ( typeof target === 'string' ) {
    target = document.querySelector(target);
  }
  
  if (target === null) {
    return isValid;
  } else {
    const { classList } = target;
    if ( isValid ) {
      classList.contains('mismatch') && classList.remove('mismatch');
      !classList.contains('match') && classList.add('match');
      return true;
    } else if (data === '') {
      classList.contains('mismatch') && classList.remove('mismatch');
      classList.contains('match') && classList.remove('match');
    } else {
      !classList.contains('mismatch') && classList.add('mismatch');
      classList.contains('match') && classList.remove('match');
      return false;
    }
  }
}

/**
 * Takes a value that should be an integer and parses it if needed
 * @param {number} value - the value to check for parse
 * @returns the value with type of int
 */
export const checkParseInt = (value) => {
  return typeof value === 'number' ? value : parseInt(value);
}