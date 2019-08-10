const express = require('express');
const Task = require('../model/task');
const route = new express.Router();


route.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

route.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.status(500).send(e);
    })
})

route.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then((task) => {
        if(!task){
            res.status(400).send();
        }
        res.send(task);
    }).catch((e) => {
        res.status(500).send(e);
    })
})

route.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body);
    const data = ['description', 'completed'];
    const isValidateOption = updates.every((update)=> data.includes(update));
    if(!isValidateOption){
        return res.send('Unable to update');
    }
    try{
        const task = await Task.findById(req.params.id);
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        //const updateinfo = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});
        if(!updateinfo){
            res.status(404).send('Task if not found');
        }
        res.send(updateinfo);
    }catch(e){
        res.status(500).send(e);
    }
})

route.delete('/tasks/:id', async(req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).send('Task can not found');
        }
        res.send('Success delete');
    }catch(e){
        res.status(500).send(e);
    }
});


module.exports = route;