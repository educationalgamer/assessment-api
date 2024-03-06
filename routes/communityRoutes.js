const express = require('express');
const router = express.Router();
const Community = require('../models/Community');
const Member = require('../models/Member'); // Assuming you have a Member model

// Middleware for authentication (placeholder)
const { verifyToken } = require('../middleware/authentication');

// Route to create a new community
router.post('/', async (req, res, next) => {
  try {
    const { name, slug, owner } = req.body;
    const community = await Community.create({ name, slug, owner });
    res.status(201).json({ success: true, data: community });
  } catch (error) {
    next(error);
  }
});

// Route to get all communities
router.get('/', async (req, res, next) => {
  try {
    const communities = await Community.find();
    res.status(200).json({ success: true, data: communities });
  } catch (error) {
    next(error);
  }
});

// Route to get all members of a community by ID
router.get('/:id/members', async (req, res, next) => {
  try {
    const communityId = req.params.id;
    const members = await Member.find({ community: communityId }).populate('user');
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
});

router.get('/me/owner', async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const communities = await Community.find({ owner: userId });
    res.status(200).json({ success: true, data: communities });
  } catch (error) {
    next(error);
  }
});

// Route to get communities joined by the current user
// This assumes that the Member model has a 'user' field referencing the User model
router.get('/me/member', async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming `req.user` is set by authentication middleware
    const memberships = await Member.find({ user: userId }).populate('community');
    const communities = memberships.map(membership => membership.community);
    res.status(200).json({ success: true, data: communities });
  } catch (error) {
    next(error);
  }
});

module.exports = router;