import { body,query,oneOf} from "express-validator"
import Model from "../../models";
exports.validate = (method) => { 
    
    const { User } = Model;
    switch (method) {
        case 'createParentProfile': {
            return [
              body('first_name').notEmpty().withMessage('first name is required'),
              body('last_name').notEmpty().withMessage('last name is required'),
              body('gender').notEmpty().withMessage('gender is required'),
              body('relation').notEmpty().isIn(["parent", "relative","care taker"]).withMessage('relation of the parent with the autistic kid is required'),
            ] 
           }
           case 'readParentProfile': {
            return [
              query('id').notEmpty().withMessage('id of the Parent is required'),
            ] 
           }
           case 'updateParentProfile': {
            return [ 
                oneOf([
                body('first_name').notEmpty().withMessage('first name is required'),
                body('last_name').notEmpty().withMessage('last name is required'),
                body('gender').notEmpty().withMessage('gender is required'),
                body('relation').notEmpty().isIn(["parent", "relative","care taker"]).withMessage('relation of the parent with the autistic kid is required'),  
                body('bio').notEmpty().withMessage('bio is required'),  
            ])
           ]
          }
           case 'updateParentProfilePic': {
            return [
              body('base64').notEmpty().withMessage('profile pic is required'),
            ] 
           }
           case 'createChildProfile': {
            return [
                body('first_name').notEmpty().withMessage('first name is required'),
                body('last_name').notEmpty().withMessage('last name is required'),
                body('gender').notEmpty().withMessage('gender is required'),
                body('birthday').notEmpty().withMessage('relation of the parent with the autistic kid is required'),  
                body('therapy_history').notEmpty().withMessage('therapy_history is required'), 
            ] 
           }
           case 'updateChildProfile': {
            return [
                oneOf([
                body('first_name').notEmpty().withMessage('first name is required'),
                body('last_name').notEmpty().withMessage('last name is required'),
                body('description').notEmpty().withMessage('description is required'), 
                body('gender').notEmpty().withMessage('gender is required'),
                body('birthday').notEmpty().withMessage('relation of the parent with the autistic kid is required'),  
                body('therapy_history').notEmpty().withMessage('therapy_history is required'), 
                ] )
            ] 
           }
    }
}