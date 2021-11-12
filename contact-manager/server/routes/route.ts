import * as express from 'express';

const router = express.Router();
const Contact = require('../models/contact');

router.get('/', (req, res, next) => {
    res.send('This is the api.');
})

router.get('/contacts', (req, res, next) => {
    Contact.find(function(err, contacts) {
        res.json(contacts);
    });
 });

 router.delete('/contact/:id', (req, res, next) => {
    Contact.deleteMany({_id: req.params.id}, function(err, result){
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

router.post('/contact', (req, res, next) => {
    let addContact = new Contact ({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone,
        email : req.body.email,
        notes : req.body.notes
    });

    addContact.save((err, contact) => {
        if (err) { 
            res.json(err);
        } else {
            res.json({msg: "Success"});
        }
    });
});

module.exports = router


