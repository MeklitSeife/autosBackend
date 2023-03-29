import { body,query,oneOf} from "express-validator"
import Model from "../../models";
exports.validate = (method) => { 
    
    const { User } = Model;
    switch (method) {
        case 'createHealthProfessionalProfile': {
            return [
              body('first_name').notEmpty().withMessage('first name is required'),
              body('last_name').notEmpty().withMessage('last name is required'),
              body('gender').notEmpty().withMessage('gender year is required'),
              body('lisence_base64').notEmpty().withMessage('lisence is required'),
            ] 
           }
           case 'readHealthProfessionalProfile': {
            return [
              query('id').notEmpty().withMessage('id of the Health professional is required'),
            ] 
           }
           case 'updateHealthProfessionalProfile': {
            return[
             oneOf([
                body('first_name').notEmpty().withMessage('first name is required'),
                body('last_name').notEmpty().withMessage('last name is required'),
                body('gender').notEmpty().withMessage('gender year is required'),
                body('experience').notEmpty().withMessage('experience is required'),
                body('working_place').notEmpty().withMessage('working place is required'),
                body('bio').notEmpty().withMessage('bio is required'),
                
            ] )]
           }
           case 'updateHealthProfessionalLisence': {
            return [
              body('lisence').notEmpty().withMessage('lisence is required'),
            ] 
           }
           case 'updateHealthProfessionalProfilePic': {
            return [
              body('profile_pic').notEmpty().withMessage('profile pic is required'),
            ] 
           }
           
    }
}