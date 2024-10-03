import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';
import adminRouter from './routes/admin.route.js';

// App Config
const app = express();
// Port configuration
const port = process.env.PORT || 8080;
// Configure database connection
connectDB();

// Middlewares
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS for all routes

// API routes
app.use('/api/user', userRouter); // User routes
app.use('/api/product', productRouter); // Product routes
app.use('/api/cart', cartRouter); // Cart routes
app.use('/api/order', orderRouter); // Order routes
app.use('/api/admin', adminRouter); // Admin routes

app.get('/api', (req, res) => {
  // Basic route to check if the server is running
  res.send('API Working!');
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
