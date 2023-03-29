import { body,query,oneOf} from "express-validator"
import Model from "../../models";
exports.validate = (method) => { 
    
    switch (method) {
        case 'createComment': {
            return [
              body('comment_text').notEmpty().withMessage('text for the comment is required'),
              query('post_id').notEmpty().withMessage('id of the post is required'),
           ]
           }
       case 'readMyOneComment': {
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