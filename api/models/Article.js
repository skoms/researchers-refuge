const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Article extends Model { }
  Article.init({
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
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "topic"'
        },
        notEmpty: {
          msg: 'Please provide a value for "topic"'
        }
      }
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "introduction"'
        },
        notEmpty: {
          msg: 'Please provide a value for "introduction"'
        }
      }
    },
    textBody: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "textBody"'
        },
        notEmpty: {
          msg: 'Please provide a value for "textBody"'
        }
      }
    },
  }, { sequelize });

  Article.associate = (models) => {  
    Article.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
      }
    });
  }

  return Article;
}