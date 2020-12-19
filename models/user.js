const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },    
    passwordHash: {
        type: String,
        required: true,
        minlength: 3
    },
    candidateid: {
      type: String
    },
    name: String,
    phone: {
      type: Number,       
    }  ,
    email: {
      type: String,
      required: true,
      minlength: 10
    }    
},
{
    collection: 'users'
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User