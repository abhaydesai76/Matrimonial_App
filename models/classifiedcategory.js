const mongoose = require('mongoose')
const { stringify } = require('uuid')
const uniqueValidator = require('mongoose-unique-validator')

const classifiedcategorySchema = new mongoose.Schema({
    value: {
        type: String,       
    },
    label: {
        type: String,       
    },
},
{
    collection: 'classifiedcategories'
})

classifiedcategorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

classifiedcategorySchema.plugin(uniqueValidator)

const ClassifiedCategories = mongoose.model('ClassifiedCategories', classifiedcategorySchema)

module.exports = ClassifiedCategories