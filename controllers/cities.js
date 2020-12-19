const cityRouter = require('express').Router()
const City = require('../models/city')

cityRouter.get('/:id', async(request, response, next) => {
    try 
    {
        const city = await City.findById(request.params.id)

        if (city) 
        {
            response.json(city.toJSON())
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

cityRouter.get('/', async(request, response, next) => {
    try 
    {
        const cities = await City.find({})

        response.json(cities.map(city => city.toJSON()))        
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = cityRouter