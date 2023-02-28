import catchAsync from "../lib/catchAsync";
import { findProfileById } from "../helpers/index";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";

const { Health_professional } = Model;

//create HealthProfessional profile
var createHealthProfessionalProfile = catchAsync(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
     }
    const healthProfessionalProfile = await findProfileById(Health_professional,req.user.id);
    if (healthProfessionalProfile) {
      return next(new GlobalError("Health Professional profile already exist", 401));
    }

    const createProfile = await Health_professional.create({
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "gender": req.body.gender,
      "working_place": req.body.working_place,
      "experience": req.body.experience,
      "bio": req.body.bio,
      "profile_pic": [req.body.profile_pic],
      "lisence": [req.body.lisence],
      "user_id":req.user.id
    })
    if (createProfile) {
      return res.status(201).json({
        status: "success",
        message: "Health professional profile successfully created",
        payload: createProfile
      });
    }
  } catch (err) {
    return next(err);
  }
});

//read HealthProfessional profile(by profile owner HealthProfessional)
var readHealthProfessionalProfile = catchAsync(async (req, res, next) => {
  const readProfile = await findProfileById(Health_professional, req.user.id);
  if (readProfile) {
    const profile = readProfile.toJSON()
    res.status(200).json({
      profile
          });
  } else {
    return next(new GlobalError("error profile does not exist! please create account", 400));
  }
});

//read specific HealthProfessional profile(by other users)
var readHealthProfessionalProfileByOthers = catchAsync(async (req, res, next) => {
    const readProfile = await findProfileById(Health_professional, req.query.id);
    if (readProfile) {
      const profile = readProfile.toJSON()
      res.status(200).json({
        profile
            });
    } else {
      return next(new GlobalError("error profile does not exist!", 400));
    }
  });

//update HealthProfessional profile
var updateHealthProfessionalProfile = catchAsync(async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

 const updateProfile = await Health_professional.update(
    {
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "gender": req.body.gender,
      "working_place": req.body.working_place,
      "experience": req.body.experience,
      "bio": req.body.bio,
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

//resend lisence
var updateHealthProfessionalLisence = catchAsync(async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

 const updateLisence = await Health_professional.update(
    {
      "lisence": [req.body.lisence],
    },
    {
      where: { user_id:req.user.id},
    }
  )
  if (updateLisence) {
    res.status(200).json({
      msg:"succesfully updated your lisence",
      payload:updateLisence,
    });
  } else {
    return next(
      new GlobalError("error occured when updating your lisence!", 400)
    );
  }} catch (err) {
    return next(err);
  }
});
//update HealthProfessional profile picture
var updateHealthProfessionalProfilePic = catchAsync(async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
const profile = await findProfileById(Health_professional, req.user.id);
var picture = profile.profile_pic
picture.push(req.body.profile_pic)

 const updateProfilePic = await Health_professional.update(
    {
      "profile_pic":picture,
      },
    {
      where: { user_id:req.user.id},
    }
  )
  if (updateProfilePic) { 
    res.status(200).json({
      msg:"succesfully updated your profile picture",
      payload:updateProfilePic,
    });
  } else {
    return next(
      new GlobalError("error occured when updating your profile picture!", 400)
    );
  }} catch (err) {
    return next(err);
  }
});
//delete HealthProfessional profile
var removeHealthProfessionalProfile = catchAsync(async (req, res, next) => {
  const removeProfile = await Health_professional.destroy(
    { 
      where: { user_id:req.user.id }
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
    createHealthProfessionalProfile: createHealthProfessionalProfile,
    readHealthProfessionalProfile: readHealthProfessionalProfile,
    readHealthProfessionalProfileByOthers:readHealthProfessionalProfileByOthers,
    removeHealthProfessionalProfile:removeHealthProfessionalProfile,
    updateHealthProfessionalProfile:updateHealthProfessionalProfile,
    updateHealthProfessionalLisence:updateHealthProfessionalLisence,
    updateHealthProfessionalProfilePic:updateHealthProfessionalProfilePic 
};
