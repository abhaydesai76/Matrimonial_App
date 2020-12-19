const educationRouter = require('express').Router()
const Education = require('../models/education')

educationRouter.get('/', async(request, response, next) => {
    try {
        let educations = await Education.find({})

        response.json(educations.map(education => education.toJSON()))     
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = educationRouter