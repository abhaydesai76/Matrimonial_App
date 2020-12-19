const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
    value: {
        type: String,       
    },
    label: {
        type: String,       
    },
},
{
    collection: 'countries'
})

countrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Country', countrySchema)