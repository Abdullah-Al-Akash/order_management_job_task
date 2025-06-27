const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || !price || stock === undefined) {
      return res.status(400).json({ error: 'Name, price, and stock are required' });
    }

    const product = await prisma.product.create({
      data: { name, price: parseFloat(price), stock: parseInt(stock) }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, price, stock } = req.body;

    if (!name && price === undefined && stock === undefined) {
      return res.status(400).json({ error: 'At least one field (name, price, stock) must be provided' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        ...(name && { name }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    await prisma.product.delete({
      where: { id: productId },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


