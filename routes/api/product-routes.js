const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', async (req, res) => {
  try {
    // Find all products and include associated Category and Tag data
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one product by ID
router.get('/:id', async (req, res) => {
  try {
    // Find a single product by its `id` and include associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found with this ID' });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    // Create a new product using the request body
    const newProduct = await Product.create(req.body);

    // Check if there are associated tagIds in the request
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      // Create pairings in the ProductTag model for associated tags
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// PUT (update) a product by ID
router.put('/:id', async (req, res) => {
  try {
    // Update a product by its `id` with the data from the request body
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Check if there are associated tagIds in the request
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Remove and add new associations in the ProductTag model
      await Promise.all([
        ProductTag.destroy({ where: { tag_id: productTagIds } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    if (!updatedProduct[0]) {
      res.status(404).json({ message: 'Product not found with this ID' });
      return;
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete one product by its `id`
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found with this ID' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
