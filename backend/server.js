import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// App Config
const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// API routes
app.get('/', (req, res) => {
  res.send('API Working!');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
