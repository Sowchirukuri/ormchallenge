const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

// Define the Category model 
class Category extends Model {}

// Initialize the Category model 
Category.init(
  {
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
    freezeTableName: true, 
    underscored: true,
    modelName: 'category', // Set the model name to category
  }
);

// export the model category
module.exports = Category;
