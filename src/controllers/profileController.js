import catchAsync from "../lib/catchAsync";
import { findProfileById } from "../helpers/index";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";
import {updateParentProfile} from "./parentProfileController"

const { Health_professional ,Organization, Parent, User,Verification_request} = Model;

//read user profile
var readUserProfile = catchAsync(async (req, res, next) => {
 const userAcc = await User.findOne({
  where:{
    id:req.query.id
  }
 })
 if(userAcc){
  if(userAcc.user_type == "Organization"){
    const readProfile = await findProfileById(Organization, req.query.id);
    if (readProfile) {
      const profile = readProfile.toJSON()
      res.status(200).json({
        profile
            });
    } 
    else{
      return next(new GlobalError("error profile does not exist! please create account", 400));
    }}
    else if(userAcc.user_type == "Health_professional"){
    const myProfile = await findProfileById(Health_professional, req.query.id);
    if (myProfile) {
      const profile = myProfile.toJSON()
      res.status(200).json({
        profile
            });
          }
     else{
        return next(new GlobalError("error profile does not exist! please create account", 400));
       } 
        }
   else if(userAcc.user_type == "Parent"){
    const myProfile = await findProfileById(Parent, req.query.id);
    if (myProfile) {
      const profile = myProfile.toJSON()
      res.status(200).json({
        profile
            });
          }
          else{
            return next(new GlobalError("error profile does not exist! please create account", 400));
          }}
     }
    else{
     return next(new GlobalError("user does not exist", 400));
    }
   });

   //delete profile
var removeUserProfile = catchAsync(async (req, res, next) => {

  if(req.user.user_type == "Organization"){
    const removeProfile = await Organization.destroy(
        { 
          where: { user_id:req.user.id }
        })
    const removedUser = await User.destroy({
      where: {
         id:req.user.id
         }
    })
      if (removeProfile && removedUser) {
        res.status(200).send("successefully deleted your profile");
      } else {
        return next(
          new GlobalError("error occured when deleting your profile!", 400)
        );
      }
}
   else if(req.user.user_type == "Parent"){
    const removeProfile = await Parent.destroy(
      { 
        where: { user_id:req.user.id }
      })
  const removedUser = await User.destroy({
    where: {
       id:req.user.id
       }
  })
    if (removeProfile && removedUser) {
      res.status(200).send("successefully deleted your profile");
    } else {
      return next(
        new GlobalError("error occured when deleting your profile!", 400)
      );
    }}
  else if(req.user.user_type == "Health_professional"){
  const removeProfile = await Health_professional.destroy(
    { 
      where: { user_id:req.user.id }
    })
const removedUser = await User.destroy({
  where: {
     id:req.user.id
     }
})
  if (removeProfile && removedUser) {
    res.status(200).send("successefully deleted your profile");
  } else {
    return next(
      new GlobalError("error occured when deleting your profile!", 400)
    );
  }}
});

//update profile
var updateProfile = catchAsync(async (req, res, next) => {
  if(req.user.user_type == "Parent"){
  await updateParentProfile(req, res, next);
   }
  else if(req.user.user_type == "Health_professional"){
  }
});

  module.exports = {
    readUserProfile: readUserProfile,
    removeUserProfile:removeUserProfile,
    updateProfile:updateProfile
};