import express, { Request, Response } from 'express';
import productRoutes from './routes/products';
const db = require('./db');

// Create Express application
const app = express();

// Set the port number for the server
const port: number = 3000;

// Define a route for the root path ('/')
app.get('/', (req: Request, res: Response) => {
    // Send a response to the client
    res.json({
        message: 'Welcome to Eskitech API',
        endpoints: {
            "/products": {
                "description": "Get a list of products or create a new product",
                "methods": ["GET", "POST"]
            },
            "/products/{id}": {
                "description": "Get, update, or delete a specific product by ID",
                "methods": ["GET", "PUT", "DELETE"]
            }
        }
    });
});

app.use(express.json());
app.use(productRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});