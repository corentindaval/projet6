const { json } = require('body-parser');
const sauce=require('../models/sauce');
const fs=require('fs');


exports.createsauce=(req, res, next) => {/*definition du contenu de stuff(format json) */
    const stuff = [
      {
        id:'oeihfzeomoihi',
    userId:"id1",
    name:"spicypepper",
    manufacturer:"peper&co",
    description:"none",
    mainPepper:"pepper1",
    imageUrl:"none",
    heat:5,
    likes:20,
    dislikes:10,
    usersLikes:[],
    usersDisliked:[],
      },
    
    ];
    res.status(200).json(stuff);
    };



    exports.postsauce=(req, res, next) => {/*envoie d'une requete post */
    console.log(req.body);
    delete req.body.id;
    const Sauce=new sauce({
      ...req.body,
      imageUrl:'${req.protocol}://${req.get("host")}/images/${req.file.filename}'
    });
    Sauce.save()
     .then(()=>res.status(201).json({message:'objet enregistrer'}))
     .catch(error=>res.status(400).json({error}));
    };



    exports.getsauces=(req,res,next)=>{/*recup des sauces */
        sauce.find()
        .then(sauces=>res.status(200).json(sauces))
        .catch(error=>res.status(400).json({error}));
        };
        
        exports.getsauce=(req,res,next)=>{/*parametre get */
        sauce.findOne({id:req.params.id})
        .then(sauce=>res.status(200).json(sauce))
        .catch(error=>res.status(404).json({error}));
        };
        
        exports.putsauce=(req,res,next)=>{/*parametre put */
         const sauceObject=req.file?{
           ...JSON.parse(req.body.sauce),
           imageUrl:'${req.protocol}://${req.get("host")}/images/${req.file.filename}'
         }:{...req.body};
        sauce.updateOne({id:req.params.id},{...req.body,id:req.params.id})
        .then(()=>res.status(200).json({message:'objet modifier'}))
        .catch(error=>res.status(400).json({error}));
        };
        
        exports.deletesauce=(req,res,next)=>{/*parametre delete */
        sauce.findOne({_id:req.params.id})
        .then(sauce=>{
          const filename=sauce.imageUrl.split('/images/')[1];
          fs.unlink('images/${filename',()=>{
            sauce.deleteOne({id:req.params.id})
            .then(()=>res.status(200).json({message:'objet suprimer'}))
            .catch(error=>res.status(400).json({error}));
          });
        })
         .catch(error=>res.status(500).json({error}));
        };
        



