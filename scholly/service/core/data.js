/**
 * This module exports constants representing all the Environment Variables that need to be set when spawning
 * the subprocess to build the React base app.
 *
 * @note: the Environment Variables must be prefixed with "REACT_APP_"
 * @see: https://create-react-app.dev/docs/adding-custom-environment-variables/
 */

module.exports = {
  REACT_APP_TEAM_PUBLICATIONS: 'REACT_APP_TEAM_PUBLICATIONS',
  REACT_APP_TEAM_INFO: 'REACT_APP_TEAM_INFO',
  REACT_APP_TEAM_MEMBERS: 'REACT_APP_TEAM_MEMBERS',
  REACT_APP_TEAM_HOMEPAGE: 'REACT_APP_TEAM_HOMEPAGE',
  // Contains array of pages to deploy, and client layout selection for the entire website and for publications list
  REACT_APP_WEB_METADATA: 'REACT_APP_WEB_METADATA',
  REACT_APP_TEAM_ACHIEVEMENTS: 'REACT_APP_TEAM_ACHIEVEMENTS',
};
