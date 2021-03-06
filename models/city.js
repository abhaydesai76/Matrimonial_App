const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    value: {
        type: String,       
    },
    label: {
        type: String,       
    },
},
{
    collection: 'cities'
})

citySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('City', citySchema)