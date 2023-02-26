import catchAsync from "../lib/catchAsync";
import { findProfileById } from "../helpers/index";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";

const { Organization } = Model;

//create organization profile
var createOrganizationProfile = catchAsync(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const organizationProfile = await findProfileById(Organization,req.user.id);
    if (organizationProfile) {
      return next(new GlobalError("organization profile already exist", 401));
    }

    const createProfile = await Organization.create({
      "organization_name": req.body.organization_name,
      "address": req.body.address,
      "starting_year": req.body.starting_year,
      "bio": req.body.bio,
      "profile_pic": [req.body.profile_pic],
      "lisence": [req.body.lisence],
      "user_id":req.user.id
    })
    if (createProfile) {
      return res.status(201).json({
        status: "success",
        message: "organization profile successfully created",
        payload: createProfile,
      });
    }
  } catch (err) {
    return next(err);
  }
});

//read organization profile(profile owner organization)
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
    return next(new GlobalError("error profile does not exist! please create account", 400));
  }
});

//delete organization profile
var removeOrganizationProfile = catchAsync(async (req, res, next) => {
  const removeProfile = await Organization.destroy(
    { 
      where: { user_id:req.user.id }
    })
  if (removeProfile) {
    res.status(200).send("success");
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
    removeOrganizationProfile:removeOrganizationProfile
};
