const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/users/user');

router.get('/',(req,res,next) => {
  User.find()
  .select('_id name email phone')
  .exec()
  .then((docs) => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return{
            _id:doc._id,
            name: doc.name,
            email: doc.email,
            phone: doc.phone,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/users/' + doc._id
            }
          }
        })
      }
      res.status(200).json(response);
  })
  .catch((err) => {
    res.status(500).json({error: err});
  });
});

router.post('/',(req,res,next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    token:req.body.token,
    password:req.body.password
  });
  user.save()
  .then(result => {
    res.status(201).json({
      message: 'An user was created successfully',
      createUser: {
        _id:result._id,
        name:result.name,
        email:result.email,
        phone:result.phone,
        request:{
          type: 'GET',
          url:'http://localhost:3000/users/' + result._id
        }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
});

router.get('/:userId',(req,res,next) => {
  const id = req.params.userId;
  User.findById(id)
  .select('_id name email phone')
  .exec()
  .then((doc) => {
    if(doc){
      res.status(200).json(doc);
    }else{
      res.status(404).json({
        message:"No valid entry found for provided ID"
      });
    }
  })
  .catch((err) => {
    res.status(500).json({error: err});
  });
});

router.patch('/:userId',(req,res,next) => {
  const id = req.params.userId;
  const updateOps = {};
  for(const ops of req.body){
     updateOps[ops.propName] = ops.value;
  }
  User.update({_id:id},{$set: updateOps}).exec()
  .then((result) => {
    res.status(200).json({
      message:'Updated user!',
      request:{
        type: 'GET',
        url:'http://localhost:3000/users/' + id
      }
    });
  })
  .catch((err) => {
    res.status(500).json({error:err});
  });
});

router.delete('/:userId',(req,res,next) => {
  const id = req.params.userId;
  User.remove({_id:id}).exec()
  .then((value) => {
    res.status(200).json({
      message:'Deleted user!',
      id:id
    });
  })
  .catch((err) => {
    res.status(500).json({error: err});
  });
});

module.exports = router;
