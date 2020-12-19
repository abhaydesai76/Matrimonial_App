const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./utils/config')

const candidateRouter = require('./controllers/candidates')
const educationRouter = require('./controllers/educations')
const professionRouter = require('./controllers/professions')
const cityRouter = require('./controllers/cities')
const countryRouter = require('./controllers/countries')
const genderRouter = require('./controllers/genders')
const marriagestatusRouter = require('./controllers/marriagestatus')
const horoscopeRouter = require('./controllers/horoscope')
const classifiedcategoryRouter = require('./controllers/classifiedcategories')
const userRouter = require('./controllers/users')
const shortlistRouter = require('./controllers/shortlists')
const classifiedRouter = require('./controllers/classifieds')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('connected to MongoDB')
})
.catch((error => {
    console.log('error while connecting MongoDB', error.message)
}))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/candidatePhotos', express.static('candidatePhotos'));

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.use('/api/candidates', candidateRouter)
app.use('/api/educations', educationRouter)
app.use('/api/professions', professionRouter)
app.use('/api/cities', cityRouter)
app.use('/api/countries', countryRouter)
app.use('/api/genders', genderRouter)
app.use('/api/marriagestatuses', marriagestatusRouter)
app.use('/api/horoscopes', horoscopeRouter)
app.use('/api/classifiedcategories', classifiedcategoryRouter)
app.use('/api/users', userRouter)
app.use('/api/shortlists', shortlistRouter)
app.use('/api/classifieds', classifiedRouter)
app.use('/api/login', loginRouter)

module.exports = app