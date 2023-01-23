export const findOrCreate = (model, payload) =>
  model.findOrCreate({
    where: { email: payload.email },
    defaults: {
      ...payload
    }
  });

  export const Create = (model, payload) =>
    model.findOrCreate({
      where: { clientId: payload.clientId },
      defaults: {
        ...payload
      }
    });

  // export const updateInfulencer = async (model, payload) => {
  //   return await model.update(
  //      payload, {
  //     where: {tiktok_id : payload.tiktok_id }
  //  }
  //  );
    // return await model.update(payload)
  //   const obj = await model
  //     .findOne({
  //       where: { tiktok_id : payload.tiktok_id }
  //     })
  //   if (obj) {
  //  const value = await obj.update(payload)
  //  value.setDataValue('isUpdated', '1');
  //   return value;
     
  //   }
  // export const createInfulencer = async (model, payload) => {
  //   return await model.Create(payload)
    // const value = await model.create(payload)
    // value.setDataValue('isUpdated', '0');
    // return value;
  // }
  
  export const createOrUpdateInfulencer = async (model, payload) => {
    const obj = await model
        .findOne({
          where: { tiktok_id : payload.tiktok_id }
        })
      if (obj) {
    return obj.update(payload)
      }
    return model.create(payload)

  }

export const findClient = (model, payload) =>
  model.findOne({
    where: {
      email: payload
    }
  });
  
export const findClientByEmail = (model, email) =>
  model.findOne({
    where: {
      email: email
    },
  });
export const findInfluencerByEmail = (model, email) =>
  model.findOne({
    where: {
      email: email
    },
  });

export const findClientById= (model, clientId) =>
  model.findOne({
    where: {
      clientId: clientId
    },
  });

export const findInfluencerById = (model, influencerId) =>
  model.findOne({
    where: {
      influencerId: influencerId
    },
  });

export const findAllClientContest= (model, clientId) =>
  model.findAll({
    where: {
      clientId: clientId
    },
      });
  export const findAllInfluencerContestApplication= (model, influencerId) =>
  model.findAll({
    where: {
      influencerId: influencerId
    },
  });
  
export const findMyApplications= (model, influencerId) =>
  model.findAll({
    where: {
      influencerId: influencerId
    },
  });
  
export const findClientByName= (model, name) =>
  model.findOne({
    where: {
      name: name
    },
  });


export const findByPk = (model, id) => model.findByPk(id);

export const findAll = model => model.findAll();

export const verify = (model, id) => model.update(
   { is_verified: true }, {
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

