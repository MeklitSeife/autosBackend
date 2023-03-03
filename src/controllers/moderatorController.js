import catchAsync from "../lib/catchAsync";
import { findProfileById } from "../helpers/index";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";

const { Moderator } = Model;


//create moderator profile
var createModeratorProfile = catchAsync(async (req, res, next) => {
  console.log(req.body)

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const createProfile = await Moderator.create({
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
    })
    if (createProfile) {
      return res.status(201).json({
        status: "success",
        message: "moderator profile successfully created",
        payload: createProfile
      });
    }
  } catch (err) {
    return next(err);
  }
});

//read moderator profile(by profile owner moderator)
var readModeratorProfile = catchAsync(async (req, res, next) => {
  const readProfile = await findProfileById(Moderator, req.user.id);
  if (readProfile) {
    const profile = readProfile.toJSON()
    res.status(200).json({
      profile
          });
  } else {
    return next(new GlobalError("error profile does not exist! please create profile first", 400));
  }
});

//read specific Moderator profile by admin
var readModeratorProfileByAdmin = catchAsync(async (req, res, next) => {
  const readProfile = await findProfileById(Moderator, req.query.id);
  if (readProfile) {
    const profile = readProfile.toJSON()
    res.status(200).json({
      profile
          });
  } else {
    return next(new GlobalError("error profile does not exist!", 400));
  }
});

//read all moderators by admin
var readAllModeratorProfileByAdmin = catchAsync(async (req, res, next) => {
  const readProfile = await Moderator.findAll();
  if (readProfile) {
    const profile = readProfile.toJSON()
    res.status(200).json({
      profile
          });
  } else {
    return next(new GlobalError("error profile does not exist!", 400));
  }
});

//update Moderator profile
var updateModeratorProfile = catchAsync(async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

 const updateProfile = await Moderator.update(
    {
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    },
    {
      where: { user_id:req.user.id},
    }
  )
  if (updateProfile) {
    res.status(200).json({
      msg:"succesfully updated your profile",
      payload:updateProfile,
    });
  } else {
    return next(
      new GlobalError("error occured when updating your profile!", 400)
    );
  }} catch (err) {
    return next(err);
  }
});


//delete moderator profile
var removeModeratorProfile = catchAsync(async (req, res, next) => {
  const removeProfile = await Moderator.destroy(
    { 
      where: { user_id:req.query.id }
    })
  if (removeProfile) {
    res.status(200).send("successefully deleted your profile");
  } else {
    return next(
      new GlobalError("error occured when deleting your profile!", 400)
    );
  }
});
module.exports = {
  createModeratorProfile: createModeratorProfile,
  readModeratorProfile: readModeratorProfile,
  readModeratorProfileByAdmin:readModeratorProfileByAdmin,
  removeModeratorProfile:removeModeratorProfile,
    updateModeratorProfile:updateModeratorProfile,
    readAllModeratorProfileByAdmin:readAllModeratorProfileByAdmin
};
