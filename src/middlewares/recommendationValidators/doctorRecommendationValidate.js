import { body,query} from "express-validator"
exports.validate = (method) => { 
    
    switch (method) {
        case 'createDoctorRecommendation': {
                return [
                  body('name').notEmpty().withMessage('name of the doctor is required'),
                  body('work_place').notEmpty().withMessage('place where the doctor works at is required'),
                  body('experience').notEmpty().withMessage('experience of the doctor is required'),
                  body('contact').notEmpty().withMessage('contact details of the doctor is required'),
                  body('gender').notEmpty().isIn(["Female", "Male","Rather not to mention"]).withMessage('gender is required'),
                ] 
               }
       case 'readOneRecommended': {
            return [
              query('id').notEmpty().withMessage('id of the Comment is required'),
            ] 
           }
        case 'updateComment': {
            return [ 
                body('comment_text').notEmpty().withMessage('txt for the Comment is required'),
           ]
          }
        case 'readOnePostWithComment': {
            return [
              query('post_id').notEmpty().withMessage('id of the post is required'),
            ] 
           }
    }
}