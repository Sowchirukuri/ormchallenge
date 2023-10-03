// Import important parts of the Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize the ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// Set up fields and rules for the ProductTag model
ProductTag.init(    // init method is used to define the ProductTag model class
  {
    // Define columns for the ProductTag model
    id: {
      type: DataTypes.INTEGER, // Data type: Integer
      primaryKey: true,       // Primary key
      autoIncrement: true,    // Auto-incrementing
      allowNull: false,       // Not allowed to be null
    },
    product_id: {
      type: DataTypes.INTEGER, // Data type: Integer
      references: {           // References the product model's id
        model: 'product',
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER, // Data type: Integer
      references: {           // References the tag model's id
        model: 'tag',
        key: 'id',
      },
    },
  },
  {
    sequelize,               // Connect to the Sequelize instance
    timestamps: false,       // Disable timestamps (created_at and updated_at)
    freezeTableName: true,  // Freeze the table name (it won't be pluralized)
    underscored: true,       // Use snake_case for column names
    modelName: 'product_tag', // Set the model name to 'product_tag'
  }
);

// Export the ProductTag model for use in other parts of the application
module.exports = ProductTag;
