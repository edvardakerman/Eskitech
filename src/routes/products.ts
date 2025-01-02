import { Router, Request, Response } from 'express';
import { Product } from '../modules/product'

const router = Router();

const  products: Product[] = [
    { id: 1, name: 'Product 1', price: 100, quantity: 10 },
    { id: 2, name: 'Product 2', price: 200, quantity: 20 },
    { id: 3, name: 'Product 3', price: 300, quantity: 30 }
];

// Get all products
router.get('/products', (req: Request, res: Response) => {
    res.json(products);
});

// Get a product by ID
router.get('/products/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const product: Product | undefined = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: `Product with id ${id} not found` });
    }
});

// Create a new product
router.post('/products', (req: Request, res: Response) => {
    const newProduct: Product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update a product by ID
router.put('/products/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const product: Product | undefined = products.find(p => p.id === id);
    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.quantity = req.body.quantity || product.quantity;
        res.json(product);
    } else {
        res.status(404).json({ message: `Product with id ${id} not found` });
    }
});

// Delete a product by ID
router.delete('/products/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const index: number = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        //  reindex the products after splice
        for (let i = index; i < products.length; i++) {
            products[i].id = i + 1;
        }
        res.json({ message: `Product with id ${id} deleted` });
    } else {
        res.status(404).json({ message: `Product with id ${id} not found` });
    }
});

export default router;