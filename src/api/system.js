import fetchival from 'fetchival'
import Hub from '../models/hub'

const HUBS_URL = 'https://app.socialbicycles.com/api/networks/105/hubs'

const processHub = async (newHub, oldHub) => {
  if (oldHub && oldHub.id != newHub.id) {
    throw Error('Attempted to update document with different one')
  }

  console.log('Processing hub :' + newHub.id)

  await Hub.updateOne(
    {_id: newHub.id},
    {...newHub, _id: newHub.id},
    {upsert: true})
}

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
  const newHubs = hubs.map(hub => new Hub({
    ...hub,
    extId: hub.id,
    date: now,
  }))

  return Hub.create(newHubs)
}

export default {
  populate,
}
