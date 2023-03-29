import catchAsync from "../lib/catchAsync";
import { findProfileById } from "../helpers/index";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";
import imagebbUploader from "imgbb-uploader";


const { Organization, Verification_request } = Model;

//create organization profile
var createOrganizationProfile = catchAsync(async (req, res, next) => {
    const profile_option = {
      apiKey: '3e587f3c960a3473c6996fb07d2a3766',
      name: 'filename',
      base64string:req.body.profile_base64
     
    } 
    const license_option = {
      apiKey: '3e587f3c960a3473c6996fb07d2a3766',
      name: 'filename',
      base64string:req.body.lisence_base64
     
    } 
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    if(req.user.user_type == "Organization"){

    const res1 = await imagebbUploader(license_option)
    const res2 = await imagebbUploader(profile_option)

    const organizationProfile = await findProfileById(Organization,req.user.id);
    if (organizationProfile) {
      return next(new GlobalError("organization profile already exist", 401));
    }

    const createProfile = await Organization.create({
      "organization_name": req.body.organization_name,
      "address": req.body.address,
      "starting_year": req.body.starting_year,
      "bio": req.body.bio,
      "profile_pic": res1.url,
      "lisence": res2.url,
      "user_id":req.user.id
    })
    if (createProfile) {
        const createVerififcationRequest = await Verification_request.create({
          "lisence": createProfile.lisence,
          "requestor_id": createProfile.user_id
        })
      if(createVerififcationRequest){
        return res.status(201).json({
          status: "success",
          message: "organization profile and verification request successfully created",
          payload: createProfile
        });
     }else{
       return next(
         new GlobalError("error occured when creating vefification request", 400)
       );}
  
    }
  } else {
    return next(new GlobalError("error! user type must be organization ", 400));
  }
    
  } catch (err) {
    return next(err);
  }
});

//read organization profile(by profile owner organization)
var readOrganizationProfile = catchAsync(async (req, res, next) => {
  const readProfile = await findProfileById(Organization, req.user.id);
  if (readProfile) {
    const profile = readProfile.toJSON()
    res.status(200).json({
      profile
          });
  } else {
    return next(new GlobalError("error profile does not exist! please create account", 400));
  }
});

//read specific organization profile(by other users)
var readOrganizationProfileByOthers = catchAsync(async (req, res, next) => {
  const readProfile = await findProfileById(Organization, req.query.id);
  if (readProfile) {
    const profile = readProfile.toJSON()
    res.status(200).json({
      profile
          });
  } else {
    return next(new GlobalError("error profile does not exist!", 400));
  }
});

//update organization profile
var updateOrganizationProfile = catchAsync(async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

 const updateProfile = await Organization.update(
    {
      "organization_name": req.body.organization_name,
      "address": req.body.address,
      "starting_year": req.body.starting_year,
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
  }
} catch (err) {
    return next(err);
  }
});

//resend lisence
var updateOrganizationLisence = catchAsync(async (req, res, next) => {
  const options = {
    apiKey: '3e587f3c960a3473c6996fb07d2a3766',
    name: 'filename',
    base64string:req.body.base64
  }
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
 imagebbUploader(options).then(async respon => {
  console.log(respon.url)
 const updateLisence = await Organization.update(
    {
      "lisence": respon.url,
    },
    {
      where: { 
        user_id:req.user.id
      },
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
  }
}).catch(err => {
  return next(err);
})
} catch (err) {
    return next(err);
  }
});
//update organization profile picture
var updateOrganizationProfilePic = catchAsync(async (req, res, next) => {
  const options = {
    apiKey: '3e587f3c960a3473c6996fb07d2a3766',
    name: 'filename',
    base64string:req.body.base64
  }
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
 imagebbUploader(options).then(async respon => {
const profile = await findProfileById(Organization, req.user.id);
var picture = profile.profile_pic
picture.push(req.body.profile_pic)

 const updateProfilePic = await Organization.update(
    {
      "profile_pic":respon.url,
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
  }
}).catch(err => {
  return next(err);
})
} catch (err) {
    return next(err);
  }
});
//delete organization profile
var removeOrganizationProfile = catchAsync(async (req, res, next) => {
  const removeProfile = await Organization.destroy(
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
    createOrganizationProfile: createOrganizationProfile,
    readOrganizationProfile: readOrganizationProfile,
    readOrganizationProfileByOthers:readOrganizationProfileByOthers,
    removeOrganizationProfile:removeOrganizationProfile,
    updateOrganizationProfile:updateOrganizationProfile,
    updateOrganizationLisence:updateOrganizationLisence,
    updateOrganizationProfilePic:updateOrganizationProfilePic 
};
