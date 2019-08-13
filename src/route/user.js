const express = require('express');
const route = new express.Router();
const User = require('../model/user');
const auth = require('../middleware/auth');
//using async function
route.post('/users', async(req, res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        const token = user.CheckWebToken();
        res.status(201).send({user, token});
    } catch (e){
        res.status(500).send(e);
    }

});

// app.post('/users', (req, res)=>{
//     const user = new User(req.body);
//      user.save().then(() => {
//          res.status(201).send(user)
//      }).catch((e) => {
//          res.status(400).send(e)
//      })
// })

route.post('/users/login', async(req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.CheckWebToken();
        res.send({user, token});
        //res.send(user);
    }catch(e){
        res.status(400).send(e);
    }
});

route.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens. filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send();
    }catch(e){  
        res.status(500).send(e);
    }
});

route.post('/users/logoutall', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
})

route.get('/users/me', auth ,async (req, res) => {
    // const user = await User.find({});
    // try{
    //     res.send(user);
    // }catch(e) {
    //     res.status(500).send(e);
    // }
    res.send(req.user);
});

// app.get('/users', (req, res) => {
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })
// })

route.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const findid = await User.findById(_id);
        if(!findid){
            return res.status(400).send();
        }
        res.send(findid);
    } catch(e){
        res.status(500).send();
    }
    

}); 

// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id;

//     User.findById(_id).then((user) => {
//         if(!user){
//             return res.status(404).send();
//         }
//         res.send(user);
//     }).catch((e) => {
//         res.status(500).send();
//     })
// })

route.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const paramites = ['name', 'email', 'password', 'age'];
    const isValidate = updates.every((update)=> paramites.includes(update));
    if(!isValidate){
        return res.status(404).send('Update value not exiesting');
    }
    try{
        //const user = await User.findById(req.params.id);
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        // if(!user){
        //     return res.status(404).send();
        // }
        res.send(req.user);
    } catch(e){
        res.status(500).send(e);
    }
});

route.delete('/users/me', auth, async(req, res) => {
    try{
        // const userinfo = await User.findByIdAndDelete(req.user._id);
        // if(!userinfo){
        //     return res.status(404).send('Can not find user');
        // }
        await req.user.remove()
        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
});


module.exports = route;