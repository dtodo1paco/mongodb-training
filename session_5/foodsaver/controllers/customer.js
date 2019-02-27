const customerService = require('../services/customer');

const findByUsername = (req, res) => {
  const usrname = req.params.username;
  customerService.findByUsername(usrname)
    .then( result => { res.send(result) } )
    .catch( err => { res.send({"error": true, "detail":err }) });
}
const findAll = (req, res) => {
  customerService.findAll()
    .then( result => { res.send(result) } )
    .catch( err => { res.send({"error": true, "detail":err }) });
}
const update = (req, res) => {
  const theId = req.params.id;
  console.log("updating id: " + theId);
  if (theId) {
    customerService.update(theId, req.body)
      .then( result => { res.send(result) } )
      .catch( err => { res.send({"error": true, "detail":err }) });
  } else {
    console.log("creating new element:" + JSON.stringify(req.body));
    console.log(typeof req.body.meta.likes)

  customerService.create(req.body)
      .then( result => { res.send(result) } )
      .catch( err => { res.send({"error": true, "detail":err }) });
  }
}

const groupBy = (req, res) => {
  const category = req.params.category;
  const id = req.params.id;
  if (!id) {
    customerService.group_by_meta(category)
      .then( result => { res.send(result) } )
      .catch( err => { res.send({"error": true, "detail":err }) });
  } else {
    customerService.group_by_company(id)
      .then( result => { res.send(result) } )
      .catch( err => { res.send({"error": true, "detail":err }) });
  }
}
module.exports = {
  findByUsername,
  findAll,
  update,
  groupBy,
}