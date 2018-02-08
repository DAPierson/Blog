import { Router } from 'express';
import Table from '../table';

let router = Router();
let blogs = new Table('Blogs')

router.get('/', (req, res) => {
    blogs.getAll()
    .then(blogs=>{
         res.json(blogs);
    })
});

router.post('/', (req,res)=>{
    blogs.insert(req.body)
    .then(blogs=>{
res.send("Cool");
    })

})

router.get('/:id',(req,res)=>{
    blogs.getOne(req.params.id)
    .then(blogs=>{
        res.json(blogs);
    })
})

export default router;