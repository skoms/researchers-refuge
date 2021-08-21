const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Topic extends Model { }
  Topic.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "name"'
        },
        notEmpty: {
          msg: 'Please provide a value for "name"'
        }
      }
    },
    articles: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    relatedTags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "tags"'
        },
        notEmpty: {
          msg: 'Please provide a value for "tags"'
        }
      }
    },
  }, { sequelize });

  Topic.associate = (models) => {  
    Topic.hasMany(models.Article);
  }

  return Topic;
}