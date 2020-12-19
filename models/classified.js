const mongoose = require('mongoose')
const { stringify } = require('uuid')
const uniqueValidator = require('mongoose-unique-validator')

const classifiedSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String
    },
    photo: {
        type: String
    },
    expectedprice: {
        type: Number
    }
},
{
    collection: 'classifieds'
})

classifiedSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

classifiedSchema.plugin(uniqueValidator)

const Classifieds = mongoose.model('Classified', classifiedSchema)

module.exports = Classifieds