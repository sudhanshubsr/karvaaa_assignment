import compression from "compression";
import dotenv from "dotenv";
import express from "express";
import fs, { rmSync } from 'fs';
import helmet from "helmet";
import swaggerUi from 'swagger-ui-express';
import chatRouter from './src/routes/randomresponse.routes.js';
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

// Handling 404 Error
app.use((req,res)=>{
    res.status(404).json({
        message: "Not Found", "Please check our documentation at":"/api/docs",
    })
})



//Server Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
})


export default app;
