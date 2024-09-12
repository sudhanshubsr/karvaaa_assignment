import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import fs from 'fs'
import compression from "compression";
import chatRouter from './src/routes/randomresponse.routes.js';
import swaggerUi from 'swagger-ui-express'
dotenv.config();



const app = express();
const apiDocs = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'))

app.use(helmet());  // Using Helmet to protect against some common attacks
app.use(compression()); // Using compression to size of the data sent from server to the client

// Routes
app.use('/api/chatbot', chatRouter)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));


// Centralized Error Handling
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({error: 'Internal Server Error'})
})

//Server Configuration
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
})


export default app;
