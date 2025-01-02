import { Router, Request, Response } from 'express';
const Product = require('../product');

const router = Router();

// Get all products
router.get('/products', async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Get a product by ID
router.get('/products/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id).exec();
        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Create a new product
router.post('/products', async (req: Request, res: Response) => {
    const { name, description, price, quantity } = req.body;

    try {
      const product = new Product({ name, description, price, quantity });
      await product.save();
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
});


// Update a product by ID
router.put('/products/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, description, price, quantity } = req.body;
  
    try {
      const product = await Product.findByIdAndUpdate(id, { name, description, price, quantity }, { new: true });
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
});

// Delete a product by ID
router.delete('/products/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const product = await Product.findByIdAndDelete(id);
        res.send(product);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
});

export default router;