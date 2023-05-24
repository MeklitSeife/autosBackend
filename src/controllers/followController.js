import catchAsync from "../lib/catchAsync";
import Model from "../models";
import GlobalError from "../lib/globalError";

const { User, User_follows, Organization, Parent, Health_professional, Follower, Following} = Model;

//follow user
var followUser = catchAsync(async (req, res, next) => {

  //check if the user to be followed exists
  const user = await User.findOne({
    where:{
    id: req.query.followed_user_id,
    }
  })
 if(user)
 {
  //check if the user has already followed the user
  const follow = await Following.findOne({
    where:{
    user_id: req.user.id,
    followed_user_id: req.query.followed_user_id,
    }
  })
if (follow) {
  return next(
    new GlobalError("you already followed this user!", 400)
  );
}
else{
  const userFollowing = await Following.create({
    "user_id": req.user.id,
    "followed_user_id": req.query.followed_user_id,
  })
  const userFollower = await Follower.create({
    "follower_user_id": req.user.id,
    "user_id": req.query.followed_user_id,
  })
if (userFollowing && userFollower) {
console.log("sucess")

const followerUser = await User.findOne({
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

followerUser.no_of_following =  ++followerUser.no_of_following;
followedUser.no_of_follower =  ++followedUser.no_of_follower;

const followingUpdate = await followerUser.save();
const followedUpdate = await followedUser.save();
  res.status(200).json({
  status: "success",
  message: "you have successfully followed the user",
      });
    } else {
      return next(new GlobalError("error occured following this user!", 400));
    }}
 }else{
  return next(new GlobalError("user to be followed does not exist!", 400));
 }
  
  });

//unfollow user
var unfollowUser = catchAsync(async (req, res, next) => {
  const followerUser = await Following.findOne({
    where:{
    user_id: req.user.id,
    followed_user_id: req.query.followed_user_id,
    }
  })
  const followedUser = await Follower.findOne({
    where:{
      follower_user_id: req.user.id,
      user_id: req.query.followed_user_id,
    }
  })
if (followerUser && followedUser) {

const userFollower = await User.findOne({
  where:{
     id:req.user.id
  },
  attributes: {
    exclude: ['otp', 'password','reset_pass_token_key']
     },
})

const userFollowed = await User.findOne({
  where:{
     id:req.query.followed_user_id
  },
  attributes: {
    exclude: ['otp', 'password','reset_pass_token_key']
     },
})
const unfollow = await followerUser.destroy()
const userUnfollowed = await followedUser.destroy()
if (unfollow && userUnfollowed){
  userFollower.no_of_following =  --userFollower.no_of_following;
  userFollowed.no_of_follower =  --userFollowed.no_of_follower;

  const followingUpdate = await userFollower.save();
  const followedUpdate = await userFollowed.save();
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

  const followedUser = await Follower.findOne({
    where:{
      follower_user_id: req.query.follower_user_id,
      user_id: req.user.id,
    }
  })

  const followerUser = await Following.findOne({
    where:{
    user_id: req.query.follower_user_id,
    followed_user_id: req.user.id,
    }
  })
  
if (followerUser && followedUser) {

const userFollower = await User.findOne({
  where:{
     id:req.query.follower_user_id
  },
  attributes: {
    exclude: ['otp', 'password','reset_pass_token_key']
     },
})

const userFollowed = await User.findOne({
  where:{
     id:req.user.id
  },
  attributes: {
    exclude: ['otp', 'password','reset_pass_token_key']
     },
})
const removedFollower = await followerUser.destroy()
const removerUser = await followedUser.destroy()

if (removedFollower && removerUser){
  userFollower.no_of_following =  --userFollower.no_of_following;
  userFollowed.no_of_follower =  --userFollowed.no_of_follower;

  const followingUpdate = await userFollower.save();
  const followedUpdate = await userFollowed.save();
   res.status(200).json({
   status: "success",
   message: "you have successfully removed the user from following you",
  });
 }
} else {
return next(new GlobalError("follower does not exist!", 400));
}

//   const userFollow = await User_follows.findOne({
//     where:{
//     follower_user_id: req.query.follower_user_id,
//     followed_user_id: req.user.id,
//     }
//   })
// if (userFollow) {

// const followingUser = await User.findOne({
//   where:{
//      id:req.query.follower_user_id
//   },
//   attributes: {
//     exclude: ['otp', 'password','reset_pass_token_key']
//      },
// })

// const followedUser = await User.findOne({
//   where:{
//      id:req.user.id
//   },
//   attributes: {
//     exclude: ['otp', 'password','reset_pass_token_key']
//      },
// })
// const unfollwed = await userFollow.destroy()
// if (unfollwed){
//   followingUser.no_of_following =  --followingUser.no_of_following;
//   followedUser.no_of_follower =  --followedUser.no_of_follower;

//   const followingUpdate = await followingUser.save();
//   const followedUpdate = await followedUser.save();
//    res.status(200).json({
//    status: "success",
//    message: "you have successfully removed the follower",
//   });
//  }
// } else {
// return next(new GlobalError("you do not follow this user!", 400));
// }
});


//read all users one user is following
var readAllFollowing = catchAsync(async (req, res, next) => {

  const followingRead = await Following.findAll({
      where: {
          user_id: req.query.id
      },
      include: {
        model: User,
        as: 'following', 
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

  const followerRead = await Follower.findAll({
      where: {
          user_id: req.query.id
      },
      include: {
        model: User,
        as: 'follower', 
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
  if (followerRead) {
       res.status(200).json({
        followerRead,
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





