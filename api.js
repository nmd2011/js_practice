const express = require('express');
const Joi = require('joi');
const api = express();
api.use(express.json());

const courses = [
    {id: 1, name:'woodworking'},
    {id: 2, name:'eletronics'},
    {id: 3, name:'computers'}
    ]

function courseValidation(course) {
    const schema = {
        name: Joi.string().min(3).max(10).required()
        };
    return Joi.validate(course, schema);
    }

api.get('/api/courses', (req,res) => {
    res.send(courses);
})

api.get('/api/courses/:name', (req,res) => {
    let course = courses.find(c => c.name === req.params.name);
    if (!course) res.status(404).send('Course does not exist');
    
    res.send(course);
})

api.post('/api/courses', (req,res) => {
    
    const {error} = courseValidation(req.body);

    if(error) {
         res.status(400).send(error.details[0].message);
     return;
     }
    
    const course = {
        id: courses.length + 1,
        name: (req.body.name)
    };
    courses.push(course);
    res.send(course);
})

api.put('/api/courses/:name', (req,res) => {
    
    let course = courses.find( c => c.name === req.params.name);
    if(!course) res.status(404).send("Course not found");

    const {error} = courseValidation(req.body);
    if(error) res.status(404).send(error.details[0].message);

    course.name = req.body.name
    res.send(course);

    })




api.delete('/courses/:name', (req,res) => {
    let course = courses.find(c => c.name === req.params.name);
    if (!course) res.status(404).send('Course does not exist');
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(`The following coourse has been removed ${course.name}`);    
}) 

const port = process.env.PORT || 5000;
api.listen(port, () => console.log(`Listning on port ${port}`));
