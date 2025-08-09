const router = require('express').Router()
const controller = require('../controllers/contact')
const middleware = require('../middlewares')
router.post('/new', controller.createContact_post)
router.get('/', controller.get_all_Contacts_get)
router.put('/:contactId', controller.get_Contact_put)
router.delete('/:contactId', controller.get_Contact_delete)

module.exports = router
