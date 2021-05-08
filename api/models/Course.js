const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model { }
  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"'
        },
        notEmpty: {
          msg: 'Please provide a value for "title"'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "description"'
        },
        notEmpty: {
          msg: 'Please provide a value for "description"'
        }
      }
    },
    estimatedTime: {
      type: DataTypes.STRING,
    },
    materialsNeeded: {
      type: DataTypes.STRING,
    },
  }, { sequelize });

  Course.associate = (models) => {  
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
      }
    });
  }

  return Course;
}