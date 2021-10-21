/**
 * This module defines endpoints for the "/team" route and exports the corresponding Router.
 */
const teamRouter = require('express').Router();

const teamController = require('../controllers/team');
const teamMiddleware = require('../middleware/team');
const mongooseMiddleware = require('../middleware/mongoose');
const authMiddleware = require('../middleware/auth');

teamRouter.post('/', teamController.createTeam);

teamRouter.get(
  '/',
  authMiddleware.cookieJwtAuth,
  teamController.getTeam,
);

teamRouter.patch(
  '/:teamId',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.updateTeam,
);

teamRouter.delete(
  '/:teamId/resetTeamData',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.resetTeamData,
);

teamRouter.delete(
  '/:teamId',
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.deleteTeam,
);

teamRouter.post(
  '/:teamId/member',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.createTeamMember,
);

teamRouter.get(
  '/:teamId/member',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.readTeamMembersByTeam,
);

teamRouter.patch(
  '/:teamId/member',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.updateTeamMember,
);

teamRouter.delete(
  '/:teamId/reset-members',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.resetTeamMembers,
);

teamRouter.delete(
  '/:teamId/member/:memberId',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.deleteTeamMember,
);

teamRouter.patch(
  '/:teamId/members',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamController.deleteBatchTeamMembers,
);

teamRouter.patch(
  '/:teamId/twitter-handle',
  authMiddleware.cookieJwtAuth,
  teamMiddleware.validateTeamId,
  teamMiddleware.validateTwitterHandle,
  teamController.storeHandle,
);

teamRouter.get(
  '/:teamId/gh_auth/:code',
  teamController.getGHAccessToken,
);

teamRouter.post(
  '/:teamId/pages-deploy',
  teamController.deployToGHPages,
);

teamRouter.delete(
  '/:teamId/pages-clear',
  authMiddleware.cookieJwtAuth,
  mongooseMiddleware.validateTeamObjectId,
  teamMiddleware.validateTeamId,
  teamMiddleware.validateRepo,
  teamController.deleteGHPages,
);

module.exports = teamRouter;
