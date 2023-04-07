import catchAsync from "../lib/catchAsync";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";

const {Reported_comment,Post_comment,User,Organization,Health_professional,Parent} = Model;

//report comment
var createCommentReport = catchAsync(async (req, res, next) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {Reported_comment
      res.status(422).json({ errors: errors.array() });
      return;
    }
  //check if the comment to be reported exists
      const reportedComment = await Post_comment.findOne({
        where:{
           id:req.query.id
        },
      })
      if (reportedComment) {

//check if the user has already reported this comment before
        const report = await Reported_comment.findOne({
          where:{
            reporting_user_id:req.user.id,
            reported_comment_id:req.query.id
          },
        })
        if (report){
          return res.status(403).json({
            status: "fail",
            message: "you have already reported this comment. you can not report one comment more than once",
          });
        }else{
          const newReport = await Reported_comment.create({
            "reporting_reason": req.body.reporting_reason,
            "reporting_reason_text": req.body.reporting_reason_text,
            "reporting_user_id": req.user.id,
            "reported_comment_id": req.query.id,
          })
          if (newReport) {
            reportedComment.is_reported = true;
            reportedComment.no_of_report = ++reportedComment.no_of_report;
              const reportUpdate = await reportedComment.save();
              return res.status(201).json({
                status: "success",
                message: "comment report successfully created",
                payload: newReport,
              });
            }
        }
        } else {
          return next(new GlobalError("comment to be reported does not exist!", 400));
        }
      } catch (err) {
        return next(err);
      }});

//view one report detail by admin or moderator
var readOneReportDetail = catchAsync(async (req, res, next) => {

  const reportRead = await Reported_comment.findOne({
    where: {
      id: req.query.id,
    },
    include: {
      model: User,
      as: 'comment_reporter_user', 
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

//read all reports given to one comment
var readAllReportsOfOneComment = catchAsync(async (req, res, next) => {
  const reportRead = await Reported_comment.findAll({
   where: {
    reported_comment_id: req.query.id
         },
      include: {
        model: User,
        as: 'comment_reporter_user', 
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

//read all comment reports
var readAllReportedComments = catchAsync(async (req, res, next) => {

    const reportedComment = await Post_comment.findAll({
      where:{
        is_reported:true
      },
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
      }
    });
    if (reportedComment) {
         res.status(200).json({
          reportedComment,
      });
    } else {
      return next(new GlobalError("error!", 400));
    }
});

module.exports = {
    createCommentReport: createCommentReport,
    readOneReportDetail:readOneReportDetail,
    readAllReportsOfOneComment:readAllReportsOfOneComment,
    readAllReportedComments:readAllReportedComments,
};





