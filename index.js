import compression from "compression";
import dotenv from "dotenv";
import express from "express";
import rateLimit from 'express-rate-limit';
import fs from 'fs/promises';
import helmet from "helmet";
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import chatRouter from './src/routes/randomresponse.routes.js';

dotenv.config();
const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/chatbot', chatRouter);


// Swagger documentation
let apiDocs;
try {
  const apiDocsContent = await fs.readFile('./swagger.json', 'utf-8');
  apiDocs = JSON.parse(apiDocsContent);
} catch (error) {
  console.error('Failed to load Swagger documentation:', error);
}

if (apiDocs) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));
} else {
  console.warn('Swagger documentation not loaded. /api/docs route will not be available.');
}




// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// 404 handling
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
    "Please check our documentation at": "/api/docs",
  });
});

// Server Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

export default app;
