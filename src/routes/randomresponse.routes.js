import { Router } from 'express';
import { randomchatcontroller } from '../controller/randomresponse.controller.js';  // Ensure ES module configuration

const router = Router();

router.get('/random', randomchatcontroller);

export default router;
