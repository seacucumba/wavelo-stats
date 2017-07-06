const fetchival = require('fetchival')
const Hub = require('../models/hub')

const HUBS_URL = 'https://app.socialbicycles.com/api/networks/105/hubs'

const populate = async () => {
  let query

  try {
    query = await fetchival(HUBS_URL).get({collapsed: false, per_page: 999})
  }
  catch (err) {
    console.log(err)
    throw err
  }

  const hubs = query.items

  console.log('Fetched hubs:', hubs.length)

  const now = new Date()
  const newHubs = hubs.map(hub => new Hub(Object.assign({}, hub, {
    extId: hub.id,
    date: now,
  })))

  return Hub.create(newHubs)
}

module.exports = {
  populate,
}
