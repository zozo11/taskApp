const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique:true,
            trim: true,
            lowercase:true,
            validator(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid')
                }
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value){
                if (value < 0){
                    throw new Error('Age must be a postive value')
                }
            }
        },
        password: {
            type: String,
            require: true,
            trim: true,
            minlength:7,
            validate(value){
                if(value.toLowerCase().includes('password')){
                    throw new Error('Password can not include "password"')
                }
            }
        }
    }
);

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new  Error('Password not much');
    }
    return user;
}


//Encryp password in middleware schema
userSchema.pre('save', async function(next){
    const user = this
    //encryp password
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
   
    next();
})


//User model
const User = mongoose.model('Users', userSchema);


/*const me = new User({
    name: ' Zoe ',
    email: 'ZOE@email.com',
    age: 18,
    password: 'zoe123456'
})

me.save().then(()=>{console.log(me)}).catch((error) => {console.log('Error', error)})*/

module.exports = User;