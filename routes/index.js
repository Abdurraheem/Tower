import { Router } from 'express';
import tower from './tower.route';


const router = Router();
router.use('/v1', tower);

export default router;