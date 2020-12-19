const marriagestatusRouter = require('express').Router()
const MarriageStatus = require('../models/marriagestatus')

marriagestatusRouter.get('/', async(request, response, next) => {
    try {
        const marriagestatuses = await MarriageStatus.find({})

        response.json(marriagestatuses.map(marriagestatus => marriagestatus.toJSON()))        
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = marriagestatusRouter