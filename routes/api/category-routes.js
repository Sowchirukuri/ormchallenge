const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated Products
    const categories = await Category.findAll({  // findAll fetches categories
      include: [Product],  // includes the products associated
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one category by ID
router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` and include associated Products
    const category = await Category.findByPk(req.params.id, {   // findbyPk fecthes categories
      include: [Product], // includes associated products
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found with this ID' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category using the request body
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT (update) a category by ID
router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` with the data from the request body
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'Category not found with this ID' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id`
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found with this ID' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


// try , catch blocks - handles potential errors for each route 
