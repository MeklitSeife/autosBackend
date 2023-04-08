import catchAsync from "../lib/catchAsync";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";

const {Reported_post,Post,User,Organization,Health_professional,Parent} = Model;

//report post
var createPostReport = catchAsync(async (req, res, next) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
  //check if the post to be reported exists
      const reportedPost = await Post.findOne({
        where:{
           id:req.query.id
        },
      })
      if (reportedPost) {
//check if the user has already reported this post before
        const report = await Reported_post.findOne({
          where:{
            reporting_user_id:req.user.id,
            reported_post_id:req.query.id
          },
        })
        if (report){
          return res.status(403).json({
            status: "fail",
            message: "you have already reported this post. you can not report one post more than once",
          });
        }else{
          const newReport = await Reported_post.create({
            "reporting_reason": req.body.reporting_reason,
            "reporting_reason_text": req.body.reporting_reason_text,
            "reporting_user_id": req.user.id,
            "reported_post_id": req.query.id,
          })
          if (newReport) {
              reportedPost.is_reported = true;
              reportedPost.no_of_report = ++reportedPost.no_of_report;
              const reportUpdate = await reportedPost.save();
              return res.status(201).json({
                status: "success",
                message: "post report successfully created",
                payload: newReport,
              });
            }
        }
        } else {
          return next(new GlobalError("post to be reported does not exist!", 400));
        }
      } catch (err) {
        return next(err);
      }});

//view one report detail by admin or moderator
var readOneReportDetail = catchAsync(async (req, res, next) => {

  const reportRead = await Reported_post.findOne({
    where: {
      id: req.query.id,
    },
    include: {
      model: User,
      as: 'post_reporter_user', 
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
 if (reportRead) {
   res.status(200).json({
    reportRead,
   });
 } else {
   return next(new GlobalError("error!", 400));
 }
});

//read all reports given to one post
var readAllReportsOfOnePost = catchAsync(async (req, res, next) => {
  const reportRead = await Reported_post.findAll({
   where: {
    reported_post_id: req.query.id
         },
      include: {
        model: User,
        as: 'post_reporter_user', 
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
 if (reportRead) {
      res.status(200).json({
        reportRead,
   });
 } else {
   return next(new GlobalError("error!", 400));
 }
});

//read all post reports
var readAllReportedPosts = catchAsync(async (req, res, next) => {

    const reportedPost = await Post.findAll({
      where:{
        is_reported:true
      },
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
    if (reportedPost) {
         res.status(200).json({
          reportedPost,
      });
    } else {
      return next(new GlobalError("error!", 400));
    }
});

module.exports = {
    createPostReport: createPostReport,
    readOneReportDetail:readOneReportDetail,
    readAllReportsOfOnePost:readAllReportsOfOnePost,
    readAllReportedPosts:readAllReportedPosts,
};





