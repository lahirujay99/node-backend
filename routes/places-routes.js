const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    desscription: 'one of the famous sky scraper',
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: '20 w 34th st, new york, ny 10001',
    creator: 'u1',
  },
];

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid; // {pid: 'p1'}
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError('Could not find a place for the provided id', 404);
  }
  res.json({ place });
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  if (!user) {
    return next(
      new HttpError('Could not find a place for the provided user id', 404)
    );
  }
  res.json({ user });
});

module.exports = router;
