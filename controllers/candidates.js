const candidateRouter = require('express').Router()
const Candidate = require('../models/candidate')
const User = require('../models/user')

let express = require('express'),
multer = require('multer'),
path = require('path')

const DIR = './candidatePhotos/';

let candidateID = null

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },

    filename: (req, file, cb) => {
        if (candidateID === null)
        {
            candidateID = generateId()
        }

        const fileName = candidateID + '-' + file.originalname.split(' ').join('-');
        
        // const fileName = candidateFullName + '-' + file.originalname.split(' ').join('-');
        // const fileName = candidateFullName + '-' + file.originalname.toLowerCase().split(' ').join('-');        
        
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
    }
})

candidateRouter.post('/savePhoto', upload.single('photo'), async (request, response, next) => {
    try 
    {
        // const photo = request.photo
        // response.send(photo)
    }
    catch (exception) {
        next(exception)
    }
})

candidateRouter.get('/:id', async (request, response, next) => {
    try
    {
        let values = []
        let candidates = []
        
        values = request.params.id.split(',')               
        
        if (request.params.id === values[0])
        {   
            const candidate = await Candidate.findById(request.params.id)
            // const candidate = await Candidate.find({userid: request.params.id})            
            
            if (candidate) 
            {                
                // response.json(candidate[0].toJSON())
                response.json(candidate.toJSON())                
            } 
            else 
            {
                response.status(404).end()
            }
        }
        else 
        {            
            candidates = await Candidate.find({})        
    
            // if (values[0] === "ALL" & values[1] === "ALL" & values[2] === "ALL" & values[3] === "ALL" & values[4] === "ALL")
            // {
            //     let candidates = await Candidate.find({})
            // }
    
            if (values[0] !== "ALL") // filter records as per selected education
            {
                candidates = candidates.filter(candidate => candidate.education === values[0])            
            }
    
            if (values[1] !== "ALL") // filter records as per selected profession
            {
                candidates = candidates.filter(candidate => candidate.profession === values[1])            
            }
    
            if (values[2] !== "ALL") // filter records as per selected city
            {
                candidates = candidates.filter(candidate => candidate.city === values[2])            
            }
    
            if (values[3] !== "ALL") // filter records as per selected country
            {
                candidates = candidates.filter(candidate => candidate.country === values[3])            
            }
    
            if (values[4] !== "ALL") // filter records as per selected gender
            {
                candidates = candidates.filter(candidate => candidate.gender === values[4])            
            }        
            
            if (values[5] !== "ALL") // filter records as per selected birthyear
            {
                candidates = candidates.filter(candidate => parseInt(candidate.birthdate.getFullYear()) === parseInt(values[5]))            
            }        
            
            // const candidates = await Candidate.find({$or:[{education: request.params.education},
            //     {profession: request.params.profession},
            //     {city: request.params.city},
            //     {country: request.params.country},
            //     {gender: request.params.gender},
            //     {birthyear: request.params.birthyear}]})
            
            response.json(candidates.map(candidate => candidate.toJSON())) 
        }
    }
    catch (exception) {
        next(exception)
    }
})

candidateRouter.get('/', async(request, response, next) => {
    try 
    {
        const candidates = await Candidate.find({})
        
        response.json(candidates.map(candidate => candidate.toJSON()))        
    }
    catch (exception) {
        next(exception)
    }
})

candidateRouter.post('/', async (request, response, next) => {
    try 
    {       
        const body = request.body        
        
        if (candidateID === null)
        {
            candidateID = generateId()
        }

        const loginID = body.loginID
        console.log('value of loginID : ', loginID)

        const candidate = new Candidate({
            fullname: body.fullname,         
            gender: body.gender,
            photo: request.protocol + '://' + request.get('host') + '/candidatePhotos/' + candidateID + '-' + body.profilePhoto,        
            marriagestatus: body.marriagestatus,
            mobileno: body.mobileno,
            birthdate: body.birthdate,
            birthplace: body.birthplace,
            birthtime: body.birthtime,
            horoscope: body.horoscope,
            height: body.height,
            weight: body.weight,
            education: body.education,
            profession: body.profession,
            fathername: body.fathername,
            mothername: body.mothername,
            sibling1: body.sibling1,
            relation1: body.relation1,
            sibling2: body.sibling2,
            relation2: body.relation2,
            sibling3: body.sibling3,
            relation3: body.relation3,
            address: body.address,
            city: body.city,
            country: body.country,
            native: body.native,
            mosal: body.mosal,
            email: body.email,
            relative1: body.relative1,
            contact1: body.contact1,
            relative2: body.relative1,
            contact2: body.contact1,
            relative3: body.relative1,
            contact3: body.contact1,
            relative4: body.relative1,
            contact4: body.contact1,
            relative5: body.relative1,
            contact5: body.contact1,
            relative6: body.relative1,
            contact6: body.contact1,
            remarks: body.remarks,
        })

        const savedCandidate = await candidate.save()

        // Once a new candidate is saved, we need to update CandidateID to "Users" table.
        const newCandidateID = savedCandidate.id
        console.log('value of newCandidateID : ', newCandidateID)

        const user = {
            candidateid: newCandidateID
        }
        
        User.findByIdAndUpdate(loginID, user, { new : true})
        .then(console.log('record updated'))        
        .catch(error => next(error)) 

        response.json(savedCandidate.toJSON())
    }
    catch (exception) {
        next(exception)
    }
})

candidateRouter.put('/:id', async (request, response, next) => {
    try 
    {
        const body = request.body
        
        if (candidateID === null)
        {
            candidateID = generateId()
        }
        
        const candidate = {
            fullname: body.fullname,
            gender: body.gender,
            photo: request.protocol + '://' + request.get('host') + '/candidatePhotos/' + candidateID + '-' + body.profilePhoto,        
            marriagestatus: body.marriagestatus,
            mobileno: body.mobileno,
            birthdate: body.birthdate,
            birthplace: body.birthplace,
            birthtime: body.birthtime,
            horoscope: body.horoscope,
            height: body.height,
            weight: body.weight,
            education: body.education,
            profession: body.profession,
            fathername: body.fathername,
            mothername: body.mothername,
            sibling1: body.sibling1,
            relation1: body.relation1,
            sibling2: body.sibling2,
            relation2: body.relation2,
            sibling3: body.sibling3,
            relation3: body.relation3,
            address: body.address,
            city: body.city,
            country: body.country,
            native: body.native,
            mosal: body.mosal,
            email: body.email,
            relative1: body.relative1,
            contact1: body.contact1,
            relative2: body.relative1,
            contact2: body.contact1,
            relative3: body.relative1,
            contact3: body.contact1,
            relative4: body.relative1,
            contact4: body.contact1,
            relative5: body.relative1,
            contact5: body.contact1,
            relative6: body.relative1,
            contact6: body.contact1,
            remarks: body.remarks,
        }

        Candidate.findByIdAndUpdate(request.params.id, candidate, { new : true})
            .then(updatedCandidate => {
                response.json(updatedCandidate.toJSON())
            })
            .catch(error => next(error))        
    }
    catch (exception) {
        next(exception)
    }
})

candidateRouter.delete(':/id', async (request, response, next) => {
    try 
    {
        const candidateToBeDeleted = request.params.id

        const candidate = await Candidate.findById(candidateToBeDeleted)

        if (!candidate)
        {
            console.log('the candidate you are trying to remove is already deleted')      
            return response.status(401).json({ error: 'the candidate you are trying to remove is already deleted'}).end()
        }

        await Candidate.findByIdAndRemove(candidateToBeDeleted)

        response.status(204).end()
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = candidateRouter