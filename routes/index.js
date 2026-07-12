const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

// Contacts routes
router.use('/contacts', require('./contacts'));

// Swagger route
router.use('/', require('./swagger'));

module.exports = router;