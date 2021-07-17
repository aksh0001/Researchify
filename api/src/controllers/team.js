/**
 * This module contains handlers for the "team" route.
 * @module team
 */
const axios = require('axios');

const Team = require('../models/team.model');

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const options = {
  headers: { Authorization: 'Bearer ' + process.env.TWITTER_BEARER_TOKEN },
};

/**
 * Associates a twitter handle with a team on the /team/twitter-handle/:team-id endpoint.
 * @param {*} req request object, containing the team_id in the url and twitter handle in the body
 * @param {*} res response object
 * @returns 200: successful added twitter handle to team
 * @returns 400: team id is not in a valid hexadecimal format
 * @returns 404: team is not found, or handle is invalid
 * @returns 500: error trying to update the document in db
 */
async function storeHandle(req, res) {
  const { twitterHandle: handle } = req.body;
  let foundTeam = req.foundTeam;

  if (handle.length == 0) {
    // remove the handle from the doc
    foundTeam.twitterHandle = '';
  } else {
    // update the handle
    // validate the handle by getting user id
    if (!process.env.TWITTER_BEARER_TOKEN) {
      return res
        .status(500)
        .send('Error: No Twitter API Bearer Token found in .env file');
    }
    let response = await axios.get(
      'https://api.twitter.com/2/users/by/username/' + handle,
      options
    );
    if (response.data.errors) {
      return res.status(400).send('Error: ' + response.data.errors[0].detail);
    } else {
      foundTeam.twitterHandle = handle;
    }
  }

  try {
    // update in db
    foundTeam.save();
    return res.status(200).json(foundTeam);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
}

/**
 * Gets the team document from the database on /team/:team_id.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the found team document
 * @returns 200: the team was found
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function getTeam(req, res) {
  return res.status(200).send(req.foundTeam);
}

/**
 * Gets the team document from the database on /team.
 * @param {*} req request object, containing team email and password in the body as JSON
 * @param {*} res response object, the found team document
 * @returns 200: the team was found
 * @returns 404: team is not found
 */
async function loginTeam(req, res) {
  try {
    const foundTeam = await Team.findOne({ email: req.body.email })
    if (!foundTeam) {
      return res.status(400).send('Incorrect email/password'); // user not found 
    } 
    if (await bcrypt.compare(req.body.password, foundTeam.password)){
      const teamObj = foundTeam.toObject(); // converts a mongoose object to a plain object 

      const accessToken = jwt.sign(teamObj, process.env.JWT_SECRET_1 || "JWT_SECRET_1", {
        expiresIn: '15m'
      });
      const refreshToken = jwt.sign(teamObj, process.env.JWT_SECRET_2 || "JWT_SECRET_2", {
        expiresIn: '1y'
      });

      res.cookie('accessToken', accessToken, { 
        httpOnly: true,
        maxAge: 30000, // 5 mins
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 3.154e10, // 1 year
      })

      return res.status(200).send({accessToken: accessToken, teamId: foundTeam._id});
    } 
    return res.status(403).send('Incorrect email/password'); // incorrect password 
  } catch (error){
    return res.status(422).json(`Error: ${error.message}`);
  }
}

/**
 * Handles a POST request to add a team on the endpoint /team.
 * @param {*} req request object -  json object containing at least two fields - teamName and orgName.
 * @param {*} res response object - updated team object
 * @returns 201: returns updated team details
 */
async function addTeam(req, res) {
  const foundTeam = await Team.findOne({ email: req.body.email })
  if (foundTeam) {
    return res.status(400).send('Email had been registered');
  } 
  const salt = await bcrypt.genSalt()
  const hashedPassword =  await bcrypt.hash(req.body.password, salt)
  const hashedTeam = {...req.body, password: hashedPassword}
  const createdTeam = await Team.create(hashedTeam);
  res.status(201).json(createdTeam._id);
}

/**
 * Gets the team member array from the database on /team/:team_id/member.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the returned team member array
 * @returns 200: the team member array was returned
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function readTeamMembersByTeam(req, res) {
  let foundTeam = req.foundTeam;
  return res.status(200).send(foundTeam.teamMembers);
}

/**
 * POST request to create a new team member to the database on /team/:team_id/member.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the created team member document
 * @returns 200: the team member was created
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function createTeamMember(req, res) {
  let teamMember = req.body;
  const memberId = new mongoose.Types.ObjectId();
  let foundTeam = req.foundTeam;
  teamMember = { ...teamMember, _id: memberId };
  await foundTeam.teamMembers.push(teamMember);
  foundTeam.save();
  res.status(201).json(teamMember);
}

/**
 * Delete the team member from the database on /team/:team_id/member/:member_id.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the relevant message returned
 * @returns 200: the team member was deleted
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function deleteTeamMember(req, res) {
  let foundTeam = req.foundTeam;
  const { member_id } = req.params;
  await foundTeam.teamMembers.pull({ _id: member_id });
  foundTeam.save();
  return res.status(200).json({ message: 'Team member deleted successfully.' });
}

/**
 * Update the team member from the database on /team/:team_id/member.
 * @param {*} req request object, containing team id in the url
 * @param {*} res response object, the updated team member document
 * @returns 200: the team member was updated
 * @returns 404: team is not found
 * @returns 400: team id is not in a valid hexadecimal format
 */
async function updateTeamMember(req, res) {
  const updatedTeamMember = req.body;
  try {
    await Team.updateOne(
      { 'teamMembers._id': updatedTeamMember._id },
      {
        $set: {
          'teamMembers.$': updatedTeamMember,
        },
      }
    );
    return res.status(200).json(updatedTeamMember);
  } catch (error) {
    return res.status(422).json(`Error: ${error.message}`);
  }
}



async function logoutTeam(req, res) {
  res.cookie('accessToken', "", { 
    httpOnly: true,
    maxAge: 0,
  });

  res.cookie('refreshToken', "", { 
    httpOnly: true,
    maxAge: 0,
  });
  res.status(200).json('Logout Successfully');
}

module.exports = {
  storeHandle,
  getTeam,
  addTeam,
  createTeamMember,
  readTeamMembersByTeam,
  deleteTeamMember,
  updateTeamMember,
  loginTeam,
  logoutTeam
};
