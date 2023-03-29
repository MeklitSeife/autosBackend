import catchAsync from "../lib/catchAsync";
import { findAllMyPost } from "../helpers/index";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";
import imagebbUploader from "imgbb-uploader";

const { Post,Parent,User,Organization ,Health_professional} = Model;

//create post
var createPost = catchAsync(async (req, res, next) => {

  const options = {
    apiKey: '3e587f3c960a3473c6996fb07d2a3766',
    name: 'filename',
    base64string: req.body.post_base64
  }  
    
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }
    
    const image = await imagebbUploader(options)
          
          const newPost = await Post.create({
          "posting_user_id": req.user.id,
          "text": req.body.text,
          "post_img": image.url,
          "orginal_poster_id": req.user.id,
        })
    
        if (newPost) {
          return res.status(201).json({
            status: "success",
            message: "post successfully created",
            payload: newPost,
          });
        }
    
      } catch (err) {
        return next(err);
      }});

//read all posts of a specific User( by the user it self)
var readAllMyPosts = catchAsync(async (req, res, next) => {

 const postRead = await findAllMyPost(Post, req.user.id);
  if (postRead) {
       res.status(200).json({
        postRead,
    });
  } else {
    return next(new GlobalError("error!", 400));
  }
 });

//read specific post of a specific user( by posting user)

var readMyOnePost = catchAsync(async (req, res, next) => {
   const postRead = await Post.findOne({
    where: {
        posting_user_id: req.user.id,
        id: req.query.id
          }
       });
  if (postRead) {
       res.status(200).json({
        postRead,
    });
  } else {
    return next(new GlobalError("error!", 400));
  }
});

//update post
var updatePost = catchAsync(async (req, res, next) => {
    const options = {
        apiKey: '3e587f3c960a3473c6996fb07d2a3766',
        name: 'filename',
        base64string: req.body.post_base64
      }  
    
        try{
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }
    
     imagebbUploader(options).then(async respon => {
      const postToBeUpdated = await Post.findOne({
        where:{
          id : req.query.id
         }
        })
        const updatedpost = await postToBeUpdated.update(
          {
            "text": req.body.text,
            "post_img": respon.url
          },
          {
            where: { orginal_poster_id:req.user.id},
          }
        )
        if (updatedpost) {
            res.status(200).json({
              msg:"succesfully updated your post",
              payload:updatedpost,
            });
      } else {
            return next(
              new GlobalError("error occured when updating your post!", 400)
            ); }
        }).catch(err => {
          console.log('err', err);
        })
    
      } catch (err) {
            return next(err);
          }
});

//read all posts
var readAllPosts = catchAsync(async (req, res, next) => {

    const postRead = await Post.findAll({
      include: {
        model: User,
        as: 'posting_user', 
        required: true,
        attributes: {
          exclude: ['otp', 'password','reset_pass_token_key']
           },
            include:[{
              model: Organization ,
              as: 'organization', 
          },
          {
              model: Parent ,
              as: 'parent', 
          },
          {
            model: Health_professional ,
            as: 'health_professional', 
        }]
      }
    });
    if (postRead) {
         res.status(200).json({
          postRead,
      });

    } else {
      return next(new GlobalError("error!", 400));
    }
});

//like post
var likePost = catchAsync(async (req, res, next) => {

  const post = await Post.findOne({
    where:{
      id:req.query.id
    }
  });
  if (post) {
  post.no_of_likes =  ++post.no_of_likes;
  const likeUpdate = await post.save();
   res.status(200).json({
    status: "success",
    message: "organization profile and verification request successfully created",
    payload: likeUpdate
    });
  } else {
    return next(new GlobalError("error!", 400));
  }
});

//unlike posts
var unlikePost = catchAsync(async (req, res, next) => {

  const post = await Post.findOne({
    where:{
      id:req.query.id
    }
  });
  if (post) {
  post.no_of_likes = --post.no_of_likes;
  const likeUpdate = await post.save();
   res.status(200).json({
    status: "success",
    message: "organization profile and verification request successfully created",
    payload: likeUpdate
    });
  } else {
    return next(new GlobalError("error!", 400));
  }
});
//read all posts of a specific user
var readAllPostsOfOneUser = catchAsync(async (req, res, next) => {

    const postRead = await Post.findAll({
        where: {
            posting_user_id: req.query.id
        }
    });
    if (postRead) {
         res.status(200).json({
          postRead,
      });
    } else {
      return next(new GlobalError("error!", 400));
    }
});



  //delete specific post
var removeOnepost = catchAsync(async (req, res, next) => {
    try{
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
    const deletedpost = await Post.destroy(
      { 
        where: { 
          posting_user_id:req.user.id,
          id: req.query.id 
        }
      })
    if (deletedpost) {
      res.status(200).send("success");
    } else {
      return next(
        new GlobalError("error occured when deleting your post!", 400)
      );
    }
  } catch (err) {
    return next(err);
  }
  });

  
module.exports = {
    createPost: createPost,
    readAllMyPosts: readAllMyPosts,
    readMyOnePost:readMyOnePost,
    readAllPostsOfOneUser:readAllPostsOfOneUser,
    updatePost:updatePost,
    readAllPosts:readAllPosts,
    removeOnepost:removeOnepost,
    likePost:likePost,
    unlikePost:unlikePost,
};





