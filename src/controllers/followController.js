import catchAsync from "../lib/catchAsync";
import Model from "../models";
import GlobalError from "../lib/globalError";

const { User, User_follows, Organization, Parent, Health_professional} = Model;

//follow user
var followUser = catchAsync(async (req, res, next) => {

  //check if the user has already followed the user
  const follow = await User_follows.findOne({
    where:{
    follower_user_id: req.user.id,
    followed_user_id: req.query.followed_user_id,
    }
  })
if (follow) {
  return next(
    new GlobalError("you already followed this user!", 400)
  );
}
else{
  const userFollow = await User_follows.create({
    "follower_user_id": req.user.id,
    "followed_user_id": req.query.followed_user_id,
  })
if (userFollow) {

const followingUser = await User.findOne({
  where:{
     id:req.user.id
  },
  attributes: {
    exclude: ['otp', 'password','reset_pass_token_key']
     },
})

const followedUser = await User.findOne({
  where:{
     id:req.query.followed_user_id
  },
  attributes: {
    exclude: ['otp', 'password','reset_pass_token_key']
     },
})

followingUser.no_of_following =  ++followingUser.no_of_following;
followedUser.no_of_follower =  ++followedUser.no_of_follower;

const followingUpdate = await followingUser.save();
const followedUpdate = await followedUser.save();
res.status(200).json({
status: "success",
message: "you have successfully followed the user",
});
}}
});

//unfollow user
var unfollowUser = catchAsync(async (req, res, next) => {
  const userFollow = await User_follows.findOne({
    where:{
    follower_user_id: req.user.id,
    followed_user_id: req.query.followed_user_id,
    }
  })
if (userFollow) {

const followingUser = await User.findOne({
  where:{
     id:req.user.id
  },
  attributes: {
    exclude: ['otp', 'password','reset_pass_token_key']
     },
})

const followedUser = await User.findOne({
  where:{
     id:req.query.followed_user_id
  },
  attributes: {
    exclude: ['otp', 'password','reset_pass_token_key']
     },
})
const unfollwed = await userFollow.destroy()
if (unfollwed){
  followingUser.no_of_following =  --followingUser.no_of_following;
  followedUser.no_of_follower =  --followedUser.no_of_follower;

  const followingUpdate = await followingUser.save();
  const followedUpdate = await followedUser.save();
   res.status(200).json({
   status: "success",
   message: "you have successfully unfollowed the user",
  });
 }
} else {
return next(new GlobalError("you do not follow this user!", 400));
}
});


//remove follower
var removeFollower = catchAsync(async (req, res, next) => {
  const userFollow = await User_follows.findOne({
    where:{
    follower_user_id: req.query.follower_user_id,
    followed_user_id: req.user.id,
    }
  })
if (userFollow) {

const followingUser = await User.findOne({
  where:{
     id:req.query.follower_user_id
  },
  attributes: {
    exclude: ['otp', 'password','reset_pass_token_key']
     },
})

const followedUser = await User.findOne({
  where:{
     id:req.user.id
  },
  attributes: {
    exclude: ['otp', 'password','reset_pass_token_key']
     },
})
const unfollwed = await userFollow.destroy()
if (unfollwed){
  followingUser.no_of_following =  --followingUser.no_of_following;
  followedUser.no_of_follower =  --followedUser.no_of_follower;

  const followingUpdate = await followingUser.save();
  const followedUpdate = await followedUser.save();
   res.status(200).json({
   status: "success",
   message: "you have successfully removed the follower",
  });
 }
} else {
return next(new GlobalError("you do not follow this user!", 400));
}
});



//read all users one user is following
var readAllFollowing = catchAsync(async (req, res, next) => {

  const followingRead = await User_follows.findAll({
      where: {
          follower_user_id: req.query.id
      },
      include: {
        model: User,
        as: 'user_follow', 
        required: true,
        attributes: {
          exclude: ['otp', 'password','reset_pass_token_key']
           },
            include:[{
              model: Organization ,
              as: 'organization', 
          },
          {
              model: Parent ,
              as: 'parent', 
          },
          {
            model: Health_professional ,
            as: 'health_professional', 
        }]
      }
  });
  if (followingRead) {
       res.status(200).json({
        followingRead,
    });
  } else {
    return next(new GlobalError("error!", 400));
  }
});

//read all followers of one user 
var readAllFollowers = catchAsync(async (req, res, next) => {

  const followingRead = await User_follows.findAll({
      where: {
          followed_user_id: req.query.id
      },
      include: {
        model: User,
        as: 'user_follow', 
        required: true,
        attributes: {
          exclude: ['otp', 'password','reset_pass_token_key']
           },
            include:[{
              model: Organization ,
              as: 'organization', 
          },
          {
              model: Parent ,
              as: 'parent', 
          },
          {
            model: Health_professional ,
            as: 'health_professional', 
        }]
      }
  });
  if (followingRead) {
       res.status(200).json({
        followingRead,
    });
  } else {
    return next(new GlobalError("error!", 400));
  }
});


module.exports = {
  followUser: followUser,
    unfollowUser: unfollowUser,
    readAllFollowing:readAllFollowing,
    readAllFollowers:readAllFollowers,
    removeFollower:removeFollower
};





