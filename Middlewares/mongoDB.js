const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL,{
   useNewUrlParser:true,
   useUnifiedTopology:true
})
//mongoose.connect('mongodb://127.0.0.1:27017/LibraryApp')
.then(() =>{
    console.log('MongoDB connected successfully!!!')
}).catch((error) =>{
    console.log(error.message)
})
