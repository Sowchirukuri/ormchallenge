// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Set up associations

// Each Product belongs to a Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Define the foreign key as 'category_id' in the Product model
});

// Each Category can have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // Use the same foreign key 'category_id' in the Product model
});

// Each Product can belong to many Tags through the ProductTag model
Product.belongsToMany(Tag, {
  through: ProductTag, // Define the intermediate model through which the association is made
  foreignKey: 'product_id', // Set the foreign key in the intermediate model
});

// Each Tag can belong to many Products through the ProductTag model
Tag.belongsToMany(Product, {
  through: ProductTag, // Define the intermediate model through which the association is made                 
  foreignKey: 'tag_id', // Set the foreign key in the intermediate model
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
