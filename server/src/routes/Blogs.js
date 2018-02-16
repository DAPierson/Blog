import { Router } from 'express';
import Table from '../table';
import { rows } from '../config/db';

let router = Router();
let blogs = new Table('Blogs')

router.get('/', (req, res) => {
    blogs.getAll()
        .then(blogs => {
            res.json(blogs);
        });
});

// insert post
// map through tags
// insert blogstags
router.post('/', (req, res) => {
    blogs.insert(req.body)
        .then(blogs => {
            res.json(blogs);
        })


});

// update post
// delete all blogstags
// map through tags
// insert blogstags
router.put('/:id', (req, res) => {
    blogs.update(req.params.id, req.body)
        .then(blogs => {
            res.sendStatus(200);
        })      
})

// get post
// find blogstags for blogid
// map through blogstags
// get tags
router.get('/:id', (req, res) => {
    blogs.getOne(req.params.id)
        .then(blogs => {
            res.json(blogs);
        }).then(()=>{

        })
})

// router.delete('/:id',(req,res)=>{
// blogs.delete(req.params.id)
// .then(blogs=>{
//     res.send('delete');
// })
// })
router.get('/tag/:id', (req, res) => {
    rows('spTagBlog', [req.params.id])
        .then(blogs => {
            res.json(blogs);
        })
})

router.get('/blog/:id', (req, res) => {
    rows('spBlogTag', [req.params.id])
        .then(tags => {
            res.json(tags);
        })
})

router.post('/addtag', (req, res) => {
    rows('spSetTag', [req.body.blog, req.body.tag])
        .then(tags => {
            res.sendStatus(200);
        });
})

router.delete('/deltag/:bid', (req, res) => {
    rows('spDelTag', [req.params.bid])
        .then(tags => {
            res.sendStatus(200);
        })
})

router.delete('/:id', (req, res) => {
    console.log(`call spDelBlog(${req.params.id})`);
    rows('spDelBlog', [req.params.id])
        .then(tags => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
})

export default router;