import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';

// App Config
const app = express();
const port = process.env.PORT || 8080;

// configure database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// API routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.get('/', (req, res) => {
  res.send('API Working!');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
