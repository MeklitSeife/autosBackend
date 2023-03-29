import catchAsync from "../lib/catchAsync";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";

const { Post_comment,User,Parent,Organization,Post ,Health_professional} = Model;

//create Comment
var createComment = catchAsync(async (req, res, next) => {
    
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }
    
          const newComment = await Post_comment.create({
          "comment_text": req.body.comment_text,
          "post_id": req.query.post_id,
          "commentor_id": req.user.id,
        })
    
        if (newComment) {
          return res.status(201).json({
            status: "success",
            message: "Comment successfully created",
            payload: newComment,
          });
        }
    
      } catch (err) {
        return next(err);
      }});

//view my one comment for a post
var readMyOneComment = catchAsync(async (req, res, next) => {
  const CommentRead = await Post_comment.findOne({
   where: {
       commentor_id: req.user.id,
       id: req.query.id
         }
      });
 if (CommentRead) {
      res.status(200).json({
       CommentRead,
   });
 } else {
   return next(new GlobalError("error!", 400));
 }
});

//update comment
var updateComment = catchAsync(async (req, res, next) => {
    
        try{
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }
    
      const commentToBeUpdated = await Post_comment.findOne({
        where:{
          id : req.query.id
         }
        })
        const updatedComment = await commentToBeUpdated.update(
          {
            "comment_text": req.body.comment_text,
          },
          {
            where: { commentor_id:req.user.id},
          }
        )
        if (updatedComment) {
            res.status(200).json({
              msg:"succesfully updated your Comment",
              payload:updatedComment,
            });
      } else {
            return next(
              new GlobalError("error occured when updating your Comment!", 400)
            ); }
      } catch (err) {
            return next(err);
          }
});

//delete comment
var deleteMyComment = catchAsync(async (req, res, next) => {
      try{
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }
      const deletedComment = await Post_comment.destroy(
        { 
          where: { 
            commentor_id:req.user.id,
            id: req.query.id 
          }
        })
      if (deletedComment) {
        res.status(200).send("success");
      } else {
        return next(
          new GlobalError("error occured when deleting your Comment!", 400)
        );
      }
    } catch (err) {
      return next(err);
    }
    });

//read all comments given for a specific post
var readOnePostOfUserWithComment = catchAsync(async (req, res, next) => {

  const postRead = await Post.findOne({
    
    where: {
        id:req.query.id
    },
    include:[{  model: User,
      as: 'posting_user', 
      required: true,
      attributes: {
        exclude: ['otp', 'password','reset_pass_token_key']
         }, 
        },
        {
          model: Post_comment,
          as: 'post_comment', 
        include: {
              model: User,
              as: 'commentor_user', 
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
        }}
      ]
});
  if (postRead) {
       res.status(200).json({
        postRead,
    });
  } else {
    return next(new GlobalError("error!", 400));
  }
});

module.exports = {
    createComment: createComment,
    updateComment:updateComment,
    deleteMyComment:deleteMyComment,
    readMyOneComment:readMyOneComment,
    readOnePostOfUserWithComment:readOnePostOfUserWithComment,
};





