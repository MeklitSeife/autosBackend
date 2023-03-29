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
              query('id').notEmpty().withMessage('id of the post is required'),
              query('userId').notEmpty().withMessage('posting user id is required'),
            ] 
           }
    }
}