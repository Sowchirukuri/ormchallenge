// Import important parts of the Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection.js');

// Initialize the Tag model (table) by extending off Sequelize's Model class
class Tag extends Model {}

// Set up fields and rules for the Tag model
Tag.init(
  {
    // Define columns for the Tag model
    id: {
      type: DataTypes.INTEGER, // Data type: Integer
      primaryKey: true,       // Primary key
      autoIncrement: true,    // Auto-incrementing
      allowNull: false,       // Not allowed to be null
    },
    tag_name: {
      type: DataTypes.STRING,  // Data type: String
    },
  },
  {
    sequelize,               // Connect to the Sequelize instance
    timestamps: false,       // Disable timestamps 
    freezeTableName: true,  // Freeze the table name 
    underscored: true,       // Use snake_case for column names
    modelName: 'tag',        // Set the model name to 'tag'
  }
);

// Export the Tag model for use in other parts of the application
module.exports = Tag;
