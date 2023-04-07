import { body,query,oneOf} from "express-validator"
exports.validate = (method) => { 
    
    switch (method) {
        case 'createUserReport': {
            return [
              query('id').notEmpty().withMessage('id of the user to be reported is required'),
              oneOf([
              body('reporting_reason').notEmpty().withMessage('reporting reason is required'),
              body('reporting_reason_text').notEmpty().withMessage('reporting reason text is required'),
            ])
           ]
           }
        case 'createPostReport': {
            return [
              query('id').notEmpty().withMessage('id of the post to be reported is required'),
              oneOf([
              body('reporting_reason').notEmpty().withMessage('reporting reason is required'),
              body('reporting_reason_text').notEmpty().withMessage('reporting reason text is required'),
            ])
           ]
           }
           case 'createCommentReport': {
            return [
              query('id').notEmpty().withMessage('id of the comment to be reported is required'),
              oneOf([
              body('reporting_reason').notEmpty().withMessage('reporting reason is required'),
              body('reporting_reason_text').notEmpty().withMessage('reporting reason text is required'),
            ])
           ]
           }
    }
}