/**
 * This module defines the endpoints for the "/twitter" route and exports the corresponding Router.
 */

const teamRouter = require('express').Router();

const teamController = require('../controllers/team');

const teamMiddleware = require('../middleware/team');

const authMiddleware = require('../middleware/auth')

teamRouter.patch(
  '/:team_id/twitter-handle',
  authMiddleware.cookieJwtAuth,
  teamMiddleware.validateTeamId,
  teamMiddleware.validateTwitterHandle,
  teamController.storeHandle
);

teamRouter.get(
  '/:team_id',
  authMiddleware.cookieJwtAuth,
  teamMiddleware.validateTeamId,
  teamController.getTeam
);

teamRouter.post(
  '/:team_id/member',
  authMiddleware.cookieJwtAuth,
  teamMiddleware.validateTeamId,
  teamController.createTeamMember
);

teamRouter.get(
  '/:team_id/member',
  authMiddleware.cookieJwtAuth,
  teamMiddleware.validateTeamId,
  teamController.readTeamMembersByTeam
);

teamRouter.delete(
  '/:team_id/member/:member_id',
  authMiddleware.cookieJwtAuth,
  teamMiddleware.validateTeamId,
  teamController.deleteTeamMember
);

teamRouter.patch(
  '/:team_id/member',
  authMiddleware.cookieJwtAuth,
  teamMiddleware.validateTeamId,
  teamController.updateTeamMember
);

teamRouter.post('/', teamController.addTeam);

teamRouter.get(
  '/',
  authMiddleware.cookieJwtAuth,
  teamController.getTeamJWT
);

module.exports = teamRouter;