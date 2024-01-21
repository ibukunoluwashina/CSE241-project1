const router = require('express').router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/api-docs', swaggerUi.serve);
router.get('/app-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;