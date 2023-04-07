import catchAsync from "../lib/catchAsync";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";

const {Reported_user,User,Organization,Health_professional,Parent} = Model;

//report user
var createUserReport = catchAsync(async (req, res, next) => {
    
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
  //check if the user to be reported exists
      const reportedUser = await User.findOne({
        where:{
           id:req.query.id
        },
        attributes: {
          exclude: ['otp', 'password','reset_pass_token_key']
           },
      })
      if (reportedUser) {

//check if the user has already reported this user before
        const report = await Reported_user.findOne({
          where:{
            reporting_user_id:req.user.id,
             reported_user_id:req.query.id
          },
        })
        if (report){
          return res.status(403).json({
            status: "fail",
            message: "you have already reported this user. you can not report one user more than once",
          });
        }else{
          const newReport = await Reported_user.create({
            "reporting_reason": req.body.reporting_reason,
            "reporting_reason_text": req.body.reporting_reason_text,
            "reporting_user_id": req.user.id,
            "reported_user_id": req.query.id,
          })
          if (newReport) {
              reportedUser.is_reported = true;
              reportedUser.no_of_report = ++reportedUser.no_of_report;
              const reportUpdate = await reportedUser.save();
              return res.status(201).json({
                status: "success",
                message: "user report successfully created",
                payload: newReport,
              });
            }
        }
        } else {
          return next(new GlobalError("user to be reported does not exist!", 400));
        }
      } catch (err) {
        return next(err);
      }});

//view one report detail by admin or moderator
var readOneReportDetail = catchAsync(async (req, res, next) => {

  const reportRead = await Reported_user.findOne({
    where: {
      reporting_user_id: req.query.reporting_user_id,
      reported_user_id:req.query.reported_user_id,
    },
  });

 if (reportRead) {
     
  const reporterUserProfile = await User.findOne({
    where:{
      id:req.query.reporting_user_id
    }, 
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
     });
   
   const reportedUserProfile = await User.findOne({
    where:{
      id:req.query.reported_user_id
    }, 
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
     });
   
   const payload = {reportRead,reporterUserProfile,reportedUserProfile}

   res.status(200).json({
        payload,
   });
 } else {
   return next(new GlobalError("error!", 400));
 }
});

//read all reports given to one user
var readAllReportsOfOneUser = catchAsync(async (req, res, next) => {
  const reportRead = await Reported_user.findAll({
   where: {
    reported_user_id: req.query.id
         },
      include: {
        model: User,
        as: 'reported_user', 
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

//read all user reports
var readAllReportedUsers = catchAsync(async (req, res, next) => {

    const reportedUser = await User.findAll({
      where:{
        is_reported:true
      }, 
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
    });
    if (reportedUser) {
         res.status(200).json({
          reportedUser,
      });
    } else {
      return next(new GlobalError("error!", 400));
    }
});

module.exports = {
    createUserReport: createUserReport,
    readOneReportDetail:readOneReportDetail,
    readAllReportsOfOneUser:readAllReportsOfOneUser,
    readAllReportedUsers:readAllReportedUsers,
};





