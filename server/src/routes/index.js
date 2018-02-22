import { Router } from 'express';
import blogsRouter from './Blogs';
import tagsRouter from './Tags';
import blogtagsRouter from './BlogTags';
import authRouter from './auth';
import {isLoggedIn, tokenMiddleware} from '../middleware/auth.mw';
import usersRouter from './users';

let router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.route('*')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);
router.use('/blogtags', blogtagsRouter);

export default router;