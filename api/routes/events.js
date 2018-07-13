const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/event');

router.get('/', (req,res,next) => {
    Event.find().exec()
    .then((doc) => {
        res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({error: err});
    });
});

router.post('/', (req,res,next) => {
    const event = new Event({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      location: req.body.location
    });

    event.save()
    .then(result => {
      res.status(201).json({
        message: 'An event was created successfully',
        createEvent: result
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

router.get('/:eventId',(req,res,next) => {
  const id = req.params.eventId;
  Event.findById(id)
  .exec()
  .then((doc) => {
    console.log('Fetching from database: ' ,doc);
    if(doc){
      res.status(200).json(doc);
    }else{
      res.status(404).json({
        message:"No valid entry found for provided ID"
      });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

router.patch('/:eventId',(req,res,next) => {
  const id = req.params.eventId;
  const updateOps = {};
  for(const ops of req.body){
     updateOps[ops.propName] = ops.value;
  }
  Event.update({_id:id},{$set: updateOps}).exec()
  .then((result) => {
    res.status(200).json({
      message:'Updated event!',
      result: result
    });
  })
  .catch((err) => {
    res.status(500).json({error:err});
  });
});

router.delete('/:eventId',(req,res,next) => {
  const id = req.params.eventId;
  Event.remove({_id:id}).exec()
  .then((value) => {
    res.status(200).json({
      message:'Deleted event!',
      id:id
    });
  })
  .catch((err) => {
    res.status(500).json({error: err});
  });
});

module.exports = router;
