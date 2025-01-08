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
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.send(product);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving the product' });
    }
});

// Create a new product
router.post('/products', async (req: Request, res: Response) => {
    const { name, description, price, inventory } = req.body;

    if (!name || !description || price == null || inventory == null) {
        res.status(400).json({
            message: 'All fields (name, description, price, and inventory) are required'
        });
    } else {
        try {
            const product = new Product({ name, description, price, inventory });
            await product.save();
            res.send(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while creating the product' });
        }
    }
});


// Update a product by ID
router.put('/products/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, description, price, inventory } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, { name, description, price, inventory }, { new: true });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.send(product);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while trying to update the product' });
    }
});

// Delete a product by ID
router.delete('/products/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.send(product);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while trying to delete the product' });
    }
});

export default router;