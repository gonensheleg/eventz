const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../../models/events/event');
const User = require('../../models/users/user');
const eventController = require ('../../controllers/eventController');

router.get('/', eventController.getEvents);
router.post('/', eventController.createEvent);
router.get('/:eventId',eventController.getEvent);
router.put('/:eventId',eventController.updateEvent);
router.delete('/:eventId',eventController.deleteEvent);
module.exports = router;
