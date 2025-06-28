const mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testapp3');
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password:String,
    age:Number,
    posts:[{
        type:mongoose.Schema.ObjectId,ref:"post"
    }],
    profilestring:{
        type:String,
        default:"default.jpg"
    }  

});

module.exports=mongoose.model('user', userSchema);