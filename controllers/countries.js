const countryRouter = require('express').Router()
const Country = require('../models/country')

countryRouter.get('/:id', async(request, response, next) => {
    try 
    {
        const country = await Country.findById(request.params.id)

        if (country) 
        {
            response.json(country.toJSON())
        }
        else
        {
            response.status(404).end()
        }
    }
    catch (exception) {
        next(exception)
    }
})

countryRouter.get('/', async(request, response, next) => {
    try {
        const countries = await Country.find({})

        response.json(countries.map(country => country.toJSON()))        
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = countryRouter