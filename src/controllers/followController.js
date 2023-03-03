import catchAsync from "../lib/catchAsync";
import Model from "../models";
import GlobalError from "../lib/globalError";

const { Post,User_follows} = Model;

//follow user
var follow = catchAsync(async (req, res, next) => {

 const userFollow = await User_follows.create({
        "follower_user_id": req.user.follower_user_id,
        "followed_user_id": req.body.followed_user_id,
      })

  if (userFollow) {
  post.no_of_likes =  ++post.no_of_likes;
  const likeUpdate = await post.save();
   res.status(200).json({
    status: "success",
    message: "organization profile and verification request successfully created",
    payload: likeUpdate
    });
  } else {
    return next(new GlobalError("error!", 400));
  }
});

//unfollow user
var unfollow = catchAsync(async (req, res, next) => {

  const post = await Post.findOne({
    where:{
      id:req.query.id
    }
  });
  if (post) {
  post.no_of_likes = --post.no_of_likes;
  const likeUpdate = await post.save();
   res.status(200).json({
    status: "success",
    message: "organization profile and verification request successfully created",
    payload: likeUpdate
    });
  } else {
    return next(new GlobalError("error!", 400));
  }
});

module.exports = {
    follow: follow,
    unfollow: readAllMyPosts,
};





