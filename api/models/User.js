const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model { }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your First Name'
        },
        notEmpty: {
          msg: 'Please enter your First Name'
        }
      },
      set(val) { // set to lowercase after validation to have more consistent data
        if (val) {
          const lowercased = val.toLowerCase();
          this.setDataValue('firstName', lowercased);
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your Last Name'
        },
        notEmpty: {
          msg: 'Please enter your Last Name'
        }
      },
      set(val) { // set to lowercase after validation to have more consistent data
        if (val) {
          const lowercased = val.toLowerCase();
          this.setDataValue('lastName', lowercased);
        }
      }
    },
    emailAddress: { 
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please provide a valid E-Mail address'
        },
        notNull: {
          msg: 'Please enter your E-Mail Address'
        }
      },
      set(val) { // set to lowercase after validation to have more consistent data and for easier login, see 'user-auth' middleware
        if (val) {
          const lowercased = val.toLowerCase();
          this.setDataValue('emailAddress', lowercased);
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) { // Hashes the plain-text password and stores the hashed version to the database
        if (val) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue( 'password', hashedPassword);
        }
      }
    },
  }, { sequelize });

  User.associate = (models) => {  
    User.hasMany(models.Course);
  }

  return User;
}