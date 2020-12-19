const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3
    },
    gender: {
        type: String,
        required: true        
    },
    photo: {
        type: String,
        // required: true,        
        // data: Buffer        
    },
    marriagestatus: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true,
        minlength: 10
    },
    birthdate: {
        type: Date,
        required: true,
        minlength: 10
    },
    birthplace: {
        type: String,
        required: true,
        minlength: 4
    },
    birthtime: {
        type: String,
        required: true,
        minlength: 4
    },
    horoscope: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true,
        minlength: 5
    },
    mothername: {
        type: String,
        required: true,
        minlength: 4
    },
    sibling1: {
        type: String,        
    },
    relation1: {
        type: String,
    },
    sibling2: {
        type: String,        
    },
    relation2: {
        type: String,
    },
    sibling3: {
        type: String,        
    },
    relation3: {
        type: String,
    },
    address: {
        type: String,
        required: true,
        minlength: 10
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    native: {
        type: String,
        required: true,
        minlength: 4
    },
    mosal: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        minlength: 4
    },
    relative1: {
        type: String,
        required: true,
        minlength: 4
    },
    contact1: {
        type: String,
        required: true,
        minlength: 4
    },
    relative2: {
        type: String,
        required: true,
        minlength: 4
    },
    contact2: {
        type: String,
        required: true,
        minlength: 4
    },
    relative3: {
        type: String,
        required: true,
        minlength: 4
    },
    contact3: {
        type: String,
        required: true,
        minlength: 4
    },
    relative4: {
        type: String,        
    },
    contact4: {
        type: String,      
    },
    relative5: {
        type: String,        
    },
    contact5: {
        type: String,      
    },
    relative6: {
        type: String,        
    },
    contact6: {
        type: String,      
    },
    remarks: {
        type: String,     
        maxlength: 100 
    },
},
{
    collection: 'candidates'
})

candidateSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Candidate = mongoose.model('Candidate', candidateSchema)

module.exports = Candidate