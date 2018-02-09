import { Router } from 'express';
import Table from '../table';

let router = Router();
let blogtags = new Table('BlogTags')



router.get('/:id',(req,res)=>{
    blogtags.tagBlog(req.params.id)
    .then(blogs=>{
        res.json(blogs);
        console.log(blogs);
    }).catch()
})




export default router;