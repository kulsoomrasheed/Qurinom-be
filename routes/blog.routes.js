const express= require('express')
const { auth } = require('../middlewares/auth.middleware')
const { BlogsModel } = require('../model/blogs.model')
const blogRouter = express.Router()
blogRouter.use(auth)

blogRouter.get("/",async(req,res)=>{
    try {
        const blogs = await BlogsModel.find();
        res.status(200).json({msg:"Success",blogs});
      } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'An error occurred while fetching blogs' });
      }
})


blogRouter.post("/",async(req,res)=>{
   const username = req.body.username;
   const userID = req.body.userID;

    const { title ,desc,createdAt} = req.body;
    try{
    const blogs= new BlogsModel({ title,username,desc,createdAt,userID });
    await blogs.save()
    res.status(200).json({msg:"A new blog has been added"})
    }catch{
        res.status(500).json({msg:"Error saving blog"})

    }
})



    blogRouter.delete("/delete/:id",async(req,res)=>{
        let ID=req.params.id
        let data =await BlogsModel.findOne({_id:ID})
        let userID_post=data.userID
        let userID_req=req.body.userID
        try {
            
                 if((userID_post==userID_req)){
                    await BlogsModel.findByIdAndDelete({
                     _id:ID
                })
                res.status(200).send(`blog with ${ID} is deleted`)
            }else{
                res.status(404).send("Not authorized")
            }
            
        } catch (error) {
            res.status(500).send(error)
        }
    })

    blogRouter.patch("/edit/:id",async(req,res)=>{
        let payload=req.body
        let ID=req.params.id
        let data =await BlogsModel.findOne({_id:ID})
        let userID_post=data.userID
        let userID_req=req.body.userID
        try {
            
                 if((userID_post==userID_req)){
                    await BlogsModel.findByIdAndUpdate({
                     _id:ID
                },payload)
                res.status(200).send(`blog with ${ID} is updated successfully`)
            }else{ 
                res.status(404).send("Not authorized")
            }
            
        } catch (error) {
            res.status(500).send(error)
        }
    })


module.exports={
    blogRouter
}

