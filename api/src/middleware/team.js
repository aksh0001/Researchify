/**
 * This module contains middleware functions for the team route (/routes/teams.js).
 */
const axios = require('axios');
const { body, validationResult } = require('express-validator');

const Team = require('../models/team.model');
const { fillErrorObject } = require('./error');

async function validateTeamId(req, res, next) {
  const { teamId } = req.params;
  const foundTeam = await Team.findById(teamId)
    .select('_id teamName orgName email teamMembers');

  if (foundTeam == null) {
    next(
      fillErrorObject(404, 'Validation error', [
        'No team found with the given id',
      ]),
    );
  }

  req.foundTeam = foundTeam; // todo: does this need to be set inside middleware?
  next();
}

async function validateTeamRepo(req, res, next) {
  const { ghToken } = req.body;
  const { data } = await axios.get('https://api.github.com/user',
    {
      headers: { Authorization: `token ${ghToken}` },
    });
  if (data.errors) {
    next(
      fillErrorObject(400, 'Validation error: user doesnt exist!', [data.errors[0].detail]),
    );
  }

  // Creating repoName
  const ghUsername = data.login;
  const repoName = `${ghUsername}.github.io`;
  try {
    const repoValidator = await axios.get(`https://api.github.com/repos/${ghUsername}/${repoName}`, {
      headers: {
        Authorization: `token ${ghToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (repoValidator.status !== 200) {
      next(
        fillErrorObject(404, 'GH pages not found!', [
          'GitHub Repo doesnt exist for this team!',
        ]),
      );
    }
    next();
  } catch (error) {
    next(
      fillErrorObject(404, 'GH pages not found!', [
        'GitHub Repo doesnt exist for this team!',
      ]),
    );
  }
}

const validateTwitterHandle = [
  body(
    'twitterHandle',
    'Error: Twitter handle must be between 0 to 15 characters.', // 0 because it means remove the handle
  )
    .isLength({ min: 0, max: 15 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        fillErrorObject(400, 'Validation error', errors.errors.map((a) => a.msg)),
      );
    } else {
      next();
    }
  },
];

module.exports = { validateTeamId, validateTeamRepo, validateTwitterHandle };
