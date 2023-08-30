const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
        required:true,
        type:String,
        trim:true,
        validate:{
            validator:(value)=>{
                const re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                value.match(re);
            },
            message:"enter valid email"
        }
    },password:{
        required:true,
        type:String,
        validate:{
            validator:(value)=>{
                return value.length>6;
            },
            message:'Password length too small!'
        }
    },
    type:{
        type:String,
        default:"user",
    }
})

const User=mongoose.model('User',userSchema);
module.exports=User;