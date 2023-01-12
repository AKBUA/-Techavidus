const productModel=require('../models/products')
const multer=require('multer')
const path=require('path');



const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        console.log(file)
cb(null,Date.now()+path.extname(file.originalname))
    }
})

const fileFilter=(req,file,cb)=>{

    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype.split("/")[1] === "pdf"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}


exports.upload=multer({storage:storage,limits:{
    fileSize:1024*1000},
    fileFilter:fileFilter
    
    }).single('picture')


exports.createProducts=async(req,res)=>{

    const {name,details,quantity,price}=req.body;


    

    const products=new productModel(
        {
           
            name:name,
            details:details,
            quantity:quantity,
            price:price,
            totalPrice:quantity*price,
             picture:req.file.path,

           

        }
    )
    products.save().then((data)=>{
        res.status(200).send({data:data})
    }).catch((e)=>{
        console.log(e)
    
 res.status(403).send(e)
    })
}


exports.updateProducts=async(req,res)=>{

        const picture=req.file.path

        const {name,details,quantity,price}=req.body;

          
        await productModel.findByIdAndUpdate(req.params.id,
        {$set:{picture:picture,name:name,details:details,quantity:quantity,price:price,totalPrice:quantity*price}}
            ).then((result)=>{
                res.status(200).send({data:result,message:" {Product is updated"})
            }).catch((err)=>{
              res.status(500).send({error:err})
            }) 
    
    
}




exports.deleteProduct = async (req,res,next)=>{
    try {
      await productModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
       
        message:"Product has been deleted."});
    } catch (err) {
      next(err);
    }
  }
exports.getProducts=async(req,res)=>{
   
     const products= await productModel.find({})
     res.status(200).send({Products:products})

}

