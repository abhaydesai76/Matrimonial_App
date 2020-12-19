const shortlistRouter = require('express').Router()
const ShortList = require('../models/shortlist')

shortlistRouter.get('/:id', async (request, response, next) => {
    try {                
        const shortlistcandidates = await ShortList.find({candidateid: request.params.id})
        
        if (shortlistcandidates) 
        {   
            response.json(shortlistcandidates.map(shortlistcandidate => shortlistcandidate.toJSON())) 
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

shortlistRouter.get('/', async (request, response, next) => {
    try {
        const shortlistcandidates = await ShortList.find({})

        response.json(shortlistcandidates.map(shortlistcandidate => shortlistcandidate.toJSON()))        
    }
    catch (exception) {
        next(exception)
    }
})

shortlistRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body        

        const shortlist = new ShortList({
            candidateid: body.loggedinCandidateID,
            shortlistid: body.selectedCandidateID,
            remarks: body.remarks            
        })
       
        const savedShortlist = await shortlist.save()

        response.json(savedShortlist.toJSON())

    }
    catch (exception) {
        next(exception)
    }
})

shortlistRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body        

        const shortlist = {
            candidateid: body.loggedinCandidateID,
            shortlistid: body.selectedCandidateID,
            remarks: body.remarks            
        }
       
        ShortList.findByIdAndUpdate(request.params.id, shortlist, { new : true})
        .then(updatedShortlist => {
            response.json(updatedShortlist.toJSON())
        })
        .catch(error => next(error))

    }
    catch (exception) {
        next(exception)
    }
})

shortlistRouter.delete('/:id', async (request, response, next) => {

    await ShortList.findByIdAndRemove(request.params.id)

    response.status(204).end()
})

module.exports = shortlistRouter