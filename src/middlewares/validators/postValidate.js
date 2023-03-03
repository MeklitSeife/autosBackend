import { body,query,oneOf} from "express-validator"
import Model from "../../models";
exports.validate = (method) => { 
    
    const { User } = Model;
    switch (method) {
        case 'createPost': {
            return [
              oneOf([
              body('text').notEmpty().withMessage('text for the post is required'),
              body('post_img').notEmpty().withMessage('image for the post is required'),
              query('id').notEmpty().withMessage('id of the posting user is required'),
            ])
           ]
           }
       case 'readMyOnePost': {
            return [
              query('id').notEmpty().withMessage('id of the post is required'),
            ] 
           }
        case 'updatePost': {
            return [ 
              oneOf([
                body('text').notEmpty().withMessage('text for the post is required'),
                body('post_img').notEmpty().withMessage('image for the post is required'),
              ])
           ]
          }
        case 'readAllPostsOfOneUser': {
            return [
              query('id').notEmpty().withMessage('id of the user is required'),
            ] 
           }
       case 'readOnePostOfUser': {
            return [
                body('first_name').notEmpty().withMessage('first name is required'),
                body('last_name').notEmpty().withMessage('last name is required'),
                body('gender').notEmpty().withMessage('gender is required'),
                body('birthday').notEmpty().withMessage('relation of the parent with the autistic kid is required'),  
                body('therapy_history').notEmpty().withMessage('therapy_history is required'), 
            ] 
           }
    }
}