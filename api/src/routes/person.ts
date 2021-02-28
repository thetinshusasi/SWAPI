import express from 'express';
import controller from '../controllers/person';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/names', controller.getAllNames);

router.get('/:id', controller.getById);

export = router;
