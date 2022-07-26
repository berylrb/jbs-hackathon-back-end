import {Affirmation} from "../models/affirmation.js"

function create(req, res) {
  Affirmation.create(req.body)
  .then(affirmation => {
    res.json(affirmation)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function index(req, res){
  Affirmation.find({})
  .then(affirmations => {
    res.json(affirmations)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function deleteOne(req, res) {
  Affirmation.findById(req.params.id)
  .then(affirmation => {
    if (affirmation.author._id.equals(req.user.profile)) {
      Affirmation.findByIdAndDelete(affirmation._id)
      .then(deletedAffirmation => {
        res.json(deletedAffirmation)
      })
    } else {
      res.status(401).json({err: "Not authorized!"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function update(req, res) {
  Affirmation.findById(req.params.id)
  .then(affirmation => {
    if (affirmation.author._id.equals(req.user.profile)) {
      Affirmation.findByIdAndUpdate(req.params.id, req.body, {new: true})
      res.json(affirmation)
    } else {
      res.status(401).json({err: "Not authorized!"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  create,
  index,
  deleteOne as delete,
  update
}