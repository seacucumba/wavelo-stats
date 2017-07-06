import mongoose from 'mongoose'

const {DB_USER, DB_PASSWORD} = process.env

mongoose.Promise = global.Promise

export default async function connect() {
  console.log('Connecting to DB...');

  const db = mongoose.connection
  const connected = new Promise((resolve, reject) => {
    db.on('error', reject)
    db.once('open', resolve)
  });

  mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds143542.mlab.com:43542/wavelo-stats`)

  return connected
}
