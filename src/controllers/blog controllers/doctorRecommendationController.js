import catchAsync from "../../lib/catchAsync";
import Model from "../../models";
import { validationResult } from "express-validator";
import GlobalError from "../../lib/globalError";

const { Doctor_recommendation } = Model;

//create new doctor recommendation
var createDoctorRecommendation = catchAsync(async (req, res, next) => {

      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }
   const newDoctorRecommendation = await Doctor_recommendation.create({
      "name": req.body.name,
      "gender": req.body.gender,
      "work_place": req.body.work_place,
      "experience": req.body.experience,
      "contact": req.body.contact,
      })
        if (newDoctorRecommendation) {
          return res.status(201).json({
            status: "success",
            message: "doctor recommendation successfully created",
            payload: newDoctorRecommendation,
          });
        }
        } catch (err) {
        return next(err);
      }});

//read specific recommended doctor details
var readOneRecommendedDoctor = catchAsync(async (req, res, next) => {
   const recomendationRead = await Doctor_recommendation.findOne({
    where: {
        id: req.query.id
          }
       });
  if (recomendationRead) {
       res.status(200).json({
        recomendationRead,
    });
  } else {
    return next(new GlobalError("error!", 400));
  }
});

//read all recommended doctors
var readAllRecommendedDoctors = catchAsync(async (req, res, next) => {

  const recomendationRead = await Doctor_recommendation.findAll();
  if (recomendationRead) {
       res.status(200).json({
        recomendationRead,
    });

  } else {
    return next(new GlobalError("error!", 400));
  }
});


//update one recommended doctor
var updateOneRecommendedDoctor = catchAsync(async (req, res, next) => {
    
        try{
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }
    
      const doctorToBeUpdated = await Doctor_recommendation.findOne({
        where:{
          id : req.query.id
         }
        })
        const updatedDoctor = await doctorToBeUpdated.update(
          {
            "name": req.body.name,
            "gender": req.body.gender,
            "work_place": req.body.work_place,
            "experience": req.body.experience,
            "contact": req.body.contact,
          }
        )
        if (updatedDoctor) {
            res.status(200).json({
              msg:"succesfully updated the doctor information",
              payload:updatedDoctor,
            });
      } else {
            return next(
              new GlobalError("error occured when updating the doctot information!", 400)
            ); }
      } catch (err) {
            return next(err);
          }
});

  //delete specific doctor recommendation
var removeOneDoctorRecommendation = catchAsync(async (req, res, next) => {
    try{
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
    const deletedDoctor = await Doctor_recommendation.destroy(
      { 
        where: { 
          id: req.query.id 
        }
      })
    if (deletedDoctor) {
      res.status(200).send("success");
    } else {
      return next(
        new GlobalError("error occured when deleting the recommended doctor!", 400)
      );
    }
  } catch (err) {
    return next(err);
  }
  });

module.exports = {
  createDoctorRecommendation: createDoctorRecommendation,
    readOneRecommendedDoctor:readOneRecommendedDoctor,
    readAllRecommendedDoctors:readAllRecommendedDoctors,
    removeOneDoctorRecommendation:removeOneDoctorRecommendation,
    updateOneRecommendedDoctor:updateOneRecommendedDoctor
};