const horoscopeRouter = require('express').Router()
const Horoscope = require('../models/horoscope')

horoscopeRouter.get('/', async(request, response, next) => {
    try {
        const horoscopes = await Horoscope.find({})

        response.json(horoscopes.map(horoscope => horoscope.toJSON()))        
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = horoscopeRouter