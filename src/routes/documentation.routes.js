import { Router } from "express";

const router = Router();
router.get('/docs', (req,res)=>{
    res.status(201).json({message: "API Docs"})
})

export default router
