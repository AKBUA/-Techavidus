const express=require('express');
const router=express.Router();
const productsController=require("../controllers/products");

router.post('/product',productsController.upload,productsController.createProducts);
router.get('/products',productsController.upload,productsController.getProducts);
router.put('/updateproduct/:id',productsController.upload,productsController.updateProducts);
router.delete('/product/:id',productsController.deleteProduct);


module.exports=router;