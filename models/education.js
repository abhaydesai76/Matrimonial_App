const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
    value: {
        type: String,       
    },
    label: {
        type: String,       
    },
},
{
    collection: 'educations'
})

educationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Education', educationSchema)