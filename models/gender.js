const mongoose = require('mongoose')

const genderSchema = new mongoose.Schema({
    value: {
        type: String,       
    },
    label: {
        type: String,       
    },
},
{
    collection: 'gender'
})

genderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Gender', genderSchema)