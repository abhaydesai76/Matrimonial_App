const genderRouter = require('express').Router()
const Gender = require('../models/gender')

genderRouter.get('/', async(request, response, next) => {
    try {
        const genders = await Gender.find({})

        response.json(genders.map(gender => gender.toJSON()))        
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = genderRouter