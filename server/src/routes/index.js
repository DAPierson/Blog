import { Router } from 'express';
import peopleRouter from './people';
import blogsRouter from './Blogs';
import tagsRouter from './Tags';
import blogtagsRouter from './BlogTags'

let router = Router();

router.use('/people', peopleRouter);
router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);
router.use('/blogtags', blogtagsRouter);
export default router;