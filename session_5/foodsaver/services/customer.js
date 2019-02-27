const customerModel = require('../models/customer').model;

const findByUsername = usrname => {
  return new Promise( (resolve, reject) => {
    const callback = (err, result) => {
      if (err) reject(err);
      resolve(result);
    };
    customerModel.findOne( { username: usrname }).exec(callback);
  });
}
const findAll = () => {
  return new Promise( (resolve, reject) => {
      const callback = (err, result) => {
      if (err) reject(err);
      resolve(result);
    };
    customerModel.find({enabled: true}).exec(callback);
  });
}
const update = (_id, customer) => {
  return new Promise( (resolve, reject) => {
    const callback = (err, result) => {
      if (err) reject(err);
      resolve(result);
    };
    customerModel.findOneAndUpdate({_id}, {$set: customer}).where({enabled: true}).exec(callback);
  });
}
const create = customer => {
  return new Promise( (resolve, reject) => {
    const newCustomer = new customerModel(customer);
    newCustomer.save( err => {
      if (err) reject(err);
      resolve(newCustomer);
    });
  });
}
const group_by_meta = (meta) => {
  return new Promise( (resolve, reject) => {
      const callback = (err, result) => {
      if (err) reject(err);
      resolve(result);
    };
    customerModel.aggregate([{
      "$group": {
        "_id": '$meta.'+meta,
        "count": {$sum: 1}
      }
    }], callback);
  });
}
const group_by_company = (company) => {
  return new Promise( (resolve, reject) => {
      const callback = (err, result) => {
      if (err) reject(err);
      resolve(result);
    };
    customerModel.aggregate([
      {
        "$match": {
          "meta.company" : company
        }
      },
      {
        "$group": {
          "_id": '$meta.company',
          "count": {$sum: 1}
      }
    }], callback);
  });
}

module.exports = {
  findByUsername,
  findAll,
  update,
  create,
  group_by_meta,
  group_by_company,
}
