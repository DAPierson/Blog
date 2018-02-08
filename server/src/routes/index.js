import { Router } from 'express';
import peopleRouter from './people';
import blogsRouter from './Blogs';

let router = Router();

router.use('/people', peopleRouter);
router.use('/blogs', blogsRouter);
export default router;