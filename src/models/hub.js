const mongoose = require('mongoose')
const {Schema} = mongoose
require('mongoose-geojson-schema')

const hubSchema = mongoose.Schema({
  extId: String,
  date: Date,
  description: String,
  name: String,
  address: String,
  middle_point: Schema.Types.Point,
  racks_amount: Number,
  free_racks: Number,
  current_bikes: Number,
  available_bikes: Number,
})


module.exports = mongoose.model('Hub', hubSchema)
