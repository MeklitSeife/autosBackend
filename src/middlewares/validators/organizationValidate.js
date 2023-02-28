import { body,query,oneOf} from "express-validator"
import Model from "../../models";
exports.validate = (method) => { 
    
    const { User } = Model;
    switch (method) {
        case 'createOrganizationProfile': {
            return [
              body('organization_name').notEmpty().withMessage('organization name is required'),
              body('address').notEmpty().withMessage('address is required'),
              body('starting_year').notEmpty().withMessage('starting year is required'),
              body('lisence').notEmpty().withMessage('lisence is required'),
            ] 
           }
           case 'readOrganizationProfile': {
            return [
              query('id').notEmpty().withMessage('id of the organization is required'),
            ] 
           }
           case 'updateOrganizationProfile': {
            return[
             oneOf([
              body('organization_name').notEmpty().withMessage('organization name is required'),
              body('address').notEmpty().withMessage('address is required'),
              body('starting_year').notEmpty().withMessage('starting year is required'),
              body('bio').notEmpty().withMessage('bio is required'),
            ] )]
           }
           case 'updateOrganizationLisence': {
            return [
              body('lisence').notEmpty().withMessage('lisence is required'),
            ] 
           }
           case 'updateOrganizationProfilePic': {
            return [
              body('profile_pic').notEmpty().withMessage('profile pic is required'),
            ] 
           }
           
    }
}