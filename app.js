const express = require('express')
const app = express()
const mongoose=require('mongoose')

const productsRoutes=require('./routes/products')

app.use(express.json());

app.use(productsRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})




mongoose.connect('mongodb://localhost:27017/techvidus',{
  useNewUrlParser: true,
   useUnifiedTopology: true
},()=>{
  console.log('db connected')
})
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})