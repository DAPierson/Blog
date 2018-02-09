import { Router } from 'express';
import Table from '../table';
import { rows } from '../config/db';

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
router.put('/:id', (req,res)=>{
    blogs.update(req.params.id,req.body)
    .then(blogs=>{
        res.send('update');
    })
})

router.get('/:id',(req,res)=>{
    blogs.getOne(req.params.id)
    .then(blogs=>{
        res.json(blogs);
    })
})

router.delete('/:id',(req,res)=>{
blogs.delete(req.params.id)
.then(blogs=>{
    res.send('delete');
})
})
router.get('/tag/:id',(req,res)=>{
    rows('spTagBlog', [req.params.id])
    .then(blogs=>{
        res.json(blogs);
        console.log(blogs);
    })
})

export default router;