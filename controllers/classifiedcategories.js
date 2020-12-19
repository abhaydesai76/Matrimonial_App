const classifiedcategoryRouter = require('express').Router()
const ClassifiedCategory = require('../models/classifiedcategory')

classifiedcategoryRouter.get('/', async(request, response, next) => {
    try {
        const classifiedcategories = await ClassifiedCategory.find({})

        response.json(classifiedcategories.map(classifiedcategory => classifiedcategory.toJSON()))        
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = classifiedcategoryRouter