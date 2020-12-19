const mongoose = require('mongoose')

const shortlistSchema = new mongoose.Schema({
    candidateid: {
        type: String,
        required: true,        
    },
    shortlistid: {
        type: String
    },
    remarks: {
        type: String
    }
},
{
    collection: 'shortlists'
})

shortlistSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Shortlist', shortlistSchema)