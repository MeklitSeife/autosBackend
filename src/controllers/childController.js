import catchAsync from "../lib/catchAsync";
import Model from "../models";
import { validationResult } from "express-validator";
import GlobalError from "../lib/globalError";
import { where } from "sequelize";

const { Child } = Model;

//create Child profile
var createChildProfile = catchAsync(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const createProfile = await Child.create({
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "gender": req.body.gender,
      "birthday": req.body.birthday,
      "description": req.body.description,
      "therapy_history": req.body.therapy_history,
      "parent_id":req.user.id
    })
    if (createProfile) {
      return res.status(201).json({
        status: "success",
        message: "Child profile successfully created",
        payload: createProfile
      });
    }
  } catch (err) {
    return next(err);
  }
});

//read Child profile(by parents of the child)
var readChildMyProfile = catchAsync(async (req, res, next) => {
  const readProfile = await Child.findAll({
    where:
    {
         parent_id:req.user.id
    }
});
  if (readProfile) {
    res.status(200).json({
      readProfile,
 });
}
  else {
    return next(new GlobalError("child profile note found! please register child profile", 400));
  }
});

//update Child profile
var updateMyChildProfile = catchAsync(async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

 const updateProfile = await Child.update(
    {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "gender": req.body.gender,
        "birthday": req.body.birthday,
        "therapy_history": req.body.therapy_history,
    },
    {
      where: { parent_id:req.user.id},
    }
  )
  if (updateProfile) {
    res.status(200).json({
      msg:"succesfully updated your child profile",
      payload:updateProfile,
    });
  } else {
    return next(
      new GlobalError("error occured when updating your child profile!", 400)
    );
  }} catch (err) {
    return next(err);
  }
});


module.exports = {
    createChildProfile: createChildProfile,
    readChildMyProfile: readChildMyProfile,
    updateMyChildProfile:updateMyChildProfile,
};
