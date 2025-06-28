const mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testapp3');
const postSchema = mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId, ref:"user"},
    date:{
        type:Date,
        default:Date.now
    },
    content:String,
    title:String,
    likes:[{
        type:mongoose.Schema.ObjectId,
        ref:"user",
    }]
});

module.exports=mongoose.model('post', postSchema);