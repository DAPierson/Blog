import { Router } from 'express';
import passport from 'passport';
import { encode } from '../utils/tokens';
import { generateHash } from '../utils/security';
import { rows } from '../config/db';


let router = Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, token, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else if (!token) {
            return res.status(401).json(info);
        } else {
            return res.status(201).json(token);
        }
    })(req, res, next);
});


router.post('/createuser', (req, res, next) => {
    generateHash(req.body.password)
        .then((hash) => {
            rows('spCreateUser', [req.body.name, req.body.email, hash])
                .then(tags => {
                    res.sendStatus(200);
                });
        }).catch((err) => {
            next(err);
        });
    });



    export default router;