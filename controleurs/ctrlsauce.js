const { json } = require('body-parser');
const sauce=require('../models/sauce');
const like=require('../models/like')
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
    const saucedata=JSON.parse(req.body.sauce);
    delete saucedata._id;
    const Sauce=new sauce({
      ...saucedata,
      imageUrl:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      likes:0,
      dislikes:0
    });
    console.log(Sauce);
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
        sauce.findOne({_id:req.params.id})
        .then(sauce=>res.status(200).json(sauce))
        .catch(error=>res.status(404).json({error}));
        };
        
        exports.putsauce=(req,res,next)=>{/*parametre put (modif)*/
         const sauceObject=req.file?{
           ...JSON.parse(req.body.sauce),
             imageUrl:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
         }:{...req.body};
        sauce.updateOne({_id:req.params.id},{...sauceObject,_id:req.params.id})
        .then(()=>res.status(200).json({message:'objet modifier'}),
        )
        .catch(error=>res.status(400).json({error}));
        };
        
        exports.deletesauce=(req,res,next)=>{/*parametre delete */
        sauce.findOne({_id:req.params.id})
        .then(sauce=>{
          const filename=sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`,()=>{
            sauce.deleteOne({id:req.params.id})
            .then(()=>res.status(200).json({message:'objet suprimer'}))
            .catch(error=>res.status(400).json({error}));
          });
        })
         .catch(error=>res.status(500).json({error}));
        };


       exports.like=(req,res,next)=>{/*req contient userid et like like=1pour likes et like=-1pour dislike */
       sauce.findOne({_id:req.params.id})
       .then(Sauce=>{console.log(Sauce.usersLiked);
if(Sauce.usersLiked.includes(req.body.userId)){
  if(req.body.like===1){
  sauce.updateOne({_id:Sauce._id},{$pull:{usersLiked:req.body.userId},$inc:{likes:-1}})
 .then(()=>res.status(200).json({message:"like"}))
 .catch(error=>res.status(400).json({error}));
  }
  if(req.body.like===-1){
    sauce.updateOne({_id:Sauce._id},{$push:{usersDisliked:req.body.userId},$pull:{usersLiked:req.body.userId},$inc:{dislikes:1},$inc:{likes:-1}})
 .then(()=>res.status(200).json({message:"dislike"}))
 .catch(error=>res.status(400).json({error}));
  }
  
}
if(Sauce.usersDisliked.includes(req.body.userId)){
  if(req.body.like===1){
    sauce.updateOne({_id:Sauce._id},{$push:{usersLiked:req.body.userId},$pull:{usersDisliked:req.body.userId},$inc:{likes:1},$inc:{dislikes:-1}})
 .then(()=>res.status(200).json({message:"like"}))
 .catch(error=>res.status(400).json({error}));
  }
  if(req.body.like===-1){
    sauce.updateOne({_id:Sauce._id},{$pull:{usersDisliked:req.body.userId},$inc:{dislikes:-1}})
 .then(()=>res.status(200).json({message:"dislike"}))
 .catch(error=>res.status(400).json({error}));
  }
  
}
      })
      .then(()=>{
        if(req.body.like===1){
          sauce.updateOne({_id:Sauce._id},{$push:{usersLiked:req.body.userId},$inc:{likes:1}})
       .then(()=>res.status(200).json({message:"like"}))
       .catch(error=>res.status(400).json({error}));
        }
        if(req.body.like===-1){
          sauce.updateOne({_id:Sauce._id},{$push:{usersDisliked:req.body.userId},$inc:{dislikes:1}})
       .then(()=>res.status(200).json({message:"dislike"}))
       .catch(error=>res.status(400).json({error}));
        }
      })
       .catch(error=>res.status(400).json({error}));
       
     /* var usersLikes=req.body.usersLikes;
      var like=req.body.likes;
      var dislike=req.body.dislikes;

       if(req.body.like=1){
         console.log(req.body.like);
         if(usersLikes=""){
          usersLikes=req.body.userId;
         }else{
          usersLikes+=req.body.userId;
         }
       console.log(usersLikes);
       if(like=""){
         like=1;
       }else{
        like++;
       }
       console.log(like);
       }else{
         if(req.body.like=-1){
           if(usersDisliked=""){
            usersDisliked=req.body.userId;
           }else{
            usersDisliked+=req.body.userId;
           }
          console.log(usersDisliked);
          if(dislike=""){
            dislike=1;
          }else{
            dislike+=1;
          }
         };
       };
       sauce.updateOne({id:req.params.id},{...req.body,id:req.params.id})
       .then(()=>res.status(200).json({message:'objet modifier'}))
       .catch(error=>res.status(400).json({error}));*/
       };






        exports.addlike=(req,res,next)=>{
          const sauceObject=req.file?{
            ...JSON.parse(req.body.sauce),
            likes:'${req.likes}+=1',
            usersLikes:'${req.usersLikes}.add($user.email)'
          }:{...req.body};
         sauce.updateOne({id:req.params.id},{...req.body,id:req.params.id})
         .then(()=>res.status(200).json({message:'objet modifier'}))
         .catch(error=>res.status(400).json({error}));
        };

        exports.adddislike=(req,res,next)=>{
          const sauceObject=req.file?{
            ...JSON.parse(req.body.sauce),
            dislikes:'${req.dislikes}+=1',
            usersDisliked:'${req.usersDislikes}.add($user.email)'
          }:{...req.body};
         sauce.updateOne({id:req.params.id},{...req.body,id:req.params.id})
         .then(()=>res.status(200).json({message:'objet modifier'}))
         .catch(error=>res.status(400).json({error}));
        };
      
        



