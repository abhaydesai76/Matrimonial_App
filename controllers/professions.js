const professionRouter = require('express').Router()
const Profession = require('../models/profession')

professionRouter.get('/', async(request, response, next) => {
    try {
        const professions = await Profession.find({})

        response.json(professions.map(profession => profession.toJSON()))        
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = professionRouter