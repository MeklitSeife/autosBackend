import catchAsync from "../lib/catchAsync";
import { findProfileById } from "../helpers/index";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";
import imagebbUploader from "imgbb-uploader";

const { Parent } = Model;


//create parent profile
var createParentProfile = catchAsync(async (req, res, next) => {

  const options = {
    apiKey: '3e587f3c960a3473c6996fb07d2a3766',
    name: 'filename',
    base64string: req.body.base64
  }

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
  if(req.user.user_type == "Parent"){
    imagebbUploader(options).then(async respon => {
    
    const parentProfile = await findProfileById(Parent,req.user.id);
    if (parentProfile) {
      return next(new GlobalError("parent profile already exist", 401));
    }


    const createProfile = await Parent.create({
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "gender": req.body.gender,
      "relation": req.body.relation,
      "profile_pic": respon.url,
      "bio": req.body.bio,
      "user_id":req.user.id
    })
    if (createProfile) {
      return res.status(201).json({
        status: "success",
        message: "parent profile successfully created",
        payload: createProfile
      });
    }
    }).catch(err => {
      //console.log('err', err)
        return next(new GlobalError("error!", 400));
    })

  }  else {
    return next(new GlobalError("error! user type must be parent ", 400));
  }


  } catch (err) {
    return next(err);
  }
});

//read parent profile(by profile owner parent)
var readParentProfile = catchAsync(async (req, res, next) => {
  const readProfile = await findProfileById(Parent, req.user.id);
  if (readProfile) {
    const profile = readProfile.toJSON()
    res.status(200).json({
      profile
          });
  } else {
    return next(new GlobalError("error profile does not exist! please create account", 400));
  }
});

//read specific parent profile(by other users)
var readParentProfileByOthers = catchAsync(async (req, res, next) => {
  const readProfile = await findProfileById(Parent, req.query.id);
  if (readProfile) {
    const profile = readProfile.toJSON()
    res.status(200).json({
      profile
          });
  } else {
    return next(new GlobalError("error profile does not exist!", 400));
  }
});

//update parent profile
var updateParentProfile = catchAsync(async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

 const updateProfile = await Parent.update(
    {
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "gender": req.body.gender,
    "relation": req.body.relation,
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

//update parent profile picture
var updateParentProfilePic = catchAsync(async (req, res, next) => {
  const options = {
    apiKey: '3e587f3c960a3473c6996fb07d2a3766',
    name: 'filename',
    base64string: req.body.base64
  }

  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    imagebbUploader(options).then(async respon => {

const profile = await findProfileById(Parent, req.user.id);

profile.profile_pic = respon.url;
const updateProfilePic = await profile.save();
  
  if (updateProfilePic) { 
    res.status(200).json({
      msg:"succesfully updated your profile picture",
      payload:updateProfilePic,
    });
  } else {
    return next(
      new GlobalError("error occured when updating your profile picture!", 400)
    );}
}).catch(err => {
  return next(new GlobalError("error!", 400));


})} catch (err) {
    return next(err);
  }
});

//delete parent profile
var removeParentProfile = catchAsync(async (req, res, next) => {
  const removeProfile = await Parent.destroy(
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
    createParentProfile: createParentProfile,
    readParentProfile: readParentProfile,
    readParentProfileByOthers:readParentProfileByOthers,
    removeParentProfile:removeParentProfile,
    updateParentProfile:updateParentProfile,
    updateParentProfilePic:updateParentProfilePic 
};
