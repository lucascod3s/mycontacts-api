const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');

const router = Router();

router.get('/contacts', (req, res, next) => {
  req.appId = 'fon';
  next();
}, ContactController.index);
router.get('/contacts/:id', ContactController.show);

router.post('/contacts', ContactController.store);

router.put('/contacts/:id', ContactController.update);

router.delete('/contacts/:id', ContactController.delete);

module.exports = router;
