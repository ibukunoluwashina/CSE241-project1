const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');     

routes.get('/', lesson1Controller.homeRoate);
routes.get('/page1', lesson1Controller.page1Roate);

module.exports = routes;