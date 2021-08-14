/**
 * This file houses our Action Creator type constants.
 */
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const SIGN_OUT = 'SIGN_OUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const GET_PUBLICATION_BY_ID = 'GET_PUBLICATION_BY_ID';
export const GET_PUBLICATIONS_BY_TEAM_ID = 'GET_PUBLICATIONS_BY_TEAM_ID';

export const CREATE_PUBLICATION = 'CREATE_PUBLICATION';
export const UPDATE_PUBLICATION = 'UPDATE_PUBLICATION';
export const DELETE_PUBLICATION = 'DELETE_PUBLICATION';
export const SORT_PUBLICATIONS = 'SORT_PUBLICATION';
export const CREATE_BULK_PUBLICATIONS = 'CREATE_BULK_PUBLICATIONS';

export const FETCH_TEAM_INFO = 'FETCH_TEAM_INFO';
export const LINK_TEAM_TWITTER = 'LINK_TEAM_TWITTER';
export const UNLINK_TEAM_TWITTER = 'UNLINK_TEAM_TWITTER';
export const UPDATE_TEAM = 'UPDATE_TEAM';

export const IMPORT_REQUEST = 'IMPORT_REQUEST';
export const IMPORT_SUCCESS = 'IMPORT_SUCCESS';
export const VALIDATE_IMPORT = 'VALIDATE_IMPORT';
export const IMPORT_FAIL = 'IMPORT_FAIL'; // todo: check this one with PUBLICATION_ERROR
export const IMPORT_CLEAR_STATE = 'IMPORT_CLEAR_STATE';
export const UPDATE_GSCHOLAR_ID = 'UPDATE_GSCHOLAR_ID';
export const IMPORT_END = 'IMPORT_END';
export const IMPORT_EMPTY = 'IMPORT_EMPTY';
export const CHANGE_ACTIVE_PAGE = 'CHANGE_ACTIVE_PAGE';
export const UPDATE_PUBLICATIONS_TO_IMPORT = 'UPDATE_PUBLICATIONS_TO_IMPORT';

export const GET_TEAM_MEMBERS_BY_TEAM_ID = 'GET_TEAM_MEMBERS_BY_TEAM_ID';
export const CREATE_TEAM_MEMBER = 'CREATE_TEAM_MEMBER';
export const UPDATE_TEAM_MEMBER = 'UPDATE_TEAM_MEMBER';
export const DELETE_TEAM_MEMBER = 'DELETE_TEAM_MEMBER';
export const GET_GH_ACCESS_TOKEN = 'GET_GH_ACCESS_TOKEN';
export const DEPLOY_REQUEST = 'DEPLOY_REQUEST';
export const DEPLOY_SUCCESS = 'DEPLOY_SUCCESS';
export const DEPLOY_FAIL = 'DEPLOY_FAIL';

export const CREATE_WEBSITE = 'CREATE_WEBSITE';
export const DELETE_WEBSITE = 'DELETE_WEBSITE';
export const ADD_WEBPAGE = 'ADD_WEBPAGE';
export const DELETE_WEBPAGE = 'DELETE_WEBPAGE';
export const FETCH_WEBSITE_INFO = 'FETCH_WEBSITE_INFO';

// NOTIFICATIONS
export const TEAM_ERROR = 'TEAM_ERROR'; // use this if you want to create specific error handling
export const PUBLICATION_ERROR = 'PUBLICATION_ERROR'; // use this if you want to create specific error handling
export const RESEARCHIFY_API_ERROR = 'RESEARCHIFY_API_ERROR';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
export const SUCCESS_MESSAGE = 'SUCCESS_MESSAGE';
