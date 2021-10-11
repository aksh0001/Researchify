/**
 * This module exports a "Team" mongoose Schema, which represents a researcher team.
 * Post middleware has been implemented to trigger the creation of associated
 * documents upon team registration, and vice-versa for deletion.
 */
const mongoose = require('mongoose');
const logger = require('winston');

const Website = require('./website.model');
const Homepage = require('./homepage.model');
const Publication = require('./publication.model');
const Achievement = require('./achievement.model');

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      minLength: 3,
    },
    orgName: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    twitterHandle: {
      type: String,
    },
    templateId: {
      type: String,
      required: false,
    },
    teamMembers: [
      {
        fullName: {
          type: String,
          required: true,
          minLength: 3,
        },
        position: {
          type: String,
          required: false,
          maxLength: 25,
        },
        summary: {
          type: String,
          required: false,
          maxLength: 200,
        },
        memberPic: {
          type: String,
          required: false,
          default: 'data:image/jpeg;base64,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',
        },
      },
    ],
    githubUsername: {
      type: String,
      required: false,
    },
    themeId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'theme',
    },
    profilePic: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

// Post middleware/trigger to create associated documents when a team has
// registered. See: https://stackoverflow.com/a/57971800/15507541.
// https://mongoosejs.com/docs/middleware.html#post
teamSchema.post('save', async (doc) => {
  try {
    await Website.create({
      teamId: doc._id, publicationOptions: { groupBy: 'None', sortBy: 'Title' }, template: { layout: '1', theme: 'light' },
    });
    await Homepage.create({ teamId: doc._id });
  } catch (err) {
    logger.error('Failed to create associated documents on team creation.');
  }
});

// Post middleware/trigger to delete dependent documents upon team deletion.
teamSchema.post('remove', async (doc) => {
  try {
    await Website.deleteMany({ teamId: doc._id });
    await Homepage.deleteMany({ teamId: doc._id });
    await Publication.deleteMany({ teamId: doc._id });
    await Achievement.deleteMany({ teamId: doc._id });

    logger.info(`Team ${doc.teamName} & associated documents have been deleted.`);
  } catch (err) {
    logger.error('Failed to delete associated documents on team deletion.');
  }
});

const Team = mongoose.model('team', teamSchema);

module.exports = Team;
