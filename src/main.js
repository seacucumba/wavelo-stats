import dotenv from 'dotenv'
dotenv.config()

import fetchival from 'fetchival'
fetchival.fetch = require('node-fetch')

import micro, {send} from 'micro'
import {router, get, post} from 'microrouter'
import connect from './db'
import hubs from './api/hubs'
import system from './api/system'

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

export default srv;
