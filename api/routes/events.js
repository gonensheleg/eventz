const express = require('express');
const router = express.Router();


router.get('/', (req,res,next) => {
    res.status(200).json({
      message: 'Handing a GET requests to /events'
    })
});

router.post('/', (req,res,next) => {
    res.status(201).json({
      message: 'Handing a POST requests to /events'
    })
});

router.get('/:eventId',(req,res,next) => {
  const id = req.params.eventId;
  res.status(200).json({
    message:'Handing a Get requests for a single event',
    id:id
  });
});

router.patch('/:eventId',(req,res,next) => {
  res.status(200).json({
    message:'Updated event!',
    id:req.params.eventId
  });
});

router.delete('/:eventId',(req,res,next) => {
  const id = req.params.eventId;
  res.status(200).json({
    message:'deleted event!',
    id:id
  });
});

module.exports = router;
