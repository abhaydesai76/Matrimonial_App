const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =  
  `mongodb+srv://jayshukleshwar:jayshukleshwar@jskmatrimonial.gb3rw.mongodb.net/JSKMatrimonial?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const candidateSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3
    },
    gender: {
        type: String,
        required: true,
        minlength: 4
    },
    photo: {
        type: String,
        // required: true,        
        data: Buffer
    },
    marriagestatus: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true
    },
    birthdate: {
        type: Date,
        required: true,
        minlength: 10
    },
    birthplace: {
        type: String,
        required: true,
        minlength: 5
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
        required: true,
        minlength: 2
    },
    profession: {
        type: String,
        required: true,
        minlength: 3
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
        required: true,
        minlength: 3
    },
    country: {
        type: String,
        required: true,
        minlength: 3
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
    },
})

const Candidate = mongoose.model('Candidate', candidateSchema)

const candidate = new Candidate({
    fullname: 'Agriculture 1',
    gender: 'Male',
    photo: 'Test Photo',
    marriagestatus: 'Unmarried',
    mobileno: '0123456789',
    birthdate: '1995-01-01',
    birthplace: 'Test Place',
    birthtime: 'Test Time',
    horoscope: 'Clear',
    height: 158,
    weight: 58,
    education: 'BSC',
    profession: 'OTH',
    fathername: 'Test FatherName',
    mothername: 'Test MotherName',
    sibling1: 'Test Sibling 1',
    relation1: 'Test Relation 1',
    sibling2: 'Test Sibling 2',
    relation2: 'Test Relation 2',
    sibling3: 'Test Sibling 3',
    relation3: 'Test Relation 3',
    address: 'Test Address',
    city: 'SRT',
    country: 'IND',
    native: 'Test Native',
    mosal: 'Test Mosal',
    email: 'Test Email',
    relative1: 'Test Relative 1',
    contact1: 'Test Contact 1',
    relative2: 'Test Relative 2',
    contact2: 'Test Contact 2',
    relative3: 'Test Relative 3',
    contact3: 'Test Contact 3',
    relative4: 'Test Relative 4',
    contact4: 'Test Contact 4',
    relative5: 'Test Relative 5',
    contact5: 'Test Contact 5',
    relative6: 'Test Relative 6',
    contact6: 'Test Contact 6',
    remarks: 'Test Remarks',
})

candidate.save().then(result => {
  console.log('candidate saved!')
  mongoose.connection.close()
})