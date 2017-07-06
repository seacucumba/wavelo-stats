require('dotenv').config()
require('fetchival').fetch = require('node-fetch')
const micro = require('micro')
const {send} = micro
const {router, get, post} = require('microrouter')
const connect = require('./db')
const hubs = require('./api/hubs')
const system = require('./api/system')

const notFound = (req, res) => send(res, 404, 'Not Found')

const routes = router(
  get('/hubs', hubs),
  post('/system/populate', system.populate),
  get('/*', notFound),
  post('/*', notFound)
);

const srv = micro(routes)
const port = process.env.port || 3000;

connect().then(() => {
  srv.listen(port, () => console.log('Listening on port ' + port))
})

module.exports = srv
