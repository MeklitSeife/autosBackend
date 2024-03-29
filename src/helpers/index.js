export const findOrCreate = (model, payload) =>
  model.findOrCreate({
    where: { email: payload.email },
    defaults: {
      ...payload
    }
  });

  export const Create = (model, payload) =>
    model.findOrCreate({
      where: { userId: payload.userId },
      defaults: {
        ...payload
      }
    });

export const findUser = (model, payload) =>
  model.findOne({
    where: {
      email: payload
    }
  });
  
export const findUserByEmail = (model, email) =>
  model.findOne({
    where: {
      email: email
    },
  });

export const findUserById= (model, clientId) =>
  model.findOne({
    where: {
      userId: userId
    },
  });

  export const findProfileById= (model, id) =>
  model.findOne({
    where: {
      user_id: id
    },
  });

 export const findAllMyPost= (model, id) =>
   model.findAll({
     where: {
      posting_user_id: id
     },
       });
  


export const findByPk = (model, id) => model.findByPk(id);

export const findAll = model => model.findAll();

export const verify = (model, id) => model.update(
   {
     is_verified: true 
    },
     {
   where: { id: id }
   }
);

export const emailVerify = (model, id) => model.update(
  { verify_email: true }, {
  where: { id: id }
}
);
export const update = (model, payload) => model.update(
  { password: payload.newHashedPass }, {
  where: { id: payload.id }
}
);

export const resetPassword = (model, payload) => model.update(
  { password : payload.newPassword}, {
  where: { id: payload.id }
}
);

