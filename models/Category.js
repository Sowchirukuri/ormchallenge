const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

// Define the Category model 
const Category = sequelize.define('Category' , {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,       // Set 'id' as the primary key
      autoIncrement: true,    // Allow auto-incrementing of 'id'
      allowNull: false,       // 'id' cannot be null
    },
    category_name: {
      type: DataTypes.STRING, // Define 'category_name' as a string
      allowNull: false,       // 'category_name' cannot be null
    }
  },
  {
    sequelize,       // Connect to the Sequelize instance
    timestamps: false, // Disable timestamps 
    underscored: true,
    modelName: 'category', // Set the model name to category
  }
);

// export the model category
module.exports = Category;

// 'sequelize.define' is to define the category model 
// 'id' and 'category_name' are the model attributes with their datatypes and options
// model 'category' is exported to use in other parts of application.