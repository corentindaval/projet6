const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const routesauce=require('./routes/routesauce');
const routeuser=require('./routes/routeuser');
const app=express();
const path=require('path');

mongoose.connect('mongodb+srv://admin:Acces001@cluster0.zo9om.mongodb.net/piment?retryWrites=true&w=majority',{
useNewUrlParser:true,
useUnifiedTopology:true
})
.then(()=>console.log('connexion a mongodb reussi'))
.catch(()=>console.log('connexion a mongodb echoué'));

app.use((req, res, next) => {/*autorisation contact multi-port */
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());
 
  app.use('/images',express.static(path.join(__dirname,'images')));

/*partie sauce */
app.use('/api/sauces',routesauce);

/*partie user */
app.use('/api/auth',routeuser);

/*
app.use((req,res)=>{
  res.json({message:'test'});
  console.log('test');
});
*/
module.exports=app;