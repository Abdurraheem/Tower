import { Router } from 'express';
import {
    createTower,
    getTower,
    updateTower,
    deleteTower,
} from '../controllers/tower.controller';

import { Authorization } from '../middleware/auth';
import { validateTower, validateOffsetLimit } from '../validation/tower'


const router = Router();
router.post('/tower',Authorization, validateTower, createTower);
router.get('/tower',validateOffsetLimit, getTower);
router.put('/tower/:id',Authorization, updateTower);
router.delete('/tower/:id',Authorization, deleteTower)

// Export the Router
// API will access at
// http://localhost:3000/v1/api/v1/tower
export default router;
