import * as express from 'express';

const router = express.Router();
const Contact = require('../models/contact');

router.get('/', (req, res, next) => {
    res.send('This is the api.');
})

router.get('/contact', (req, res, next) =>
    Contact.find(function(err, contacts) {
        res.json(contacts);
    })
);

router.post('/contact', (req, res, next) => {
    let addContact = new Contact ({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone
    });

    addContact.save((err, contact) => {
        if (err) { 
            res.json({msg: "Failed to add contact"});
        } else {
            res.json({msg: "Success"});
        }
    });
});

module.exports = router


