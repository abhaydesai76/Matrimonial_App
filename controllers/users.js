const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    try 
    {
        const body = request.body
    
        if (body.password === undefined)
        {
            return response.status(400).json({ error: 'content missing' })
        }
    
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            email: body.email,
            phone: body.phone,
            candidateid: body.candidateid
        })
    
        const savedUser = await user.save()
    
        response.json(savedUser)
    }
    catch (exception) {
        next(exception)
    }
})

usersRouter.get('/:id', async (request, response, next) => {
    try 
    {
        const user = await User.findById(request.params.id)

        if (user) 
        {
            response.json(user.toJSON())
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

usersRouter.get('/', async (request, response, next) => {
    try
    {
        const users = await User.find({})
        // .find({}).populate('shortlists', { candidateid: 1, shortlistid: 1})
    
        response.json(users.map(u => u.toJSON()))
    }    
    catch (exception) {
        next(exception)
    }
})

usersRouter.put('/:id', async (request, response, next) => {
    try
    {
        const body = request.body

        const user = {
            username: body.username,
            passwordHash: body.passwordHash,
            candidateid: body.candidateid,
            name: body.name,
            phone: body.phone,
            email: body.email
        }

        User.findByIdAndUpdate(request.params.id, user, { new : true})
            .then(updatedUser => {
                response.json(updatedUser.toJSON())
            })
            .catch(error => next(error)) 

    }
    catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter