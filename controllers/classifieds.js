const classifiedRouter = require('express').Router()
const Classified = require('../models/classified')

classifiedRouter.get('/:id', async (request, response, next) => {
    try 
    {
        const classified = await Classified.findById(request.params.id)

        if (classified) 
        {
            response.json(classified.toJSON())
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

classifiedRouter.get('/', async(request, response, next) => {
    try {
        const classifieds = await Classified.find({})

        response.json(classifieds.map(classified => classified.toJSON()))        
    }
    catch (exception) {
        next(exception)
    }
})

classifiedRouter.post('/', async (request, response, next) => {
    try 
    {
        const body = request.body    
        
        const classified = new Classified({
            category: body.category,
            description: body.description,            
            name: body.name,
            phone: body.phone,
            address: body.address,
            expectedprice: body.expectedprice
        })
    
        const savedClassified = await classified.save()
    
        response.json(savedClassified)
    }
    catch (exception) {
        next(exception)
    }
})

classifiedRouter.put('/:id', async (request, response, next) => {
    try 
    {
        const body = request.body    
        
        const classified = {
            category: body.category,
            description: body.description,            
            name: body.name,
            phone: body.phone,
            address: body.address,
            expectedprice: body.expectedprice
        }
    
        Classified.findByIdAndUpdate(request.params.id, classified, { new : true})
        .then(updatedClassified => {
            response.json(updatedClassified.toJSON())
        })
        .catch(error => next(error))  
    }
    catch (exception) {
        next(exception)
    }
})

classifiedRouter.delete('/:id', async (request, response, next) => {
    try 
    {
        await Classified.findByIdAndRemove(request.params.id)

        response.status(204).end()
        
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = classifiedRouter