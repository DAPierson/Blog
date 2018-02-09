import { Router } from 'express';
import Table from '../table';

let router = Router();
let tags = new Table('Tags')

router.get('/', (req, res) => {
    tags.getAll()
    .then(tags=>{
         res.json(tags);
    })
});

router.post('/', (req,res)=>{
    tags.insert(req.body)
    .then(tags=>{
res.send("Cool");
    })

})
router.put('/:id', (req,res)=>{
    tags.update(req.params.id,req.body)
    .then(tags=>{
        res.send('update');
    })
})

router.get('/:id',(req,res)=>{
    tags.tagBlog(req.params.id)
    .then(tags=>{
        res.json(blogs);
    })
})

router.delete('/:id',(req,res)=>{
tags.delete(req.params.id)
.then(tags=>{
    res.send('delete');
})
})

export default router;