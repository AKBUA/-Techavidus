
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productsSchema= new Schema({
name:{
        type:String,
        required:true
    },
    picture:{
        type:String,

         
    },
    price:{

        type:Number,
        required:true
    },
details:{
        type:String,
        
        
    },
    
    quantity:{

        type:Number,
        required:true
    },
    totalPrice:{
        type:Number
    }

},
{ timestamps: true }

)

module.exports=mongoose.model('products',productsSchema)