// Import important parts of the Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize the Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Set up fields and rules for the Product model
Product.init(
  {
    // Define columns for the Product model
    id: {
      type: DataTypes.INTEGER, // Data type: Integer
      primaryKey: true,       // Primary key
      autoIncrement: true,    // Auto-incrementing
      allowNull: false,       // Not allowed to be null
    },
    product_name: {
      type: DataTypes.STRING,  // Data type: String
      allowNull: false,        // Not allowed to be null
    },
    price: {
      type: DataTypes.DECIMAL, // Data type: Decimal
      allowNull: false,        // Not allowed to be null
      validate: {
        isDecimal: true,       // Validate that the value is a decimal
      },
    },
    stock: {
      type: DataTypes.INTEGER, // Data type: Integer
      allowNull: false,        // Not allowed to be null
      defaultValue: 10,       // Default value is set to 10
      validate: {
        isNumeric: true,       // Validate that the value is numeric
      },
    },
    category_id: {
      type: DataTypes.INTEGER, // Data type: Integer
      references: {           // References the category model's id
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,               // Connect to the Sequelize instance
    timestamps: false,       // Disable timestamps (created_at and updated_at)
    freezeTableName: true,  // Freeze the table name (it won't be pluralized)
    underscored: true,       // Use snake_case for column names
    modelName: 'product',   // Set the model name to 'product'
  }
);

// Export the Product model for use in other parts of the application
module.exports = Product;
